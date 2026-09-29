import React, { useState } from 'react';
import { Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';
import { PurchasedGift } from '../types';
import { sound } from '../utils/sound';
import { fireConfetti, fireStarBurst } from '../utils/confetti';

interface MysteryBoxModalProps {
  gift: PurchasedGift;
  onClose: () => void;
  onBoxOpened: (giftId: string, rewardStars: number, rewardTitle: string, rewardDesc: string) => void;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  gift,
  onClose,
  onBoxOpened,
}) => {
  const [openingState, setOpeningState] = useState<'ready' | 'opening' | 'revealed'>('ready');
  const [rewardWon, setRewardWon] = useState<{ stars: number; title: string; desc: string } | null>(null);

  const handleOpenBox = () => {
    setOpeningState('opening');
    sound.playClick();

    // Box shake & suspense sequence
    setTimeout(() => {
      sound.playFanfare();
      fireConfetti();
      fireStarBurst();

      // Pick weighted random reward
      const roll = Math.random();
      let stars = 60;
      let title = "Oltin Yulduzlar To‘plami!";
      let desc = "Kutilmagan omad! Quti ichidan 60 ta qo‘shimcha yulduzcha chiqdi!";

      if (roll > 0.85) {
        stars = 120;
        title = "JEKPOT! Super Sandiq 🌟";
        desc = "Afsonaviy yutuq! Siz 120 ta toza yulduzchani qo‘lga kiritdingiz!";
      } else if (roll > 0.5) {
        stars = 85;
        title = "Katta Yulduzlar Sandig‘i ✨";
        desc = "Ajoyib natija! Sandiqdan 85 ta oltin yulduzcha chiqdi!";
      } else {
        stars = 60;
        title = "Omadli Sandiq ⭐";
        desc = "Tabriklaymiz! Sandiqdan 60 ta yorqin yulduzcha chiqdi!";
      }

      setRewardWon({ stars, title, desc });
      setOpeningState('revealed');
      onBoxOpened(gift.id, stars, title, desc);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-gradient-to-b from-purple-950/70 via-slate-900 to-slate-950 border border-purple-500/40 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl relative text-center overflow-hidden">
        {/* Ambient glow light */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {openingState === 'ready' && (
          <div className="relative z-10">
            <div className="text-7xl sm:text-8xl mb-4 select-none animate-float">
              🎁
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Mystery Box Sandig‘i
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-8 max-w-sm mx-auto">
              Sandiq ichida 60 dan 120 tagacha ⭐ yulduzcha va maxsus yutuqlar yashiringan. Qutini ochishga tayyormisiz?
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors flex-1"
              >
                Keyinroq ochish
              </button>
              <button
                onClick={handleOpenBox}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white text-sm font-extrabold shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex-1"
              >
                ✨ Qutini Ochish!
              </button>
            </div>
          </div>
        )}

        {openingState === 'opening' && (
          <div className="py-8 relative z-10">
            <div className="text-8xl mb-6 select-none animate-bounce drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]">
              🎁
            </div>
            <h3 className="text-2xl font-black text-amber-300 animate-pulse mb-2">
              Sandiq ochilmoqda...
            </h3>
            <p className="text-slate-400 text-sm">
              Kutilmagan mukofot aniqlanmoqda, bir oz kuting!
            </p>
          </div>
        )}

        {openingState === 'revealed' && rewardWon && (
          <div className="py-2 relative z-10 animate-in zoom-in-90 duration-300">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 mx-auto mb-4 shadow-xl shadow-amber-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-5xl">
                🌟
              </div>
            </div>

            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Kutilmagan Mukofot!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
              {rewardWon.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-sm mx-auto">
              {rewardWon.desc}
            </p>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-500/30 mb-6 flex items-center justify-center gap-3">
              <span className="text-2xl">⭐</span>
              <span className="text-3xl font-black text-amber-300 font-mono-numbers">
                +{rewardWon.stars}
              </span>
              <span className="text-sm font-bold text-white">Yulduzcha hisobingizga qo‘shildi!</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Mukofotni Qabul Qilish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
