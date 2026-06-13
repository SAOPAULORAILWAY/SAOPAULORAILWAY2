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
  HelpCircle
} from 'lucide-react';
import { chapters } from '../data/chapters';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  customProductPrice?: string;
  authorName?: string;
}

export default function PaywallModal({ 
  isOpen, 
  onClose, 
  onUnlock, 
  customProductPrice = "R$ 29,99", 
  authorName = "Evandro Felix Marcondes" 
}: PaywallModalProps) {
  const [accessCode, setAccessCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [paymentStep, setPaymentStep] = useState<'options' | 'pix' | 'success'>('options');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthorPanel, setShowAuthorPanel] = useState(false);
  const [newKeyInput, setNewKeyInput] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Custom keys managed by Evandro in his local session
  const [customKeys, setCustomKeys] = useState<string[]>(() => {
    const saved = localStorage.getItem('efm_custom_keys');
    return saved ? JSON.parse(saved) : [];
  });

  const defaultKeys = ['FERROVIA1867', 'EVANDRO2026', 'LOGISTICA1867', 'PARANAPIACABA'];
  const allValidKeys = [...defaultKeys, ...customKeys.map(k => k.trim().toUpperCase())];

  useEffect(() => {
    localStorage.setItem('efm_custom_keys', JSON.stringify(customKeys));
  }, [customKeys]);

  if (!isOpen) return null;

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = accessCode.trim().toUpperCase();
    if (allValidKeys.includes(normalized)) {
      onUnlock();
      setPaymentStep('success');
      setErrorCode('');
    } else {
      setErrorCode('Chave inválida. Tente novamente ou use o Painel do Autor para gerar uma.');
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

  const handleConfirmPixPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUnlock();
      setPaymentStep('success');
    }, 1500);
  };

  // Author functions
  const handleAddCustomKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = newKeyInput.trim().toUpperCase();
    if (!cleanKey) return;
    
    if (allValidKeys.includes(cleanKey)) {
      alert('Esta chave já está registrada e ativa.');
      return;
    }

    setCustomKeys(prev => [...prev, cleanKey]);
    setNewKeyInput('');
  };

  const handleGenerateRandomKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Readable capital characters without O or 0
    let code = 'MARCONDES-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCustomKeys(prev => [...prev, code]);
  };

  const handleRemoveCustomKey = (keyToRemove: string) => {
    setCustomKeys(prev => prev.filter(k => k !== keyToRemove));
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
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setShowAuthorPanel(!showAuthorPanel);
                setErrorCode('');
              }}
              title="Acessar Gerenciador de Chaves"
              className={`p-1.5 rounded-lg border text-xs font-serif font-black flex items-center gap-1 transition-all cursor-pointer ${
                showAuthorPanel 
                  ? 'bg-amber-650 text-[#FAF7F2] border-amber-700' 
                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
              }`}
            >
              <Settings className="h-3.5 w-3.5" /> {showAuthorPanel ? 'Leitura' : 'Configurar Chaves'}
            </button>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-[#8A7055]/10 text-stone-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto pr-1 space-y-6 flex-1">
          {showAuthorPanel ? (
            /* ================= AUTHOR KEY MANAGER PANEL ================= */
            <div className="space-y-5">
              <div className="space-y-1 select-none">
                <h3 className="text-xl font-serif font-bold text-stone-950 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#8A7055]" /> Gerenciador de Chaves de Acesso
                </h3>
                <p className="text-xs text-stone-500 leading-normal">
                  Como autor, você pode inventar senhas exclusivas, gerar chaves aleatórias e aprender a vender o acesso do seu e-book.
                </p>
              </div>

              {/* Quick instructions / tutorial for selling */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 space-y-2 text-[#4A3F35]">
                <h4 className="text-xs font-serif font-bold flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-amber-700" /> Como vender para seus seguidores?
                </h4>
                <ul className="text-[11px] space-y-1.5 list-disc pl-4 text-justify leading-relaxed">
                  <li>
                    <b>Venda Manual (Via WhatsApp/Pix):</b> O seguidor te envia R$ 29,99 no Pix. Você vem aqui no painel, gera uma chave (ou usa uma padrão), clica em <b>Copiar</b> e envia para ele!
                  </li>
                  <li>
                    <b>Venda Automática (Kiwify ou Hotmart):</b> Defina uma senha padrão muito forte (Ex: <b>FERROVIA1867</b>) e configure na plataforma para enviar essa mesma senha automaticamente por e-mail a quem comprar.
                  </li>
                  <li>
                    <b>Lista de Senhas Padrão Prontas:</b> Qualquer pessoa que usar um destes códigos pré-aprovados terá acesso na hora: <span className="font-mono font-bold text-stone-900 bg-white/60 p-0.5 px-1 rounded border">FERROVIA1867</span> ou <span className="font-mono font-bold text-stone-900 bg-white/60 p-0.5 px-1 rounded border">EVANDRO2026</span>.
                  </li>
                </ul>
              </div>

              {/* Create Dynamic Keys Form */}
              <div className="border border-stone-250 bg-white p-4 rounded-xl space-y-3.5">
                <h4 className="text-xs font-serif font-bold text-stone-900 uppercase tracking-wide">
                  Criar Nova Chave Ativa
                </h4>
                <form onSubmit={handleAddCustomKey} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ex: SEGUIDOR99"
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
                    + Gerar Chave Aleatória
                  </button>
                </div>
              </div>

              {/* Active License List */}
              <div className="space-y-2">
                <h4 className="text-xs font-serif font-bold text-stone-900 uppercase tracking-wide select-none">
                  Chaves Ativas para Validação ({allValidKeys.length})
                </h4>
                <div className="border border-stone-250 rounded-xl bg-white max-h-44 overflow-y-auto divide-y divide-stone-100">
                  {/* Default non-deletable keys */}
                  {defaultKeys.map(k => (
                    <div key={k} className="p-2.5 px-3.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="font-extrabold text-stone-900">{k}</span>
                        <span className="text-[9px] bg-stone-100 text-stone-500 p-0.5 px-1.5 rounded-full">Padrão da Obra</span>
                      </div>
                      <button
                        onClick={() => handleCopyKey(k)}
                        className="p-1 hover:bg-stone-100 rounded text-[#8A7055] transition-colors flex items-center gap-1 text-[10px] select-none font-bold cursor-pointer"
                      >
                        {copiedKey === k ? 'Copiado!' : <><Copy className="h-3 w-3" /> Copiar</>}
                      </button>
                    </div>
                  ))}

                  {/* Customs */}
                  {customKeys.map(k => (
                    <div key={k} className="p-2.5 px-3.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="font-extrabold text-[#8A7055]">{k}</span>
                        <span className="text-[9px] bg-amber-50 text-amber-700 p-0.5 px-1.5 rounded-full">Personalizada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyKey(k)}
                          className="p-1 hover:bg-stone-100 rounded text-[#8A7055] transition-colors flex items-center gap-1 text-[10px] select-none font-bold cursor-pointer"
                        >
                          {copiedKey === k ? 'Copiado!' : <><Copy className="h-3 w-3" /> Copiar</>}
                        </button>
                        <button
                          onClick={() => handleRemoveCustomKey(k)}
                          className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors cursor-pointer"
                          title="Remover Chave"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                    <span className="text-[10px] text-stone-400 font-mono tracking-wider uppercase block leading-none">Preço do Volume Digital</span>
                    <span className="text-3xl font-serif font-black text-[#8A7055] block mt-1">{customProductPrice}</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold block mt-0.5 uppercase tracking-wide">Pago uma única vez • Acesso perpétuo</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3F35] leading-relaxed text-justify px-1">
                    Ao destravar esta obra comercial, você garante acesso integral a todos os <b>{chapters.length} capítulos históricos</b>, tabelas de dados estatísticas imperiais, o compilador gráfico completo para <b>geração e exportação de PDF de gráfica (A4 fidedigno)</b> e o simulador completo de aprovação de domínio.
                  </p>

                  {/* Enter Access Code Form */}
                  <form onSubmit={handleValidateCode} className="space-y-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold text-stone-600 uppercase flex items-center gap-1.5 select-none">
                        <Key className="h-3 w-3 text-[#8A7055]" /> Já comprou? Digite sua Chave de Acesso:
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Digite aqui..."
                          value={accessCode}
                          onChange={(e) => {
                            setAccessCode(e.target.value);
                            setErrorCode('');
                          }}
                          className="flex-1 bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-mono tracking-widest placeholder:text-stone-350 focus:outline-[#8A7055]"
                        />
                        <button 
                          type="submit"
                          className="px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-serif font-bold transition-transform cursor-pointer"
                        >
                          Validar
                        </button>
                      </div>
                      {errorCode && (
                        <div className="flex items-center gap-1.5 text-xs text-red-650 font-mono mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{errorCode}</span>
                        </div>
                      )}
                    </div>
                  </form>

                  {/* Interactive simulated PIX trigger */}
                  <div className="pt-2 border-t border-[#2C2620]/10 flex flex-col gap-2">
                    <span className="text-[10px] text-center font-mono uppercase text-stone-500 font-bold block select-none">
                      Ou Simule o Fluxo Comercial de Compra da sua Audiência
                    </span>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleSimulatePix}
                      className="w-full py-3 px-4 bg-[#8A7055] hover:bg-[#725C46] disabled:bg-stone-300 text-white font-serif font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2 font-mono text-xs text-white">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          PROCESSANDO COMPRA...
                        </span>
                      ) : (
                        <>
                          <QrCode className="h-4.5 w-4.5" /> Simular Pagamento Pix ({customProductPrice})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'pix' && (
                <div className="space-y-6 text-center py-2 select-none">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-lg text-stone-900 leading-tight">Código PIX Copia-e-Cola</h4>
                    <p className="text-xs text-stone-500 font-sans">Simulação interativa do checkout comercial do seu e-book</p>
                  </div>

                  {/* Dummy QR code stylized */}
                  <div className="w-44 h-44 bg-white border border-stone-300 p-2.5 mx-auto rounded-xl flex items-center justify-center shadow-xs">
                    <div className="relative w-full h-full bg-stone-100 flex flex-col items-center justify-center rounded">
                      <QrCode className="h-24 w-24 text-stone-800" />
                      <div className="absolute inset-0 bg-[#8A7055]/5 flex items-center justify-center font-bold font-mono text-[10px] text-[#8A7055]/80">
                        QR CODE SIMULADO
                      </div>
                    </div>
                  </div>

                  {/* PIX copy-paste box */}
                  <div className="bg-stone-100 border border-stone-250 p-2 px-3 rounded-lg flex items-center justify-between gap-2 max-w-sm mx-auto">
                    <span className="font-mono text-[9px] text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-left">
                      00020101021226830014br.gov.bcb.pix0141spr-saopaulorailway-evandro-felix-2999
                    </span>
                    <span className="bg-stone-250 text-[#8A7055] font-mono font-black text-[9px] py-1 px-2 rounded uppercase border border-stone-300">
                      Copiado
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-normal">
                    Pague usando o simulador abaixo para receber e validar a primeira chave padrão <b>FERROVIA1867</b> automaticamente.
                  </p>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleConfirmPixPayment}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 text-white rounded-xl text-sm font-serif font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2 font-mono text-xs">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          CONFIRMANDO LIQUIDAÇÃO...
                        </span>
                      ) : (
                        <>
                          <ShieldCheck className="h-4.5 w-4.5" /> Confirmar Pagamento Simulado
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setPaymentStep('options')}
                      className="text-stone-500 text-xs font-mono underline hover:text-stone-800 uppercase block mx-auto py-1"
                    >
                      Voltar às Opções
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="space-y-6 text-center py-6 select-none animate-scale-up">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-tight">E-book Desbloqueado!</h4>
                    <p className="text-xs text-stone-500 font-sans">A Chave de Acesso permanente é <b>FERROVIA1867</b></p>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-xl max-w-sm mx-auto space-y-1">
                    <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase tracking-widest block">Licença Vitalícia Validada</span>
                    <p className="text-xs text-stone-700 leading-relaxed max-w-xs mx-auto">
                      Agradecemos a simulação de compra! Agora você tem passe livre para explorar, estudar e compilar o PDF de gráfica do e-book.
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

