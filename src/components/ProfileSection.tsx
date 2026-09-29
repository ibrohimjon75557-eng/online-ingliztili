import React, { useState } from 'react';
import { User, Award, Flame, Star, ShoppingBag, ShieldCheck, Edit3, Check, RotateCcw } from 'lucide-react';
import { UserProfile, Achievement } from '../types';
import { sound } from '../utils/sound';

interface ProfileSectionProps {
  user: UserProfile;
  achievements: Achievement[];
  onUpdateName: (newName: string) => void;
  onUpdateAvatar: (newAvatar: string) => void;
  onResetData: () => void;
}

const AVATAR_OPTIONS = ['👨‍🚀', '👩‍🚀', '🦁', '🦊', '⚡', '👑', '🧙‍♂️', '🚀'];

const LEVEL_TITLES = [
  'Yulduzlar Sayyohi',
  'Faol Yulduzchi',
  'Yulduzlar Ustasi',
  'Mukofot Ovchisi',
  'Yulduzlar Qiroli ⭐',
];

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  achievements,
  onUpdateName,
  onUpdateAvatar,
  onResetData,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setIsEditingName(false);
      sound.playClick();
    }
  };

  const currentLevelTitle = LEVEL_TITLES[Math.min(user.level - 1, LEVEL_TITLES.length - 1)];
  const nextLevelXp = user.level * 100;
  const currentLevelProgress = Math.min(Math.round((user.xp / nextLevelXp) * 100), 100);

  return (
    <div className="py-6 sm:py-10 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/30 shadow-xl mb-8 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with selector */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 border-amber-500/40 flex items-center justify-center text-5xl sm:text-6xl shadow-xl shadow-amber-500/10 select-none">
              {user.avatar}
            </div>

            <div className="flex items-center gap-1 mt-3">
              {AVATAR_OPTIONS.slice(0, 4).map((av) => (
                <button
                  key={av}
                  onClick={() => {
                    onUpdateAvatar(av);
                    sound.playClick();
                  }}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                    user.avatar === av
                      ? 'bg-amber-500 text-slate-950 scale-110'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-3 py-1 bg-slate-950 border border-amber-500 rounded-lg text-white font-bold text-lg outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-amber-500 text-slate-950 rounded-lg"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="text-2xl sm:text-3xl font-black text-white truncate">
                    {user.name}
                  </h3>
                  <button
                    onClick={() => {
                      setNameInput(user.name);
                      setIsEditingName(true);
                      sound.playClick();
                    }}
                    className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
                    title="Ismni o‘zgartirish"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Daraja {user.level}: {currentLevelTitle}</span>
            </div>

            {/* Level XP Bar */}
            <div className="space-y-1.5 max-w-md mx-auto sm:mx-0">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Tajriba (XP):</span>
                <span className="font-mono-numbers">{user.xp} / {nextLevelXp} XP</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Grid */}
      <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <Award className="w-4 h-4 text-amber-400" />
        <span>Yutuqlar va Statistika</span>
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">Mavjud Yulduzlar</span>
          <div className="text-2xl font-black text-amber-300 font-mono-numbers flex items-center justify-center gap-1">
            <span>⭐</span>
            <span>{user.stars}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">Jami To‘plangan</span>
          <div className="text-2xl font-black text-emerald-400 font-mono-numbers flex items-center justify-center gap-1">
            <span>✨</span>
            <span>{user.totalEarnedStars}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">Sarflangan</span>
          <div className="text-2xl font-black text-purple-400 font-mono-numbers flex items-center justify-center gap-1">
            <span>🎁</span>
            <span>{user.totalSpentStars}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">Kunlik Seriya</span>
          <div className="text-2xl font-black text-orange-400 font-mono-numbers flex items-center justify-center gap-1">
            <span>🔥</span>
            <span>{user.dailyStreak} kun</span>
          </div>
        </div>
      </div>

      {/* Badges / Achievements */}
      <div className="space-y-3 mb-8">
        <h4 className="text-base font-bold text-white mb-2">
          Nishonlar va Yutuqlar (Badges)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                ach.unlocked
                  ? 'bg-gradient-to-r from-amber-500/10 to-slate-900 border-amber-500/30'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                ach.unlocked ? 'bg-amber-500/20 border border-amber-500/40' : 'bg-slate-950 border border-slate-800'
              }`}>
                {ach.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-white truncate">{ach.title}</h5>
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                    ach.unlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {ach.unlocked ? 'Ochilgan ✓' : 'Qulflangan'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-300 block">Ma‘lumotlarni qayta tiklash</span>
          <span className="text-[11px] text-slate-400">Yulduzlar va sovg‘alarni boshlang‘ich holatga qaytarish</span>
        </div>

        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetData();
                setShowResetConfirm(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
            >
              Ha, tiklash
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              Bekor
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-900/30 border border-rose-800/40 text-rose-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta boshlash</span>
          </button>
        )}
      </div>
    </div>
  );
};
