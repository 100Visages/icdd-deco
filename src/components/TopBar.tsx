import React from 'react';
import { FilterState, NavTab } from '../types';
import { ChevronDown, FileText, FolderKanban, LogIn, LogOut, User as UserIcon, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

  const categoryOptions = ['Tous', 'Résidentiel', 'Commercial', 'Penthouse', 'Rénovation Complexe'];
  const styleOptions = ['Tous', 'Minimaliste', 'Contemporain', 'Haussmannien', 'Japandi'];
  const budgetOptions = ['Tous', 'Sur Devis', '100k - 200k€', '200k - 400k€', '> 400k€'];

  return (
    <header id="top-navigation-bar" className="w-full z-30 pt-4 px-4 sm:px-8 flex-shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Action Button: "Demander un Devis" */}
        <button
          id="btn-demander-devis"
          onClick={openQuoteModal}
          className="w-full md:w-auto px-6 py-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl text-slate-900 font-semibold text-sm shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/80 flex items-center justify-center gap-2.5 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span>Demander un Devis</span>
          <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200/60 hidden sm:inline-block">
            Rapide
          </span>
        </button>

        {/* Center Filters Dropdowns (Frosted Glass Container) */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-full border border-white/60 dark:border-white/20 shadow-lg">
          
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

          <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 hidden sm:block" />

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

          <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 hidden sm:block" />

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
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            id="btn-projets-recents"
            onClick={() => setActiveTab('portfolio')}
            className="px-5 py-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl text-slate-900 font-semibold text-sm shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/80 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Portfolio</span>
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
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
                  className="w-7 h-7 rounded-full object-cover border border-amber-400"
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
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5">
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
              className="px-5 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              title="Connexion avec Google"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Connexion</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

