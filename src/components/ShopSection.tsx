import React, { useState } from 'react';
import { Gift, ShoppingCart, Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { GiftItem } from '../types';
import { INITIAL_GIFTS } from '../data/mockData';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface ShopSectionProps {
  userStars: number;
  onBuyGift: (gift: GiftItem) => void;
  onNavigateTab: (tab: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile') => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  userStars,
  onBuyGift,
  onNavigateTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sweet' | 'drink' | 'special'>('all');
  const [confirmGift, setConfirmGift] = useState<GiftItem | null>(null);
  const [successGift, setSuccessGift] = useState<GiftItem | null>(null);

  const filteredGifts = INITIAL_GIFTS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleStartPurchase = (gift: GiftItem) => {
    sound.playClick();
    setConfirmGift(gift);
  };

  const handleConfirmPurchase = () => {
    if (!confirmGift) return;
    if (userStars < confirmGift.stars) {
      sound.playClick();
      return;
    }

    sound.playPurchase();
    fireConfetti();
    onBuyGift(confirmGift);
    setSuccessGift(confirmGift);
    setConfirmGift(null);
  };

  return (
    <div className="py-6 sm:py-10 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>Virtual Sovg‘alar Do‘koni</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Yulduzchalarni Sovg‘alarga Almashtiring 🎁
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          To‘plagan yulduzchalaringiz evaziga shirinliklar, ichimliklar va kutilmagan sirli sovg‘alarni qo‘lga kiriting!
        </p>

        {/* Current user balance banner */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-slate-900 border border-amber-500/30 text-amber-300 text-sm font-semibold shadow-inner">
          <span>Mavjud balansingiz:</span>
          <span className="font-mono-numbers text-base font-black text-white">⭐ {userStars}</span>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {[
          { id: 'all', label: 'Barchasi', icon: '✨' },
          { id: 'sweet', label: 'Shirinliklar', icon: '🍫' },
          { id: 'drink', label: 'Ichimliklar', icon: '🥤' },
          { id: 'special', label: 'Maxsus Sovg‘alar', icon: '🎁' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id as typeof selectedCategory);
              sound.playClick();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map((gift) => {
          const canAfford = userStars >= gift.stars;
          const starsNeeded = gift.stars - userStars;
          const isMystery = gift.id === 'mystery-box';
          const isSuper = gift.id === 'super-gift';

          return (
            <div
              key={gift.id}
              className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group ${
                isMystery
                  ? 'bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/40 shadow-xl shadow-purple-500/10 hover:border-purple-400'
                  : isSuper
                  ? 'bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border border-yellow-500/40 shadow-xl shadow-yellow-500/10 hover:border-yellow-400'
                  : 'bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/40 shadow-lg hover:shadow-amber-500/5'
              } hover:-translate-y-1`}
            >
              {/* Tag pill */}
              {gift.tag && (
                <div className="absolute top-4 right-4">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isMystery
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : isSuper
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                  }`}>
                    {gift.tag}
                  </span>
                </div>
              )}

              {/* Emoji icon showcase */}
              <div className="flex flex-col items-center text-center mt-2 mb-4">
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mb-4 transition-transform group-hover:scale-110 select-none ${
                  isMystery
                    ? 'bg-purple-900/30 border border-purple-500/30 shadow-inner'
                    : isSuper
                    ? 'bg-yellow-900/30 border border-yellow-500/30 shadow-inner'
                    : 'bg-slate-950/80 border border-slate-800'
                }`}>
                  <span className={isMystery ? 'animate-pulse' : ''}>{gift.emoji}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {gift.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 min-h-[36px] line-clamp-2 px-2">
                  {gift.description}
                </p>
              </div>

              {/* Price & Action button */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Narxi:
                  </span>
                  <div className="flex items-center gap-1.5 font-mono-numbers">
                    <span className="text-lg">⭐</span>
                    <span className="text-xl font-black text-amber-300">{gift.stars}</span>
                    <span className="text-xs text-slate-400">yulduz</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartPurchase(gift)}
                  disabled={!canAfford}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    canAfford
                      ? isMystery
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98]'
                        : isSuper
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-800/90 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {canAfford ? 'Sotib olish' : `Yetarli emas (yana ${starsNeeded} ⭐)`}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {confirmGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-5xl mx-auto mb-4">
              {confirmGift.emoji}
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">
              {confirmGift.name}ni sotib olasizmi?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Bu sovg‘a sizning "Mening sovg‘alarim" ro‘yxatiga qo‘shiladi va hisobingizdan{' '}
              <strong className="text-amber-300 font-mono">⭐ {confirmGift.stars}</strong> yulduzcha yechiladi.
            </p>

            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6 text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Hozirgi balansingiz:</span>
                <span className="font-mono text-white">⭐ {userStars}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Sovg‘a narxi:</span>
                <span className="font-mono">- ⭐ {confirmGift.stars}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                <span>Qoladigan balans:</span>
                <span className="font-mono">⭐ {userStars - confirmGift.stars}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConfirmGift(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Celebration Modal */}
      {successGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-5xl mx-auto mb-4 animate-bounce">
              {successGift.emoji}
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              Tabriklaymiz! 🎉
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Siz muvaffaqiyatli ravishda <strong>{successGift.name}</strong> sovg‘asini sotib oldingiz!
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setSuccessGift(null);
                  onNavigateTab('my-gifts');
                  sound.playClick();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <span>Mening Sovg‘alarimga O‘tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSuccessGift(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Yana xarid qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
