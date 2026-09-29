import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBalance } from './components/HeroBalance';
import { EarnStarsSection } from './components/EarnStarsSection';
import { ShopSection } from './components/ShopSection';
import { MyGiftsSection } from './components/MyGiftsSection';
import { ProfileSection } from './components/ProfileSection';
import { MysteryBoxModal } from './components/MysteryBoxModal';
import { DownloadHtmlModal } from './components/DownloadHtmlModal';
import { GiftItem, PurchasedGift, UserProfile } from './types';
import {
  loadUser,
  saveUser,
  loadPurchasedGifts,
  savePurchasedGifts,
  loadAchievements,
  saveAchievements,
  DEFAULT_USER,
} from './utils/storage';
import { sound } from './utils/sound';
import { fireStarBurst } from './utils/confetti';

export default function App() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [gifts, setGifts] = useState<PurchasedGift[]>([]);
  const [achievements, setAchievements] = useState(loadAchievements());
  const [activeTab, setActiveTab] = useState<'home' | 'earn' | 'shop' | 'my-gifts' | 'profile'>('home');

  const [mysteryModalGift, setMysteryModalGift] = useState<PurchasedGift | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const loadedUser = loadUser();
    const loadedGifts = loadPurchasedGifts();
    const loadedAchievements = loadAchievements();
    setUser(loadedUser);
    setGifts(loadedGifts);
    setAchievements(loadedAchievements);
  }, []);

  // Show temporary toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  // Helper to update user state and persist
  const updateUser = (updater: (prev: UserProfile) => UserProfile) => {
    setUser((prev) => {
      const next = updater(prev);
      saveUser(next);
      checkAchievements(next, gifts);
      return next;
    });
  };

  // Helper to update gifts and persist
  const updateGifts = (updater: (prev: PurchasedGift[]) => PurchasedGift[]) => {
    setGifts((prev) => {
      const next = updater(prev);
      savePurchasedGifts(next);
      checkAchievements(user, next);
      return next;
    });
  };

  // Check achievements logic
  const checkAchievements = (currentUser: UserProfile, currentGifts: PurchasedGift[]) => {
    setAchievements((prev) => {
      let changed = false;
      const next = prev.map((ach) => {
        let isNowUnlocked = ach.unlocked;
        let progress = ach.progress;

        if (ach.id === 'first_star') {
          progress = currentUser.totalEarnedStars >= 1 ? 1 : 0;
          if (progress >= 1) isNowUnlocked = true;
        } else if (ach.id === 'sweet_tooth') {
          const hasSweet = currentGifts.some((g) => ['Snickers', 'Twix', 'KitKat'].includes(g.name));
          progress = hasSweet ? 1 : 0;
          if (hasSweet) isNowUnlocked = true;
        } else if (ach.id === 'daily_hero') {
          progress = Math.min(currentUser.dailyStreak, 3);
          if (currentUser.dailyStreak >= 3) isNowUnlocked = true;
        } else if (ach.id === 'mystery_master') {
          const openedMystery = currentGifts.some((g) => g.isMysteryBox && g.openedReward);
          progress = openedMystery ? 1 : 0;
          if (openedMystery) isNowUnlocked = true;
        } else if (ach.id === 'star_collector') {
          progress = Math.min(currentUser.totalEarnedStars, 100);
          if (currentUser.totalEarnedStars >= 100) isNowUnlocked = true;
        }

        if (isNowUnlocked !== ach.unlocked || progress !== ach.progress) {
          changed = true;
          return { ...ach, unlocked: isNowUnlocked, progress };
        }
        return ach;
      });

      if (changed) {
        saveAchievements(next);
      }
      return next;
    });
  };

  // Check daily bonus eligibility
  const isDailyBonusReady = (() => {
    if (!user.lastDailyBonusDate) return true;
    const diff = Date.now() - new Date(user.lastDailyBonusDate).getTime();
    return diff >= 24 * 60 * 60 * 1000;
  })();

  // 1. Star Clicker Bonus
  const handleEarnStarClick = () => {
    updateUser((prev) => ({
      ...prev,
      stars: prev.stars + 1,
      totalEarnedStars: prev.totalEarnedStars + 1,
      xp: prev.xp + 5,
    }));
    showToast('Tezkor yulduzcha: +1 ⭐ hisobingizga qo‘shildi!');
  };

  // 2. Claim Daily Bonus (+5 ⭐)
  const handleClaimDailyBonus = () => {
    updateUser((prev) => {
      const nextStreak = prev.dailyStreak + 1;
      return {
        ...prev,
        stars: prev.stars + 5,
        totalEarnedStars: prev.totalEarnedStars + 5,
        lastDailyBonusDate: new Date().toISOString(),
        dailyStreak: nextStreak,
        xp: prev.xp + 25,
      };
    });
    showToast('Kunlik bonus: +5 ⭐ muvaffaqiyatli qabul qilindi!');
  };

  // 3. Claim Task (Login +1 ⭐, Quiz/Share +3 ⭐)
  const handleClaimTask = (taskId: string, reward: number) => {
    updateUser((prev) => {
      if (prev.completedTasks.includes(taskId)) return prev;
      return {
        ...prev,
        stars: prev.stars + reward,
        totalEarnedStars: prev.totalEarnedStars + reward,
        completedTasks: [...prev.completedTasks, taskId],
        xp: prev.xp + reward * 10,
      };
    });
    showToast(`Topshiriq bajarildi: +${reward} ⭐ hisobingizga qo‘shildi!`);
  };

  // 4. Redeem Promo (+10 ⭐)
  const handleRedeemPromo = (code: string): boolean => {
    const validCodes = ['STAR2026', 'OMAD', 'SUPERBONUS', 'YULDUZ'];
    if (!validCodes.includes(code.toUpperCase())) {
      return false;
    }

    updateUser((prev) => ({
      ...prev,
      stars: prev.stars + 10,
      totalEarnedStars: prev.totalEarnedStars + 10,
      redeemedPromoCodes: [...prev.redeemedPromoCodes, code.toUpperCase()],
      xp: prev.xp + 50,
    }));
    showToast('Maxsus bonus: +10 ⭐ muvaffaqiyatli faollashtirildi!');
    return true;
  };

  // 5. Buy Gift in Shop
  const handleBuyGift = (gift: GiftItem) => {
    const voucherCode = `STAR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newGift: PurchasedGift = {
      id: `gift-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      giftId: gift.id,
      name: gift.name,
      emoji: gift.emoji,
      starsSpent: gift.stars,
      purchasedAt: new Date().toISOString(),
      code: voucherCode,
      used: false,
      isMysteryBox: gift.id === 'mystery-box',
    };

    updateUser((prev) => ({
      ...prev,
      stars: prev.stars - gift.stars,
      totalSpentStars: prev.totalSpentStars + gift.stars,
      xp: prev.xp + gift.stars * 2,
    }));

    updateGifts((prev) => [newGift, ...prev]);
    showToast(`Xarid muvaffaqiyatli: ${gift.name} sotib olindi!`);
  };

  // 6. Mark Gift as Used
  const handleMarkGiftUsed = (giftId: string) => {
    updateGifts((prev) =>
      prev.map((g) => (g.id === giftId ? { ...g, used: true } : g))
    );
    showToast('Sovg‘a ishlatilgan deb belgilandi.');
  };

  // 7. Mystery Box Opened
  const handleBoxOpened = (
    giftId: string,
    rewardStars: number,
    rewardTitle: string,
    rewardDesc: string
  ) => {
    updateUser((prev) => ({
      ...prev,
      stars: prev.stars + rewardStars,
      totalEarnedStars: prev.totalEarnedStars + rewardStars,
      xp: prev.xp + 40,
    }));

    updateGifts((prev) =>
      prev.map((g) =>
        g.id === giftId
          ? {
              ...g,
              used: true,
              openedReward: {
                type: 'stars',
                amount: rewardStars,
                title: rewardTitle,
                description: rewardDesc,
              },
            }
          : g
      )
    );

    showToast(`Mystery Box ochildi: +${rewardStars} ⭐ yutib oldingiz!`);
  };

  // 8. Update Profile Data
  const handleUpdateName = (newName: string) => {
    updateUser((prev) => ({ ...prev, name: newName }));
    showToast('Ismingiz muvaffaqiyatli saqlandi!');
  };

  const handleUpdateAvatar = (newAvatar: string) => {
    updateUser((prev) => ({ ...prev, avatar: newAvatar }));
    showToast('Avatar yangilandi!');
  };

  const handleResetData = () => {
    localStorage.removeItem('star_rewards_user');
    localStorage.removeItem('star_rewards_purchased_gifts');
    localStorage.removeItem('star_rewards_achievements');
    setUser(DEFAULT_USER);
    setGifts([]);
    setAchievements(loadAchievements());
    showToast('Barcha ma‘lumotlar boshlang‘ich holatga qaytarildi.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navbar */}
      <Navbar
        stars={user.stars}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        myGiftsCount={gifts.filter((g) => !g.used).length}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Areas based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroBalance
              stars={user.stars}
              streak={user.dailyStreak}
              userName={user.name}
              userAvatar={user.avatar}
              isDailyBonusReady={isDailyBonusReady}
              onEarnStarClick={handleEarnStarClick}
              onNavigateTab={setActiveTab}
              myGiftsCount={gifts.length}
            />

            {/* Quick Preview of Tasks and Gifts on Home Page */}
            <div className="border-t border-slate-900 bg-slate-950/40 py-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Ommabop Sovg‘alar 🍫
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Yulduzlaringizni mazali taomlarga almashtiring
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('shop');
                      sound.playClick();
                    }}
                    className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold"
                  >
                    Barchasini ko‘rish →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: 'Snickers', emoji: '🍫', stars: 15 },
                    { name: 'Twix', emoji: '🍫', stars: 20 },
                    { name: 'KitKat', emoji: '🍫', stars: 25 },
                    { name: 'Coca-Cola', emoji: '🥤', stars: 30 },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        setActiveTab('shop');
                        sound.playClick();
                      }}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 text-center cursor-pointer transition-all hover:-translate-y-1 group"
                    >
                      <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">
                        {item.emoji}
                      </span>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="text-xs font-mono font-bold text-amber-400 mt-1 block">
                        ⭐ {item.stars}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'earn' && (
          <EarnStarsSection
            stars={user.stars}
            lastDailyBonusDate={user.lastDailyBonusDate}
            completedTasks={user.completedTasks}
            redeemedPromoCodes={user.redeemedPromoCodes}
            onClaimDailyBonus={handleClaimDailyBonus}
            onClaimTask={handleClaimTask}
            onRedeemPromo={handleRedeemPromo}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'shop' && (
          <ShopSection
            userStars={user.stars}
            onBuyGift={handleBuyGift}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'my-gifts' && (
          <MyGiftsSection
            gifts={gifts}
            onMarkUsed={handleMarkGiftUsed}
            onOpenMysteryBox={(gift) => setMysteryModalGift(gift)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSection
            user={user}
            achievements={achievements}
            onUpdateName={handleUpdateName}
            onUpdateAvatar={handleUpdateAvatar}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <span className="text-amber-400">⭐</span>
            <span>STAR REWARDS</span>
            <span>· Mukofot va sovg‘alar platformasi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="hover:text-amber-300 transition-colors underline"
            >
              Yagona HTML faylini olish
            </button>
            <span>·</span>
            <span>localStorage orqali to‘liq ishlaydi</span>
          </div>
        </div>
      </footer>

      {/* Mystery Box Opening Modal */}
      {mysteryModalGift && (
        <MysteryBoxModal
          gift={mysteryModalGift}
          onClose={() => setMysteryModalGift(null)}
          onBoxOpened={handleBoxOpened}
        />
      )}

      {/* Standalone HTML Download Modal */}
      <DownloadHtmlModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-2xl shadow-amber-500/30 animate-in slide-in-from-bottom-5 duration-200">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
