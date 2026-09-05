import React from 'react';
import { FilterState, NavTab } from '../types';
import { ChevronDown, FileText, Sparkles, FolderKanban } from 'lucide-react';

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
  const categoryOptions = ['Tous', 'Résidentiel', 'Commercial', 'Penthouse', 'Rénovation Complexe'];
  const styleOptions = ['Tous', 'Minimaliste', 'Contemporain', 'Haussmannien', 'Japandi'];
  const budgetOptions = ['Tous', 'Sur Devis', '100k - 200k€', '200k - 400k€', '> 400k€'];

  return (
    <header id="top-navigation-bar" className="w-full z-30 pt-4 px-4 sm:px-8">
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

        {/* Right Action Button: "Projets Récents" */}
        <button
          id="btn-projets-recents"
          onClick={() => setActiveTab('portfolio')}
          className="w-full md:w-auto px-6 py-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl text-slate-900 font-semibold text-sm shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/80 flex items-center justify-center gap-2.5 group cursor-pointer"
        >
          <span>Projets Récents</span>
          <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
            <FolderKanban className="w-3.5 h-3.5" />
          </div>
        </button>

      </div>
    </header>
  );
};
