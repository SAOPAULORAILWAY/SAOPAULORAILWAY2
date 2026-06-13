import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, BookOpen, Share2 } from 'lucide-react';
import { quizQuestions } from '../data/chapters';

export default function HistoryQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Rank thresholds based on correct answers
  const getRank = () => {
    if (score === quizQuestions.length) {
      return {
        title: 'Historiador Imperial',
        desc: 'Excepcional! Você domina todos os meandros da ligação vitoriana entre Jundiaí e Santos, desde as engrenagens de Mauá aos fogs de Paranapiacaba.',
        color: 'text-amber-600 border-amber-500 bg-amber-500/10'
      };
    } else if (score >= 3) {
      return {
        title: 'Pioneiro Ferroviário',
        desc: 'Muito bom! Você compreendeu profundamente os planos inclinados, a influência britânica e os obstáculos técnicos ultrapassados pela ferrovia.',
        color: 'text-emerald-700 border-emerald-600 bg-emerald-600/10'
      };
    } else {
      return {
        title: 'Viajante de Vagão',
        desc: 'Você concluiu o trajeto básico! Que tal reler as seções ilustradas do e-book para dominar a mecânica dos funiculares e o pioneirismo de Mauá?',
        color: 'text-stone-600 border-stone-400 bg-stone-100'
      };
    }
  };

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const rank = getRank();

  return (
    <div className="w-full max-w-xl mx-auto py-4 bg-white/50 backdrop-blur-md border border-black/10 rounded-2xl p-6 sm:p-8 shadow-lg">
      
      {!quizFinished ? (
        /* 1. QA Stage Active */
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-black/15 pb-4 font-mono text-xs select-none">
            <span className="text-[#8A7055] font-extrabold flex items-center gap-1.5 uppercase">
              <BookOpen className="h-4 w-4" /> Quiz de Aprendizado Histórico
            </span>
            <span className="opacity-80">
              Questão {currentIndex + 1} de {quizQuestions.length}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-serif text-stone-950 font-bold leading-snug">
            {currentQuestion.question}
          </h2>

          {/* Options list selection nodes */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = currentQuestion.correctIndex === optIdx;
              
              let optionStyle = 'border-stone-300 hover:border-[#8A7055] hover:bg-[#8A7055]/5 text-stone-800';
              if (isSelected) optionStyle = 'border-stone-800 bg-stone-100 font-medium text-stone-950 ring-1 ring-stone-950';
              
              if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600';
                } else if (isSelected) {
                  optionStyle = 'border-rose-600 bg-rose-50 text-rose-800 ring-1 ring-rose-500';
                } else {
                  optionStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(optIdx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                >
                  <span className="font-mono text-xs font-semibold translate-y-0.5 opacity-60">
                    {String.fromCharCode(65 + optIdx)})
                  </span>
                  <span className="flex-1 leading-normal">{opt}</span>
                  
                  {isSubmitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner Box */}
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-[#EDDDB3] bg-[#EDDDB3]/20 space-y-2 mt-4 text-sm"
            >
              <h4 className="font-serif font-bold text-[#8A7055] flex items-center gap-1">
                🔬 Fato Histórico Comprovado
              </h4>
              <p className="text-[#52463A] leading-relaxed italic text-xs sm:text-sm">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Action buttons (Confirm Answer -> Next Question) */}
          <div className="pt-4 border-t border-black/10 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedOption === null}
                className={`py-3 px-6 rounded-lg text-sm font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
                  selectedOption === null 
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                    : 'bg-[#8A7055] hover:bg-[#725C46] text-white shadow-xs'
                }`}
              >
                Confirmar Resposta <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 cursor-pointer transition-all"
              >
                {currentIndex === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima Questão'} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* 2. Finished Rank & Certificate Template card styling */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 py-4"
        >
          {/* Certificate Layout */}
          <div className="border-[6px] border-double border-stone-400 p-6 bg-[#FAF7F2] rounded-xl shadow-inner space-y-4 max-w-md mx-auto">
            <Award className="h-12 w-12 text-amber-500 mx-auto animate-bounce" />
            
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-widest text-[#8A7055] uppercase block">Diploma de Aproveitamento</span>
              <h3 className="text-xl font-serif font-bold text-stone-950 uppercase tracking-tight">São Paulo Railway Saga</h3>
            </div>

            <div className="w-16 h-[2px] bg-[#8A7055]/40 mx-auto"></div>

            <div className={`inline-block py-1.5 px-4 border rounded-full text-xs font-mono font-bold ${rank.color}`}>
              Título obtido: {rank.title}
            </div>

            <p className="text-xs text-[#52463A] leading-relaxed max-w-sm mx-auto">
              {rank.desc}
            </p>

            <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[9px] font-mono text-[#8A7055]">
              <span>Placar: {score} de 5 Acertos</span>
              <span className="font-bold">VERIDICIDADE HISTÓRICA</span>
            </div>
          </div>

          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-md max-w-sm mx-auto text-center"
            >
              ✓ Placar copiado! Pronto para ser colado em suas redes sociais!
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-md mx-auto">
            <button
              onClick={resetQuiz}
              className="py-3 px-6 border border-stone-300 hover:border-[#8A7055] text-stone-600 hover:text-[#8A7055] rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Refazer Quiz
            </button>
            <button
              onClick={handleShare}
              className="py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" /> Compartilhar Rank
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
