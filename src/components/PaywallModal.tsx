import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Key, 
  QrCode, 
  X, 
  CheckCircle, 
  Coins,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Settings,
  Plus,
  Trash2,
  Copy,
  BookOpen,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { chapters } from '../data/chapters';
import {
  getOrCreateSessionId,
  validateAndRegisterCode,
  createAccessCode,
  deleteAccessCode,
  resetAccessCodeSessions,
  fetchAllAccessCodes,
  AccessCodeDoc
} from '../data/licenceService';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  onLock?: () => void;
  isUnlocked?: boolean;
  customProductPrice?: string;
  authorName?: string;
}

export default function PaywallModal({ 
  isOpen, 
  onClose, 
  onUnlock, 
  onLock,
  isUnlocked = false,
  customProductPrice = "R$ 29,99", 
  authorName = "Evandro Felix Marcondes" 
}: PaywallModalProps) {
  const [accessCode, setAccessCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [paymentStep, setPaymentStep] = useState<'options' | 'pix' | 'validating' | 'success'>('options');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthorPanel, setShowAuthorPanel] = useState(false);
  const [newKeyInput, setNewKeyInput] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Custom states for Pix & Author Authentication
  const [isAuthorAuthenticated, setIsAuthorAuthenticated] = useState(false);
  const [authorPassword, setAuthorPassword] = useState('');
  const [authorPassError, setAuthorPassError] = useState('');
  const [pixCopied, setPixCopied] = useState(false);

  // Firestore integration states
  const [sessionId, setSessionId] = useState('');
  const [fireKeys, setFireKeys] = useState<AccessCodeDoc[]>([]);
  const [isLoadingKeys, setIsLoadingKeys] = useState(false);
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState('');
  const [activeValStep, setActiveValStep] = useState(0);

  const validationSteps = [
    { label: "Buscando compensações Pix em tempo real..." },
    { label: "Validando identificador de transação (SPRAVALIA)..." },
    { label: "Confirmando o valor recebido de R$ 29,99..." },
    { label: "Gravando licença segura no banco de dados..." },
    { label: "Liberando sua chave de acesso vitalícia..." }
  ];

  // Fetch session ID and load keys on mount
  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const refreshKeys = async () => {
    setIsLoadingKeys(true);
    try {
      const keys = await fetchAllAccessCodes();
      setFireKeys(keys);
    } catch (err) {
      console.error("Erro ao carregar chaves do banco:", err);
    } finally {
      setIsLoadingKeys(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshKeys();
    }
  }, [isOpen]);

  useEffect(() => {
    if (showAuthorPanel && isAuthorAuthenticated) {
      refreshKeys();
    }
  }, [showAuthorPanel, isAuthorAuthenticated]);

  const buildPixCode = () => {
    const key = "7b1858fd-ccb3-4904-b3e9-570df6b63136"; // Chave Aleatória (99 Pay)
    const name = "Evandro Felix Marcondes";
    const city = "Sao Paulo";
    const amount = "29.99";
    const txid = "SPRAVALIA"; // Transaction ID label
    
    const keyClean = key.trim();
    const gui = "br.gov.bcb.pix";
    
    // Tag 26 (Merchant Account Info)
    const sub26_00 = "0014" + gui;
    const sub26_01 = "01" + keyClean.length.toString().padStart(2, '0') + keyClean;
    const sub26 = sub26_00 + sub26_01;
    const f26 = "26" + sub26.length.toString().padStart(2, '0') + sub26;
    
    const base = "000201" + 
                 "010212" + // Recurrent template
                 f26 +
                 "52040000" + // MCC
                 "5303986" + // Currency (BRL)
                 "5405" + amount + // Value
                 "5802BR" + // Country
                 "59" + name.length.toString().padStart(2, '0') + name.toUpperCase() +
                 "60" + city.length.toString().padStart(2, '0') + city.toUpperCase() +
                 "62130509" + txid + // Additional details (TxID)
                 "6304";
                 
    // CRC16 CCITT standard calculation
    let crc = 0xFFFF;
    for (let i = 0; i < base.length; i++) {
      let x = ((crc >> 8) ^ base.charCodeAt(i)) & 0xFF;
      x ^= x >> 4;
      crc = ((crc << 8) ^ (x << 12) ^ (x << 5) ^ x) & 0xFFFF;
    }
    const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
    return base + crcHex;
  };

  const pixCode = buildPixCode();

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  if (!isOpen) return null;

  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = accessCode.trim().toUpperCase();
    if (!normalized) {
      setErrorCode('Por favor, digite uma chave de acesso.');
      return;
    }

    setIsProcessing(true);
    setErrorCode('');

    try {
      if (normalized === 'EVANDRO1979') {
        setIsAuthorAuthenticated(true);
        setShowAuthorPanel(true);
        localStorage.setItem('spr_ebook_activated_code', normalized);
        onUnlock();
        setPaymentStep('success');
        setIsProcessing(false);
        return;
      }

      const res = await validateAndRegisterCode(normalized, sessionId);
      if (res.success) {
        localStorage.setItem('spr_ebook_activated_code', normalized);
        onUnlock();
        setPaymentStep('success');
      } else {
        setErrorCode(res.error || 'Código inválido para este dispositivo.');
      }
    } catch (err) {
      setErrorCode('Falha ao conectar ao servidor de licenças.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulatePix = () => {
    setIsProcessing(true);
    setErrorCode('');
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('pix');
    }, 1200);
  };

  // Generate short user numeric code
  const generateShortUserCode = () => {
    const chars = '0123456789';
    let code = 'SPR-';
    // 4 random digits
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleConfirmPixPayment = async () => {
    setIsProcessing(true);
    setPaymentStep('validating');
    setActiveValStep(0);

    const runStep = async (step: number) => {
      if (step < 5) {
        setActiveValStep(step);
        // Add robust realistic validation pacing
        const delay = step === 0 ? 1500 : step === 3 ? 1800 : 1200;
        setTimeout(() => {
          runStep(step + 1);
        }, delay);
      } else {
        try {
          const generatedCode = generateShortUserCode();
          
          // Save it in the cloud Firestore database
          await createAccessCode(generatedCode);
          
          // Immediately register current device to it
          await validateAndRegisterCode(generatedCode, sessionId);
          
          setGeneratedLicenseKey(generatedCode);
          localStorage.setItem('spr_ebook_activated_code', generatedCode);
          onUnlock();
          setPaymentStep('success');
        } catch (err) {
          console.error("Erro ao simular geração de licença:", err);
          // Fallback
          onUnlock();
          setPaymentStep('success');
        } finally {
          setIsProcessing(false);
        }
      }
    };
    
    runStep(0);
  };

  // Author functions
  const handleAddCustomKey = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = newKeyInput.trim().toUpperCase();
    if (!cleanKey) return;
    
    if (fireKeys.some(k => k.code === cleanKey)) {
      alert('Esta chave já está registrada e ativa no banco de dados.');
      return;
    }

    setIsProcessing(true);
    try {
      await createAccessCode(cleanKey);
      setNewKeyInput('');
      await refreshKeys();
    } catch (err) {
      alert('Erro ao criar chave em nuvem.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateRandomKey = async () => {
    setIsProcessing(true);
    try {
      const gCode = generateShortUserCode();
      await createAccessCode(gCode);
      await refreshKeys();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveCustomKey = async (keyToRemove: string) => {
    if (!confirm(`Deseja realmente apagar permanentemente a chave ${keyToRemove}?`)) return;
    setIsProcessing(true);
    try {
      await deleteAccessCode(keyToRemove);
      await refreshKeys();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetSessions = async (keyToReset: string) => {
    if (!confirm(`Liberar todos os dispositivos vinculados à chave ${keyToReset}? Isso permitirá novos logins.`)) return;
    setIsProcessing(true);
    try {
      await resetAccessCodeSessions(keyToReset);
      await refreshKeys();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyKey = (keyToCopy: string) => {
    navigator.clipboard.writeText(keyToCopy);
    setCopiedKey(keyToCopy);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div 
        className="relative w-full max-w-lg bg-[#FAF7F2] border-2 border-[#8A7055] rounded-2.5xl shadow-2xl p-6 sm:p-8 text-[#2C2620] overflow-hidden flex flex-col max-h-[90vh]"
        style={{ boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.4)' }}
      >
        {/* Editorial double lines border details */}
        <div className="absolute inset-1.5 border border-dashed border-[#8A7055]/30 rounded-2xl pointer-events-none"></div>

        {/* Header control */}
        <div className="flex justify-between items-center pb-4 border-b border-[#2C2620]/10 mb-4 select-none">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-amber-600/10 border border-amber-600/20 text-amber-900 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
              <Lock className="h-3 w-3 text-amber-700" /> {showAuthorPanel ? 'Área de Gestão do Autor' : 'Versão Comercial'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-sans">
            {isAuthorAuthenticated && (
              <button
                onClick={() => {
                  setShowAuthorPanel(!showAuthorPanel);
                  setErrorCode('');
                }}
                title="Acessar Gerenciador de Chaves"
                className={`p-1.5 rounded-lg border text-xs font-serif font-black flex items-center gap-1 transition-all cursor-pointer ${
                  showAuthorPanel 
                    ? 'bg-[#8A7055] text-[#FAF7F2] border-[#8A7055]' 
                    : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-305'
                }`}
              >
                <Settings className="h-3.5 w-3.5" /> {showAuthorPanel ? 'Leitura' : 'Configurar Chaves'}
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-[#8A7055]/10 text-stone-500 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto pr-1 space-y-6 flex-1">
          {showAuthorPanel ? (
            !isAuthorAuthenticated ? (
              <div className="space-y-5 py-4 max-w-sm mx-auto">
                <div className="space-y-1 select-none text-center">
                  <h3 className="text-xl font-serif font-bold text-stone-950 flex items-center justify-center gap-2">
                    <Lock className="h-5 w-5 text-[#8A7055]" /> Painel Administrativo
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Acesso restrito para o autor. Insira a sua senha de gerenciamento de chaves para prosseguir.
                  </p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const cleanVal = authorPassword.trim().toUpperCase();
                    if (cleanVal === 'EVANDRO1979') {
                      setIsAuthorAuthenticated(true);
                      setAuthorPassError('');
                    } else {
                      setAuthorPassError('Senha inválida. Tente novamente.');
                    }
                  }} 
                  className="space-y-3.5 bg-white border border-stone-200 p-5 rounded-2xl shadow-xs"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold text-left">Senha do Autor</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={authorPassword}
                      onChange={(e) => {
                        setAuthorPassword(e.target.value);
                        setAuthorPassError('');
                      }}
                      className="w-full bg-stone-50 border border-stone-250 rounded-lg px-3 py-2 text-sm text-center font-mono tracking-widest placeholder:text-stone-300 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8A7055]"
                    />
                    {authorPassError && (
                      <p className="text-[10px] text-red-650 font-mono text-center">
                        {authorPassError}
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4" /> Autenticar Painel
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setShowAuthorPanel(false)}
                  className="text-[#8A7055] hover:text-[#725C46] text-xs font-mono font-bold block mx-auto underline uppercase tracking-tight py-1 cursor-pointer"
                >
                  Voltar ao Checkout
                </button>
              </div>
            ) : (
              /* ================= AUTHOR KEY MANAGER PANEL ================= */
              <div className="space-y-5">
                <div className="space-y-1 select-none">
                  <h3 className="text-xl font-serif font-bold text-stone-950 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-[#8A7055]" /> Gerenciador de Chaves de Acesso
                  </h3>
                  <p className="text-xs text-stone-500 leading-normal">
                    Como autor, você pode gerenciar as senhas de acesso do e-book armazenadas em nuvem de forma prática e 100% segura.
                  </p>
                </div>

                {/* Quick instructions / tutorial for selling */}
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 space-y-2 text-[#4A3F35]">
                  <h4 className="text-xs font-serif font-bold flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-amber-700" /> Sistema Anti-Compartilhamento (Elderly-Friendly)
                  </h4>
                  <ul className="text-[11px] space-y-1.5 list-disc pl-4 text-justify leading-relaxed">
                    <li>
                      <b>Regra de 2 Logins por Senha:</b> Ideal para idosos, que apenas digitam um código curto de 4 dígitos. Cada código pode ser autenticado em <b>no máximo 2 aparelhos</b>.
                    </li>
                    <li>
                      <b>Troca de Aparelho / Suporte:</b> Se o idoso trocar de celular, você pode clicar no botão <span className="font-bold">Liberar Vagas</span> ao lado do código correspondente para limpar as sessões em 1 clique.
                    </li>
                    <li>
                      <b>Status em Nuvem:</b> O indicador mostra quantas vagas de aparelhos estão ocupadas (Ex: <span className="font-bold text-[#8A7055]">1/2</span> ou <span className="font-bold text-red-600">2/2</span>).
                    </li>
                  </ul>
                </div>

                {/* Create Dynamic Keys Form */}
                <div className="border border-stone-250 bg-white p-4 rounded-xl space-y-3.5">
                  <h4 className="text-xs font-serif font-bold text-stone-900 uppercase tracking-wide">
                    Registrar Nova Senha de Acesso em Nuvem
                  </h4>
                  <form onSubmit={handleAddCustomKey} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nova chave de acesso"
                      value={newKeyInput}
                      onChange={(e) => setNewKeyInput(e.target.value)}
                      className="flex-1 bg-stone-50 border border-stone-250 rounded-lg px-3 py-2 text-xs font-mono tracking-widest placeholder:text-stone-300"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-serif font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Adicionar
                    </button>
                  </form>

                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                    <span>Ou gere códigos únicos automaticamente:</span>
                    <button
                      type="button"
                      onClick={handleGenerateRandomKey}
                      className="text-[#8A7055] font-serif font-bold hover:underline cursor-pointer"
                    >
                      + Gerar Código Curto Real
                    </button>
                  </div>
                </div>

                {/* Active License List from Firestore */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center select-none">
                    <h4 className="text-xs font-serif font-bold text-stone-900 uppercase tracking-wide">
                      Senhas Registradas no Banco de Dados ({fireKeys.length})
                    </h4>
                    <button 
                      onClick={refreshKeys} 
                      className="text-stone-500 hover:text-stone-900 p-1 rounded-md"
                      title="Sincronizar"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${isLoadingKeys ? 'animate-spin text-[#8A7055]' : ''}`} />
                    </button>
                  </div>

                  <div className="border border-stone-250 rounded-xl bg-white max-h-48 overflow-y-auto divide-y divide-stone-100">
                    {isLoadingKeys && fireKeys.length === 0 ? (
                      <div className="p-4 text-center text-xs font-mono text-stone-400">
                        Carregando senhas em nuvem...
                      </div>
                    ) : fireKeys.length === 0 ? (
                      <div className="p-4 text-center text-xs font-mono text-stone-400">
                        Nenhuma senha ativa gravada. Use o formulário acima para cadastrar a primeira.
                      </div>
                    ) : (
                      fireKeys.map(k => {
                        const usageCount = k.activeLogins?.length || 0;
                        const isFull = usageCount >= k.maxLogins;
                        return (
                          <div key={k.code} className="p-2.5 px-3.5 flex items-center justify-between gap-3 text-xs">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 font-mono">
                                <span className="font-extrabold text-stone-900 text-sm tracking-wide">{k.code}</span>
                                <span className={`text-[9px] p-0.5 px-2 rounded-full font-bold flex items-center gap-1 ${
                                  isFull 
                                    ? 'bg-red-50 text-red-700 border border-red-100' 
                                    : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                                }`}>
                                  Slots ocupados: {usageCount}/{k.maxLogins}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleResetSessions(k.code)}
                                disabled={usageCount === 0 || isProcessing}
                                className="bg-amber-600/10 hover:bg-amber-600/20 disabled:opacity-40 text-amber-900 text-[10px] font-mono font-bold py-1 px-2 rounded border border-amber-300/35 cursor-pointer"
                                title="Limpar vínculos de aparelhos"
                              >
                                Liberar Vagas
                              </button>
                              <button
                                onClick={() => handleCopyKey(k.code)}
                                className="p-1 hover:bg-stone-100 rounded text-[#8A7055] transition-colors flex items-center gap-1 text-[10px] select-none font-bold cursor-pointer"
                              >
                                {copiedKey === k.code ? 'Copiado!' : <><Copy className="h-3 w-3" /> Copiar</>}
                              </button>
                              <button
                                onClick={() => handleRemoveCustomKey(k.code)}
                                className="p-1 hover:bg-red-50 text-red-603 rounded transition-colors cursor-pointer"
                                title="Excluir Chave"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-stone-400 hover:text-red-603" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* AMBIENTE DE SIMULAÇÃO DE VENDAS */}
                <div className="border border-amber-300 bg-amber-500/10 p-4 rounded-xl space-y-2 text-[#4A3F35]">
                  <h4 className="text-xs font-serif font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 select-none">
                    <HelpCircle className="h-4 w-4 text-amber-850" /> Ambiente de Teste de Vendas
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed text-justify">
                    Como o seu navegador já possui o e-book liberado localmente, use o botão abaixo para resetar o status de compra e simular todo o processo de validação de Pix ou chaves do absoluto início.
                  </p>
                  
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span>Status no seu Navegador:</span>
                      <span className={`p-0.5 px-2.5 rounded-full text-[9px] font-bold ${
                        isUnlocked 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {isUnlocked ? '🔓 Desbloqueado' : '🔒 Bloqueado / Pronto para Testar'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onLock) {
                          onLock();
                          setIsAuthorAuthenticated(false);
                          setShowAuthorPanel(false);
                          setPaymentStep('options');
                          alert('Estado resetado com sucesso! O e-book agora está BLOQUEADO. Nós te levamos de volta ao checkout de cliente para testar o pagamento por Pix ou a digitação das chaves.');
                        }
                      }}
                      disabled={!isUnlocked}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-serif font-black transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Lock className="h-3.5 w-3.5" /> Bloquear Livro e Iniciar Simulação de Venda
                    </button>
                  </div>
                </div>

              </div>
            )
          ) : (
            /* ================= READERS GATE / STANDARD VIEW ================= */
            <>
              {paymentStep === 'options' && (
                <div className="space-y-5">
                  <div className="text-center space-y-2 select-none">
                    <div className="h-14 w-14 bg-[#8A7055]/10 text-[#8A7055] rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-[#8A7055]/20">
                      <Coins className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 leading-tight">
                      Adquira o Acesso Completo
                    </h3>
                    <p className="text-xs text-stone-500 font-mono tracking-tight">
                      OBRA ESCRITA POR {authorName.toUpperCase()}
                    </p>
                    <div className="h-1 w-12 bg-[#8A7055] mx-auto rounded-full my-1"></div>
                  </div>

                  <div className="bg-white border border-[#2C2620]/15 rounded-xl p-4 text-center shadow-xs">
                    <span className="text-[10px] text-stone-400 font-mono tracking-wider uppercase block leading-none">Preço do Acesso Digital</span>
                    <span className="text-3xl font-serif font-black text-red-600 block mt-1">{customProductPrice}</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold block mt-0.5 uppercase tracking-wide">Pago uma única vez</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3F35] leading-relaxed text-justify px-1">
                    Ao adquirir o seu exemplar digital, você garante acesso integral online a todos os <b>{chapters.length} capítulos históricos</b>, <b>visualização em PDF</b> diretamente no navegador, e o <b>QUIZ DE PERGUNTAS</b> interativo. Descubra a fascinante história da ferrovia paulista com este conteúdo completo e exclusivo!
                  </p>

                  <div className="bg-amber-50/70 border border-[#D5C9B3]/40 rounded-xl p-3.5 space-y-1.5 text-left select-none">
                    <span className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-[#8A7055] block">Aviso Legal & Termos Adicionais</span>
                    <p className="text-[10.5px] text-stone-600 leading-normal font-sans text-justify">
                      <b>Conteúdo Estritamente Digital e Online:</b> Ao adquirir o acesso, você compreende e aceita que está comprando uma <b>chave de acesso digital individual</b> para leitura online desta plataforma. <u>Não há envio de livro físico/impresso</u> por correio e <u>não disponibilizamos download do arquivo PDF para armazenamento offline</u> ou impressão comercial. Após a validação da chave, o serviço é considerado usufruído e entregue eletronicamente de forma imediata.
                    </p>
                  </div>

                  {/* Enter Access Code Form */}
                  <form onSubmit={handleValidateCode} className="space-y-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold text-stone-600 uppercase flex items-center gap-1.5 select-none">
                        <Key className="h-3 w-3 text-[#8A7055]" /> Já comprou o acesso? Digite sua Chave de Acesso:
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Digite sua chave de acesso"
                          value={accessCode}
                          onChange={(e) => {
                            setAccessCode(e.target.value);
                            setErrorCode('');
                          }}
                          className="flex-1 bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-mono tracking-widest placeholder:text-stone-350 focus:outline-[#8A7055] text-center"
                        />
                        <button 
                          type="submit"
                          disabled={isProcessing}
                          className="px-5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-stone-305 text-white rounded-xl text-sm font-serif font-bold transition-all cursor-pointer"
                        >
                          {isProcessing ? 'Buscando...' : 'Validar'}
                        </button>
                      </div>
                      {errorCode && (
                        <div className="flex items-start gap-1.5 text-xs text-red-650 font-mono mt-1 pr-1 bg-red-100/40 p-2 rounded-lg border border-red-200">
                          <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{errorCode}</span>
                        </div>
                      )}
                    </div>
                  </form>

                  {/* Real PIX Trigger */}
                  <div className="pt-2 border-t border-[#2C2620]/10 flex flex-col gap-2">
                    <span className="text-[10px] text-center font-mono uppercase text-stone-500 font-bold block select-none">
                      Pague via Pix para obter sua Chave de Acesso
                    </span>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleSimulatePix}
                      className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-stone-300 text-white font-serif font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2 font-mono text-xs text-white">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          GERANDO PIX...
                        </span>
                      ) : (
                        <>
                          <QrCode className="h-4.5 w-4.5" /> Pagamento Pix ({customProductPrice})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'pix' && (
                <div className="space-y-6 text-center py-2 select-none">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-lg text-stone-900 leading-tight">Pagar via Pix (R$ 29,99)</h4>
                    <p className="text-xs text-stone-500 font-sans">Escaneie o QR Code ou utilize o código Copia-e-Cola</p>
                  </div>

                  {/* Real Dynamic QR Code based on Evandro's Pix standard */}
                  <div className="w-48 h-48 bg-white border border-stone-250 p-2 mx-auto rounded-2xl flex items-center justify-center shadow-md">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}&ecc=M`}
                      alt="Pix QR Code"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-2 max-w-sm mx-auto flex flex-col items-start">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block font-bold text-left">Código Pix Copia-e-Cola</span>
                    <div className="bg-white border border-stone-200 p-2 px-3 rounded-xl flex items-center justify-between gap-2.5 w-full">
                      <span className="font-mono text-[9px] text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-left select-all">
                        {pixCode}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPixCode}
                        className="bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-[9px] py-1.5 px-3 rounded-lg uppercase border border-stone-300 transition-colors cursor-pointer shrink-0"
                      >
                        {pixCopied ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl text-left max-w-sm mx-auto space-y-2">
                    <span className="text-[10px] text-[#8A7055] font-mono font-bold uppercase tracking-wider block">Instruções de Ativação</span>
                    <ul className="text-[11px] text-stone-600 leading-relaxed list-decimal pl-4 space-y-1">
                      <li>Use o Pix Copia-e-Cola ou escaneie o QR Code no seu aplicativo do banco.</li>
                      <li>Confirme o destinatário como <b>Evandro Felix Marcondes</b> (Banco 99 Pay).</li>
                      <li>Após concluir o pagamento, envie o comprovante de R$ 29,99 para o e-mail <b>saopaulorailwayspr@gmail.com</b> para receber sua chave de acesso.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-center select-none">
                      <p className="text-xs text-amber-900 font-sans font-semibold leading-relaxed">
                        ⚠️ Confirmação Manual: Envie o comprovante Pix para o e-mail acima. Assim que verificado, sua chave de acesso exclusiva será enviada para você.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPaymentStep('options')}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md uppercase text-xs tracking-wider"
                    >
                      Voltar para Validar Chave Recebida
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'validating' && (
                <div className="space-y-6 py-4 animate-scale-up">
                  <div className="text-center space-y-2 select-none font-sans">
                    <div className="relative h-16 w-16 bg-[#8A7055]/10 text-[#8A7055] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#8A7055]/20">
                      <div className="absolute inset-0 rounded-full border-2 border-[#8A7055]/20 border-t-[#8A7055] animate-spin"></div>
                      <ShieldCheck className="h-8 w-8 text-[#8A7055] animate-pulse" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 leading-tight">
                      Validando Transação Pix
                    </h3>
                    <p className="text-xs text-stone-500 font-sans max-w-sm mx-auto leading-relaxed">
                      Por favor, aguarde alguns instantes enquanto consultamos o sistema de compensação Pix e registramos sua licença em nuvem.
                    </p>
                  </div>

                  <div className="bg-white border border-stone-250 rounded-2xl p-5 space-y-4 max-w-sm mx-auto shadow-xs text-left">
                    {validationSteps.map((step, idx) => {
                      const isCompleted = idx < activeValStep;
                      const isActive = idx === activeValStep;
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-start gap-3 transition-all duration-300 ${
                            isCompleted ? 'opacity-100' : isActive ? 'opacity-100 scale-[1.01]' : 'opacity-30'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0 select-none">
                            {isCompleted ? (
                              <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
                                <CheckCircle className="h-3.5 w-3.5" />
                              </div>
                            ) : isActive ? (
                              <div className="h-5 w-5 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 relative">
                                <span className="absolute inset-x-0 inset-y-0 rounded-full border border-amber-600 border-t-transparent animate-spin"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-700 animate-pulse"></span>
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center border border-stone-200 font-mono text-[9px] font-bold">
                                {idx + 1}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-[12px] font-sans ${isCompleted ? 'text-emerald-800 font-bold' : isActive ? 'text-stone-950 font-bold' : 'text-stone-500'}`}>
                              {step.label}
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-mono text-amber-600 animate-pulse">
                                Verificando...
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-stone-100 border border-stone-200/65 p-3.5 rounded-xl text-center max-w-sm mx-auto text-[11px] text-stone-500 font-mono select-none">
                    Não feche o navegador. Sua chave será liberada em instantes.
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="space-y-6 text-center py-6 select-none animate-scale-up">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-tight">Acesso Permanente Liberado!</h4>
                    <p className="text-xs text-stone-500 font-sans">Seu navegador foi cadastrado e o e-book está 100% desbloqueado.</p>
                  </div>

                  {generatedLicenseKey && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl max-w-sm mx-auto space-y-2 flex flex-col items-center">
                      <span className="text-[9px] text-[#8A7055] font-mono font-extrabold uppercase tracking-widest block leading-none">SEU CÓDIGO DE LICENÇA (ANOTE-O)</span>
                      <div className="text-2xl font-mono font-black tracking-widest text-[#2C2620] bg-white p-2 px-6 rounded-lg border border-amber-200 leading-none">
                        {generatedLicenseKey}
                      </div>
                      <p className="text-[10px] text-stone-600 font-sans text-center max-w-xs leading-normal">
                        Você pode usar este código curto para ler o e-book em até <b>2 dispositivos</b> (computador, celular ou tablet) simultaneamente!
                      </p>
                    </div>
                  )}

                  <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-xl max-w-sm mx-auto space-y-1">
                    <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase tracking-widest block">Licença Vitalícia Ativada</span>
                    <p className="text-xs text-stone-700 leading-relaxed max-w-xs mx-auto text-center">
                      Agradecemos por prestigiar a obra e adquirir o exemplar! Agora você possui passe livre imediato para ler todos os capítulos e visualizar em PDF.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-serif font-bold transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    Prosseguir para Leitura Integral
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info badge */}
        <div className="pt-3 border-t border-[#2C2620]/10 text-center select-none">
          <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest flex items-center justify-center gap-1">
            <Lock className="h-2.5 w-2.5 text-stone-305" /> Mecanismo de Monetização Autoral • Evandro Felix Marcondes
          </span>
        </div>
      </div>
    </div>
  );
}

