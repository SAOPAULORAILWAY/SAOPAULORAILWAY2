import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Copy, 
  Check, 
  Coins, 
  QrCode 
} from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock?: () => void;
  onLock?: () => void;
  isUnlocked?: boolean;
  customProductPrice?: string;
  authorName?: string;
}

export default function PaywallModal({ 
  isOpen, 
  onClose,
  authorName = "Evandro Felix Marcondes" 
}: PaywallModalProps) {
  
  const [donationOption, setDonationOption] = useState<'free' | '10' | '25' | '50' | 'custom'>('free');
  const [customVal, setCustomVal] = useState<string>('30');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const buildPixCode = (option: string, customAmount: string) => {
    const key = "7b1858fd-ccb3-4904-b3e9-570df6b63136"; // Chave Aleatória (99 Pay)
    const name = "Evandro Felix Marcondes";
    const city = "Sao Paulo";
    
    let rawAmount = "";
    if (option === '10') rawAmount = "10.00";
    else if (option === '25') rawAmount = "25.00";
    else if (option === '50') rawAmount = "50.00";
    else if (option === 'custom') {
      const parsed = parseFloat(customAmount);
      if (!isNaN(parsed) && parsed > 0) {
        rawAmount = parsed.toFixed(2);
      }
    }
    
    const keyClean = key.trim();
    const gui = "br.gov.bcb.pix";
    
    const sub26_00 = "0014" + gui;
    const sub26_01 = "01" + keyClean.length.toString().padStart(2, '0') + keyClean;
    const sub26 = sub26_00 + sub26_01;
    const f26 = "26" + sub26.length.toString().padStart(2, '0') + sub26;
    
    let base = "000201" + 
               "010212" + 
               f26 +
               "52040000" + 
               "5303986";
               
    if (rawAmount) {
      base += "54" + rawAmount.length.toString().padStart(2, '0') + rawAmount;
    }
    
    base += "5802BR" + 
            "59" + name.length.toString().padStart(2, '0') + name.toUpperCase() +
            "60" + city.length.toString().padStart(2, '0') + city.toUpperCase() +
            "62130509" + "SPRDOACAO" + 
            "6304";
                 
    let crc = 0xFFFF;
    for (let i = 0; i < base.length; i++) {
      let x = ((crc >> 8) ^ base.charCodeAt(i)) & 0xFF;
      x ^= x >> 4;
      crc = ((crc << 8) ^ (x << 12) ^ (x << 5) ^ x) & 0xFFFF;
    }
    const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
    return base + crcHex;
  };

  const currentPixCode = buildPixCode(donationOption, customVal);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div 
        className="relative w-full max-w-lg bg-[#FAF7F2] border-2 border-[#8A7055] rounded-2.5xl shadow-2xl p-6 sm:p-8 text-[#2C2620] overflow-hidden flex flex-col max-h-[95vh]"
        style={{ boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.4)' }}
      >
        {/* Editorial double lines border details */}
        <div className="absolute inset-1.5 border border-dashed border-[#8A7055]/30 rounded-2xl pointer-events-none"></div>

        {/* Header control */}
        <div className="flex justify-between items-center pb-3 border-b border-[#2C2620]/10 mb-4 select-none">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-red-500/10 border border-red-500/20 text-red-700 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-red-600 fill-red-600/30 animate-pulse" /> Contribuição Livre
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#8A7055]/10 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto pr-1 space-y-5 flex-1 pb-2">
          {/* Central Heart Graphics */}
          <div className="text-center space-y-1 select-none">
            <div className="h-12 w-12 bg-red-500/10 text-red-600 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
              <Heart className="h-6 w-6 text-red-600 fill-red-600/30" />
            </div>
            <h3 className="text-xl font-serif font-black text-stone-950">Apoie este Livro Independente</h3>
            <p className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">OBRA DE {authorName.toUpperCase()}</p>
          </div>

          {/* EYE-CATCHING AND VISIBLE NOTICE IN PORTUGUESE */}
          <div className="p-4 bg-white border border-[#8A7055]/20 rounded-xl text-stone-850 font-serif italic text-sm leading-relaxed text-justify border-l-4 border-l-[#8A7055] shadow-2xs select-text">
            "Este e-book foi produzido de forma independente. Se você gostou do conteúdo e deseja apoiar novas pesquisas históricas, considere fazer uma contribuição voluntária."
          </div>

          {/* Preset Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-wider text-stone-500 font-bold uppercase block">Escolha o valor da contribuição:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setDonationOption('free')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                    donationOption === 'free'
                      ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Valor Livre
                </button>
                <button
                  type="button"
                  onClick={() => setDonationOption('10')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                    donationOption === '10'
                      ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  R$ 10,00
                </button>
                <button
                  type="button"
                  onClick={() => setDonationOption('25')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                    donationOption === '25'
                      ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  R$ 25,00
                </button>
                <button
                  type="button"
                  onClick={() => setDonationOption('50')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                    donationOption === '50'
                      ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  R$ 50,00
                </button>
                <button
                  type="button"
                  onClick={() => setDonationOption('custom')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                    donationOption === 'custom'
                      ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Outro...
                </button>
              </div>
            </div>

            {donationOption === 'custom' && (
              <div className="flex gap-2 items-center bg-white border border-stone-250 rounded-xl p-2 max-w-xs animate-slide-down">
                <span className="font-mono text-stone-400 font-bold text-xs pl-1">R$</span>
                <input
                  type="number"
                  min="1.00"
                  step="1.00"
                  value={customVal}
                  onChange={(e) => setCustomVal(e.target.value)}
                  className="bg-transparent border-0 outline-hidden font-mono font-extrabold text-[#8A7055] text-sm w-full"
                  placeholder="Digite o valor"
                />
              </div>
            )}

            {/* QR Code and Copy Block */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-3 border-t border-[#2C2620]/10">
              <div className="sm:col-span-5 flex justify-center">
                <div className="bg-white border border-stone-250 p-2 rounded-xl shadow-xs">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentPixCode)}&ecc=M`}
                    alt="Pix Donation QR Code"
                    className="w-28 h-28 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center font-mono text-[8px] font-black text-[#8A7055] tracking-tight mt-1">
                    {donationOption === 'free' ? 'VALOR LIVRE' : `R$ ${donationOption === 'custom' ? customVal : donationOption}`}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-7 flex flex-col gap-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-wider text-stone-450 uppercase font-black block">Chave Pix Copia e Cola</span>
                  <div className="bg-white border border-stone-200 p-1.5 px-2.5 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                    <span className="font-mono text-[9.5px] text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap flex-1 select-all">
                      {currentPixCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="bg-[#8A7055] hover:bg-[#725C46] text-white font-mono font-bold text-[9px] py-1.5 px-2.5 rounded-lg uppercase transition-all shrink-0 flex items-center gap-0.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-300" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 font-mono leading-normal bg-stone-50 p-2 rounded-lg border border-stone-200/50">
                  <div className="font-bold text-[#8A7055] text-[9.5px] mb-0.5 uppercase tracking-wider">Destinatário Oficial:</div>
                  <div>Nome: Evandro Felix Marcondes</div>
                  <div>Chave Aleatória: 99 Pay</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#8A7055] hover:bg-[#725C46] text-[#FAF7F2] rounded-xl text-xs uppercase font-mono tracking-widest font-black transition-all cursor-pointer shadow-sm text-center"
          >
            Continuar Lendo E-book Gratuito
          </button>
        </div>
      </div>
    </div>
  );
}
