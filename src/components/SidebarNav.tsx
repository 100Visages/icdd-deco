import React from 'react';
import { Home, LayoutGrid, User, Mail } from 'lucide-react';
import { NavTab } from '../types';

interface SidebarNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'accueil' as NavTab,
      label: 'Accueil',
      icon: Home,
      description: 'Page d’accueil principale'
    },
    {
      id: 'portfolio' as NavTab,
      label: 'Portfolio',
      icon: LayoutGrid,
      description: 'Projets & Réalisations ICDD'
    },
    {
      id: 'agence' as NavTab,
      label: 'À Propos',
      icon: User,
      description: 'L’agence & l’équipe'
    },
    {
      id: 'contact' as NavTab,
      label: 'Contact',
      icon: Mail,
      description: 'Devis & Rendez-vous'
    }
  ];

  return (
    <aside id="sidebar-navigation" className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
      {/* Floating Glass Pill Container */}
      <div className="flex flex-col items-center gap-4 p-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-full border border-white/60 dark:border-white/20 shadow-2xl shadow-black/10 transition-all duration-300">
        
        {/* Brand Monogram Icon at top of Sidebar */}
        <div 
          onClick={() => setActiveTab('accueil')}
          className="w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold tracking-tighter text-sm shadow-md cursor-pointer hover:scale-105 transition-transform border border-white/30 mb-2 group relative"
          title="ICDD Design"
        >
          ICDD
          <span className="absolute left-16 bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 z-50">
            ICDD Architecture
          </span>
        </div>

        {/* Navigation Buttons (RECONSTRUCTED: 4 required icons ONLY) */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`group relative p-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/30 scale-105'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60 dark:text-slate-200 dark:hover:bg-slate-800/50'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

              {/* Tooltip on hover */}
              <div className="absolute left-16 bg-slate-900/90 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 z-50 flex items-center gap-2">
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-400 font-normal">({item.description})</span>
              </div>

              {/* Active Dot indicator */}
              {isActive && (
                <span className="absolute -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-sm animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
