import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, LogIn, HelpCircle, Share2, Send, Key, CheckCircle2, Clock, Gift, ArrowRight } from 'lucide-react';
import { TaskItem } from '../types';
import { sound } from '../utils/sound';
import { fireConfetti, fireStarBurst } from '../utils/confetti';

interface EarnStarsSectionProps {
  stars: number;
  lastDailyBonusDate: string | null;
  completedTasks: string[];
  redeemedPromoCodes: string[];
  onClaimDailyBonus: () => void;
  onClaimTask: (taskId: string, reward: number) => void;
  onRedeemPromo: (code: string) => boolean;
  onNavigateTab: (tab: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile') => void;
}

export const EarnStarsSection: React.FC<EarnStarsSectionProps> = ({
  stars,
  lastDailyBonusDate,
  completedTasks,
  redeemedPromoCodes,
  onClaimDailyBonus,
  onClaimTask,
  onRedeemPromo,
  onNavigateTab,
}) => {
  // Countdown to next daily bonus
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [canClaimDaily, setCanClaimDaily] = useState(true);

  // Promo code form state
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quiz modal state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Social share toast
  const [shareSuccess, setShareSuccess] = useState(false);
  const [telegramSuccess, setTelegramSuccess] = useState(false);

  const quizQuestions = [
    {
      q: "Quyosh sistemasidagi eng katta sayyora qaysi?",
      options: ["Mars", "Yupiter", "Venera", "Saturn"],
      correct: 1,
    },
    {
      q: "Yerga eng yaqin bo'lgan yulduz qaysi?",
      options: ["Quyosh", "Sirius", "Shimoliy Yulduz", "Vega"],
      correct: 0,
    },
    {
      q: "Oqqush yulduz turkumining eng yorqin yulduzi nima deb ataladi?",
      options: ["Betelgeyze", "Deneb", "Rigel", "Aldebaran"],
      correct: 1,
    },
  ];

  // Daily bonus 24-hour verification logic
  useEffect(() => {
    const checkDailyStatus = () => {
      if (!lastDailyBonusDate) {
        setCanClaimDaily(true);
        setTimeLeft(null);
        return;
      }

      const lastClaimTime = new Date(lastDailyBonusDate).getTime();
      const now = Date.now();
      const diffMs = now - lastClaimTime;
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (diffMs >= twentyFourHours) {
        setCanClaimDaily(true);
        setTimeLeft(null);
      } else {
        setCanClaimDaily(false);
        const remainingMs = twentyFourHours - diffMs;
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    checkDailyStatus();
    const interval = setInterval(checkDailyStatus, 1000);
    return () => clearInterval(interval);
  }, [lastDailyBonusDate]);

  const handleDailyClick = () => {
    if (!canClaimDaily) return;
    sound.playBigReward();
    fireConfetti();
    onClaimDailyBonus();
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (redeemedPromoCodes.includes(code)) {
      sound.playClick();
      setPromoMessage({
        type: 'error',
        text: 'Bu promo-kod allaqachon ishlatilgan!',
      });
      return;
    }

    const success = onRedeemPromo(code);
    if (success) {
      sound.playBigReward();
      fireConfetti();
      setPromoMessage({
        type: 'success',
        text: 'Ajoyib! +10 ⭐ maxsus bonus hisobingizga qo‘shildi!',
      });
      setPromoInput('');
    } else {
      sound.playClick();
      setPromoMessage({
        type: 'error',
        text: 'Noto‘g‘ri kod. Iltimos tekshirib qayta kiriting (Masalan: STAR2026 yoki OMAD)',
      });
    }
  };

  const handleStartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizFinished(false);
    setIsQuizOpen(true);
    sound.playClick();
  };

  const handleQuizAnswer = (selectedIndex: number) => {
    sound.playClick();
    const currentQ = quizQuestions[quizStep];
    const isCorrect = selectedIndex === currentQ.correct;
    const nextScore = isCorrect ? quizScore + 1 : quizScore;
    setQuizScore(nextScore);

    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
      if (nextScore >= 2) {
        sound.playBigReward();
        fireConfetti();
        onClaimTask('task-quiz', 3);
      }
    }
  };

  const handleShareClick = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareSuccess(true);
    setTimeout(() => {
      onClaimTask('task-share', 3);
      fireStarBurst();
      sound.playStar();
    }, 600);
    setTimeout(() => setShareSuccess(false), 3500);
  };

  const handleTelegramClick = () => {
    sound.playClick();
    setTelegramSuccess(true);
    setTimeout(() => {
      onClaimTask('task-telegram', 3);
      fireStarBurst();
      sound.playStar();
    }, 800);
    setTimeout(() => setTelegramSuccess(false), 3500);
  };

  const isLoginTaskDone = completedTasks.includes('task-login');
  const isQuizTaskDone = completedTasks.includes('task-quiz');
  const isShareTaskDone = completedTasks.includes('task-share');
  const isTelegramTaskDone = completedTasks.includes('task-telegram');

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Yulduzlar Konveyeri</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Yulduzcha Yig‘ish Bo‘limi ⭐
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Quyidagi oson topshiriqlarni bajaring va har kuni yangi yulduzchalarni to‘plang!
        </p>
      </div>

      {/* Featured Big Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Task 1: Saytga kirish (+1 ⭐) */}
        <div className={`p-6 rounded-3xl border transition-all ${
          isLoginTaskDone
            ? 'bg-slate-900/40 border-slate-800 opacity-80'
            : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border-blue-500/30 shadow-lg shadow-blue-500/5'
        }`}>
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl">
              🚀
            </div>
            <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-xl text-xs font-mono font-bold">
              <span>+1</span>
              <span>⭐</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mt-4 flex items-center gap-2">
            1. Saytga kirish
            {isLoginTaskDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-5">
            Platformaga tashrif buyurganingiz uchun xush kelibsiz rag‘batlantiruvchi yulduzchasi.
          </p>

          <button
            disabled={isLoginTaskDone}
            onClick={() => {
              sound.playStar();
              fireStarBurst();
              onClaimTask('task-login', 1);
            }}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              isLoginTaskDone
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isLoginTaskDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Qabul qilingan</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>+1 ⭐ Yulduzchani Olish</span>
              </>
            )}
          </button>
        </div>

        {/* Task 2: Kunlik bonus (+5 ⭐) */}
        <div className={`p-6 rounded-3xl border transition-all ${
          !canClaimDaily
            ? 'bg-slate-900/40 border-slate-800'
            : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 border-amber-500/40 shadow-xl shadow-amber-500/10'
        }`}>
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl animate-bounce">
              🎁
            </div>
            <div className="flex items-center gap-1 bg-amber-500/30 border border-amber-400 text-amber-200 px-3 py-1 rounded-xl text-xs font-mono font-bold">
              <span>+5</span>
              <span>⭐</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mt-4 flex items-center gap-2">
            2. Kunlik bonus
            {!canClaimDaily && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-5">
            Kuniga bir marta beriladigan doimiy bonus. Har kuni kiring va yulduzlar to‘plang!
          </p>

          <button
            disabled={!canClaimDaily}
            onClick={handleDailyClick}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              canClaimDaily
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] animate-pulse'
                : 'bg-slate-800/90 text-slate-400 cursor-not-allowed border border-slate-700/60'
            }`}
          >
            {canClaimDaily ? (
              <>
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>+5 ⭐ Bonusni Olish</span>
              </>
            ) : (
              <div className="flex items-center gap-2 font-mono text-xs">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>
                  Keyingi bonus: {timeLeft ? `${timeLeft.hours}s ${timeLeft.minutes}d ${timeLeft.seconds}sek` : 'Ertaga'}
                </span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Task 3 & 4: Topshiriqlar (+3 ⭐) va Maxsus bonus (+10 ⭐) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Task 3: Topshiriqlar bajarish (+3 ⭐) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-base font-bold text-white">3. Topshiriq bajarish</h3>
                <span className="text-xs text-slate-400">Har bir topshiriq uchun +3 ⭐</span>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl">
              +3 ⭐ / topshiriq
            </span>
          </div>

          {/* Subtask A: Quiz */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Yulduzli Viktorina</h4>
                <p className="text-[11px] text-slate-400">3 ta savolga to‘g‘ri javob bering</p>
              </div>
            </div>
            <button
              onClick={handleStartQuiz}
              disabled={isQuizTaskDone}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                isQuizTaskDone
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {isQuizTaskDone ? 'Bajarildi ✓' : 'Boshlash'}
            </button>
          </div>

          {/* Subtask B: Share */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Do‘stlarga ulashish</h4>
                <p className="text-[11px] text-slate-400">
                  {shareSuccess ? '✓ Nusxalandi! +3 ⭐ berildi' : 'Havolani do‘stlarga yuboring'}
                </p>
              </div>
            </div>
            <button
              onClick={handleShareClick}
              disabled={isShareTaskDone}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                isShareTaskDone
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              {isShareTaskDone ? 'Bajarildi ✓' : 'Ulashish'}
            </button>
          </div>

          {/* Subtask C: Telegram */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Telegram Kanali</h4>
                <p className="text-[11px] text-slate-400">
                  {telegramSuccess ? '✓ Hamjamiyatga a‘zo bo‘lindi!' : 'Yangiliklar kanalimizga tashrif'}
                </p>
              </div>
            </div>
            <button
              onClick={handleTelegramClick}
              disabled={isTelegramTaskDone}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                isTelegramTaskDone
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              {isTelegramTaskDone ? 'Bajarildi ✓' : 'A‘zo bo‘lish'}
            </button>
          </div>
        </div>

        {/* Task 4: Maxsus bonus (+10 ⭐) Promo Code */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="text-base font-bold text-white">4. Maxsus bonus</h3>
                  <span className="text-xs text-purple-300">Maxsus Promo-kod orqali</span>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-xl font-bold">
                +10 ⭐
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm mt-4 mb-4">
              Sirli promokodlarni kiriting va bir zumda <strong>+10 ⭐ yulduzcha</strong> oling!
            </p>

            {/* Quick Hints */}
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-purple-500/20 mb-4 text-xs text-slate-300">
              <span className="text-amber-400 font-semibold">💡 Ishlatiladigan kodlar:</span>{' '}
              <button
                type="button"
                onClick={() => setPromoInput('STAR2026')}
                className="underline hover:text-white font-mono text-purple-300 mx-1"
              >
                STAR2026
              </button>
              yoki{' '}
              <button
                type="button"
                onClick={() => setPromoInput('OMAD')}
                className="underline hover:text-white font-mono text-purple-300 mx-1"
              >
                OMAD
              </button>
              (bosing)
            </div>

            <form onSubmit={handlePromoSubmit} className="space-y-3">
              <div className="relative">
                <Key className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="KODNI KIRITING..."
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-mono text-white placeholder-slate-500 uppercase tracking-widest outline-none transition-all"
                />
              </div>

              {promoMessage && (
                <p className={`text-xs font-semibold ${
                  promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {promoMessage.text}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Bonusni Faollashtirish (+10 ⭐)
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Faollashtirilgan kodlar: {redeemedPromoCodes.length} ta
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            {!quizFinished ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-purple-400">
                    Savol {quizStep + 1} / {quizQuestions.length}
                  </span>
                  <button
                    onClick={() => setIsQuizOpen(false)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    Yopish ✕
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {quizQuestions[quizStep].q}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className="w-full text-left p-3.5 rounded-2xl bg-slate-950 hover:bg-purple-900/40 border border-slate-800 hover:border-purple-500/50 text-slate-200 text-sm font-semibold transition-all hover:translate-x-1"
                    >
                      <span className="text-purple-400 font-mono mr-2">{String.fromCharCode(65 + idx)})</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <span className="text-5xl mb-3 block">
                  {quizScore >= 2 ? '🎉' : '📚'}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {quizScore >= 2 ? 'Tabriklaymiz!' : 'Yaxshi urinish!'}
                </h3>
                <p className="text-slate-300 text-sm mb-6">
                  Siz {quizQuestions.length} ta savoldan <strong>{quizScore}</strong> tasiga to‘g‘ri javob berdingiz!
                  {quizScore >= 2 && ' +3 ⭐ Yulduzcha taqdirlandi!'}
                </p>
                <button
                  onClick={() => setIsQuizOpen(false)}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg"
                >
                  Tushunarli
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA to shop */}
      <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-base font-bold text-white">Yig‘ilgan yulduzlaringiz bormi?</h4>
          <p className="text-xs text-slate-400">Do‘konga o‘ting va sevimli shirinlik yoki sovg‘alarni xarid qiling!</p>
        </div>
        <button
          onClick={() => {
            onNavigateTab('shop');
            sound.playClick();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm whitespace-nowrap shadow-md shadow-amber-500/20"
        >
          <Gift className="w-4 h-4 text-slate-950" />
          <span>Sovg‘alar Do‘koniga o‘tish</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
