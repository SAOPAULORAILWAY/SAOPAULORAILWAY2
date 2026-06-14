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
  Lock
} from 'lucide-react';
import EbookReader from './components/EbookReader';
import { chapters } from './data/chapters';
import PaywallModal from './components/PaywallModal';

export default function App() {
  const [view, setView] = useState<'cover' | 'reader'>('cover');
  const [targetChapterIndex, setTargetChapterIndex] = useState<number>(0);
  const [targetShowQuiz, setTargetShowQuiz] = useState<boolean>(false);
  const [targetPrintMode, setTargetPrintMode] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('spr_ebook_unlocked') === 'true';
  });
  const [paywallOpen, setPaywallOpen] = useState(false);

  const unlockEbook = () => {
    setIsUnlocked(true);
    localStorage.setItem('spr_ebook_unlocked', 'true');
  };

  const lockEbook = () => {
    setIsUnlocked(false);
    localStorage.removeItem('spr_ebook_unlocked');
  };

  const openChapter = (index: number) => {
    if (index >= 2 && !isUnlocked) {
      setPaywallOpen(true);
      return;
    }
    setTargetChapterIndex(index);
    setTargetShowQuiz(false);
    setTargetPrintMode(false);
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
              Estudo Filológico Historicamente Verificado • 1867
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
            onClick={() => openChapter(0)}
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
              
              {/* Split layout: Cover Mockup vs. Presentation Metadata */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Column: Exquisite 3D Skew Cover Mockup */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="perspective-1000 select-none group">
                    <motion.div 
                      className="relative w-[260px] min-[360px]:w-[290px] min-[375px]:w-80 sm:w-85 aspect-[3/4] bg-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-stone-300 transform transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden"
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 25px 50px -12px rgba(44, 38, 32, 0.25)',
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Leather cover background simulation */}
                      <div className="absolute inset-0 bg-[#FAF7F2] opacity-50 z-0 pointer-events-none"></div>
                      
                      {/* Editorial vintage double border lines */}
                      <div className="absolute inset-2 border-2 border-stone-300 bg-transparent rounded-xl pointer-events-none z-10"></div>
                      <div className="absolute inset-2.5 border border-double border-stone-300 bg-transparent rounded-xl pointer-events-none z-10"></div>
                      


                      {/* Cover main core headings */}
                      <div className="z-10 text-center space-y-1 sm:space-y-3 px-3">
                        <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-stone-500">
                          Saga de Progresso • 1867
                        </span>
                        <h1 className="text-xl min-[360px]:text-2xl sm:text-4xl font-serif font-black tracking-tight leading-tight text-stone-900 uppercase">
                          A Saga da <br/>
                          <span className="text-[#8A7055]">São Paulo Railway</span>
                        </h1>
                        <div className="h-0.5 sm:h-1 w-10 sm:w-14 bg-[#8A7055] mx-auto rounded-full"></div>
                        <p className="text-[7.5px] sm:text-[9.5px] font-mono tracking-wide text-stone-600 uppercase max-w-xs mx-auto leading-relaxed">
                          Da Conexão Inglesa à Serra do Mar: o Império do Café e a Vila de Paranapiacaba
                        </p>
                      </div>

                      {/* Mini illustrative photograph badge */}
                      <div className="z-10 w-full max-w-[100px] min-[360px]:max-w-[125px] sm:max-w-[180px] mx-auto border border-stone-300 p-1 bg-white shadow-md">
                        <img 
                          src="/assets/images/ebook_cover_realistic_clean_1781404957659.jpg" 
                          alt="Ebook Cover Miniature" 
                          className="w-full h-auto aspect-[4/3] object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="z-10 text-center pb-2 sm:pb-6 select-none font-mono text-[9px] text-stone-500">
                        <span className="font-serif font-medium text-stone-500 block text-[9px] sm:text-[11px]">Evandro Felix Marcondes</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column: Presentation details, features, stats and CTA buttons */}
                <div className="lg:col-span-7 space-y-6">
                  {isUnlocked ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-xs font-mono text-emerald-800 w-fit font-bold uppercase select-none">
                      <Compass className="h-3.5 w-3.5 text-emerald-700 font-bold animate-pulse" />
                      E-book Desbloqueado • Acesso Coletivo Vitalício
                    </div>
                  ) : (
                    <button
                      onClick={() => setPaywallOpen(true)}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/10 border border-amber-600/20 hover:bg-amber-600/20 hover:border-amber-600/30 rounded-full text-xs font-mono text-amber-950 w-fit font-bold uppercase transition-all select-none cursor-pointer"
                    >
                      🔒 Versão Comercial (R$ 29,99 • Obter Chave)
                    </button>
                  )}

                  <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-stone-950 font-medium leading-tight">
                    A primeira grande ferrovia brasileira em <span className="text-[#8A7055] font-black">alta definição</span>.
                  </h2>

                  <p className="text-base sm:text-lg text-[#52463A] leading-relaxed">
                    Experimente uma imersão de estúdio em formato digital sobre um dos maiores feitos de engenharia do século XIX. Conheça a jornada de Irineu Evangelista de Sousa, as negociações financeiras vitorianas em Londres, os intrépidos planos funiculares inclinados de Daniel Fox e o singular legado arquitetônico britânico em Paranapiacaba.
                  </p>

                  {/* Curated features grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-4">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-black text-[#2C2620] text-sm">Fidelidade Filológica Completa</h4>
                        <p className="text-[11.5px] text-[#6C5B4C] leading-snug">Datas, nomes, termos técnicos e estatísticas validadas por historiadores.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-black text-[#2C2620] text-sm">Cura de Imagens por IA</h4>
                        <p className="text-[11.5px] text-[#6C5B4C] leading-snug">Fotografias baseadas no estilo químico e emulsões originais do século XIX.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-black text-[#2C2620] text-sm">Leitor Altamente Refluível</h4>
                        <p className="text-[11.5px] text-[#6C5B4C] leading-snug">Suporte a tamanhos dinâmicos de fonte e paletas adaptativas de cor de tela.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-black text-[#2C2620] text-sm">Pronto para Exportação Gráfica</h4>
                        <p className="text-[11.5px] text-[#6C5B4C] leading-snug">Compile e imprima o documento inteiro com margens, capas e índice fidedignos.</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats bar */}
                  <div className="grid grid-cols-3 gap-3 border-t border-b border-[#2C2620]/10 py-5 select-none">
                    <div className="text-center sm:text-left">
                      <span className="font-serif font-black text-2xl text-stone-900">{chapters.length}</span>
                      <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">Capítulos Densos</p>
                    </div>
                    <div className="text-center sm:text-left border-l border-[#2C2620]/10 px-4">
                      <span className="font-serif font-black text-2xl text-stone-900">{chapters.filter(c => c.image).length}</span>
                      <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">Imagens Plates</p>
                    </div>
                    <div className="text-center sm:text-left border-l border-[#2C2620]/10 px-4">
                      <span className="font-serif font-black text-2xl text-stone-900">R$ 29,99</span>
                      <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">Preço Único</p>
                    </div>
                  </div>

                  {/* Immediate Core CTAs */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={() => openChapter(0)}
                      className="py-4 px-8 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-xl font-serif font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer duration-150"
                    >
                      <BookOpen className="h-5 w-5" /> Iniciar Leitura Digital
                    </button>
                    
                    <button
                      onClick={() => openFullPDF()}
                      className="py-4 px-8 border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50/50 rounded-xl font-serif font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer duration-150"
                    >
                      <Printer className="h-5 w-5" /> Compilar PDF de Gráfica
                    </button>
                  </div>
                </div>

              </div>

              {/* TABLE OF CONTENTS SECTION */}
              <section className="bg-white/40 border border-[#2C2620]/10 rounded-3xl p-6 sm:p-10 space-y-8">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold">Sumário Executivo</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Cronograma do Volume</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto italic font-serif">Explore o índice de matérias históricas veridicamente preservadas no e-book.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                            <span className={`font-mono text-[10px] font-black uppercase block ${
                              isChapterLocked ? 'text-amber-800' : 'text-[#8A7055]'
                            }`}>
                              Seção {ch.number}
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
                </div>
              </section>

              {/* EXCITING COMPLEMENTARY SIMULATOR BLOCK */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#EDDDB3]/20 border border-[#D5C9B3] rounded-3xl p-6 sm:p-10">
                <div className="md:col-span-8 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold block">Ambiente Intelectual</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">Seu Conhecimento Verificado</h3>
                  <p className="text-sm text-[#52463A] leading-relaxed">
                    Preparamos um **Simulador de Fatos Históricos** completo. Teste sua assimilação intelectual sobre as engrenagens a vapor de Mauá, a arquitetura de ferro vitoriana e as curiosidades de Paranapiacaba. Ao concluir, descubra o seu rank acadêmico oficial de assimilação de conteúdo histórico.
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
                isUnlocked={isUnlocked}
                onUnlock={unlockEbook}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PaywallModal 
        isOpen={paywallOpen} 
        onClose={() => setPaywallOpen(false)} 
        onUnlock={unlockEbook}
      />
    </div>
  );
}
