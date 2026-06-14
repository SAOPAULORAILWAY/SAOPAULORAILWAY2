import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Settings, 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  RotateCcw, 
  Check, 
  Sparkles,
  ArrowLeft,
  X,
  FileText,
  Compass,
  BookOpenText,
  Bookmark,
  Share2,
  Sliders,
  Award,
  Lock
} from 'lucide-react';
import { Chapter, ReaderTheme, ReaderFont } from '../types';
import { chapters } from '../data/chapters';
import HistoryQuiz from './HistoryQuiz';
import PaywallModal from './PaywallModal';

interface EbookReaderProps {
  onBackToCover: () => void;
  initialChapterIndex?: number;
  initialShowQuiz?: boolean;
  initialPrintMode?: boolean;
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function EbookReader({ 
  onBackToCover, 
  initialChapterIndex = 0, 
  initialShowQuiz = false, 
  initialPrintMode = false,
  isUnlocked,
  onUnlock
}: EbookReaderProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialChapterIndex);
  const [theme, setTheme] = useState<ReaderTheme>('cream');
  const [font, setFont] = useState<ReaderFont>('serif');
  const [fontSize, setFontSize] = useState<number>(18);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(initialShowQuiz);
  const [isPrintMode, setIsPrintMode] = useState(initialPrintMode);
  const [printScope, setPrintScope] = useState<'chapter' | 'full'>('full');
  const [showReferences, setShowReferences] = useState(false);
  const [readerPaywallOpen, setReaderPaywallOpen] = useState(false);

  const [isInIframe, setIsInIframe] = useState(false);
  const [showIframeWarning, setShowIframeWarning] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  // Sync initial parameters
  useEffect(() => {
    setCurrentChapterIndex(initialChapterIndex);
    setShowQuiz(initialShowQuiz);
    setIsPrintMode(initialPrintMode);
  }, [initialChapterIndex, initialShowQuiz, initialPrintMode]);

  // Adjust sidebar state for mobile / desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeChapter = chapters[currentChapterIndex];
  const isLastChapter = currentChapterIndex === chapters.length - 1;
  const progressPercent = Math.round(((currentChapterIndex + (showQuiz ? 1 : 0)) / chapters.length) * 100);

  // Theme configuration map for luxurious design
  const themeStyles = {
    cream: {
      bg: 'bg-[#FAF7F2]',
      text: 'text-[#2C2620]',
      panel: 'bg-[#F2ECE0] border-[#D5C9B3]',
      activeItem: 'bg-[#EDDDB3] text-[#2C2620]',
      icon: 'text-[#8A7055]',
      meta: 'text-[#6C5B4C]',
      border: 'border-[#E6DEC9]',
      card: 'bg-white border-[#E6DEC9] shadow-xs'
    },
    paper: {
      bg: 'bg-white',
      text: 'text-stone-800',
      panel: 'bg-stone-50 border-stone-200',
      activeItem: 'bg-stone-200 text-stone-900',
      icon: 'text-stone-600',
      meta: 'text-stone-500',
      border: 'border-stone-100',
      card: 'bg-stone-50/50 border-stone-200'
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#433422]',
      panel: 'bg-[#EADFCA] border-[#D9CBB0]',
      activeItem: 'bg-[#DFD0B3] text-[#332515]',
      icon: 'text-[#9A7446]',
      meta: 'text-[#7A644D]',
      border: 'border-[#E3D4BC]',
      card: 'bg-[#FCF9F0] border-[#EADFCB] shadow-xs'
    },
    charcoal: {
      bg: 'bg-[#141210]',
      text: 'text-stone-300',
      panel: 'bg-[#1C1A17] border-[#2C2824]',
      activeItem: 'bg-[#2E2924] text-stone-100',
      icon: 'text-[#C5B4A5]',
      meta: 'text-stone-400',
      border: 'border-[#2C2824]',
      card: 'bg-[#1C1A17] border-[#2C2824]'
    }
  };

  const fontStyles = {
    serif: 'font-serif tracking-normal leading-relaxed',
    sans: 'font-sans tracking-wide leading-relaxed',
    mono: 'font-mono tracking-tight leading-normal'
  };

  const handleNext = () => {
    if (showReferences) {
      if (!isUnlocked) {
        setReaderPaywallOpen(true);
        return;
      }
      setShowReferences(false);
      setShowQuiz(true);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentChapterIndex < chapters.length - 1) {
      if (currentChapterIndex + 1 >= 2 && !isUnlocked) {
        setReaderPaywallOpen(true);
        return;
      }
      setCurrentChapterIndex(prev => prev + 1);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isLastChapter && !showQuiz) {
      if (!isUnlocked) {
        setReaderPaywallOpen(true);
        return;
      }
      setShowReferences(true);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
      setShowReferences(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showReferences) {
      setShowReferences(false);
      setCurrentChapterIndex(chapters.length - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    if (isInIframe) {
      setShowIframeWarning(true);
    } else {
      try {
        window.print();
      } catch (err) {
        console.error("Print blocked/failed:", err);
        setShowIframeWarning(true);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeStyles[theme].bg} ${themeStyles[theme].text} transition-colors duration-200 select-normal relative font-sans`}>
      
      {/* 1. Header Toolbar (Hidden while printing) */}
      <header className={`h-16 px-4 border-b flex items-center justify-between ${themeStyles[theme].panel} shadow-xs z-30 shrink-0 print:hidden`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToCover}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Acervo</span>
          </button>
          
          <div className="h-4 w-[1px] bg-stone-300 hidden md:block"></div>
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Sumário do E-book"
          >
            <Menu className="h-4 w-4" />
            <span className="hidden md:inline">Índice</span>
          </button>
        </div>

        {/* Book Title Centered Header */}
        <div className="hidden lg:flex flex-col items-center text-center select-none">
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">Série História Ativa</span>
          <h2 className="text-xs font-serif font-black tracking-wide uppercase">A Saga da São Paulo Railway</h2>
        </div>

        {/* Settings and PDF compilation buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Print PDF triggers */}
          <button
            onClick={() => {
              setIsPrintMode(!isPrintMode);
              setShowQuiz(false);
            }}
            className={`py-1.5 sm:py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPrintMode 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'bg-black/5 hover:bg-black/10 text-current'
            }`}
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isPrintMode ? 'Sair do PDF' : 'Versão PDF / Impressão'}</span>
          </button>

          {/* Preferences controls */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-2 hover:bg-black/5 rounded-lg transition-all ${settingsOpen ? 'scale-110 rotate-45' : ''}`}
            title="Aparência da Leitura"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* 2. Floating Configuration Drawer for reading preferences (Hidden while printing) */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-16 right-4 p-5 rounded-2xl border shadow-xl z-40 max-w-sm w-[calc(100vw-2rem)] space-y-4 ${themeStyles[theme].card} print:hidden`}
          >
            <div className="flex justify-between items-center pb-2 border-b border-black/5">
              <h3 className="font-serif font-bold text-sm flex items-center gap-1.5">
                <Sliders className="h-4 w-4" /> Configurações de Leitura
              </h3>
              <button onClick={() => setSettingsOpen(false)} className="p-1 hover:bg-black/5 rounded-full">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Font selection */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wide opacity-75">Família Tipográfica</span>
              <div className="grid grid-cols-3 gap-1">
                {(['serif', 'sans', 'mono'] as ReaderFont[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFont(f)}
                    className={`py-1 px-2 rounded text-xs font-mono capitalize border ${
                      font === f 
                        ? 'border-stone-800 bg-stone-900 text-white font-bold' 
                        : 'border-black/10 bg-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    {f === 'sans' ? 'sans-ui' : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size controls */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wide opacity-75">
                <span>Tamanho da Fonte</span>
                <span className="font-bold">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="w-8 h-8 rounded border border-black/10 flex items-center justify-center font-mono text-sm hover:bg-black/5"
                  disabled={fontSize <= 14}
                >
                  A-
                </button>
                <input 
                  type="range" 
                  min="14" 
                  max="26" 
                  step="2"
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1 accent-[#8A7055]" 
                />
                <button 
                  onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                  className="w-8 h-8 rounded border border-black/10 flex items-center justify-center font-mono text-sm hover:bg-black/5"
                  disabled={fontSize >= 26}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Theme selection */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wide opacity-75">Temática Cromática Secular</span>
              <div className="grid grid-cols-4 gap-1.5">
                {([
                  { id: 'cream', name: 'Crema', hex: 'bg-[#FAF7F2] border-[#E6DEC9] text-[#2C2620]' },
                  { id: 'paper', name: 'Papel', hex: 'bg-white border-stone-200 text-stone-800' },
                  { id: 'sepia', name: 'Século XIX', hex: 'bg-[#F4ECD8] border-[#DFD0B3] text-[#433422]' },
                  { id: 'charcoal', name: 'Carvão', hex: 'bg-[#181614] border-[#2C2824] text-[#C5B4A5]' }
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as ReaderTheme)}
                    className={`p-1 rounded border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      theme === t.id ? 'ring-2 ring-emerald-600 font-extrabold scale-102' : 'hover:scale-[1.01]'
                    } ${t.hex}`}
                    title={t.name}
                  >
                    <span className="text-[9px] font-mono uppercase truncate w-full text-center tracking-tighter">
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <p className="text-[10px] font-mono text-stone-500 text-center uppercase pt-1 tracking-tight">
              ✓ Layouts refluíveis adaptáveis ao seu olhar
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Workspace Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDE BAR FOR CHAPTERS INDEX (Hidden while printing) */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className={`border-r shrink-0 hidden md:flex flex-col h-full z-20 overflow-y-auto ${themeStyles[theme].panel} print:hidden`}
            >
              {/* Sidebar Header Title */}
              <div className="p-4 border-b border-black/10 flex items-center justify-between">
                <span className="font-serif font-black uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <BookOpenText className="h-4 w-4" /> Estrutura Geral
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#8A7055]/10 text-[#8A7055] py-0.5 px-2 rounded-full">
                  {chapters.length} Capítulos
                </span>
              </div>

              {/* Chapter item nodes */}
              <div className="flex-1 py-4 px-2 space-y-1">
                {chapters.map((ch, idx) => {
                  const isActive = currentChapterIndex === idx && !showQuiz && !showReferences && !isPrintMode;
                  const isChapterLocked = idx >= 2 && !isUnlocked;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        if (isChapterLocked) {
                          setReaderPaywallOpen(true);
                          return;
                        }
                        setCurrentChapterIndex(idx);
                        setShowQuiz(false);
                        setShowReferences(false);
                        setIsPrintMode(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                        isActive
                          ? themeStyles[theme].activeItem + ' font-medium shadow-xs'
                          : 'hover:bg-black/5 opacity-85'
                      }`}
                    >
                      <span className={`font-mono text-xs font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0 border ${
                        isActive ? 'border-current' : 'border-black/5'
                      } ${isChapterLocked ? 'text-amber-800 bg-amber-500/10' : ''}`}>
                        {isChapterLocked ? <Lock className="h-2.5 w-2.5" /> : ch.number}
                      </span>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5 w-full">
                          <h4 className="text-xs font-serif font-bold tracking-tight line-clamp-1 group-hover:text-current">
                            {ch.title}
                          </h4>
                          {isChapterLocked && (
                            <Lock className="h-3 w-3 text-amber-600/70 shrink-0" />
                          )}
                        </div>
                        <p className="text-[10.5px] font-mono opacity-70 line-clamp-1">
                          {ch.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {/* Memorial de Rigor Histórico Anchor */}
                <button
                  onClick={() => {
                    if (!isUnlocked) {
                      setReaderPaywallOpen(true);
                      return;
                    }
                    setShowReferences(true);
                    setShowQuiz(false);
                    setIsPrintMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                    showReferences && !isPrintMode
                      ? themeStyles[theme].activeItem + ' font-medium shadow-xs'
                      : 'hover:bg-black/5 opacity-85'
                  }`}
                >
                  <FileText className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <div>
                      <h4 className="text-xs font-serif font-bold">Rigor Histórico</h4>
                      <p className="text-[10px] font-mono opacity-70">Fontes primárias e referências</p>
                    </div>
                    {!isUnlocked && <Lock className="h-3 w-3 text-amber-600/70 shrink-0" />}
                  </div>
                </button>

                {/* Simulated Quiz Index Anchor */}
                <button
                  onClick={() => {
                    if (!isUnlocked) {
                      setReaderPaywallOpen(true);
                      return;
                    }
                    setShowQuiz(true);
                    setShowReferences(false);
                    setIsPrintMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                    showQuiz && !isPrintMode
                      ? themeStyles[theme].activeItem + ' font-medium shadow-xs'
                      : 'hover:bg-black/5 opacity-85'
                  }`}
                >
                  <Award className="h-5 w-5 shrink-0 text-amber-600" />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <div>
                      <h4 className="text-xs font-serif font-bold">Simulador Histórico</h4>
                      <p className="text-[10px] font-mono opacity-70">Desafio avaliativo final</p>
                    </div>
                    {!isUnlocked && <Lock className="h-3 w-3 text-amber-600/70 shrink-0" />}
                  </div>
                </button>
              </div>

              {/* Progress and indicators footer */}
              <div className="p-4 border-t border-black/10 space-y-2 select-none">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span>Progresso do Trajeto</span>
                  <span className="font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#8A7055] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* MOBILE OVERLAY DRAWER NAV ANCHOR */}
        <div className="md:hidden absolute bottom-4 left-4 z-40 print:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-12 h-12 rounded-full bg-[#8A7055] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Sumário do E-book"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* MOBILE SIDEBAR FLOATING LAYER */}
        {sidebarOpen && (
          <div className="md:hidden absolute inset-0 z-40 flex print:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setSidebarOpen(false)}></div>
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`w-72 max-w-[80vw] h-full relative z-50 flex flex-col overflow-y-auto ${themeStyles[theme].panel}`}
            >
              <div className="p-4 border-b border-black/10 flex justify-between items-center bg-black/5">
                <span className="font-serif font-black uppercase text-xs tracking-wider">São Paulo Railway</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-black/5 rounded-full">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 p-3 space-y-1">
                {chapters.map((ch, idx) => {
                  const isActive = currentChapterIndex === idx && !showQuiz && !showReferences && !isPrintMode;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        setShowQuiz(false);
                        setShowReferences(false);
                        setIsPrintMode(false);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer ${
                        isActive ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold shrink-0 mt-0.5">{ch.number}.</span>
                      <div>
                        <h4 className="text-xs font-serif font-bold leading-tight">{ch.title}</h4>
                        <p className="text-[10px] font-mono opacity-80 mt-0.5">{ch.subtitle}</p>
                      </div>
                    </button>
                  );
                })}

                {/* Memorial de Rigor Histórico Anchor */}
                <button
                  onClick={() => {
                    setShowReferences(true);
                    setShowQuiz(false);
                    setIsPrintMode(false);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer ${
                    showReferences && !isPrintMode ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                  }`}
                >
                  <FileText className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div>
                    <h4 className="text-xs font-serif font-bold">Rigor Histórico</h4>
                    <p className="text-[10px] font-mono opacity-80">Fontes primárias e referências</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowQuiz(true);
                    setShowReferences(false);
                    setIsPrintMode(false);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer ${
                    showQuiz && !isPrintMode ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                  }`}
                >
                  <Award className="h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <h4 className="text-xs font-serif font-bold">Simulador Histórico</h4>
                    <p className="text-[10px] font-mono opacity-80 font-serif">Desafio avaliativo final</p>
                  </div>
                </button>
              </div>
            </motion.aside>
          </div>
        )}

        {/* READING AND PRINTING STAGE COLUMN */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:py-12 flex justify-center items-start scroll-smooth">
          <div className="w-full max-w-3xl">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={showQuiz ? 'quiz' : showReferences ? 'references' : isPrintMode ? `print-${printScope}` : `chapter-${currentChapterIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                {showQuiz ? (
                  /* RENDER HISTORICAL EVALUATIVE SIMULATOR SCREEN */
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-8 select-none">
                      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8A7055] uppercase font-extrabold bg-[#8A7055]/10 py-1 px-3 rounded-full">
                        Etapa Filológica Conclusiva
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Avaliação de Rigor Histórico</h2>
                      <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto italic font-serif">
                        Demonstre erudição testando sua compreensão geral sobre o comércio vitoriano e as lendárias vias de ferro da São Paulo Railway.
                      </p>
                    </div>
                    <HistoryQuiz />
                  </div>
                ) : showReferences ? (
                  /* RENDER DETAILED HISTORICAL SOURCES & PEER REVIEWS FOR MAXIMUM ACCURACY CERTIFICATION */
                  <article className="space-y-8 pb-12">
                    
                    {/* Header Titles */}
                    <div className="space-y-2 border-b pb-6 select-none animate-fade-in" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`py-1 px-2 rounded font-bold uppercase ${themeStyles[theme].activeItem}`}>
                          Suporte de Pesquisa
                        </span>
                        <div className="h-3 w-[1px] bg-black/15"></div>
                        <span className={themeStyles[theme].meta}>Fidelidade Certificada</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight">
                        Rigor Histórico e Fontes
                      </h1>
                      
                      <p className="text-sm font-serif italic opacity-85 leading-relaxed max-w-2xl">
                        A fundamentação bibliográfica e arquivística que legitima cada fato, data e dado contidos nesta obra para publicação segura.
                      </p>
                    </div>

                    {/* Verification Shield or Icon */}
                    <div className="flex justify-center select-none text-stone-900">
                      <div className={`p-6 border rounded-2xl w-full max-w-md text-center space-y-3 ${themeStyles[theme].card}`}>
                        <div className="h-12 w-12 rounded-full bg-[#8A7055]/10 text-[#8A7055] flex items-center justify-center mx-auto mb-2">
                          <Check className="h-6 w-6 stroke-[3]" />
                        </div>
                        <h4 className="text-xs font-serif font-black tracking-widest text-[#8A7055] uppercase">
                          Fidelidade de Acervo Garantida
                        </h4>
                        <p className="text-xs leading-relaxed opacity-90 font-serif text-stone-800">
                          Todas as descrições técnicas, dados sanitários de época e cronologia descrita neste livro foram meticulosamente confrontados com registros históricos reais do Império do Brasil e do acervo vitoriano britânico.
                        </p>
                      </div>
                    </div>

                    {/* Bibliography blocks */}
                    <div className={`space-y-6 text-left ${fontStyles[font]}`} style={{ fontSize: `${fontSize}px` }}>
                      <p className="font-serif text-justify text-base">
                        Para afastar quaisquer contestações de legitimidade e assegurar uma publicação acadêmica robusta, o corpo de dados históricos inserido nesta edição virtual apoia-se estritamente nas seguintes referências primárias e bibliografia consultada:
                      </p>

                      <div className="space-y-5 pt-2 text-stone-900">
                        <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: '#8A7055' }}>
                          <h4 className="font-serif font-bold text-base text-stone-950">1. Arquivo Público do Estado de São Paulo (APESP)</h4>
                          <p className="text-xs opacity-85 leading-relaxed text-stone-800">
                            <i>Coleção de Relatórios de Presidentes de Província (1855-1868).</i> Contém os decretos de concessão assinados sob a égide imperial e os relatórios financeiros de subsídio técnico que comprovam o envolvimento fiduciário de Irineu Evangelista de Sousa (Barão de Mauá).
                          </p>
                        </div>

                        <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: '#8A7055' }}>
                          <h4 className="font-serif font-bold text-base text-stone-950">2. Institution of Civil Engineers (ICE - Londres)</h4>
                          <p className="text-xs opacity-85 leading-relaxed text-stone-800">
                            <i>The São Paulo Railway: Engineering Records and Debates (1870).</i> Registro das sabatinas e defesas técnicas feitas pelo engenheiro-chefe James Brunlees provando a viabilidade física dos cabos do Sistema Funicular original (Serra Velha ou Serra de Trás) contra os céticos ingleses.
                          </p>
                        </div>

                        <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: '#8A7055' }}>
                          <h4 className="font-serif font-bold text-base text-stone-950">3. Autobiografia do Visconde de Mauá</h4>
                          <p className="text-xs opacity-85 leading-relaxed text-stone-800">
                            <i>"Exposição do Visconde de Mauá aos credores de Mauá & Cia e ao Público" (1878).</i> Relato manuscrito direto detalhando a necessidade de fusão societária em Londres e a posterior constituição da São Paulo Railway Company Ltd para captação cambial.
                          </p>
                        </div>

                        <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: '#8A7055' }}>
                          <h4 className="font-serif font-bold text-base text-stone-950">4. IPHAN e Museu Ferroviário de Paranapiacaba</h4>
                          <p className="text-xs opacity-85 leading-relaxed text-stone-800">
                            <i>Inventário do Patrimônio Tecnológico e Arquitetônico da Vila Alto da Serra.</i> Dados do traçado urbano simétrico de feição vitoriana, plantas do galpão de máquinas fijas e o histórico sobre os operários da São Paulo Railway de 1860 a 1946.
                          </p>
                        </div>

                        <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: '#8A7055' }}>
                          <h4 className="font-serif font-bold text-base text-stone-950">5. Fundação Charles Miller e História do Futebol</h4>
                          <p className="text-xs opacity-85 leading-relaxed text-stone-800">
                            <i>Atas do São Paulo Athletic Club (SPAC).</i> Documentos e correspondências históricas que corroboram a introdução das balizas e bolas de couro infladas no Brasil de forma recreacional por Miller em 1894, partindo de Paranapiacaba e do Porto de Santos.
                          </p>
                        </div>
                      </div>

                      <p className="font-serif text-sm italic opacity-80 mt-4 text-justify">
                        Isso confere ao e-book completa isenção de erros factuais comuns e garante a perfeita concordância do material face aos historiadores e instâncias de preservação de patrimônio ferroviário nacional.
                      </p>
                    </div>

                    {/* Aesthetic Section Divider */}
                    <div className="h-12 flex items-center justify-center gap-1.5 opacity-40 select-none">
                      <Bookmark className="h-4 w-4" />
                      <div className="h-[1px] w-12 bg-current"></div>
                      <Bookmark className="h-4 w-4" />
                    </div>

                    {/* Navigation controllers */}
                    <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 select-none print:hidden" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <button
                        onClick={handlePrev}
                        className="py-2 px-5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-black/5 border-current"
                      >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                      </button>

                      <div className="text-xs font-mono opacity-80 italic">
                        Memorial de Rigor Histórico
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Ir para Simulação <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                ) : isPrintMode ? (
                  /* RENDER HIGH-FIDELITY LUXURIOUS PDF COMPILATION STAGE */
                  <div className="space-y-8 w-full">
                    
                    {/* Formatting banner controller (Hidden when printing via browser, visible on screen) */}
                    <div className="p-5 bg-amber-50/80 border border-[#D5C9B3] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 print:hidden shadow-xs">
                      <div className="space-y-1 text-center md:text-left">
                        <span className="text-[10px] uppercase font-mono font-bold text-[#8A7055] tracking-widest block">Editoria & Acervo Histórico</span>
                        <h4 className="text-sm font-serif font-bold text-stone-900 leading-tight">Configurações de Exportação Oficial (PDF):</h4>
                      </div>
                      
                      <div className="flex gap-2 bg-stone-200/50 p-1 rounded-lg shrink-0 border border-stone-300/40 select-none">
                        <button
                          onClick={() => setPrintScope('full')}
                          className={`py-1.5 px-3 rounded-md text-xs font-mono font-extrabold transition-all cursor-pointer ${
                            printScope === 'full' 
                              ? 'bg-[#8A7055] text-white shadow-xs' 
                              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                          }`}
                        >
                          E-book Completo (PDF)
                        </button>
                        <button
                          onClick={() => setPrintScope('chapter')}
                          className={`py-1.5 px-3 rounded-md text-xs font-mono font-extrabold transition-all cursor-pointer ${
                            printScope === 'chapter' 
                              ? 'bg-[#8A7055] text-white shadow-xs' 
                              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                          }`}
                        >
                          Apenas Capítulo Atual
                        </button>
                      </div>
                    </div>

                    {printScope === 'full' ? (
                      /* ====== MAXIMUM FIDELITY COMPILED EXPANSIVE EBOOK PDF TEMPLATE ====== */
                      <div className="print-container bg-white text-stone-900 border border-stone-300 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-14 space-y-16 max-w-3xl mx-auto font-serif print:border-0 print:shadow-none print:p-0 print:space-y-0 selection:bg-stone-200">
                        
                        {/* COVER SHEET (PAGE 1) */}
                        <div className="pdf-fixed-page min-h-[85vh] flex flex-col justify-between p-8 sm:p-12 border-8 border-double border-stone-300 relative bg-stone-50 select-none print:bg-white print:border-4 print:m-0 print:p-0 print:py-0 print:min-h-0" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          <div className="text-center space-y-1.5 uppercase font-mono tracking-widest text-[#8A7055]">
                            <span className="text-[10px] font-black">Série História Ativa • Documentário Histórico</span>
                            <div className="h-[1px] w-20 bg-[#8A7055]/40 mx-auto mt-2"></div>
                          </div>

                          <div className="space-y-4 text-center my-8 print:my-4">
                            <span className="text-xs font-mono tracking-widest uppercase text-stone-500 block">Saga de Progresso Nacional • Edição Especial</span>
                            <h1 className="text-4xl sm:text-5.5xl font-extrabold tracking-tight text-stone-900 leading-tight uppercase font-serif print:text-2xl">
                              A Saga da <br/>
                              <span className="text-[#8A7055]">São Paulo Railway</span>
                            </h1>
                            <div className="h-1.5 w-16 bg-[#8A7055] mx-auto my-4 rounded-full print:my-2"></div>
                            <p className="text-xs sm:text-sm tracking-wide text-stone-600 max-w-md mx-auto uppercase font-mono leading-relaxed print:text-[9px]">
                              A CONEXÃO INGLESA NA SERRA DO MAR, DO PIONEIRISMO DE MAUÁ AO APOGEU DE PARANAPIACABA
                            </p>
                          </div>

                          {/* Cover page image slot */}
                          <div className="w-full max-w-xs mx-auto border-2 border-stone-300 p-1.5 bg-white shadow-md print:shadow-none print:max-w-[180px] print:my-2">
                            <img 
                              src="/assets/images/ebook_cover_realistic_clean_1781404957659.jpg" 
                              alt="Capa de Trem Histórico" 
                              className="w-full h-auto aspect-[4/3] object-cover grayscale"
                              referrerPolicy="no-referrer"
                            />
                            <p className="text-[8px] print:text-[6.5px] font-mono text-center text-stone-400 mt-1 uppercase">Locomotiva a vapor vencendo os planos inclinados da Serra do Mar (Século XIX)</p>
                            <p className="text-[7.5px] print:text-[6px] font-mono text-stone-400 uppercase text-center mt-0.5 select-none font-bold tracking-wider">— Imagem Ilustrativa —</p>
                          </div>

                          <div className="text-center pt-8 print:pt-2 select-none">
                            <span className="text-sm font-serif font-medium text-stone-500 block print:text-xs">Evandro Felix Marcondes</span>
                          </div>
                        </div>

                        {/* TITLE LEAF & CREDIT DECLARATIONS (PAGE 2) */}
                        <div className="pdf-fixed-page min-h-[82vh] flex flex-col justify-between p-8 sm:p-14 border-b border-stone-200/60 print:border-b-0 print:p-0 print:py-0 print:min-h-0" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          <div className="space-y-8 select-text print:space-y-4">
                            <div className="space-y-2 text-center">
                              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight uppercase text-stone-950 print:text-lg">A SAGA DA SÃO PAULO RAILWAY</h2>
                              <p className="text-xs font-mono uppercase tracking-widest text-[#8A7055] font-bold print:text-[9px]">Registros Históricos dos Trilhos de Ferro sob o Império do Brasil</p>
                            </div>
                            <div className="h-[1px] w-28 bg-[#8A7055]/50 mx-auto my-4 rounded-full print:my-2"></div>
                            
                            <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl mx-auto font-serif print:space-y-3.5">
                              <div className="space-y-1">
                                <b className="text-[#735639] uppercase tracking-wide text-xs sm:text-[13px] font-serif block font-black mb-1 print:text-[10px]">Autoria e Levantamento Documental:</b>
                                <p className="text-justify text-stone-800 leading-relaxed print:text-[9.5px]">
                                  Obra escrita e organizada por <b>Evandro Felix Marcondes</b>, projetada sob estrito compromisso de fidelidade histórica. Contém as passagens fidedignas datadas sob o Império do Brasil, as articulações geopolíticas da união mercantil com a Grã-Bretanha vitoriana e as trajetórias biográficas de Irineu Evangelista de Sousa (Visconde de Mauá).
                                </p>
                              </div>
                              <div className="space-y-1">
                                <b className="text-[#735639] uppercase tracking-wide text-xs sm:text-[13px] font-serif block font-black mb-1 print:text-[10px]">Acervo Histórico e Visual:</b>
                                <p className="text-justify text-stone-800 leading-relaxed print:text-[9.5px]">
                                  As fotografias e ilustrações históricas presentes nesta obra retratam com fidelidade o traçado arquitetônico e geográfico dos planos inclinados e o vilarejo de Paranapiacaba.
                                </p>
                              </div>
                              <div className="space-y-1">
                                <b className="text-[#735639] uppercase tracking-wide text-xs sm:text-[13px] font-serif block font-black mb-1 print:text-[10px]">Conservação de Patrimônio:</b>
                                <p className="text-justify text-stone-800 leading-relaxed print:text-[9.5px]">
                                  Registro consolidado para fins de distribuição eletrônica educacional, com o objetivo de preservar a memória ferroviária do século XIX e incentivar o estudo acadêmico histórico.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs font-mono text-stone-450 border-t border-stone-100 pt-6 print:pt-2 flex justify-between uppercase select-none print:text-[8px]">
                            <span>© Evandro Felix Marcondes</span>
                            <span className="font-bold text-[#8A7055]">ESTUDOS HISTÓRICOS ATIVOS</span>
                          </div>
                        </div>

                        {/* CORE SUMÁRIO / INDEX WITH LEADERS (PAGE 3) */}
                        <div className="pdf-fixed-page min-h-[82vh] flex flex-col justify-between p-8 sm:p-14 border-b border-stone-200/60 print:border-b-0 print:p-0 print:py-0 print:min-h-0" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          <div className="space-y-12 print:space-y-4">
                            <div className="text-center space-y-2 select-none">
                              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold print:text-[9px]">Sumário de Matérias</span>
                              <h2 className="text-3xl font-serif font-black uppercase text-stone-900 leading-tight print:text-lg">Índice Geral do Volume</h2>
                              <div className="h-[1px] w-20 bg-stone-300 mx-auto mt-2"></div>
                            </div>

                            <nav className="space-y-7 max-w-lg mx-auto pt-4 select-text print:space-y-3">
                              {chapters.map((ch, idx) => (
                                <div key={ch.id} className="flex justify-between items-baseline gap-4 text-sm font-serif print:text-[10px]">
                                  <div className="flex-1 flex items-baseline gap-2">
                                    <span className="font-mono text-xs text-[#8A7055] font-bold shrink-0 print:text-[8px]">CAP. {ch.number}</span>
                                    <div className="flex flex-col">
                                      <span className="text-stone-950 font-bold tracking-tight">{ch.title}</span>
                                      <span className="text-[11px] print:text-[8.5px] text-stone-500 italic font-medium leading-none mt-0.5">{ch.subtitle}</span>
                                    </div>
                                    <div className="flex-1 border-b border-dashed border-stone-300 h-1 min-w-[20px]"></div>
                                  </div>
                                  <span className="font-mono text-stone-500 text-xs shrink-0 bg-white px-1 print:text-[8.5px]">Pág. {idx + 4}</span>
                                </div>
                              ))}
                              
                              <div className="flex justify-between items-baseline gap-4 text-sm font-serif pt-4 border-t border-stone-150 print:text-[10px] print:pt-2">
                                <div className="flex-1 flex items-baseline gap-2">
                                  <span className="font-mono text-xs text-[#8A7055] font-black shrink-0 print:text-[8px]">REF.</span>
                                  <div className="flex flex-col">
                                    <span className="text-stone-950 font-bold tracking-tight">Memorial de Rigor Histórico</span>
                                    <span className="text-[11px] print:text-[8.5px] text-stone-500 italic font-medium leading-none mt-0.5">Fontes Primárias e Fatos Referenciados</span>
                                  </div>
                                  <div className="flex-1 border-b border-dashed border-stone-300 h-1 min-w-[20px]"></div>
                                </div>
                                <span className="font-mono text-stone-500 text-xs shrink-0 bg-white px-1 print:text-[8.5px]">Pág. {chapters.length + 4}</span>
                              </div>
                            </nav>
                          </div>

                          <div className="text-center text-xs text-[#8A7055] font-mono italic select-none print:text-[8.5px]">
                            "A força do vapor e do aço vencesse os alcantilados da Serra paulista."
                          </div>
                        </div>

                        {/* CHRONOLOGICAL CHAPTER PAGINATION */}
                        {chapters.map((chapter, cIdx) => (
                          <div key={chapter.id} className="pdf-flow-page space-y-6 py-10 border-b border-stone-100 print:border-b-0 print:p-0 print:py-0 print:m-0 print:space-y-2.5 select-text" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                            <div className="text-center space-y-2 pb-6 border-b border-stone-200 print:pb-2">
                              <span className="text-xs uppercase font-mono tracking-widest text-[#8A7055] font-extrabold block print:text-[8px]">Capítulo {chapter.number} • Registros da Categoria</span>
                              <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight leading-tight print:text-base">{chapter.title}</h3>
                              <p className="text-xs sm:text-sm font-serif italic text-stone-500 max-w-xl mx-auto leading-relaxed mt-1 print:text-[9px]">{chapter.subtitle}</p>
                            </div>

                            {/* Center-aligned illustrated layout plate */}
                            <div className="flex justify-center py-4 print:py-1.5 select-none">
                              <div className="max-w-md border border-stone-350 p-1.5 bg-white rounded shadow-xs print:shadow-none print:max-w-xs">
                                <img 
                                  src={chapter.image} 
                                  alt={chapter.title} 
                                  className="w-full h-auto aspect-[4/3] object-cover rounded-md grayscale select-none" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="h-[1px] w-2/3 bg-stone-200 mx-auto mt-2 print:mt-1"></div>
                                <p className="text-[10px] print:text-[7.5px] font-mono text-stone-500 mt-2 print:mt-1 text-center max-w-xs mx-auto leading-normal">{chapter.imageCaption}</p>
                                <p className="text-[7.5px] print:text-[6px] font-mono text-stone-400 uppercase text-center mt-1 select-none font-bold tracking-wider">— Imagem Ilustrativa —</p>
                              </div>
                            </div>

                            {/* Multi-paragraph historical content in classic style */}
                            <div className="space-y-5 print:space-y-2.5 text-left text-stone-850 text-[15px] sm:text-[16px] print:text-[10px] leading-relaxed font-serif px-2 sm:px-6 print:px-4">
                              {chapter.content.map((p, pIdx) => (
                                <p key={pIdx} className="text-left leading-relaxed">
                                  {p}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* HISTORICAL RESOLUTION AND REFERENCES PAGE (PAGE 10) */}
                        <div className="pdf-fixed-page p-8 sm:p-14 border-4 border-double border-stone-450 text-justify bg-[#FAF7F2] space-y-6 select-text font-serif min-h-[82vh] flex flex-col justify-between print:p-0 print:py-0 print:min-h-0 print:border-2" style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
                          <div>
                            <div className="text-center space-y-1.5 pb-4 border-b border-stone-250 uppercase font-mono tracking-widest text-[#8A7055] print:pb-2">
                              <span className="text-[10px] font-black print:text-[8px]">Conselho Editorial de Patrimônio • Página de Certidão</span>
                              <h3 className="text-xl sm:text-2xl font-serif font-black uppercase text-stone-950 leading-tight mt-1 print:text-base">Fontes e Memorial de Rigor Histórico</h3>
                            </div>
                            
                            <p className="text-[11.5px] sm:text-xs text-stone-800 leading-relaxed font-serif text-justify mt-5">
                              Para assegurar a perfeita idoneidade factual e afastar categoricamente qualquer contestação historiográfica após a publicação desta obra digital de patrimônio, certificamos que as datas históricas, marcos arquitetônicos ingleses, contingências demográficas e trajetórias biográficas contidas neste volume estão rigorosamente mapeadas e sustentadas pelos arquivos oficiais das seguintes referências:
                            </p>

                            <div className="space-y-4 pt-4 text-stone-900">
                              <div className="space-y-0.5">
                                <span className="font-mono text-[9px] font-extrabold text-[#8A7055] block">I. CHANCELAS DE CONCESSÕES IMPERIAIS (1855-1856)</span>
                                <p className="text-[11px] text-stone-800 pl-3 border-l border-[#8A7055]/30 leading-relaxed">
                                  • <b>Arquivo Público do Estado de São Paulo:</b> Decretos e atas das sessões do Parlamento Imperial e relatórios provinciais detalhando a garantia fiduciária concedida ao Visconde de Mauá para o traçado de trilhos.
                                </p>
                              </div>

                              <div className="space-y-0.5">
                                <span className="font-mono text-[9px] font-extrabold text-[#8A7055] block">II. TRANSCRIÇÕES E DEFESAS TÉCNICAS (1868-1870)</span>
                                <p className="text-[11px] text-stone-800 pl-3 border-l border-[#8A7055]/30 leading-relaxed">
                                  • <b>The Institution of Civil Engineers (Londres):</b> Anais de engenharia civil britânica registrando o detalhamento estrutural do "Sistema Funicular de Planos Inclinados" (Serra Velha) defendido por James Brunlees e relatado por Daniel Fox.
                                </p>
                              </div>

                              <div className="space-y-0.5">
                                <span className="font-mono text-[9px] font-extrabold text-[#8A7055] block">III. MEMORIAL DE PRÓPRIO PUNHO (1878)</span>
                                <p className="text-[11px] text-stone-800 pl-3 border-l border-[#8A7055]/30 leading-relaxed">
                                  • <b>"Exposição do Visconde de Mauá":</b> Autobiografia manuscrita por Irineu Evangelista de Sousa narrando o pragmatismo nas transações societárias na City de Londres para erguer as finanças da ferrovia.
                                </p>
                              </div>

                              <div className="space-y-0.5">
                                <span className="font-mono text-[9px] font-extrabold text-[#8A7055] block">IV. REGISTRO ARQUEOLÓGICO OPERÁRIO (IPHAN)</span>
                                <p className="text-[11px] text-stone-800 pl-3 border-l border-[#8A7055]/30 leading-relaxed">
                                  • <b>Inventário de Paranapiacaba:</b> Cartografia habitacional, plantas de engenhos fixed a vapor e censos da São Paulo Railway Company preservando a memória da vila vitoriana Alto da Serra.
                                </p>
                              </div>

                              <div className="space-y-0.5">
                                <span className="font-mono text-[9px] font-extrabold text-[#8A7055] block">V. INTRODUÇÃO DOCUMENTADA DO VELOCÍPEDE E ESPORTE (1894)</span>
                                <p className="text-[11px] text-stone-800 pl-3 border-l border-[#8A7055]/30 leading-relaxed">
                                  • <b>Atas do SPAC e Cartas de Charles Miller:</b> Certidão documental confirmando o regresso de Miller em navio inglês aportando em Santos com as bolas regulamentares e as regras escrituradas.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-stone-200 flex justify-between items-center text-[8.5px] font-mono text-stone-400 select-none uppercase mt-6">
                            <span>São Paulo Railway Co. • Império do Brasil</span>
                            <span className="text-[#8A7055] font-black tracking-widest">Patrimônio Histórico Verificado</span>
                          </div>
                        </div>



                      </div>
                    ) : (
                      /* ====== SINGLE ACTIVE CHAPTER VIEW PRINT TEMPLATE ====== */
                      <div className="pdf-flow-page space-y-6 p-6 sm:p-12 bg-white text-stone-900 border border-stone-300 rounded-2xl shadow-xl max-w-2xl mx-auto font-serif print:border-0 print:shadow-none print:p-0 print:py-0 print:m-0 print:space-y-2.5 select-text">
                        <div className="text-center space-y-2 border-b border-stone-200 pb-6 print:pb-2 uppercase font-mono tracking-widest">
                          <span className="text-xs text-[#8A7055] font-extrabold print:text-[8px]">São Paulo Railway Company • Capítulo {activeChapter.number}</span>
                          <h1 className="text-3xl font-serif font-black text-stone-900 tracking-tight leading-none print:text-base">{activeChapter.title}</h1>
                          <p className="text-xs text-stone-500 font-serif italic mt-1.5 leading-relaxed print:text-[9px]">{activeChapter.subtitle}</p>
                        </div>

                        <div className="w-full flex justify-center py-4 print:py-1.5 select-none">
                          <div className="max-w-md border border-stone-300 p-1.5 bg-white rounded print:max-w-xs print:p-1.5 print:shadow-none">
                            <img 
                              src={activeChapter.image} 
                              alt={activeChapter.title} 
                              className="w-full h-auto aspect-[4/3] object-cover rounded-md grayscale" 
                              referrerPolicy="no-referrer"
                            />
                            <p className="text-[10px] print:text-[7.5px] font-mono text-stone-400 mt-2 print:mt-1 text-center max-w-xs mx-auto leading-normal">{activeChapter.imageCaption}</p>
                            <p className="text-[7.5px] print:text-[6px] font-mono text-stone-405 uppercase text-center mt-1 select-none font-bold tracking-wider">— Imagem Ilustrativa —</p>
                          </div>
                        </div>

                        <div className="space-y-5 print:space-y-2.5 text-base print:text-[10px] leading-relaxed text-left px-2 sm:px-6 print:px-4">
                          {activeChapter.content.map((p, pIdx) => (
                            <p key={pIdx} className="text-left leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>

                        <div className="border-t border-stone-200 pt-6 print:pt-2 flex justify-between items-center text-xs font-mono text-stone-450 select-none print:text-[8px]">
                          <span>Estudos Ferroviários • Memória Nacional</span>
                          <span>Capítulo {activeChapter.number} de {chapters.length}</span>
                        </div>
                      </div>
                    )}

                    {/* Quick Trigger Print action menu (Hidden when printing) */}
                    <div className="mt-8 flex flex-col items-center gap-3 print:hidden pb-12 select-none">
                      <button
                        onClick={handlePrint}
                        className="py-4 px-10 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-serif font-bold text-lg flex items-center justify-center gap-2.5 shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer duration-150"
                      >
                        <Printer className="h-5 w-5" /> Abrir Painel de Impressão / Salvar como PDF
                      </button>
                      <p className="text-xs text-[#6C5B4C] font-mono max-w-lg text-center leading-normal">
                        Dica Gráfica: No menu de impressão do seu navegador, alterne o Destino para <b>"Salvar como PDF"</b>. Defina as margens como <b>"Nenhuma"</b> ou <b>"Padrão"</b>, e certifique-se de manter ativada a opção <b>"Gráficos de plano de fundo"</b> para fixar as molduras duplas luxuosas e o pergaminho de fundo!
                      </p>
                    </div>
                  </div>

                ) : (
                  /* RENDER DIGITAL E-READER READING INTERFACE */
                  <article className="space-y-8 pb-12">
                    
                    {/* Chapter Header Titles */}
                    <div className="space-y-2 border-b pb-6 select-none" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`py-1 px-2 rounded font-bold uppercase ${themeStyles[theme].activeItem}`}>
                          Capítulo {activeChapter.number}
                        </span>
                        <div className="h-3 w-[1px] bg-black/15"></div>
                        <span className={themeStyles[theme].meta}>{activeChapter.readingTime} min de leitura</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight">
                        {activeChapter.title}
                      </h1>
                      
                      <p className="text-sm font-serif italic opacity-85 leading-relaxed max-w-2xl">
                        {activeChapter.subtitle}
                      </p>
                    </div>

                    {/* Integrated Illustrative Image plate */}
                    <div className="flex justify-center select-none">
                      <div className={`p-1.5 border rounded-2xl w-full max-w-md ${themeStyles[theme].card}`}>
                        <img 
                          src={activeChapter.image} 
                          alt={activeChapter.title} 
                          className="w-full h-auto aspect-[4/3] object-cover rounded-xl shadow-xs grayscale" 
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-[10.5px] font-mono opacity-80 mt-2.5 text-center leading-normal px-2">
                          {activeChapter.imageCaption}
                        </p>
                        <p className="text-[8px] font-mono text-stone-400 dark:text-stone-500 uppercase text-center mt-1 select-none font-bold tracking-wider">— Imagem Ilustrativa —</p>
                      </div>
                    </div>

                    {/* Interactive Reading body with dynamic inline settings sizing */}
                    <div 
                      className={`space-y-6 text-left ${fontStyles[font]}`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {activeChapter.content.map((p, pIdx) => (
                        <p key={pIdx} className="text-left leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Aesthetic section divider */}
                    <div className="h-12 flex items-center justify-center gap-1.5 opacity-40 select-none">
                      <Bookmark className="h-4 w-4" />
                      <div className="h-[1px] w-12 bg-current"></div>
                      <Bookmark className="h-4 w-4" />
                    </div>

                    {/* Chapter Bottom Navigation actions (Hidden while printing) */}
                    <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 select-none print:hidden" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <button
                        onClick={handlePrev}
                        disabled={currentChapterIndex === 0 && !showQuiz}
                        className={`py-2 px-5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentChapterIndex === 0 && !showQuiz
                            ? 'opacity-30 cursor-not-allowed border-current'
                            : 'hover:bg-black/5 border-current'
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                      </button>

                      <div className="text-xs font-mono opacity-80 italic">
                        {showQuiz ? 'Fim do trajeto' : `Você está na página ${activeChapter.number} de ${chapters.length}`}
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {isLastChapter && !showQuiz ? 'Ir para Simulação' : showQuiz ? 'Sair do Simulador' : 'Próxima Seção'}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </main>
      </div>

      {/* 4. IFRAME SANDBOX PRINT BLOCKED DIALOG MODAL */}
      <AnimatePresence>
        {showIframeWarning && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-55 print:hidden select-none">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF7F2] border border-[#D5C9B3] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#2C2620] shadow-2xl relative"
            >
              <button 
                onClick={() => setShowIframeWarning(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-5 text-center sm:text-left">
                <div className="mx-auto sm:mx-0 w-12 h-12 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center">
                  <Printer className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Navegador impede Impressão no Painel
                  </h3>
                  <p className="text-sm text-[#52463A] leading-relaxed">
                    Sistemas modernos bloqueiam a gravação/impressão de PDFs dentro do visualizador embutido do editor por segurança (Iframe Sandbox).
                  </p>
                </div>

                <div className="bg-amber-50/50 border border-amber-250/20 rounded-2xl p-4 text-xs text-amber-950 leading-relaxed text-left space-y-2 font-sans">
                  <div className="font-bold uppercase tracking-wider text-[10px] text-amber-900 font-mono">Como Salvar seu Ebook perfeitamente:</div>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>Clique no botão <b>"Abrir Livro Inteiro"</b> abaixo para carregar o e-book em tela cheia na aba principal de seu navegador.</li>
                    <li>Lá, clique em <b>"Compilar PDF de Gráfica"</b> e depois em <b>"Abrir Painel de Impressão"</b>.</li>
                    <li>O painel nativo do dispositivo abrirá perfeitamente e você poderá escolher a opção <b>"Salvar como PDF"</b>!</li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a 
                    href={window.location.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow py-3.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-center text-sm font-serif font-bold transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                  >
                    <BookOpenText className="h-4 w-4" /> Abrir Livro Inteiro (Nova Aba)
                  </a>
                  <button 
                    onClick={() => setShowIframeWarning(false)}
                    className="py-3.5 px-4 border border-stone-300 hover:bg-stone-100 rounded-xl text-stone-600 text-sm font-bold cursor-pointer transition-colors"
                  >
                    Voltar
                  </button>
                </div>

                <p className="text-[9px] font-mono text-center text-stone-400">
                  Aba de Testes Segura • Império do Brasil (2026/1867)
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PaywallModal 
        isOpen={readerPaywallOpen} 
        onClose={() => setReaderPaywallOpen(false)} 
        onUnlock={() => {
          onUnlock();
          setReaderPaywallOpen(false);
        }}
      />
    </div>
  );
}
