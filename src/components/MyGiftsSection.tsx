import React, { useState } from 'react';
import { Package, Copy, Check, Gift, Sparkles, ExternalLink, ArrowRight, Award } from 'lucide-react';
import { PurchasedGift } from '../types';
import { formatUzbekDate } from '../utils/storage';
import { sound } from '../utils/sound';

interface MyGiftsSectionProps {
  gifts: PurchasedGift[];
  onMarkUsed: (giftId: string) => void;
  onOpenMysteryBox: (gift: PurchasedGift) => void;
  onNavigateTab: (tab: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile') => void;
}

export const MyGiftsSection: React.FC<MyGiftsSectionProps> = ({
  gifts,
  onMarkUsed,
  onOpenMysteryBox,
  onNavigateTab,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'used'>('all');

  const handleCopyCode = (id: string, code: string) => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredGifts = gifts.filter((gift) => {
    if (filter === 'active') return !gift.used;
    if (filter === 'used') return gift.used;
    return true;
  });

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold mb-3">
          <Package className="w-3.5 h-3.5 text-sky-400" />
          <span>Foydalanuvchi Inventari</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Mening Sovg‘alarim 📦
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Siz xarid qilgan barcha virtual sovg‘alar, promokodlar va yutuqlar shu yerda saqlanadi.
        </p>
      </div>

      {/* Tabs / Filters if user has gifts */}
      {gifts.length > 0 && (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => { setFilter('all'); sound.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hammasi ({gifts.length})
            </button>
            <button
              onClick={() => { setFilter('active'); sound.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === 'active' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Faollar ({gifts.filter((g) => !g.used).length})
            </button>
            <button
              onClick={() => { setFilter('used'); sound.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === 'used' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ishlatilganlar ({gifts.filter((g) => g.used).length})
            </button>
          </div>

          <button
            onClick={() => { onNavigateTab('shop'); sound.playClick(); }}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 ml-auto"
          >
            <span>Yana sovg‘a olish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {gifts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-4xl mx-auto mb-4">
            🎁
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Hali hech qanday sovg‘a yo‘q</h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-xs mx-auto">
            Topshiriqlarni bajarib yulduzcha to‘plang va do‘kondan mazali sovg‘alar xarid qiling!
          </p>
          <button
            onClick={() => {
              onNavigateTab('shop');
              sound.playClick();
            }}
            className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20"
          >
            Sovg‘alar Do‘konini Ko‘rish
          </button>
        </div>
      ) : filteredGifts.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
          Bu toifada sovg‘alar topilmadi.
        </div>
      ) : (
        /* Gifts List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGifts.map((gift) => {
            const isMystery = gift.giftId === 'mystery-box';
            const isUnopenedMystery = isMystery && !gift.openedReward;

            return (
              <div
                key={gift.id}
                className={`p-5 rounded-3xl border transition-all ${
                  gift.used
                    ? 'bg-slate-900/30 border-slate-800/60 opacity-75'
                    : isMystery
                    ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 border-purple-500/30 shadow-lg shadow-purple-500/5'
                    : 'bg-slate-900/80 border-slate-800/90 shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Emoji Avatar */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                    isMystery ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-slate-950 border border-slate-800'
                  }`}>
                    {gift.emoji}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-white truncate">
                        {gift.name}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                        gift.used
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {gift.used ? 'Ishlatilgan' : 'Faol'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>Xarid: {formatUzbekDate(gift.purchasedAt)}</span>
                      <span>·</span>
                      <span className="text-amber-400 font-mono">⭐ {gift.starsSpent}</span>
                    </div>

                    {/* Voucher Code Box */}
                    <div className="mt-3 p-2 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                          Promokod / Kupon:
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-300 truncate">
                          {gift.code}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(gift.id, gift.code)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors shrink-0"
                        title="Kupon kodini nusxalash"
                      >
                        {copiedId === gift.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Mystery Box Won Details if opened */}
                    {gift.openedReward && (
                      <div className="mt-3 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{gift.openedReward.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          {gift.openedReward.description}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2">
                      {isUnopenedMystery ? (
                        <button
                          onClick={() => onOpenMysteryBox(gift)}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 animate-pulse"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>🎁 Sandiqni Ochish</span>
                        </button>
                      ) : !gift.used ? (
                        <button
                          onClick={() => {
                            sound.playClick();
                            onMarkUsed(gift.id);
                          }}
                          className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                        >
                          Ishlatilgan deb belgilash
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">
                          Bu sovg‘adan foydalanilgan
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
