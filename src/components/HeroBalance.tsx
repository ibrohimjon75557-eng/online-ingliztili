import React, { useState } from 'react';
import { Sparkles, Gift, Package, User, Flame, ArrowRight, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import { fireStarBurst } from '../utils/confetti';

interface HeroBalanceProps {
  stars: number;
  streak: number;
  userName: string;
  userAvatar: string;
  isDailyBonusReady: boolean;
  onEarnStarClick: () => void;
  onNavigateTab: (tab: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile') => void;
  myGiftsCount: number;
}

export const HeroBalance: React.FC<HeroBalanceProps> = ({
  stars,
  streak,
  userName,
  userAvatar,
  isDailyBonusReady,
  onEarnStarClick,
  onNavigateTab,
  myGiftsCount,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [floatNotes, setFloatNotes] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleStarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sound.playStar();
    const newNote = { id: Date.now() + Math.random(), x, y };
    setFloatNotes((prev) => [...prev.slice(-8), newNote]);

    setTimeout(() => {
      setFloatNotes((prev) => prev.filter((n) => n.id !== newNote.id));
    }, 900);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    // Every 5 clicks, give an instant +1 bonus star
    if (nextCount % 5 === 0) {
      fireStarBurst();
      onEarnStarClick();
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative floating mini stars */}
      <div className="absolute top-8 left-[10%] text-2xl select-none animate-float opacity-70">✨</div>
      <div className="absolute top-20 right-[15%] text-xl select-none animate-float-delayed opacity-60">⭐</div>
      <div className="absolute bottom-6 left-[20%] text-3xl select-none animate-float opacity-50">🌟</div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Welcome greeting */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <span>{userAvatar}</span>
          <span>Xush kelibsiz, <strong className="text-amber-300 font-semibold">{userName}</strong>!</span>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-amber-400 font-mono-numbers">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>{streak} kunlik seriya</span>
          </div>
        </div>

        {/* Main Giant Balance Card */}
        <div className="relative mx-auto max-w-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
          {/* Daily bonus pill trigger if ready */}
          {isDailyBonusReady && (
            <div 
              onClick={() => { onNavigateTab('earn'); sound.playClick(); }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-1 rounded-full shadow-lg shadow-amber-500/40 animate-pulse hover:scale-105 transition-transform"
            >
              🎉 Kunlik bonus kutmoqda (+5 ⭐)
            </div>
          )}

          {/* Interactive Glowing Star Container */}
          <div className="relative inline-block my-2">
            <div
              onClick={handleStarClick}
              title="Yulduzni bosing! Har 5 bosishda +1 bonus ⭐"
              className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto flex items-center justify-center cursor-pointer select-none group"
            >
              {/* Outer pulsing glow aura */}
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl group-hover:bg-amber-400/35 transition-all animate-pulse-glow" />
              
              {/* Star icon with rotation & bounce */}
              <div className="text-7xl sm:text-8xl transform group-hover:scale-110 group-active:scale-95 transition-transform duration-200 drop-shadow-[0_10px_25px_rgba(245,158,11,0.5)]">
                ⭐
              </div>

              {/* Floating +1 / Sparkle clicks */}
              {floatNotes.map((note) => (
                <div
                  key={note.id}
                  style={{ left: `${note.x}px`, top: `${note.y}px` }}
                  className="absolute pointer-events-none text-amber-300 font-extrabold text-sm sm:text-base animate-out fade-out slide-out-to-top-8 duration-700 font-mono-numbers drop-shadow-md"
                >
                  +1 ⭐
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Yulduzchani bosing (har 5 ta bosishda bonus)</span>
            </p>
          </div>

          {/* Large star balance text */}
          <div className="mt-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
              Sizning Balansingiz
            </span>
            <div className="text-4xl sm:text-6xl font-black tracking-tight text-white flex items-center justify-center gap-3">
              <span className="text-amber-400 drop-shadow-md">⭐</span>
              <span className="font-mono-numbers bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                {stars}
              </span>
              <span className="text-2xl sm:text-4xl font-bold text-amber-300">
                yulduzcha
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-md mx-auto">
              Topshiriqlarni bajaring, do‘stlaringizni chorlang va virtual sovg‘alarga almashtiring!
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <button
              onClick={() => {
                onNavigateTab('earn');
                sound.playClick();
              }}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Yulduzcha Yig‘ish</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                onNavigateTab('shop');
                sound.playClick();
              }}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 hover:border-amber-400/50 text-white font-bold text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Gift className="w-5 h-5 text-amber-400" />
              <span>Sovg‘alar Do‘koni</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          {/* Card 1: Daily Quests */}
          <div
            onClick={() => { onNavigateTab('earn'); sound.playClick(); }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group hover:bg-slate-900/90"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                +1 dan +10 ⭐
              </span>
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
              Oson Topshiriqlar
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Kunlik bonus, viktorina, saytga kirish va promo-kodlar orqali tezda yulduz yig‘ing.
            </p>
          </div>

          {/* Card 2: Virtual Gifts */}
          <div
            onClick={() => { onNavigateTab('shop'); sound.playClick(); }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group hover:bg-slate-900/90"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🍫</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                15 ⭐ dan
              </span>
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
              Haqiqiy Mazali Sovg‘alar
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Snickers, Twix, KitKat, Coca-Cola va sirli Mystery Box sovg‘alarini sotib oling.
            </p>
          </div>

          {/* Card 3: Inventory & Profile */}
          <div
            onClick={() => { onNavigateTab('my-gifts'); sound.playClick(); }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group hover:bg-slate-900/90"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📦</span>
              <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                {myGiftsCount} ta sovg‘a
              </span>
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
              Mening Sovg‘alarim
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Xarid qilingan sovg‘alarni ko‘ring, promokodlarini oling yoki Mystery Box qutisini oching!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
