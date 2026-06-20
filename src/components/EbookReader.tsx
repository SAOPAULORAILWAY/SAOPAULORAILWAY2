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
  Lock,
  LogOut,
  Heart
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Chapter, ReaderTheme, ReaderFont } from '../types';
import { chapters } from '../data/chapters';
import HistoryQuiz from './HistoryQuiz';
import PaywallModal from './PaywallModal';

interface EbookReaderProps {
  onBackToCover: () => void;
  initialChapterIndex?: number;
  initialShowQuiz?: boolean;
  initialPrintMode?: boolean;
  initialShowConclusion?: boolean;
  initialShowReferences?: boolean;
  initialShowAboutAuthor?: boolean;
  initialShowApresentacao?: boolean;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLock?: () => void;
}

export default function EbookReader({ 
  onBackToCover, 
  initialChapterIndex = 0, 
  initialShowQuiz = false, 
  initialPrintMode = false,
  initialShowConclusion = false,
  initialShowReferences = false,
  initialShowAboutAuthor = false,
  initialShowApresentacao = true,
  isUnlocked,
  onUnlock,
  onLock
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
  const [showReferences, setShowReferences] = useState(initialShowReferences);
  const [showConclusion, setShowConclusion] = useState(initialShowConclusion);
  const [showAboutAuthor, setShowAboutAuthor] = useState(initialShowAboutAuthor);
  const [showApresentacao, setShowApresentacao] = useState(initialShowApresentacao);
  const [readerPaywallOpen, setReaderPaywallOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);



  // Sync initial parameters
  useEffect(() => {
    setCurrentChapterIndex(initialChapterIndex);
    setShowQuiz(initialShowQuiz);
    setIsPrintMode(initialPrintMode);
    setShowReferences(initialShowReferences);
    setShowConclusion(initialShowConclusion);
    setShowAboutAuthor(initialShowAboutAuthor);
    setShowApresentacao(initialShowApresentacao);
  }, [initialChapterIndex, initialShowQuiz, initialPrintMode, initialShowReferences, initialShowConclusion, initialShowAboutAuthor, initialShowApresentacao]);

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
    if (showApresentacao) {
      setShowApresentacao(false);
      setCurrentChapterIndex(0);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showConclusion) {
      setShowConclusion(false);
      setShowReferences(true);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showReferences) {
      setShowReferences(false);
      setShowAboutAuthor(true);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showAboutAuthor) {
      if (!isUnlocked) {
        setReaderPaywallOpen(true);
        return;
      }
      setShowAboutAuthor(false);
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
      setShowConclusion(true);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
      setShowAboutAuthor(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showAboutAuthor) {
      setShowAboutAuthor(false);
      setShowReferences(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showReferences) {
      setShowReferences(false);
      setShowConclusion(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (showConclusion) {
      setShowConclusion(false);
      setCurrentChapterIndex(chapters.length - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentChapterIndex === 0 && !showApresentacao) {
      setShowApresentacao(true);
      setIsPrintMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    setPdfProgress(0);
    try {
      const container = document.querySelector('.print-container');
      if (!container) {
        alert('Visualização de impressão não encontrada. Certifique-se de estar na aba de PDF.');
        setIsGeneratingPDF(false);
        return;
      }
      
      let pageElements = Array.from(container.querySelectorAll('.pdf-fixed-page, .pdf-flow-page'));
      if (pageElements.length === 0) {
        pageElements = [container];
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      const pdfWidth = 210;
      const pdfHeight = 297;

      for (let i = 0; i < pageElements.length; i++) {
        setPdfProgress(Math.round((i / pageElements.length) * 100));
        
        const pageElement = pageElements[i] as HTMLElement;
        
        const canvas = await html2canvas(pageElement, {
          scale: 1.8,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      setPdfProgress(100);
      
      setTimeout(() => {
        pdf.save(`SPR_Trilhos_do_Cafe_${printScope === 'full' ? 'Completo' : 'Capitulo'}.pdf`);
        setIsGeneratingPDF(false);
      }, 500);

    } catch (e) {
      console.error('Erro ao gerar arquivo PDF:', e);
      alert('Houve um erro ao processar o download automático. Tentando abrir o menu padrão de impressão do seu navegador.');
      window.print();
      setIsGeneratingPDF(false);
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
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">Série História Nacional</span>
          <h2 className="text-xs font-serif font-black tracking-wide uppercase">A saga da São Paulo Railway.</h2>
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
                ? 'bg-[#8A7055] text-white shadow-md' 
                : 'bg-black/5 hover:bg-black/10 text-current'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isPrintMode ? 'Sair da Visualização PDF' : 'Visualizar em PDF'}</span>
          </button>

          {/* Botão de Contribuição / Apoiar Projeto */}
          <button
            onClick={() => setReaderPaywallOpen(true)}
            className="py-1.5 sm:py-2 px-3 rounded-lg text-xs font-mono font-extrabold bg-[#8A7055] hover:bg-[#725C46] text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border border-[#725C46]/20"
            title="Apoiar este E-book com uma contribuição voluntária"
          >
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span className="hidden sm:inline">Apoiar Projeto</span>
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
                {/* Prefácio Editorial Anchor */}
                <button
                  onClick={() => {
                    setShowApresentacao(true);
                    setCurrentChapterIndex(0);
                    setShowQuiz(false);
                    setShowReferences(false);
                    setShowConclusion(false);
                    setShowAboutAuthor(false);
                    setIsPrintMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                    showApresentacao && !isPrintMode && !showQuiz && !showReferences && !showConclusion && !showAboutAuthor
                      ? themeStyles[theme].activeItem + ' font-medium shadow-xs'
                      : 'hover:bg-black/5 opacity-85'
                  }`}
                >
                  <span className={`font-mono text-xs font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0 border ${
                    showApresentacao && !isPrintMode && !showQuiz && !showReferences && !showConclusion && !showAboutAuthor ? 'border-current' : 'border-black/5'
                  }`}>
                    0
                  </span>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 w-full">
                      <h4 className="text-xs font-serif font-bold tracking-tight line-clamp-1 group-hover:text-current">
                        Prefácio Editorial
                      </h4>
                    </div>
                    <p className="text-[10.5px] font-mono opacity-70 line-clamp-1">
                      Apresentação Geral
                    </p>
                  </div>
                </button>

                {chapters.map((ch, idx) => {
                  const isActive = currentChapterIndex === idx && !showQuiz && !showReferences && !showConclusion && !showAboutAuthor && !showApresentacao && !isPrintMode;
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
                        setShowConclusion(false);
                        setShowAboutAuthor(false);
                        setShowApresentacao(false);
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

                {/* Conclusão Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(true);
                    setShowReferences(false);
                    setShowAboutAuthor(false);
                    setShowQuiz(false);
                    setShowApresentacao(false);
                    setIsPrintMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                    showConclusion && !isPrintMode
                      ? themeStyles[theme].activeItem + ' font-medium shadow-xs'
                      : 'hover:bg-black/5 opacity-85'
                  }`}
                >
                  <BookOpenText className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <div>
                      <h4 className="text-xs font-serif font-bold">Conclusão</h4>
                      <p className="text-[10px] font-mono opacity-70">O impacto histórico da SPR</p>
                    </div>
                  </div>
                </button>

                {/* Fontes e Referências Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(false);
                    setShowReferences(true);
                    setShowAboutAuthor(false);
                    setShowQuiz(false);
                    setShowApresentacao(false);
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
                      <h4 className="text-xs font-serif font-bold">Fontes e referências.</h4>
                      <p className="text-[10px] font-mono opacity-70">Fontes primárias e referências</p>
                    </div>
                  </div>
                </button>

                {/* Sobre o Autor Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(false);
                    setShowReferences(false);
                    setShowAboutAuthor(true);
                    setShowQuiz(false);
                    setShowApresentacao(false);
                    setIsPrintMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                    showAboutAuthor && !isPrintMode
                      ? themeStyles[theme].activeItem + ' font-medium shadow-xs'
                      : 'hover:bg-black/5 opacity-85'
                  }`}
                >
                  <Bookmark className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <div>
                      <h4 className="text-xs font-serif font-bold">Sobre o autor.</h4>
                      <p className="text-[10px] font-mono opacity-70">Perfil biográfico</p>
                    </div>
                  </div>
                </button>

                {/* Simulated Quiz Index Anchor */}
                <button
                  onClick={() => {
                    if (!isUnlocked) {
                      setReaderPaywallOpen(true);
                      return;
                    }
                    setShowConclusion(false);
                    setShowReferences(false);
                    setShowAboutAuthor(false);
                    setShowQuiz(true);
                    setShowApresentacao(false);
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
                      <h4 className="text-xs font-serif font-bold">Simulador histórico.</h4>
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
                {/* Prefácio Editorial Anchor */}
                <button
                  onClick={() => {
                    setShowApresentacao(true);
                    setCurrentChapterIndex(0);
                    setShowQuiz(false);
                    setShowReferences(false);
                    setShowConclusion(false);
                    setShowAboutAuthor(false);
                    setIsPrintMode(false);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer ${
                    showApresentacao && !isPrintMode && !showQuiz && !showReferences && !showConclusion && !showAboutAuthor ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                  }`}
                >
                  <span className="font-mono text-xs font-bold shrink-0 mt-0.5">0.</span>
                  <div>
                    <h4 className="text-xs font-serif font-bold leading-tight">Prefácio Editorial</h4>
                    <p className="text-[10px] font-mono opacity-80 mt-0.5">Apresentação Geral</p>
                  </div>
                </button>

                {chapters.map((ch, idx) => {
                  const isActive = currentChapterIndex === idx && !showQuiz && !showReferences && !showConclusion && !showAboutAuthor && !showApresentacao && !isPrintMode;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        setShowQuiz(false);
                        setShowReferences(false);
                        setShowConclusion(false);
                        setShowAboutAuthor(false);
                        setShowApresentacao(false);
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

                {/* Conclusão Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(true);
                    setShowReferences(false);
                    setShowAboutAuthor(false);
                    setShowQuiz(false);
                    setShowApresentacao(false);
                    setIsPrintMode(false);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer ${
                    showConclusion && !isPrintMode ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                  }`}
                >
                  <BookOpenText className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div>
                    <h4 className="text-xs font-serif font-bold">Conclusão</h4>
                    <p className="text-[10px] font-mono opacity-80">O impacto histórico da SPR</p>
                  </div>
                </button>

                {/* Fontes e Referências Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(false);
                    setShowReferences(true);
                    setShowAboutAuthor(false);
                    setShowQuiz(false);
                    setShowApresentacao(false);
                    setIsPrintMode(false);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer ${
                    showReferences && !isPrintMode ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                  }`}
                >
                  <FileText className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div>
                    <h4 className="text-xs font-serif font-bold">Fontes e Referências</h4>
                    <p className="text-[10px] font-mono opacity-80">Fontes primárias e referências</p>
                  </div>
                </button>

                {/* Sobre o Autor Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(false);
                    setShowReferences(false);
                    setShowAboutAuthor(true);
                    setShowQuiz(false);
                    setShowApresentacao(false);
                    setIsPrintMode(false);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer ${
                    showAboutAuthor && !isPrintMode ? themeStyles[theme].activeItem : 'opacity-85 hover:bg-black/5'
                  }`}
                >
                  <Bookmark className="h-5 w-5 shrink-0 text-[#8A7055]" />
                  <div>
                    <h4 className="text-xs font-serif font-bold">Sobre o Autor</h4>
                    <p className="text-[10px] font-mono opacity-80">Perfil biográfico</p>
                  </div>
                </button>

                {/* Simulated Quiz Index Anchor */}
                <button
                  onClick={() => {
                    setShowConclusion(false);
                    setShowReferences(false);
                    setShowAboutAuthor(false);
                    setShowQuiz(true);
                    setShowApresentacao(false);
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
                key={isPrintMode ? `print-${printScope}` : showQuiz ? 'quiz' : showConclusion ? 'conclusion' : showReferences ? 'references' : showAboutAuthor ? 'aboutAuthor' : showApresentacao ? 'apresentacao' : `chapter-${currentChapterIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                {showQuiz && !isPrintMode ? (
                  /* RENDER HISTORICAL EVALUATIVE SIMULATOR SCREEN */
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-8 select-none">
                      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8A7055] uppercase font-extrabold bg-[#8A7055]/10 py-1 px-3 rounded-full">
                        Fixação de conteúdo.
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Avaliação de rigor histórico.</h2>
                      <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                        Teste seus conhecimentos sobre a engenharia, os personagens marcantes e os principais acontecimentos que envolveram a construção da São Paulo Railway.
                      </p>
                    </div>
                    <HistoryQuiz />
                  </div>
                ) : showConclusion && !isPrintMode ? (
                  /* RENDER DIGITAL CONCLUSION SCREEN */
                  <article className="space-y-8 pb-12">
                    
                    {/* Header Titles */}
                    <div className="space-y-2 border-b pb-6 select-none animate-fade-in" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`py-1 px-2 rounded font-bold uppercase ${themeStyles[theme].activeItem}`}>
                          Conclusão Final
                        </span>
                        <div className="h-3 w-[1px] bg-black/15"></div>
                        <span className={themeStyles[theme].meta}>Impacto Histórico</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight w-full">
                        Conclusão: O impacto histórico da São Paulo Railway.
                      </h1>
                    </div>

                    <div className={`space-y-6 text-left ${fontStyles[font]}`} style={{ fontSize: `${fontSize}px` }}>
                      <p className="text-left leading-relaxed">
                        A São Paulo Railway foi decisiva para a modernização de São Paulo ao conectar o interior cafeeiro ao Porto de Santos. A ferrovia reduziu o isolamento da Serra do Mar e tornou mais eficiente o transporte da produção agrícola, impulsionando a economia e a integração da região. A linha também influenciou o surgimento e a organização de áreas urbanas e estruturas de apoio, como Paranapiacaba e a Estação da Luz, que ainda preservam traços desse período ferroviário.
                      </p>
                      <p className="text-left leading-relaxed">
                        Em 1946, o controle da ferrovia passou para o governo federal, encerrando a administração britânica e dando origem à Estrada de Ferro Santos–Jundiaí. Ainda assim, sua importância histórica permanece ligada ao desenvolvimento do sistema de transportes no país. Hoje, o legado da São Paulo Railway segue presente na infraestrutura e na memória histórica paulista, sendo referência para estudos sobre transporte e desenvolvimento no Brasil.
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
                        Conclusão
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Ir para Referências <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                ) : showReferences && !isPrintMode ? (
                  /* RENDER DETAILED HISTORICAL SOURCES & PEER REVIEWS FOR MAXIMUM ACCURACY CERTIFICATION */
                  <article className="space-y-8 pb-12">
                    
                    {/* Header Titles */}
                    <div className="space-y-2 border-b pb-6 select-none animate-fade-in" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`py-1 px-2 rounded font-bold uppercase ${themeStyles[theme].activeItem}`}>
                          Referências
                        </span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight">
                        FONTES CONSULTADAS
                      </h1>
                    </div>

                    {/* Bibliography blocks */}
                    <div className={`space-y-6 text-left ${fontStyles[font]}`} style={{ fontSize: `${fontSize}px` }}>
                      
                      <p className="text-sm leading-relaxed opacity-90 font-serif">
                        Este livro foi elaborado a partir de uma síntese histórica baseada em bibliografia especializada e fontes institucionais relacionadas à história da São Paulo Railway, ao desenvolvimento ferroviário paulista e à economia cafeeira no Brasil.
                      </p>

                      <div className="space-y-5 pt-2 text-stone-900">
                        <div className="border-l-2 pl-4 space-y-1.5" style={{ borderColor: '#8A7055' }}>
                          <h4 className="font-serif font-bold text-base text-stone-950 uppercase tracking-wider text-xs">Bibliografia</h4>
                          <div className="text-xs opacity-85 leading-relaxed text-stone-800 space-y-2.5 pt-1">
                            <p><i>DEAN, Warren.</i> A industrialização de São Paulo (1880–1945). São Paulo: Edusp.</p>
                            <p><i>SAES, Flávio Azevedo Marques de.</i> As ferrovias de São Paulo (1870–1940). São Paulo: Hucitec.</p>
                            <p><i>MATOS, Odilon Nogueira de.</i> Café e ferrovias: a expansão da economia cafeeira paulista. São Paulo: Alfa-Omega.</p>
                            <p><i>TOLEDO, Benedito Lima de.</i> Paranapiacaba: a vila e o caminho de ferro. São Paulo: Edusp, 2003.</p>
                            <p><i>KÜHL, Beatriz Mugayar.</i> Arquitetura do ferro e patrimônio industrial no Brasil. São Paulo: Edusp.</p>
                          </div>
                        </div>
                      </div>


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
                        Fontes e Referências
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Ir para Sobre o Autor <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                ) : showAboutAuthor && !isPrintMode ? (
                  /* RENDER DIGITAL ABOUT AUTHOR SCREEN */
                  <article className="space-y-8 pb-12">
                    
                    {/* Header Titles */}
                    <div className="space-y-2 border-b pb-6 select-none animate-fade-in" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`py-1 px-2 rounded font-bold uppercase ${themeStyles[theme].activeItem}`}>
                          Perfil biográfico
                        </span>
                        <div className="h-3 w-[1px] bg-black/15"></div>
                        <span className={themeStyles[theme].meta}>Sobre o autor</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight w-full">
                        Sobre o autor.
                      </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-2 select-text">
                      <div className="w-24 h-24 bg-stone-200 dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-700 rounded-full flex items-center justify-center shrink-0 shadow-md">
                        <Bookmark className="h-10 w-10 text-stone-500" />
                      </div>
                      <div className={`space-y-4 text-left ${fontStyles[font]}`} style={{ fontSize: `${fontSize}px` }}>
                        <p className="leading-relaxed">
                          <b>Evandro Felix Marcondes</b>: Atua como influenciador digital há vários anos, produzindo conteúdos históricos para redes sociais e contribuindo para a divulgação da história e do patrimônio cultural junto ao público.
                        </p>
                      </div>
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
                        Sobre o autor
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Ir para Simulação <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                ) : showApresentacao && !isPrintMode ? (
                  /* RENDER DIGITAL APRESENTAÇÃO EDITORIAL SCREEN */
                  <article className="space-y-8 pb-12">
                    
                    {/* Header Titles */}
                    <div className="space-y-2 border-b pb-6 select-none animate-fade-in" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`py-1 px-2 rounded font-bold uppercase ${themeStyles[theme].activeItem}`}>
                          Prefácio Editorial
                        </span>
                        <div className="h-3 w-[1px] bg-black/15"></div>
                        <span className={themeStyles[theme].meta}>A saga da estrada de ferro.</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight w-full">
                        A saga da estrada de ferro: São Paulo Railway.
                      </h1>
                    </div>

                    {/* Integrated Illustrative Image plate */}
                    <div className="flex justify-center select-none">
                      <div className={`p-1.5 border rounded-2xl w-full max-w-md ${themeStyles[theme].card}`}>
                        <img 
                          src="/assets/images/spr_prefacio_editorial_1781894261179.jpg" 
                          alt="A saga da estrada de ferro" 
                          className="w-full h-auto aspect-[4/3] object-cover rounded-xl shadow-xs grayscale" 
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-[10.5px] font-mono opacity-80 mt-2.5 text-center leading-normal px-2">
                          Locomotiva histórica desbravando o traçado pioneiro da São Paulo Railway na subida da serra.
                        </p>
                        <p className="text-[8px] font-mono text-stone-400 dark:text-stone-500 uppercase text-center mt-1 select-none font-bold tracking-wider">Imagem Ilustrativa</p>
                      </div>
                    </div>

                    <div className={`space-y-6 text-left ${fontStyles[font]}`} style={{ fontSize: `${fontSize}px` }}>
                      <p className="text-left leading-relaxed">
                        Esta obra apresenta a história da São Paulo Railway e sua importância no desenvolvimento econômico de São Paulo. O livro aborda a construção da ferrovia entre Santos e Jundiaí, destacando os desafios de engenharia para vencer a Serra do Mar e a participação de investidores e engenheiros envolvidos no projeto.
                      </p>
                      <p className="text-left leading-relaxed">
                        Também mostra como a ferrovia transformou o transporte do café, facilitando o escoamento da produção do interior paulista até o Porto de Santos e ampliando o comércio internacional do Brasil. Ao longo da narrativa, são apresentados aspectos da presença britânica na região, o surgimento de Paranapiacaba e o impacto da ferrovia na modernização do estado de São Paulo até a transição do controle da linha para o governo brasileiro em 1946.
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
                        onClick={onBackToCover}
                        className="py-2 px-5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-black/5 border-current"
                      >
                        <ChevronLeft className="h-4 w-4" /> Acervo / Voltar
                      </button>

                      <div className="text-xs font-mono opacity-80 italic">
                        Apresentação Editorial
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Começar Leitura <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                ) : isPrintMode ? (
                  /* RENDER HIGH-FIDELITY LUXURIOUS PDF COMPILATION STAGE */
                  <div className="space-y-8 w-full overflow-x-auto pb-6">
                    
                    {printScope === 'full' ? (
                      /* ====== MAXIMUM FIDELITY COMPILED EXPANSIVE EBOOK PDF TEMPLATE ====== */
                      <div className="print-container select-text space-y-6 w-fit mx-auto font-serif print:border-0 print:shadow-none print:p-0 print:space-y-0 selection:bg-stone-200">
                        {/* COVER SHEET (PAGE 1) */}
                        <div className="pdf-fixed-page min-h-[85vh] flex flex-col justify-between p-8 sm:p-12 border-8 border-double border-[#ffd700]/30 relative bg-gradient-to-br from-[#242426] via-[#121212] to-black text-white select-none overflow-hidden" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          {/* Rich Leather pattern watermark overlay */}
                          <div className="absolute inset-0 bg-radial-to-bl from-transparent to-black/60 mix-blend-overlay opacity-90 pointer-events-none z-0" />

                          {/* Traditional Gold Embossed Double-Line Border framing the cover */}
                          <div className="absolute inset-2 sm:inset-3 border border-[#ffd700]/25 rounded-sm pointer-events-none z-10" />
                          <div className="absolute inset-3 sm:inset-4 border border-[#ffd700]/15 rounded-xs pointer-events-none z-10" />

                          {/* Gold Filigree corner decorations */}
                          <div className="absolute top-4 left-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute top-4 right-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute bottom-4 left-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>
                          <div className="absolute bottom-4 right-4 text-[#ffd700]/40 font-serif text-[10px] select-none z-10 font-bold">⚜</div>

                          <div className="z-10 text-center space-y-1.5 uppercase font-mono tracking-widest text-[#ffd700]/90">
                            <span className="text-[10px] font-black">SPR</span>
                            <div className="h-[1px] w-20 bg-[#ffd700]/30 mx-auto mt-2"></div>
                          </div>

                          <div className="z-10 space-y-4 text-center my-8 print:my-4">
                            <h1 className="text-4xl sm:text-5.5xl font-extrabold tracking-tight text-white leading-tight uppercase font-serif print:text-2xl">
                              A Saga da <br/>
                              <span className="text-[#ffd700] block text-3xl sm:text-5xl mt-2 font-black border-y border-[#ffd700]/25 py-1.5">São Paulo Railway</span>
                            </h1>
                            <div className="h-0.5 sm:h-1 w-10 sm:w-14 bg-[#ffd700]/50 mx-auto my-3 rounded-full print:hidden"></div>
                            <p className="text-xs sm:text-sm tracking-wide text-stone-300 max-w-md mx-auto uppercase font-mono leading-relaxed print:text-[9px] font-semibold">
                              o Império do Café e a Vila de Paranapiacaba
                            </p>
                          </div>

                          {/* Cover page image slot - Matching the digital version exact logo image with aspect[4/3] crop */}
                          <div className="z-10 w-full max-w-xs mx-auto border border-[#ffd700]/35 p-[2px] bg-black rounded-md shadow-lg my-1">
                            <div className="border border-[#ffd700]/15 rounded-[3px] overflow-hidden bg-stone-900">
                              <img 
                                src="/assets/images/spr_logo_1781536980657.jpg" 
                                alt="Monograma SPR" 
                                className="w-full h-auto aspect-[4/3] object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>

                          <div className="z-10 text-center pt-8 print:pt-2 select-none space-y-1">
                            <span className="text-sm font-serif font-semibold text-white block print:text-xs">Evandro Felix Marcondes</span>
                            <span className="text-[8px] font-mono tracking-widest uppercase text-stone-400 block">SERIE MEMORIA NACIONAL</span>
                          </div>
                        </div>

                        {/* PÁGINA 2: PÁGINA DE APRESENTAÇÃO */}
                        <div className="pdf-fixed-page relative overflow-hidden flex flex-col justify-between p-8 sm:p-14 border-b border-stone-200/60 print:border-b-0 print:border-none bg-[#FCFAF7]" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          
                          {/* HISTORICAL WATERMARK BACKGROUNDS */}
                          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
                            {/* Decorative vintage inner double-border */}
                            <div className="absolute inset-4 sm:inset-6 border border-stone-300/40 pointer-events-none z-10"></div>
                            <div className="absolute inset-[18px] sm:inset-[26px] border border-double border-stone-300/20 pointer-events-none z-10"></div>

                            {/* Great locomotive image watermark */}
                            <img 
                              src="/assets/images/serra_mar_challenge_spr_1781707082900.jpg" 
                              alt="SPR Locomotive Watermark" 
                              className="absolute w-[80%] max-w-lg h-auto bottom-8 right-6 opacity-[0.05] grayscale sepia pointer-events-none mix-blend-multiply"
                              referrerPolicy="no-referrer"
                            />
                            {/* Giant SPR initials watermark */}
                            <div className="absolute top-[48%] left-1/2 -translate-x-[50%] -translate-y-[50%] text-[240px] sm:text-[360px] font-serif font-black text-[#5C4D3C] opacity-[0.035] select-none tracking-widest leading-none">
                              SPR
                            </div>
                          </div>

                          <div className="space-y-6 select-text print:space-y-3 my-auto max-w-xl mx-auto z-10 relative">
                            <div className="space-y-2 text-center">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold block">Apresentação editorial.</span>
                              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight uppercase text-stone-950 leading-tight">A saga da estrada de ferro.</h2>
                            </div>
                            <div className="h-[1px] w-24 bg-[#8A7055]/50 mx-auto my-3 rounded-full print:hidden"></div>
                            
                            <div className="text-stone-900 text-sm sm:text-[14.5px] leading-relaxed font-serif text-justify space-y-4">
                              <p>
                                Esta obra apresenta a história da São Paulo Railway e sua importância no desenvolvimento econômico de São Paulo. O livro aborda a construção da ferrovia entre Santos e Jundiaí, destacando os desafios de engenharia para vencer a Serra do Mar e a participação de investidores e engenheiros envolvidos no projeto.
                              </p>
                              <p>
                                Também mostra como a ferrovia transformou o transporte do café, facilitando o escoamento da produção do interior paulista até o Porto de Santos e ampliando o comércio internacional do Brasil. Ao longo da narrativa, são apresentados aspectos da presença britânica na região, o surgimento de Paranapiacaba e o impacto da ferrovia na modernização do estado de São Paulo até a transição do controle da linha para o governo brasileiro em 1946.
                              </p>
                            </div>
                          </div>

                          <div className="text-xs font-mono text-stone-450 border-t border-stone-200/50 pt-4 flex justify-between uppercase select-none print:border-t-0 print:text-[7.5px] print:pt-1 z-10 relative mx-auto w-full max-w-xl">
                            <span>Versão para Divulgação Escrita</span>
                            <span className="font-bold text-[#8A7055]">SÃO PAULO RAILWAY COMPANY</span>
                          </div>
                        </div>

                        {/* PÁGINA 3: SUMÁRIO */}
                        <div className="pdf-fixed-page flex flex-col justify-between p-8 sm:p-14 border-b border-stone-200/60 print:border-b-0 print:border-none" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          <div className="space-y-8 my-auto max-w-lg mx-auto w-full">
                            <div className="text-center space-y-1.5 select-none">
                              <h2 className="text-2xl sm:text-3.5xl font-serif font-black uppercase text-stone-900 leading-tight">Índice.</h2>
                              <div className="h-[1px] w-16 bg-stone-300 mx-auto mt-2 print:hidden"></div>
                            </div>

                            <nav className="space-y-4 pt-2 select-text font-serif">
                              {/* Chapters Entry */}
                              {chapters.map((ch, idx) => (
                                <div key={ch.id} className="flex justify-between items-baseline gap-2 text-sm">
                                  <span className="font-mono text-xs text-[#8A7055] font-bold shrink-0">CAP. {ch.number}</span>
                                  <div className="flex flex-col">
                                    <span className="text-stone-950 font-bold tracking-tight">{ch.title}</span>
                                    <span className="text-[10px] text-stone-500 italic mt-0.5 leading-none">{ch.subtitle}</span>
                                  </div>
                                  <div className="flex-1 border-b border-dashed border-stone-300 h-1 min-w-[20px] print:border-b-0"></div>
                                  <span className="font-mono text-stone-500 text-xs bg-white px-1">Pág. {idx + 4}</span>
                                </div>
                              ))}

                              {/* Conclusão Entry */}
                              <div className="flex justify-between items-baseline gap-2 text-sm pt-1">
                                <span className="font-mono text-xs text-[#8A7055] font-bold shrink-0">ITEM I</span>
                                <span className="text-stone-950 font-bold tracking-tight">Conclusão: O impacto histórico da São Paulo Railway.</span>
                                <div className="flex-1 border-b border-dashed border-stone-300 h-1 min-w-[20px] print:border-b-0"></div>
                                <span className="font-mono text-stone-500 text-xs bg-white px-1">Pág. 10</span>
                              </div>

                              {/* Fontes & Bibliografia Entry */}
                              <div className="flex justify-between items-baseline gap-2 text-sm">
                                <span className="font-mono text-xs text-[#8A7055] font-bold shrink-0">FONTES</span>
                                <span className="text-stone-950 font-bold tracking-tight">Fontes e referências.</span>
                                <div className="flex-1 border-b border-dashed border-stone-300 h-1 min-w-[20px] print:border-b-0"></div>
                                <span className="font-mono text-stone-500 text-xs bg-white px-1">Pág. 11</span>
                              </div>

                              {/* Sobre o Autor Entry */}
                              <div className="flex justify-between items-baseline gap-2 text-sm">
                                <span className="font-mono text-xs text-[#8A7055] font-bold shrink-0">BIO</span>
                                <span className="text-stone-950 font-bold tracking-tight">Sobre o autor.</span>
                                <div className="flex-1 border-b border-dashed border-stone-300 h-1 min-w-[20px] print:border-b-0"></div>
                                <span className="font-mono text-stone-500 text-xs bg-white px-1">Pág. 12</span>
                              </div>
                            </nav>
                          </div>
                        </div>

                        {/* CHRONOLOGICAL CHAPTER PAGINATION */}
                        {chapters.map((chapter, cIdx) => {
                          const isChapterLocked = !isUnlocked && cIdx >= 2;
                          if (isChapterLocked) {
                            return (
                              <div key={chapter.id} className="pdf-flow-page space-y-6 py-12 border-b border-stone-150 print:border-b-0 print:py-8 print:space-y-4 text-center" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                                <div className="max-w-md mx-auto p-8 border-2 border-dashed border-[#8A7055]/30 bg-stone-50 rounded-2xl space-y-5 print:bg-white">
                                  <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                                    <Lock className="h-6 w-6" />
                                  </div>
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A7055]">
                                      Capítulo {chapter.number} Bloqueado
                                    </span>
                                    <h3 className="text-xl font-serif font-black text-stone-900 uppercase">
                                      {chapter.title}
                                    </h3>
                                    <p className="text-xs text-stone-600 leading-relaxed font-serif italic max-w-xs mx-auto">
                                      {chapter.subtitle}
                                    </p>
                                  </div>
                                  <div className="h-[1px] w-20 bg-[#8A7055]/20 mx-auto"></div>
                                  <p className="text-xs text-stone-500 font-sans max-w-xs mx-auto leading-relaxed">
                                    Este capítulo faz parte da edição comercial completa do e-book. Adquira a chave de acesso para desbloquear a leitura online e exportação integral em formato PDF definitivo.
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={chapter.id} className="pdf-flow-page space-y-6 py-10 border-b border-stone-100 print:border-b-0 print:py-4 print:space-y-4 select-text" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                              <div className="text-center space-y-2 pb-6 border-b border-stone-200 print:pb-2">
                                <span className="text-xs uppercase font-mono tracking-widest text-[#8A7055] font-extrabold block print:text-[8px]">Capítulo {chapter.number}</span>
                                <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight leading-tight print:text-base">{chapter.title}</h3>
                                <p className="text-xs sm:text-sm font-serif italic text-stone-500 max-w-xl mx-auto leading-relaxed mt-1 print:text-[9px]">{chapter.subtitle}</p>
                              </div>

                              {/* Center-aligned illustrated layout plate */}
                              <div className="flex justify-center py-4 print:py-2 select-none">
                                <div className="max-w-md border border-stone-350 p-1.5 bg-white rounded shadow-xs print:shadow-none print:max-w-xs print:border-stone-300">
                                  <img 
                                    src={chapter.image} 
                                    alt={chapter.title} 
                                    className="w-full h-auto max-h-[180px] aspect-[4/3] object-cover rounded-md grayscale select-none print:max-h-[140px] print:w-auto print:mx-auto" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="h-[1px] w-2/3 bg-stone-200 mx-auto mt-2 print:mt-1"></div>
                                  <p className="text-[10px] print:text-[8px] font-mono text-stone-500 mt-2 print:mt-1 text-center max-w-xs mx-auto leading-normal">{chapter.imageCaption}</p>
                                  <p className="text-[7.5px] print:text-[6.5px] font-mono text-stone-400 uppercase text-center mt-1 select-none font-bold tracking-wider">Imagem Ilustrativa</p>
                                </div>
                              </div>

                              {/* Multi-paragraph historical content in classic style */}
                              <div className="space-y-5 print:space-y-3 text-left text-stone-850 text-[15px] sm:text-[16px] print:text-[10pt] leading-relaxed font-serif px-2 sm:px-6 print:px-4">
                                {chapter.content.map((p, pIdx) => {
                                  if (p === 'Por Evandro Felix Marcondes.') {
                                    return (
                                      <p key={pIdx} className="text-right font-sans font-bold text-xs tracking-widest text-stone-600 uppercase pt-6 border-t border-stone-200/50 mt-6">
                                        {p}
                                      </p>
                                    );
                                  }
                                  return (
                                    <p key={pIdx} className="text-left leading-relaxed">
                                      {p}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}

                        {/* PÁGINA 11: CONCLUSÃO */}
                        <div className="pdf-fixed-page flex flex-col justify-between p-8 sm:p-14 border-b border-stone-200/60 print:border-b-0 print:border-none" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                          <div className="space-y-6 select-text print:space-y-3 my-auto max-w-xl mx-auto font-serif">
                            <div className="space-y-2 text-center select-none">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold block">Conclusão Final.</span>
                              <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase text-stone-950">Conclusão: O impacto histórico da São Paulo Railway.</h2>
                            </div>
                            <div className="h-[1px] w-20 bg-[#8A7055]/50 mx-auto my-3 rounded-full print:hidden"></div>

                            <div className="text-stone-800 text-[14px] sm:text-[15px] leading-relaxed text-justify space-y-4">
                              <p>
                                A São Paulo Railway foi decisiva para a modernização de São Paulo ao conectar o interior cafeeiro ao Porto de Santos. A ferrovia reduziu o isolamento da Serra do Mar e tornou mais eficiente o transporte da produção agrícola, impulsionando a economia e a integração da região. A linha também influenciou o surgimento e a organização de áreas urbanas e estruturas de apoio, como Paranapiacaba e a Estação da Luz, que ainda preservam traços desse período ferroviário.
                              </p>
                              <p>
                                Em 1946, o controle da ferrovia passou para o governo federal, encerrando a administração britânica e dando origem à Estrada de Ferro Santos–Jundiaí. Ainda assim, sua importância histórica permanece ligada ao desenvolvimento do sistema de transportes no país. Hoje, o legado da São Paulo Railway segue presente na infraestrutura e na memória histórica paulista, sendo referência para estudos sobre transporte e desenvolvimento no Brasil.
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-xs font-mono text-stone-450 border-t border-stone-100 pt-4 flex justify-between uppercase select-none print:border-t-0 print:text-[7.5px] print:pt-1">
                            <span></span>
                            <span className="text-[#8A7055] font-black tracking-widest">Conclusão</span>
                          </div>
                        </div>

                        {/* PÁGINA 12: FONTES E REFERÊNCIAS */}
                        <div className="pdf-fixed-page flex flex-col justify-between p-8 sm:p-14 border-b border-stone-200/60 print:border-b-0 print:border-none" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                           <div className="space-y-6 select-text print:space-y-3 my-auto max-w-xl mx-auto font-serif">
                             <div className="space-y-2 text-center select-none">
                               <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold block">Rigor editorial.</span>
                               <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase text-stone-950">FONTES CONSULTADAS</h2>
                               <div className="h-[1px] w-20 bg-[#8A7055]/50 mx-auto my-3 rounded-full print:hidden"></div>
                             </div>

                             <div className="space-y-5 text-[12px] text-stone-850">
                               <p className="text-stone-600 text-[12px] sm:text-[13px] leading-relaxed italic text-justify">
                                 Este livro foi elaborado a partir de uma síntese histórica baseada em bibliografia especializada e fontes institucionais relacionadas à história da São Paulo Railway, ao desenvolvimento ferroviário paulista e à economia cafeeira no Brasil.
                               </p>

                               <div className="space-y-2">
                                 <h4 className="font-bold uppercase tracking-wider text-[#8A7055] text-[10.5px] font-mono flex items-center gap-1.5">
                                   <span>📚</span> Bibliografia
                                 </h4>
                                 <ul className="space-y-1.5 text-[11.5px] text-stone-700 pl-1">
                                   <li className="leading-snug">
                                     <span className="font-bold text-stone-900">DEAN, Warren.</span> A industrialização de São Paulo (1880–1945). São Paulo: Edusp.
                                   </li>
                                   <li className="leading-snug">
                                     <span className="font-bold text-stone-900">SAES, Flávio Azevedo Marques de.</span> As ferrovias de São Paulo (1870–1940). São Paulo: Hucitec.
                                   </li>
                                   <li className="leading-snug">
                                     <span className="font-bold text-stone-900">MATOS, Odilon Nogueira de.</span> Café e ferrovias: a expansão da economia cafeeira paulista. São Paulo: Alfa-Omega.
                                   </li>
                                   <li className="leading-snug">
                                     <span className="font-bold text-stone-900">TOLEDO, Benedito Lima de.</span> Paranapiacaba: a vila e o caminho de ferro. São Paulo: Edusp, 2003.
                                   </li>
                                   <li className="leading-snug">
                                     <span className="font-bold text-stone-900">KÜHL, Beatriz Mugayar.</span> Arquitetura do ferro e patrimônio industrial no Brasil. São Paulo: Edusp.
                                   </li>
                                 </ul>
                               </div>

                               <div className="space-y-2 hidden">
                                 <h4 className="font-bold uppercase tracking-wider text-[#8A7055] text-[10.5px] font-mono flex items-center gap-1.5">
                                   <span>🏛️</span> Fontes institucionais
                                 </h4>
                                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-stone-700 list-disc pl-4">
                                   <li>Arquivo Público do Estado de São Paulo (APESP)</li>
                                   <li>Hemeroteca Digital Brasileira – Biblioteca Nacional</li>
                                   <li>British National Archives (Reino Unido)</li>
                                   <li>The Institution of Civil Engineers (ICE – Londres)</li>
                                   <li>Museu Ferroviário de Paranapiacaba</li>
                                   <li>Companhia Paulista de Trens Metropolitanos (CPTM)</li>
                                 </ul>
                               </div>

                               <div className="pt-2 border-t border-stone-200/50 hidden">
                                 <p className="text-[10.5px] text-stone-500 leading-snug flex items-start gap-1.5 bg-stone-50 p-2.5 rounded-lg border border-stone-200/30">
                                   <span className="shrink-0 text-xs">📌</span>
                                   <span><b>Observação:</b> As informações apresentadas nesta obra foram construídas a partir de estudos históricos consolidados e fontes bibliográficas especializadas, com caráter de síntese e divulgação histórica.</span>
                                 </p>
                               </div>
                             </div>
                           </div>
                          
                          <div className="text-xs font-mono text-stone-450 border-t border-stone-100 pt-4 flex justify-between uppercase select-none print:border-t-0 print:text-[7.5px] print:pt-1">
                            <span></span>
                            <span className="text-[#8A7055] font-black tracking-widest">Fontes & Referências</span>
                          </div>
                        </div>

                        {/* PÁGINA 13: SOBRE O AUTOR */}
                        <div className="pdf-fixed-page flex flex-col justify-between p-8 sm:p-14 border-4 border-double border-[#8A7055]/30 bg-stone-50 select-text font-serif min-h-[82vh] flex flex-col justify-between print:border-0 print:border-none print:p-0" style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
                          <div className="my-auto max-w-xl mx-auto space-y-6">
                            <div className="text-center space-y-2">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A7055] font-extrabold block">Perfil biográfico.</span>
                              <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase text-stone-950">Sobre o autor.</h2>
                              <div className="h-[1px] w-20 bg-[#8A7055]/50 mx-auto my-3 rounded-full print:hidden"></div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                              {/* Sleek rounded avatar mockup for author */}
                              <div className="w-24 h-24 bg-stone-200 border-2 border-stone-300 rounded-full flex items-center justify-center shrink-0 shadow-md">
                                <Bookmark className="h-10 w-10 text-stone-500" />
                              </div>
                              <div className="text-stone-800 text-[13.5px] sm:text-[14.5px] leading-relaxed text-justify space-y-3">
                                <p>
                                  <b>Evandro Felix Marcondes</b>: Atua como influenciador digital há vários anos, produzindo conteúdos históricos para redes sociais e contribuindo para a divulgação da história e do patrimônio cultural junto ao público.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-6 border-t border-stone-200 flex justify-between items-center text-[8.5px] font-mono text-stone-450 select-none uppercase mt-6 print:border-t-0 print:border-none print:pt-1 print:mt-1">
                            <span>Direitos do Volume Reservados ©</span>
                            <span className="text-[#8A7055] font-black tracking-widest">Evandro Felix Marcondes</span>
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* ====== SINGLE ACTIVE CHAPTER VIEW PRINT TEMPLATE ====== */
                      (() => {
                        const isChapterLocked = !isUnlocked && currentChapterIndex >= 2;
                        if (isChapterLocked) {
                          return (
                            <div className="pdf-flow-page space-y-6 p-6 sm:p-12 bg-white text-[#2C2620] border border-stone-300 rounded-2xl shadow-xl max-w-2xl mx-auto font-serif print:border-0 print:shadow-none select-text text-center">
                              <div className="max-w-md mx-auto p-10 border-2 border-dashed border-[#8A7055]/30 bg-stone-50 rounded-2xl space-y-5 print:bg-white my-8">
                                <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                                  <Lock className="h-6 w-6" />
                                </div>
                                <div className="space-y-2">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A7055]">
                                    Capítulo {activeChapter.number} Bloqueado
                                  </span>
                                  <h3 className="text-xl font-serif font-black text-stone-900 uppercase">
                                    {activeChapter.title}
                                  </h3>
                                  <p className="text-xs text-stone-600 leading-relaxed font-serif italic max-w-xs mx-auto">
                                    {activeChapter.subtitle}
                                  </p>
                                </div>
                                <div className="h-[1px] w-20 bg-[#8A7055]/20 mx-auto"></div>
                                <p className="text-xs text-stone-500 font-sans max-w-xs mx-auto leading-relaxed">
                                  Este capítulo faz parte da edição comercial completa do e-book. Adquira a chave de acesso para desbloquear a leitura online e exportação integral em formato PDF definitivo.
                                </p>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className="print-container pdf-flow-page space-y-6 p-6 sm:p-12 bg-white text-stone-900 border border-stone-300 rounded-2xl shadow-xl max-w-2xl mx-auto font-serif print:border-0 print:shadow-none print:space-y-4 select-text">
                            <div className="text-center space-y-2 border-b border-stone-200 pb-6 print:pb-2">
                              <span className="text-xs uppercase font-mono tracking-widest text-[#8A7055] font-extrabold block print:text-[8px]">São Paulo Railway Company • Capítulo {activeChapter.number}</span>
                              <h1 className="text-3xl font-serif font-black text-stone-900 tracking-tight leading-none print:text-base">{activeChapter.title}</h1>
                              <p className="text-xs text-stone-500 font-serif italic mt-1.5 leading-relaxed print:text-[9px]">{activeChapter.subtitle}</p>
                            </div>

                            {/* Center-aligned illustrated layout plate */}
                            <div className="w-full flex justify-center py-4 print:py-2 select-none">
                              <div className="max-w-md border border-stone-300 p-1.5 bg-white rounded print:max-w-xs print:p-1 print:shadow-none print:border-stone-300">
                                <img 
                                  src={activeChapter.image} 
                                  alt={activeChapter.title} 
                                  className="w-full h-auto max-h-[160px] aspect-[4/3] object-cover rounded-md grayscale print:max-h-[140px] print:w-auto print:mx-auto" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="h-[1px] w-2/3 bg-stone-200 mx-auto mt-2 print:mt-1"></div>
                                <p className="text-[10px] print:text-[8px] font-mono text-stone-500 mt-2 print:mt-1 text-center max-w-xs mx-auto leading-normal">{activeChapter.imageCaption}</p>
                                <p className="text-[7.5px] print:text-[6.5px] font-mono text-stone-400 uppercase text-center mt-1 select-none font-bold tracking-wider">Imagem Ilustrativa</p>
                              </div>
                            </div>

                            {/* Multi-paragraph historical content in classic style */}
                            <div className="space-y-5 print:space-y-3 text-left text-stone-850 text-[15px] sm:text-[16px] print:text-[10pt] leading-relaxed font-serif px-2 sm:px-6 print:px-4">
                              {activeChapter.content.map((p, pIdx) => {
                                if (p === 'Por Evandro Felix Marcondes.') {
                                  return (
                                    <p key={pIdx} className="text-right font-sans font-bold text-xs tracking-widest text-stone-600 uppercase pt-6 border-t border-stone-200/50 mt-6">
                                      {p}
                                    </p>
                                  );
                                }
                                return (
                                  <p key={pIdx} className="text-left leading-relaxed">
                                    {p}
                                  </p>
                                );
                              })}
                            </div>

                            <div className="border-t border-stone-200 pt-6 print:pt-2 flex justify-between items-center text-xs font-mono text-stone-450 select-none print:border-t-0 print:border-none print:text-[8px]">
                              <span>Estudos Ferroviários • Memória Nacional</span>
                              <span>Capítulo {activeChapter.number} de {chapters.length}</span>
                            </div>
                          </div>
                        );
                      })()
                    )}


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
                        <p className="text-[8px] font-mono text-stone-400 dark:text-stone-500 uppercase text-center mt-1 select-none font-bold tracking-wider">Imagem Ilustrativa</p>
                      </div>
                    </div>

                    {/* Interactive Reading body with dynamic inline settings sizing */}
                    <div 
                      className={`space-y-6 text-left ${fontStyles[font]}`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {activeChapter.content.map((p, pIdx) => {
                        if (p === 'Por Evandro Felix Marcondes.') {
                          return (
                            <p key={pIdx} className="text-right font-sans font-extrabold text-sm tracking-widest uppercase opacity-80 pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                              {p}
                            </p>
                          );
                        }
                        return (
                          <p key={pIdx} className="text-left leading-relaxed">
                            {p}
                          </p>
                        );
                      })}
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
                        className="py-2 px-5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:bg-black/5 border-current"
                      >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                      </button>

                      <div className="text-xs font-mono opacity-80 italic">
                        Você está na página {activeChapter.number} de {chapters.length}
                      </div>

                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 bg-[#8A7055] hover:bg-[#725C46] text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {isLastChapter ? 'Ir para Conclusão' : 'Próxima Seção'}
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
