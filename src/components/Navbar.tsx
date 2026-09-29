import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Download, Menu, X, Gift, Star, User, CheckSquare } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  stars: number;
  activeTab: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile';
  setActiveTab: (tab: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile') => void;
  myGiftsCount: number;
  onOpenDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stars,
  activeTab,
  setActiveTab,
  myGiftsCount,
  onOpenDownloadModal,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  interface NavItem {
    id: 'home' | 'earn' | 'shop' | 'my-gifts' | 'profile';
    label: string;
    icon: typeof Star;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Bosh sahifa', icon: Star },
    { id: 'earn', label: 'Yulduzcha yig‘ish', icon: Sparkles },
    { id: 'shop', label: 'Sovg‘alar', icon: Gift },
    { id: 'my-gifts', label: 'Mening sovg‘alarim', icon: CheckSquare, badge: myGiftsCount },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Zone */}
        <div 
          onClick={() => { setActiveTab('home'); sound.playClick(); }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl animate-pulse">⭐</span>
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
            STAR REWARDS <span className="text-amber-400">⭐</span>
          </span>
        </div>

        {/* Desktop Nav Zone */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  sound.playClick();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap relative ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/25 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-xs font-mono font-bold ${
                      isActive
                        ? 'bg-slate-950 text-amber-300'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Zone: Balance + Sound + Export HTML */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Balance Pill */}
          <div
            onClick={() => {
              setActiveTab('earn');
              sound.playStar();
            }}
            title="Sizning yulduzchalaringiz (Ko'proq yig'ish uchun bosing)"
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-yellow-500/10 border border-amber-500/30 rounded-2xl cursor-pointer hover:border-amber-400/60 transition-all hover:scale-105 active:scale-95 shadow-inner"
          >
            <span className="text-lg animate-bounce select-none">⭐</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider leading-none">
                Balans
              </span>
              <span className="text-base sm:text-lg font-black text-amber-300 font-mono-numbers leading-tight">
                {stars}
              </span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            aria-label="Toggle sound"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />}
          </button>

          {/* HTML Code Download Modal Button */}
          <button
            onClick={onOpenDownloadModal}
            title="Bitta HTML faylida yuklab olish"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-amber-300 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">HTML Yuklab olish</span>
            <span className="xl:hidden">HTML</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                  sound.playClick();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 rounded-xl text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Bitta HTML Fayl Kodini Olish</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
