/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  arrayUnion, 
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

export interface AccessCodeDoc {
  code: string;
  maxLogins: number;
  activeLogins: string[];
  createdAt?: string;
}

const DEFAULT_CODES = ['FERROVIA1867', 'EVANDRO2026', 'LOGISTICA1867', 'PARANAPIACABA'];

/**
 * Ensures user has a unique identifier stored on their browser session/device.
 */
export function getOrCreateSessionId(): string {
  let sId = localStorage.getItem('spr_ebook_session_id');
  if (!sId) {
    // Elegant readable descriptor
    sId = 'usr_' + Math.random().toString(36).substring(2, 10).toUpperCase() + '_' + Date.now().toString().slice(-6);
    localStorage.setItem('spr_ebook_session_id', sId);
  }
  return sId;
}

/**
 * Seeds default passwords on background if the database collection is empty.
 */
export async function seedDefaultCodes(): Promise<void> {
  try {
    const colRef = collection(db, 'access_codes');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      const batch = writeBatch(db);
      for (const code of DEFAULT_CODES) {
        const docRef = doc(db, 'access_codes', code);
        batch.set(docRef, {
          code: code,
          maxLogins: 2,
          activeLogins: [],
          createdAt: new Date().toISOString()
        });
      }
      await batch.commit();
      console.log('Seeded default access codes in Firestore successfully.');
    }
  } catch (error) {
    console.error('Failed to seed default codes:', error);
  }
}

/**
 * Validates a user-entered code and registers their current session if room is available.
 */
export async function validateAndRegisterCode(
  rawCode: string, 
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return { success: false, error: 'Por favor, digite um código de acesso.' };
  }

  try {
    const docRef = doc(db, 'access_codes', code);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, error: 'Chave inválida ou não encontrada.' };
    }

    const data = docSnap.data() as AccessCodeDoc;
    const activeLogins = data.activeLogins || [];
    const maxLogins = data.maxLogins || 2;

    // Device is already registered
    if (activeLogins.includes(sessionId)) {
      return { success: true };
    }

    // Limit exceeded
    if (activeLogins.length >= maxLogins) {
      return { 
        success: false, 
        error: `Esta senha já atingiu o limite máximo de ${maxLogins} dispositivos autorizados. Entre em contato com o autor para liberar novos acessos.` 
      };
    }

    // Register active device session
    await updateDoc(docRef, {
      activeLogins: arrayUnion(sessionId)
    });

    return { success: true };
  } catch (error) {
    console.error('Error validating and registering access code:', error);
    return { 
      success: false, 
      error: 'Erro de comunicação com o servidor. Verifique sua conexão de rede.' 
    };
  }
}

/**
 * Creates a custom code in the cloud database.
 */
export async function createAccessCode(code: string): Promise<void> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return;

  const docRef = doc(db, 'access_codes', normalized);
  await setDoc(docRef, {
    code: normalized,
    maxLogins: 2,
    activeLogins: [],
    createdAt: new Date().toISOString()
  });
}

/**
 * Removes an access code from the cloud database.
 */
export async function deleteAccessCode(code: string): Promise<void> {
  const docRef = doc(db, 'access_codes', code.toUpperCase());
  await deleteDoc(docRef);
}

/**
 * Clears active device sessions for a code, resetting usage to 0.
 * Incredibly useful support tool for the author.
 */
export async function resetAccessCodeSessions(code: string): Promise<void> {
  const docRef = doc(db, 'access_codes', code.toUpperCase());
  await updateDoc(docRef, {
    activeLogins: []
  });
}

/**
 * Fetches all active codes from Firestore for administrative visibility.
 */
export async function fetchAllAccessCodes(): Promise<AccessCodeDoc[]> {
  try {
    const colRef = collection(db, 'access_codes');
    const snapshot = await getDocs(colRef);
    const results: AccessCodeDoc[] = [];
    snapshot.forEach(doc => {
      results.push(doc.data() as AccessCodeDoc);
    });
    return results.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } catch (error) {
    console.error('Failed to fetch access codes:', error);
    return [];
  }
}
