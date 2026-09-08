import React from 'react';
import { FilterState, NavTab } from '../types';
import { ChevronDown, FileText, FolderKanban, LogIn, LogOut, User as UserIcon, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface TopBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  setActiveTab: (tab: NavTab) => void;
  openQuoteModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  filters,
  setFilters,
  setActiveTab,
  openQuoteModal,
}) => {
  const { user, loading, signIn, signOut, favorites } = useAuth();

  const categoryOptions = ['Tous', 'Décoration simple', 'Décoration classique', 'Décoration luxueuse', 'Décoration Gold', 'Décoration Top Modèle'];
  const styleOptions = ['Tous', 'Moderne & Épuré', 'Classique Élégant', 'Luxe Contemporain', 'Gold Prestige', 'Haute Couture'];
  const budgetOptions = ['Tous', '250 $ - 350 $', '350 $ - 500 $', '500 $ - 700 $', '≥ 700 $'];

  return (
    <header id="top-navigation-bar" className="w-full z-30 pt-2.5 sm:pt-4 px-3 sm:px-6 md:px-8 flex-shrink-0">
      
      {/* Mobile Top Header (Sleek Luxury Brand Bar) */}
      <div className="md:hidden flex items-center justify-between gap-2 px-1">
        
        {/* Brand Monogram & Name */}
        <div 
          onClick={() => setActiveTab('accueil')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center font-black text-xs shadow-md border border-amber-400/60 tracking-tight group-hover:scale-105 transition-transform overflow-hidden relative">
            <span className="text-[10px] text-amber-500">IC</span>
            <img 
              src={icddOfficialLogo} 
              alt="Logo ICDD" 
              className="absolute inset-0 w-full h-full object-cover scale-[1.32] transition-transform" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xs tracking-wider text-slate-900 dark:text-white uppercase leading-none">
              ICDD 🦺✨
            </span>
            <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-300 tracking-tight leading-tight">
              Décoration & Peinture
            </span>
          </div>
        </div>

        {/* Right Actions on Mobile: WhatsApp Direct, Devis & User Auth */}
        <div className="flex items-center gap-1.5">
          <a
            href="https://wa.me/243897504570?text=Bonjour%20ICDD%20%F0%9F%A7%BA%E2%9C%A8%20Je%20souhaite%20un%20renseignement%20sur%20vos%20offres%20de%20d%C3%A9coration."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-600 text-white shadow-md active:scale-95 transition-transform"
            title="WhatsApp ICDD (+243 897504570)"
          >
            <span className="text-xs">💬</span>
          </a>

          {/* Quick Devis Button */}
          <button
            id="mobile-btn-devis"
            onClick={openQuoteModal}
            className="px-3 py-1.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs shadow-md border border-[#00D7FF]/40 flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#00D7FF]" />
            <span>Devis</span>
          </button>

          {/* User Auth or Sign In */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 animate-pulse border border-white/80" />
          ) : user ? (
            <div className="flex items-center gap-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl p-1 rounded-full border border-white/80 dark:border-white/20 shadow-md">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  className="w-6 h-6 rounded-full object-cover border border-[#00D7FF]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3 h-3" />}
                </div>
              )}
              {favorites.length > 0 && (
                <span className="text-[10px] font-bold text-[#005EA6] dark:text-[#00D7FF] pr-1.5 flex items-center gap-0.5">
                  <Bookmark className="w-2.5 h-2.5 fill-current" />
                  {favorites.length}
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={signIn}
              className="p-2 rounded-full bg-[#005EA6] text-white shadow-md active:scale-95 transition-transform cursor-pointer border border-[#00D7FF]/40"
              title="Connexion avec Google"
            >
              <LogIn className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Desktop Top Header Bar (Full Layout with Filters) */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-4">
        
        {/* Left: Brand Identity with Logo + Action Button */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('accueil')}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/80 dark:border-white/20 shadow-md cursor-pointer hover:scale-105 transition-transform group"
            title="ICDD – Accueil"
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center font-black text-xs shadow-sm border border-[#00D7FF]/80 tracking-tight overflow-hidden relative flex-shrink-0">
              <span className="text-[10px] text-[#005EA6]">IC</span>
              <img 
                src={icddOfficialLogo} 
                alt="Logo ICDD" 
                className="absolute inset-0 w-full h-full object-cover scale-[1.32] transition-transform" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs tracking-wider text-slate-900 dark:text-white uppercase leading-none">
                ICDD 🦺✨
              </span>
              <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-400 tracking-tight leading-tight">
                Décoration & Peinture
              </span>
            </div>
          </div>

          {/* Left Action Button: "Demander un Devis" */}
          <button
            id="btn-demander-devis"
            onClick={openQuoteModal}
            className="w-auto px-5 py-2.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-bold text-xs shadow-xl shadow-[#005EA6]/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-[#00D7FF]/50 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-white/15 text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
              <FileText className="w-3 h-3 text-[#00D7FF]" />
            </div>
            <span>Devis Matériaux</span>
            <span className="text-[9px] uppercase tracking-wider font-black bg-[#00D7FF] text-[#005EA6] px-2 py-0.5 rounded-full inline-block shadow-sm">
              Rapide
            </span>
          </button>
        </div>

        {/* Center Filters Dropdowns (Frosted Glass Container) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-full border border-white/60 dark:border-white/20 shadow-lg">
          
          {/* Category Dropdown */}
          <div className="relative group">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block px-2 -mb-0.5">
              Catégorie
            </label>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="bg-transparent text-slate-900 dark:text-white font-medium text-xs sm:text-sm focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 pointer-events-none -ml-4" />
            </div>
          </div>

          <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 block" />

          {/* Style Dropdown */}
          <div className="relative group">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block px-2 -mb-0.5">
              Style
            </label>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
              <select
                value={filters.style}
                onChange={(e) => setFilters(prev => ({ ...prev, style: e.target.value }))}
                className="bg-transparent text-slate-900 dark:text-white font-medium text-xs sm:text-sm focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {styleOptions.map(st => (
                  <option key={st} value={st} className="bg-slate-900 text-white">
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 pointer-events-none -ml-4" />
            </div>
          </div>

          <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 block" />

          {/* Budget Dropdown */}
          <div className="relative group">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block px-2 -mb-0.5">
              Budget
            </label>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
              <select
                value={filters.budget}
                onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                className="bg-transparent text-slate-900 dark:text-white font-medium text-xs sm:text-sm focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {budgetOptions.map(bg => (
                  <option key={bg} value={bg} className="bg-slate-900 text-white">
                    {bg}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 pointer-events-none -ml-4" />
            </div>
          </div>
        </div>

        {/* Right Actions: Projets Récents & Firebase Authentication Profile */}
        <div className="flex items-center gap-3 justify-end">
          <button
            id="btn-projets-recents"
            onClick={() => setActiveTab('portfolio')}
            className="px-5 py-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl text-slate-900 font-semibold text-sm shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/80 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Portfolio</span>
            <div className="w-6 h-6 rounded-full bg-[#005EA6] text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00D7FF] group-hover:text-[#005EA6] transition-all shadow-sm">
              <FolderKanban className="w-3 h-3" />
            </div>
          </button>

          {/* Firebase Authentication Button / Profile Pill */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/60 animate-pulse border border-white/80" />
          ) : user ? (
            <div className="flex items-center gap-2 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl pl-2 pr-3 py-1.5 rounded-full border border-white/80 dark:border-white/20 shadow-lg">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  className="w-7 h-7 rounded-full object-cover border border-[#00D7FF]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3.5 h-3.5" />}
                </div>
              )}

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight max-w-[110px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                {favorites.length > 0 && (
                  <span className="text-[10px] text-[#005EA6] dark:text-[#00D7FF] font-semibold flex items-center gap-0.5">
                    <Bookmark className="w-2.5 h-2.5 fill-current" />
                    {favorites.length} favori(s)
                  </span>
                )}
              </div>

              <button
                onClick={signOut}
                title="Se déconnecter"
                className="ml-1 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={signIn}
              className="px-5 py-3 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-bold text-xs shadow-xl border border-[#00D7FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              title="Connexion avec Google"
            >
              <LogIn className="w-3.5 h-3.5 text-[#00D7FF]" />
              <span>Connexion</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

