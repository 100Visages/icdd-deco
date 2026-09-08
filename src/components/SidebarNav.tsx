import React from 'react';
import { Home, LayoutGrid, User, Mail } from 'lucide-react';
import { NavTab } from '../types';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

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
      label: 'Agence',
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
    <>
      {/* Desktop Sidebar: Floating Glass Pill Container on Left */}
      <aside id="sidebar-navigation" className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 p-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-full border border-white/60 dark:border-white/20 shadow-2xl shadow-black/10 transition-all duration-300">
          
          {/* Brand Monogram Icon at top of Sidebar */}
          <div 
            onClick={() => setActiveTab('accueil')}
            className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center font-black tracking-tighter text-xs shadow-md cursor-pointer hover:scale-105 transition-transform border border-[#00D7FF]/80 mb-2 group relative overflow-hidden"
            title="ICDD – Décoration & Peinture"
          >
            <span className="text-[10px] font-black uppercase text-[#005EA6]">ICDD</span>
            <img 
              src={icddOfficialLogo} 
              alt="Logo ICDD" 
              className="absolute inset-0 w-full h-full object-cover scale-[1.32] transition-transform" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
              }}
            />
            <span className="absolute left-16 bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 z-50">
              ICDD Décoration & Peinture
            </span>
          </div>

          {/* Navigation Buttons (4 required icons) */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`group relative p-3.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-[#005EA6] text-white shadow-lg shadow-[#005EA6]/40 scale-105 border border-[#00D7FF]/50'
                    : 'text-slate-700 hover:text-[#005EA6] hover:bg-white/60 dark:text-slate-200 dark:hover:bg-slate-800/50'
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
                  <span className="absolute -right-1 w-1.5 h-1.5 bg-[#00D7FF] rounded-full shadow-sm animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Floating Bottom Navigation: Glass Pill Dock */}
      <nav 
        id="mobile-bottom-navigation" 
        className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-[390px]"
        aria-label="Navigation mobile"
      >
        <div className="flex items-center justify-between p-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl rounded-full border border-white/80 dark:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-full transition-all duration-300 cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/30 scale-[1.03] border border-[#00D7FF]/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#005EA6] active:bg-slate-100/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00D7FF]' : 'text-current'}`} />
                <span className="text-[10px] font-bold tracking-tight mt-0.5 leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

