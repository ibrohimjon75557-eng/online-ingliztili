import { UserProfile, PurchasedGift, Achievement } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/mockData';

const USER_KEY = 'star_rewards_user';
const GIFTS_KEY = 'star_rewards_purchased_gifts';
const ACHIEVEMENTS_KEY = 'star_rewards_achievements';

export const DEFAULT_USER: UserProfile = {
  name: 'Yulduzchi',
  avatar: '👨‍🚀',
  stars: 23, // As in user prompt example: "Masalan: ⭐ 23 yulduzcha"
  totalEarnedStars: 23,
  totalSpentStars: 0,
  lastDailyBonusDate: null,
  lastLoginDate: null,
  dailyStreak: 1,
  completedTasks: [],
  redeemedPromoCodes: [],
  level: 1,
  xp: 45,
};

export function loadUser(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      saveUser(DEFAULT_USER);
      return DEFAULT_USER;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_USER, ...parsed };
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user data:', e);
  }
}

export function loadPurchasedGifts(): PurchasedGift[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(GIFTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function savePurchasedGifts(gifts: PurchasedGift[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GIFTS_KEY, JSON.stringify(gifts));
  } catch (e) {
    console.error('Failed to save gifts:', e);
  }
}

export function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') return INITIAL_ACHIEVEMENTS;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return INITIAL_ACHIEVEMENTS;
    const parsed: Achievement[] = JSON.parse(raw);
    // merge in case new ones added
    return INITIAL_ACHIEVEMENTS.map(initial => {
      const found = parsed.find(p => p.id === initial.id);
      return found || initial;
    });
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch (e) {
    console.error('Failed to save achievements:', e);
  }
}

// Format date in Uzbek
export function formatUzbekDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}
