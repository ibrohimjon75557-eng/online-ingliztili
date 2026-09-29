export interface UserProfile {
  name: string;
  avatar: string;
  stars: number;
  totalEarnedStars: number;
  totalSpentStars: number;
  lastDailyBonusDate: string | null;
  lastLoginDate: string | null;
  dailyStreak: number;
  completedTasks: string[];
  redeemedPromoCodes: string[];
  level: number;
  xp: number;
}

export interface GiftItem {
  id: string;
  name: string;
  stars: number;
  emoji: string;
  category: 'sweet' | 'drink' | 'special';
  description: string;
  tag?: string;
  stock?: number;
}

export interface PurchasedGift {
  id: string;
  giftId: string;
  name: string;
  emoji: string;
  starsSpent: number;
  purchasedAt: string;
  code: string;
  used: boolean;
  isMysteryBox?: boolean;
  openedReward?: {
    type: 'stars' | 'special';
    amount?: number;
    title: string;
    description: string;
  };
}

export interface TaskItem {
  id: string;
  title: string;
  rewardStars: number;
  description: string;
  icon: string;
  type: 'login' | 'daily' | 'quiz' | 'social' | 'promo' | 'clicker';
  actionLabel: string;
  isCompleted?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}
