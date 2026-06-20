/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Map, 
  Calendar, 
  Compass, 
  CheckCircle2, 
  Image, 
  ChevronRight, 
  Printer, 
  Clock, 
  Bookmark, 
  Award,
  BookOpenText,
  Anchor,
  Globe2,
  Lock,
  Heart,
  Copy,
  Coins,
  QrCode,
  Check
} from 'lucide-react';
import EbookReader from './components/EbookReader';
import { chapters } from './data/chapters';
import PaywallModal from './components/PaywallModal';
import { seedDefaultCodes, removeSessionFromCode, getOrCreateSessionId } from './data/licenceService';

export default function App() {
  const [view, setView] = useState<'cover' | 'reader'>('cover');
  const [targetChapterIndex, setTargetChapterIndex] = useState<number>(0);
  const [targetShowQuiz, setTargetShowQuiz] = useState<boolean>(false);
  const [targetPrintMode, setTargetPrintMode] = useState<boolean>(false);
  const [targetShowConclusion, setTargetShowConclusion] = useState<boolean>(false);
  const [targetShowReferences, setTargetShowReferences] = useState<boolean>(false);
  const [targetShowAboutAuthor, setTargetShowAboutAuthor] = useState<boolean>(false);
  const [targetShowApresentacao, setTargetShowApresentacao] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true);
  const [paywallOpen, setPaywallOpen] = useState(false);
  
  // States for donation and PIX interactivity
  const [donationOption, setDonationOption] = useState<'free' | '10' | '25' | '50' | 'custom'>('free');
  const [customDonationVal, setCustomDonationVal] = useState<string>('30');
  const [copiedPixResult, setCopiedPixResult] = useState(false);

  React.useEffect(() => {
    seedDefaultCodes();
    // Keep it unlocked in localStorage too for backwards compatibility
    localStorage.setItem('spr_ebook_unlocked', 'true');
  }, []);

  const buildPixCode = (valOption: string, customVal: string) => {
    const key = "7b1858fd-ccb3-4904-b3e9-570df6b63136"; // Chave Aleatória (99 Pay)
    const name = "Evandro Felix Marcondes";
    const city = "Sao Paulo";
    
    // Choose active value
    let rawAmount = "";
    if (valOption === '10') rawAmount = "10.00";
    else if (valOption === '25') rawAmount = "25.00";
    else if (valOption === '50') rawAmount = "50.00";
    else if (valOption === 'custom') {
      const parsed = parseFloat(customVal);
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

  const currentPixCode = buildPixCode(donationOption, customDonationVal);

  const handleCopyLanderPix = () => {
    navigator.clipboard.writeText(currentPixCode);
    setCopiedPixResult(true);
    setTimeout(() => setCopiedPixResult(false), 2500);
  };

  const unlockEbook = () => {
    setIsUnlocked(true);
    localStorage.setItem('spr_ebook_unlocked', 'true');
  };

  const lockEbook = async () => {
    setIsUnlocked(false);
    localStorage.removeItem('spr_ebook_unlocked');
    
    // Release active device session in Firestore if exists
    const activeCode = localStorage.getItem('spr_ebook_activated_code');
    if (activeCode) {
      try {
        const sessionId = getOrCreateSessionId();
        await removeSessionFromCode(activeCode, sessionId);
      } catch (e) {
        console.error('Error removing session on lock:', e);
      }
      localStorage.removeItem('spr_ebook_activated_code');
    }
  };

  const openChapter = (index: number) => {
    if (index >= 2 && !isUnlocked) {
      setPaywallOpen(true);
      return;
    }
    setTargetChapterIndex(index);
    setTargetShowQuiz(false);
    setTargetPrintMode(false);
    setTargetShowConclusion(false);
    setTargetShowReferences(false);
    setTargetShowAboutAuthor(false);
    setTargetShowApresentacao(false);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openApresentacao = () => {
    setTargetChapterIndex(0);
    setTargetShowQuiz(false);
    setTargetPrintMode(false);
    setTargetShowConclusion(false);
    setTargetShowReferences(false);
    setTargetShowAboutAuthor(false);
    setTargetShowApresentacao(true);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openQuiz = () => {
    if (!isUnlocked) {
      setPaywallOpen(true);
      return;
    }
    setTargetShowQuiz(true);
    setTargetPrintMode(false);
    setTargetShowConclusion(false);
    setTargetShowReferences(false);
    setTargetShowAboutAuthor(false);
    setTargetShowApresentacao(false);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openConclusion = () => {
    setTargetShowQuiz(false);
    setTargetPrintMode(false);
    setTargetShowConclusion(true);
    setTargetShowReferences(false);
    setTargetShowAboutAuthor(false);
    setTargetShowApresentacao(false);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openReferences = () => {
    setTargetShowQuiz(false);
    setTargetPrintMode(false);
    setTargetShowConclusion(false);
    setTargetShowReferences(true);
    setTargetShowAboutAuthor(false);
    setTargetShowApresentacao(false);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openAboutAuthor = () => {
    setTargetShowQuiz(false);
    setTargetPrintMode(false);
    setTargetShowConclusion(false);
    setTargetShowReferences(false);
    setTargetShowAboutAuthor(true);
    setTargetShowApresentacao(false);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openFullPDF = () => {
    if (!isUnlocked) {
      setPaywallOpen(true);
      return;
    }
    setTargetChapterIndex(0);
    setTargetShowQuiz(false);
    setTargetPrintMode(true);
    setTargetShowConclusion(false);
    setTargetShowReferences(false);
    setTargetShowAboutAuthor(false);
    setTargetShowApresentacao(false);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans antialiased text-[#2C2620] selection:bg-[#E6DEC9] selection:text-[#1A1613] relative overflow-x-hidden">
      
      {/* Editorial Header */}
      <header className="border-b border-[#2C2620]/10 bg-white/80 backdrop-blur-md h-16 sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 print:hidden select-none">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setView('cover')}>
          <span className="h-7 w-7 rounded-lg bg-[#8A7055] flex items-center justify-center text-white text-[11px] font-serif font-black shadow-sm justify-center">
            EFM
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-stone-900 leading-none">
              A Saga da São Paulo Railway
            </span>
            <span className="text-[10px] font-mono text-stone-500 mt-1 uppercase tracking-wider leading-none">
              CONTEUDO HISTÓRICO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('cover')}
            className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              view === 'cover'
                ? 'bg-[#8A7055]/10 text-[#8A7055]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Apresentação Geral
          </button>
          
          <button
            onClick={() => openApresentacao()}
            className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              view === 'reader'
                ? 'bg-[#8A7055]/10 text-[#8A7055]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Leitor Digital
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="min-h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          {view === 'cover' ? (
            /* ================= COVER / PRESENTATION VIEW ================= */
            <motion.div
              key="cover"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="py-12 md:py-20 px-4 max-w-7xl mx-auto space-y-16"
            >
                        {/* MOBILE/TABLET VIEW (lg:hidden) - STRICTLY UNCHANGED AS REQUESTED */}
              <div className="block lg:hidden space-y-12">
                <div className="grid grid-cols-1 gap-12 items-center">
                  {/* Left Column: Exquisite Deep Black Hardcover Book Mockup */}
                  <div className="flex flex-col items-center justify-center py-6 sm:py-10">
                    {/* Subtle ambient light floor shadow under the book */}
                    <div className="relative select-none group">
                      
                      {/* ENQUADRADO / STABILIZED CLASSIC BOOK COVER */}
                      <div 
                        className="relative w-[250px] min-[360px]:w-[285px] sm:w-[325px] aspect-[1/1.4] transition-all duration-500 ease-out group-hover:scale-[1.03]"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: 'rotateY(0deg) rotateX(0deg) rotateZ(0deg)',
                        }}
                      >
                        {/* 1. BACK COVER OVERLAY (Slightly larger for thickness) */}
                        <div 
                          className="absolute inset-[-1px] bg-gradient-to-r from-[#1c1c1e] to-[#0a0a0a] rounded-r-md border border-stone-900/40 shadow-2xl"
                          style={{
                            transform: 'translateZ(-6px)',
                          }}
                        />

                        {/* 2. PAGE STACK SIMULATION (Visible tiny edge) */}
                        <div 
                          className="absolute top-[3px] bottom-[3px] right-[-4px] w-[6px] bg-[#fbf9f5] border-y border-stone-200 shadow-inner"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1.5px, #e2dac9 1.5px, #e2dac9 3px)',
                          }}
                        />

                        {/* 3. FRONT COVER (Exquisite Deep Black Leather Look) */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-[#242426] via-[#121212] to-black rounded-r-lg border border-[#1e1e20] shadow-xl flex flex-col justify-between p-6 overflow-hidden"
                          style={{
                            transform: 'translateZ(6px)',
                            boxShadow: 'inset 0 0 24px rgba(0,0,0,0.6)',
                          }}
                        >
                          {/* Rich Leather pattern watermark overlay */}
                          <div className="absolute inset-0 bg-radial-to-bl from-transparent to-black/50 mix-blend-overlay opacity-90 pointer-events-none z-0" />

                          {/* Traditional Gold Embossed Double-Line Border framing the cover */}
                          <div className="absolute inset-2.5 border-2 border-[#ffd700]/35 rounded-md pointer-events-none z-10" />
                          <div className="absolute inset-3.5 border border-[#ffd700]/20 rounded-sm pointer-events-none z-10" />

                          {/* Gold Filigree corner decorations */}
                          <div className="absolute top-4 left-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute top-4 right-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute bottom-4 left-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute bottom-4 right-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>

                          {/* Spine-join line shadow */}
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black/40 z-20 pointer-events-none" />

                          {/* Top Metadata */}
                          <div className="z-10 text-center space-y-1">
                            <span className="text-[8px] sm:text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#ffd700]/90 font-black block">
                              SPR
                            </span>
                            <div className="h-[1px] w-8 bg-[#ffd700]/30 mx-auto" />
                          </div>

                          {/* Main Luxurious Typography Title (Restoring exact original writings) */}
                          <div className="z-10 text-center space-y-3 px-1 mt-1">
                            <h1 className="text-xl min-[360px]:text-2xl sm:text-[34px] font-serif font-black tracking-tight leading-none text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              A Saga da <br/>
                              <span className="text-[#ffd700] animate-pulse font-extrabold block text-2xl sm:text-[32px] mt-1.5 font-serif">
                                São Paulo Railway
                              </span>
                            </h1>
                            <div className="h-0.5 sm:h-1 w-10 sm:w-14 bg-[#ffd700]/60 mx-auto rounded-full my-1"></div>
                            <p className="text-[7.5px] sm:text-[9.5px] font-mono tracking-wide text-stone-300 uppercase max-w-xs mx-auto leading-relaxed font-semibold">
                              o Império do Café e a Vila de Paranapiacaba
                            </p>
                          </div>

                          {/* Exquisite Gilded Image Badge (framed elegantly) */}
                          <div className="z-10 w-[65%] mx-auto border border-[#ffd700]/30 p-[2px] bg-black rounded-md shadow-lg my-1">
                            <div className="border border-[#ffd700]/15 rounded-[3px] overflow-hidden bg-black">
                              <img 
                                src="/assets/images/spr_logo_1781536980657.jpg" 
                                alt="Ebook Cover Miniature" 
                                className="w-full h-full aspect-[4/3] object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>

                          {/* Bottom Author Credentials */}
                          <div className="z-10 text-center mb-1 select-none">
                            <span className="font-serif font-semibold text-white block text-[10px] sm:text-[11px] tracking-wide">
                              Evandro Felix Marcondes
                            </span>
                            <span className="text-[7px] font-mono text-stone-400 block uppercase tracking-widest mt-0.5">
                              SERIE MEMORIA NACIONAL
                            </span>
                          </div>
                        </div>

                        {/* 4. PHYSICAL RED RIBBON SEGMENT */}
                        <div 
                          className="absolute bottom-[-18px] left-[52%] w-4 h-12 bg-gradient-to-r from-red-800 to-red-600 shadow-lg origin-top transform rotate-2 rounded-b-sm border-r border-[#691111]/30 z-0 group-hover:rotate-0 transition-transform duration-500"
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300/60" />
                        </div>

                      </div>

                      {/* Book Floor shadow mimicking angle changes strictly with hover */}
                      <div className="absolute bottom-[-10px] left-[5%] right-[5%] h-4 bg-[#2c2620]/25 rounded-full blur-xl group-hover:bg-[#2c2620]/15 transition-all duration-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Presentation details, features, stats and CTA buttons */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-xs font-mono text-emerald-800 w-fit font-bold uppercase select-none">
                      <Compass className="h-3.5 w-3.5 text-emerald-700 font-bold animate-pulse" />
                      E-book Gratuito • Acesso Livre & Completo 
                    </div>

                    {/* HIGHLY VISIBLE & EYE-CATCHING PIX DONATION BOARD CARD */}
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-[#FCFAF5] border-2 border-[#8A7055]/50 rounded-2xl shadow-sm space-y-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#8A7055]/5 rounded-bl-full pointer-events-none" />
                      
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl mt-1 shrink-0 animate-pulse">
                          <Heart className="h-6 w-6 text-red-600 fill-red-600/30" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-[#8A7055] tracking-widest">Contribuição Solidária Livre</span>
                          <h3 className="font-serif font-bold text-lg text-stone-900">Faça sua doação.</h3>
                        </div>
                      </div>

                      {/* EYE-CATCHING HIGHLIGHTED MESSAGE REQUESTED BY USER */}
                      <div className="p-4 bg-white border border-[#8A7055]/20 rounded-xl text-stone-850 font-serif italic text-sm sm:text-base leading-relaxed text-justify border-l-4 border-l-[#8A7055] shadow-2xs">
                        "Este e-book foi produzido de forma independente. Se você gostou do conteúdo e deseja apoiar novas pesquisas históricas, considere fazer uma contribuição voluntária."
                      </div>

                      {/* Donation interactivity simulator */}
                      <div className="space-y-4 pt-1">
                        {/* Presets selector */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-stone-500 block">Sugerir Valor de Apoio:</span>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setDonationOption('free')}
                              className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                                donationOption === 'free'
                                  ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              Valor Livre (no App)
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
                              Outro Valor...
                            </button>
                          </div>
                        </div>

                        {/* Custom input panel if custom is selected */}
                        {donationOption === 'custom' && (
                          <div className="flex gap-2 items-center bg-white border border-stone-300 rounded-xl p-2 max-w-xs animate-slide-down">
                            <span className="font-mono text-stone-400 font-bold text-xs pl-1">R$</span>
                            <input
                              type="number"
                              min="1.00"
                              step="1.00"
                              value={customDonationVal}
                              onChange={(e) => setCustomDonationVal(e.target.value)}
                              className="bg-transparent border-0 outline-hidden font-mono font-extrabold text-[#8A7055] text-sm w-full"
                              placeholder="Digite o valor"
                            />
                          </div>
                        )}

                        {/* Dynamic QR code grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-[#8A7055]/15">
                          {/* Display QR code image */}
                          <div className="md:col-span-4 flex justify-center">
                            <div className="bg-white border border-stone-300 p-2.5 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentPixCode)}&ecc=M`}
                                alt="Custom Pix QR Code"
                                className="w-32 h-32 object-contain"
                                referrerPolicy="no-referrer"
                              />
                              <div className="text-center font-mono text-[9px] font-black text-[#8A7055] tracking-tight mt-1.5">
                                {donationOption === 'free' ? 'VALOR LIVRE' : `APOIAR COM R$ ${donationOption === 'custom' ? customDonationVal : donationOption}`}
                              </div>
                            </div>
                          </div>

                          {/* Copy-paste input details & dest */}
                          <div className="md:col-span-8 flex flex-col gap-2.5">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono tracking-wider text-stone-450 uppercase font-black block">Código Pix Copia e Cola</span>
                              <div className="bg-white border border-stone-250 p-2 px-3 rounded-xl flex items-center justify-between gap-2.5 shadow-2xs">
                                <span className="font-mono text-[10px] text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-left select-all">
                                  {currentPixCode}
                                </span>
                                <button
                                  type="button"
                                  onClick={handleCopyLanderPix}
                                  className="bg-[#8A7055] hover:bg-[#725C46] text-white font-mono font-bold text-[10px] py-1.5 px-3 rounded-lg uppercase transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedPixResult ? (
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

                            <div className="text-[11px] text-stone-600 space-y-1 leading-normal text-left font-sans bg-white/40 p-2.5 rounded-xl border border-stone-200/50">
                              <div className="flex items-center gap-1.5 font-mono text-[#8A7055] font-extrabold text-[10px]">
                                <QrCode className="h-3.5 w-3.5" /> DESTINATÁRIO OFICIAL PIX:
                              </div>
                              <div>Nome: <b>Evandro Felix Marcondes</b></div>
                              <div>Banco: <b>99 Pay (Chave Aleatória)</b></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <h2 className="text-4xl font-serif tracking-tight text-stone-950 font-black leading-tight uppercase">
                      SÃO PAULO RAILWAY A <span className="text-red-600 animate-pulse font-black">PRIMEIRA FERROVIA PAULISTA.</span>
                    </h2>

                    <div className="text-base text-[#52463A] leading-relaxed text-justify">
                      <p>
                        A história da São Paulo Railway está diretamente ligada ao desenvolvimento econômico de São Paulo e à expansão da economy cafeeira no Brasil. Inaugurada em 1867, a ferrovia superou os desafios da Serra do Mar e estabeleceu uma ligação eficiente entre o interior paulista e o Porto de Santos, transformando o transporte e o comércio da época. Ao longo desta obra, o leitor conhecerá os personagens envolvidos na criação da ferrovia, os desafios de engenharia que marcaram sua construção, a formação de Paranapiacaba, a influência britânica na região e os impactos econômicos e sociais gerados pela linha férrea. Mais do que uma história sobre trilhos e locomotivas, este livro apresenta um capítulo importante da modernização do transporte brasileiro e do crescimento de São Paulo, destacando o legado deixado por uma das mais importantes ferrovias da história nacional.
                      </p>
                    </div>

                    {/* Stats bar */}
                    <div className="grid grid-cols-3 gap-3 border-t border-b border-[#2C2620]/10 py-5 select-none">
                      <div className="text-left">
                        <span className="font-serif font-black text-2xl text-stone-900">{chapters.length}</span>
                        <p className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-widest mt-1">Capítulos Históricos</p>
                      </div>
                      <div className="text-left border-l border-[#2C2620]/10 px-4">
                        <span className="font-serif font-black text-2xl text-stone-900">7</span>
                        <p className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-widest mt-1">Imagens Ilustrativas</p>
                      </div>
                      <div className="text-left border-l border-[#2C2620]/10 px-4">
                        <span className="font-serif font-black text-2xl text-red-600">Acesso Livre</span>
                        <p className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-widest mt-1">Distribuição Aberta</p>
                      </div>
                    </div>

                    {/* Immediate Core CTAs */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-4 w-full">
                      <button
                        onClick={() => openApresentacao()}
                        className="py-4 px-8 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-xl font-serif font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer duration-150"
                      >
                        <BookOpen className="h-5 w-5" /> Ler E-Book Agora
                      </button>
                      
                      <button
                        onClick={() => openFullPDF()}
                        className="py-4 px-8 border-2 border-[#8A7055] text-[#8A7055] hover:bg-stone-50 rounded-xl font-serif font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer duration-150"
                      >
                        <Printer className="h-5 w-5" /> Visualizar & Salvar PDF
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* DESKTOP/COMPUTER VIEW (hidden lg:block) - ALIGNED EXTREMELY PROFESSIONALLY */}
              <div className="hidden lg:block space-y-10">
                {/* Top Row: Side-by-side Book Illustration & Donation Board */}
                <div className="grid grid-cols-12 gap-10 items-center">
                  
                  {/* Left Column: Book cover scaled beautifully to align nicely with the donation box */}
                  <div className="col-span-5 flex justify-center">
                    <div className="relative select-none group">
                      {/* ENQUADRADO / STABILIZED CLASSIC BOOK COVER */}
                      <div 
                        className="relative w-[280px] aspect-[1/1.4] transition-all duration-500 ease-out group-hover:scale-[1.03]"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: 'rotateY(0deg) rotateX(0deg) rotateZ(0deg)',
                        }}
                      >
                        {/* 1. BACK COVER OVERLAY (Slightly larger for thickness) */}
                        <div 
                          className="absolute inset-[-1px] bg-gradient-to-r from-[#1c1c1e] to-[#0a0a0a] rounded-r-md border border-stone-900/40 shadow-2xl"
                          style={{
                            transform: 'translateZ(-6px)',
                          }}
                        />

                        {/* 2. PAGE STACK SIMULATION (Visible tiny edge) */}
                        <div 
                          className="absolute top-[3px] bottom-[3px] right-[-4px] w-[6px] bg-[#fbf9f5] border-y border-stone-200 shadow-inner"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1.5px, #e2dac9 1.5px, #e2dac9 3px)',
                          }}
                        />

                        {/* 3. FRONT COVER (Exquisite Deep Black Leather Look) */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-[#242426] via-[#121212] to-black rounded-r-lg border border-[#1e1e20] shadow-xl flex flex-col justify-between p-6 overflow-hidden"
                          style={{
                            transform: 'translateZ(6px)',
                            boxShadow: 'inset 0 0 24px rgba(0,0,0,0.6)',
                          }}
                        >
                          {/* Rich Leather pattern watermark overlay */}
                          <div className="absolute inset-0 bg-radial-to-bl from-transparent to-black/50 mix-blend-overlay opacity-90 pointer-events-none z-0" />

                          {/* Traditional Gold Embossed Double-Line Border framing the cover */}
                          <div className="absolute inset-2.5 border-2 border-[#ffd700]/35 rounded-md pointer-events-none z-10" />
                          <div className="absolute inset-3.5 border border-[#ffd700]/20 rounded-sm pointer-events-none z-10" />

                          {/* Gold Filigree corner decorations */}
                          <div className="absolute top-4 left-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute top-4 right-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute bottom-4 left-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute bottom-4 right-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>

                          {/* Spine-join line shadow */}
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black/40 z-20 pointer-events-none" />

                          {/* Top Metadata */}
                          <div className="z-10 text-center space-y-1">
                            <span className="text-[8px] sm:text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#ffd700]/90 font-black block">
                              SPR
                            </span>
                            <div className="h-[1px] w-8 bg-[#ffd700]/30 mx-auto" />
                          </div>

                          {/* Main Luxurious Typography Title (Restoring exact original writings) */}
                          <div className="z-10 text-center space-y-3 px-1 mt-1">
                            <h1 className="text-xl min-[360px]:text-2xl sm:text-[34px] font-serif font-black tracking-tight leading-none text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              A Saga da <br/>
                              <span className="text-[#ffd700] animate-pulse font-extrabold block text-2xl sm:text-[32px] mt-1.5 font-serif">
                                São Paulo Railway
                              </span>
                            </h1>
                            <div className="h-0.5 sm:h-1 w-10 sm:w-14 bg-[#ffd700]/60 mx-auto rounded-full my-1"></div>
                            <p className="text-[7.5px] sm:text-[9.5px] font-mono tracking-wide text-stone-300 uppercase max-w-xs mx-auto leading-relaxed font-semibold">
                              o Império do Café e a Vila de Paranapiacaba
                            </p>
                          </div>

                          {/* Exquisite Gilded Image Badge (framed elegantly) */}
                          <div className="z-10 w-[65%] mx-auto border border-[#ffd700]/30 p-[2px] bg-black rounded-md shadow-lg my-1">
                            <div className="border border-[#ffd700]/15 rounded-[3px] overflow-hidden bg-black">
                              <img 
                                src="/assets/images/spr_logo_1781536980657.jpg" 
                                alt="Ebook Cover Miniature" 
                                className="w-full h-full aspect-[4/3] object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>

                          {/* Bottom Author Credentials */}
                          <div className="z-10 text-center mb-1 select-none">
                            <span className="font-serif font-semibold text-white block text-[10px] sm:text-[11px] tracking-wide">
                              Evandro Felix Marcondes
                            </span>
                            <span className="text-[7px] font-mono text-stone-400 block uppercase tracking-widest mt-0.5">
                              SERIE MEMORIA NACIONAL
                            </span>
                          </div>
                        </div>

                        {/* 4. PHYSICAL RED RIBBON SEGMENT */}
                        <div 
                          className="absolute bottom-[-18px] left-[52%] w-4 h-12 bg-gradient-to-r from-red-800 to-red-600 shadow-lg origin-top transform rotate-2 rounded-b-sm border-r border-[#691111]/30 z-0 group-hover:rotate-0 transition-transform duration-500"
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300/60" />
                        </div>
                      </div>

                      {/* Book Floor shadow */}
                      <div className="absolute bottom-[-10px] left-[5%] right-[5%] h-4 bg-[#2c2620]/25 rounded-full blur-xl group-hover:bg-[#2c2620]/15 transition-all duration-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Donation box + Free ebook tag/badge */}
                  <div className="col-span-7 flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-xs font-mono text-emerald-800 w-fit font-bold uppercase select-none">
                      <Compass className="h-3.5 w-3.5 text-emerald-700 font-bold animate-pulse" />
                      E-book Gratuito • Acesso Livre & Completo 
                    </div>

                    {/* HIGHLY VISIBLE & EYE-CATCHING PIX DONATION BOARD CARD */}
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-[#FCFAF5] border-2 border-[#8A7055]/50 rounded-2xl shadow-sm space-y-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#8A7055]/5 rounded-bl-full pointer-events-none" />
                      
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl mt-1 shrink-0 animate-pulse">
                          <Heart className="h-6 w-6 text-red-600 fill-red-600/30" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-[#8A7055] tracking-widest">Contribuição Solidária Livre</span>
                          <h3 className="font-serif font-bold text-lg text-stone-900">Faça sua doação.</h3>
                        </div>
                      </div>

                      {/* EYE-CATCHING HIGHLIGHTED MESSAGE REQUESTED BY USER */}
                      <div className="p-4 bg-white border border-[#8A7055]/20 rounded-xl text-stone-850 font-serif italic text-sm sm:text-base leading-relaxed text-justify border-l-4 border-l-[#8A7055] shadow-2xs">
                        "Este e-book foi produzido de forma independente. Se você gostou do conteúdo e deseja apoiar novas pesquisas históricas, considere fazer uma contribuição voluntária."
                      </div>

                      {/* Donation interactivity simulator */}
                      <div className="space-y-4 pt-1">
                        {/* Presets selector */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-stone-500 block">Sugerir Valor de Apoio:</span>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setDonationOption('free')}
                              className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                                donationOption === 'free'
                                  ? 'bg-[#8A7055] border-[#8A7055] text-white shadow-xs'
                                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              Valor Livre (no App)
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
                              Outro Valor...
                            </button>
                          </div>
                        </div>

                        {/* Custom input panel if custom is selected */}
                        {donationOption === 'custom' && (
                          <div className="flex gap-2 items-center bg-white border border-stone-300 rounded-xl p-2 max-w-xs animate-slide-down">
                            <span className="font-mono text-stone-400 font-bold text-xs pl-1">R$</span>
                            <input
                              type="number"
                              min="1.00"
                              step="1.00"
                              value={customDonationVal}
                              onChange={(e) => setCustomDonationVal(e.target.value)}
                              className="bg-transparent border-0 outline-hidden font-mono font-extrabold text-[#8A7055] text-sm w-full"
                              placeholder="Digite o valor"
                            />
                          </div>
                        )}

                        {/* Dynamic QR code grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-[#8A7055]/15">
                          {/* Display QR code image */}
                          <div className="md:col-span-4 flex justify-center">
                            <div className="bg-white border border-stone-300 p-2.5 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentPixCode)}&ecc=M`}
                                alt="Custom Pix QR Code"
                                className="w-32 h-32 object-contain"
                                referrerPolicy="no-referrer"
                              />
                              <div className="text-center font-mono text-[9px] font-black text-[#8A7055] tracking-tight mt-1.5">
                                {donationOption === 'free' ? 'VALOR LIVRE' : `APOIAR COM R$ ${donationOption === 'custom' ? customDonationVal : donationOption}`}
                              </div>
                            </div>
                          </div>

                          {/* Copy-paste input details & dest */}
                          <div className="md:col-span-8 flex flex-col gap-2.5">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono tracking-wider text-stone-450 uppercase font-black block">Código Pix Copia e Cola</span>
                              <div className="bg-white border border-stone-250 p-2 px-3 rounded-xl flex items-center justify-between gap-2.5 shadow-2xs">
                                <span className="font-mono text-[10px] text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-left select-all">
                                  {currentPixCode}
                                </span>
                                <button
                                  type="button"
                                  onClick={handleCopyLanderPix}
                                  className="bg-[#8A7055] hover:bg-[#725C46] text-white font-mono font-bold text-[10px] py-1.5 px-3 rounded-lg uppercase transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedPixResult ? (
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

                            <div className="text-[11px] text-stone-600 space-y-1 leading-normal text-left font-sans bg-white/40 p-2.5 rounded-xl border border-stone-200/50">
                              <div className="flex items-center gap-1.5 font-mono text-[#8A7055] font-extrabold text-[10px]">
                                <QrCode className="h-3.5 w-3.5" /> DESTINATÁRIO OFICIAL PIX:
                              </div>
                              <div>Nome: <b>Evandro Felix Marcondes</b></div>
                              <div>Banco: <b>99 Pay (Chave Aleatória)</b></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Segment: Title, Description and Stats aligning cleanly */}
                <div className="border border-stone-200/50 bg-[#FCFAF5]/50 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xs">
                  <h2 className="text-4xl text-stone-950 font-serif font-black tracking-tight leading-tight uppercase">
                    SÃO PAULO RAILWAY A <span className="text-red-600 animate-pulse font-black">PRIMEIRA FERROVIA PAULISTA.</span>
                  </h2>

                  <div className="text-base text-[#52463A] leading-relaxed text-justify font-serif">
                    <p>
                      A história da São Paulo Railway está diretamente ligada ao desenvolvimento econômico de São Paulo e à expansão da economia cafeeira no Brasil. Inaugurada em 1867, a ferrovia superou os desafios da Serra do Mar e estabeleceu uma ligação eficiente entre o interior paulista e o Porto de Santos, transformando o transporte e o comércio da época. Ao longo desta obra, o leitor conhecerá os personagens envolvidos na criação da ferrovia, os desafios de engenharia que marcaram sua construção, a formação de Paranapiacaba, a influência britânica na região e os impactos econômicos e sociais gerados pela linha férrea. Mais do que uma história sobre trilhos e locomotivas, este livro apresenta um capítulo importante da modernização do transporte brasileiro e do crescimento de São Paulo, destacando o legado deixado por uma das mais importantes ferrovias da história nacional.
                    </p>
                  </div>

                  {/* Stats bar */}
                  <div className="grid grid-cols-3 gap-3 border-t border-[#2C2620]/10 pt-6 select-none">
                    <div className="text-left">
                      <span className="font-serif font-black text-2xl text-stone-900">{chapters.length}</span>
                      <p className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-widest mt-1">Capítulos Históricos</p>
                    </div>
                    <div className="text-left border-l border-[#2C2620]/10 px-6">
                      <span className="font-serif font-black text-2xl text-stone-900">7</span>
                      <p className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-widest mt-1">Imagens Ilustrativas</p>
                    </div>
                    <div className="text-left border-l border-[#2C2620]/10 px-6">
                      <span className="font-serif font-black text-2xl text-red-600 font-bold">Acesso Livre</span>
                      <p className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-widest mt-1">Distribuição Aberta</p>
                    </div>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={() => openApresentacao()}
                      className="py-4 px-10 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-xl font-serif font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer duration-150"
                    >
                      <BookOpen className="h-5 w-5" /> Ler E-Book Agora
                    </button>
                    
                    <button
                      onClick={() => openFullPDF()}
                      className="py-4 px-10 border-2 border-[#8A7055] text-[#8A7055] hover:bg-stone-50 rounded-xl font-serif font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer duration-150"
                    >
                      <Printer className="h-5 w-5" /> Visualizar & Salvar PDF
                    </button>
                  </div>
                </div>
              </div>
              {/* TABLE OF CONTENTS SECTION */}
              <section className="bg-white/40 border border-[#2C2620]/10 rounded-3xl p-6 sm:p-10 space-y-8">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold">Sumário</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Cronograma do Volume</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto italic font-serif">Explore o índice de capítulos neste e-book histórico.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {chapters.map((ch, idx) => {
                    const isChapterLocked = idx >= 2 && !isUnlocked;

                    return (
                      <div 
                        key={ch.id} 
                        onClick={() => openChapter(idx)}
                        className={`bg-white border p-5 rounded-2xl flex flex-col justify-between h-48 cursor-pointer transition-all hover:shadow-md group ${
                          isChapterLocked 
                            ? 'border-amber-500/10 hover:border-amber-500/30 bg-[#FAF9F5]/30' 
                            : 'border-[#2C2620]/5 hover:border-[#8A7055]'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`font-mono text-[10px] font-black uppercase tracking-wider block ${
                              ch.number <= 5 ? 'text-red-700' : (isChapterLocked ? 'text-amber-800' : 'text-[#8A7055]')
                            }`}>
                              Capítulo {ch.number < 10 ? `0${ch.number}` : ch.number}
                            </span>
                            {isChapterLocked && (
                              <Lock className="h-3 w-3 text-amber-700/60 shrink-0" />
                            )}
                          </div>
                          <h4 className={`font-serif font-bold leading-snug text-sm sm:text-base transition-colors ${
                            isChapterLocked 
                              ? 'text-stone-700 group-hover:text-amber-800' 
                              : 'text-stone-900 group-hover:text-[#8A7055]'
                          }`}>
                            {ch.title}
                          </h4>
                          <p className="text-[10.5px] text-stone-500 leading-snug line-clamp-2">{ch.subtitle}</p>
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 border-t pt-3 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {ch.readingTime} min
                          </span>
                          <span className={`font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform ${
                            isChapterLocked ? 'text-amber-800' : 'text-stone-600'
                          }`}>
                            {isChapterLocked ? (
                              <span className="flex items-center gap-1">🔒 Bloqueado</span>
                            ) : (
                              <span className="flex items-center gap-0.5">Ver <ChevronRight className="h-3 w-3" /></span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* CONCLUSION CARD */}
                  <div 
                    onClick={openConclusion}
                    className="bg-white border border-[#2C2620]/5 hover:border-[#8A7055] p-5 rounded-2xl flex flex-col justify-between h-48 cursor-pointer transition-all hover:shadow-md group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider block text-red-700">
                          Seção Especial
                        </span>
                      </div>
                      <h4 className="font-serif font-bold leading-snug text-sm sm:text-base transition-colors text-stone-900 group-hover:text-[#8A7055]">
                        Conclusão: O impacto histórico da São Paulo Railway.
                      </h4>
                      <p className="text-[10.5px] text-stone-500 leading-snug line-clamp-2">A consolidação histórica e o legado duradouro de uma das maiores obras ferais do país.</p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 border-t pt-3 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 5 min
                      </span>
                      <span className="font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform text-stone-600">
                        <span className="flex items-center gap-0.5">Ver <ChevronRight className="h-3 w-3" /></span>
                      </span>
                    </div>
                  </div>

                  {/* REFERENCES CARD */}
                  <div 
                    onClick={openReferences}
                    className="bg-white border border-[#2C2620]/5 hover:border-[#8A7055] p-5 rounded-2xl flex flex-col justify-between h-48 cursor-pointer transition-all hover:shadow-md group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider block text-stone-500">
                          Pesquisa Acadêmica
                        </span>
                      </div>
                      <h4 className="font-serif font-bold leading-snug text-sm sm:text-base transition-colors text-stone-900 group-hover:text-[#8A7055]">
                        Fontes e referências.
                      </h4>
                      <p className="text-[10.5px] text-stone-500 leading-snug line-clamp-2">Fundamentação e documentação acadêmica detalhada para publicação garantida.</p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 border-t pt-3 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 3 min
                      </span>
                      <span className="font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform text-stone-600">
                        <span className="flex items-center gap-0.5">Ver <ChevronRight className="h-3 w-3" /></span>
                      </span>
                    </div>
                  </div>

                  {/* ABOUT AUTHOR CARD */}
                  <div 
                    onClick={openAboutAuthor}
                    className="bg-white border border-[#2C2620]/5 hover:border-[#8A7055] p-5 rounded-2xl flex flex-col justify-between h-48 cursor-pointer transition-all hover:shadow-md group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider block text-[#8A7055]">
                          Créditos editoriais
                        </span>
                      </div>
                      <h4 className="font-serif font-bold leading-snug text-sm sm:text-base transition-colors text-stone-900 group-hover:text-[#8A7055]">
                        Sobre o autor.
                      </h4>
                      <p className="text-[10.5px] text-stone-500 leading-snug line-clamp-2">Conheça o autor e idealizador amador deste trabalho técnico de fomento histórico.</p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 border-t pt-3 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 2 min
                      </span>
                      <span className="font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform text-stone-600">
                        <span className="flex items-center gap-0.5">Ver <ChevronRight className="h-3 w-3" /></span>
                      </span>
                    </div>
                  </div>

                </div>
              </section>

              {/* EXCITING COMPLEMENTARY SIMULATOR BLOCK */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#EDDDB3]/20 border border-[#D5C9B3] rounded-3xl p-6 sm:p-10">
                <div className="md:col-span-8 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold block">Ambiente Intelectual</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">Seu Conhecimento Verificado</h3>
                  <p className="text-sm text-[#52463A] leading-relaxed">
                    Preparamos um <span className="text-red-700 font-bold">Simulador de Fatos Históricos</span> completo. Teste seus conhecimentos respondendo às perguntas do nosso quiz histórico e, ao final, veja a sua nota total de acertos.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <button
                    onClick={openQuiz}
                    className="py-3.5 px-8 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-serif font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Iniciar Simulador Histórico
                  </button>
                </div>
              </section>

              {/* FOOTER ACADEMIC CREDITS */}
              <footer className="border-t border-stone-300 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-stone-500">
                <span>© 2026 Evandro Felix Marcondes</span>
                <span className="tracking-tight uppercase">Série Preservação e Memória Nacional</span>
              </footer>

            </motion.div>
          ) : (
            /* ================= DIGITAL ACTIVE E-READER & COMPILER VIEW ================= */
            <motion.div
              key="reader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <EbookReader 
                onBackToCover={() => setView('cover')} 
                initialChapterIndex={targetChapterIndex}
                initialShowQuiz={targetShowQuiz}
                initialPrintMode={targetPrintMode}
                initialShowConclusion={targetShowConclusion}
                initialShowReferences={targetShowReferences}
                initialShowAboutAuthor={targetShowAboutAuthor}
                initialShowApresentacao={targetShowApresentacao}
                isUnlocked={isUnlocked}
                onUnlock={unlockEbook}
                onLock={lockEbook}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PaywallModal 
        isOpen={paywallOpen} 
        onClose={() => setPaywallOpen(false)} 
        onUnlock={unlockEbook}
        onLock={lockEbook}
        isUnlocked={isUnlocked}
      />
    </div>
  );
}
