import React from 'react';
import { Home, Sparkles, Compass, ShoppingBag, Phone } from 'lucide-react';
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
      description: 'Présentation & Vision'
    },
    {
      id: 'realisations' as NavTab,
      label: 'Réalisations',
      icon: Sparkles,
      description: 'Appartements, Déco & Staff'
    },
    {
      id: 'services' as NavTab,
      label: 'Services',
      icon: Compass,
      description: 'Nos 6 Domaines d’Expertise'
    },
    {
      id: 'shop' as NavTab,
      label: 'Shop',
      icon: ShoppingBag,
      description: 'Matériaux, Peintures, Cuisines'
    },
    {
      id: 'contact' as NavTab,
      label: 'Contact',
      icon: Phone,
      description: 'Devis & Coordonnées'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar: Floating Glass Pill Container on Left */}
      <aside id="sidebar-navigation" className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
        <div className="flex flex-col items-center gap-3.5 p-2.5 bg-white/90 backdrop-blur-2xl rounded-full border border-slate-200/80 shadow-xl shadow-slate-300/40 transition-all duration-300">
          
          {/* Brand Monogram Icon at top of Sidebar */}
          <div 
            onClick={() => setActiveTab('accueil')}
            className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-black tracking-tighter text-xs shadow-sm cursor-pointer hover:scale-105 transition-transform border border-sky-400/80 mb-1 group relative overflow-hidden"
            title="ICDD – Accueil"
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
            <span className="absolute left-14 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-slate-800 z-50">
              ICDD – Interior & Construction
            </span>
          </div>

          {/* Navigation Buttons (5 required icons) */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`group relative p-3 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/30 scale-105 border border-sky-400/50'
                    : 'text-slate-600 hover:text-[#005EA6] hover:bg-slate-100'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />

                {/* Tooltip on hover */}
                <div className="absolute left-14 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-slate-800 z-50 flex items-center gap-2">
                  <span className="font-bold">{item.label}</span>
                  <span className="text-[10px] text-slate-300 font-normal">({item.description})</span>
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

      {/* Mobile Floating Bottom Navigation: Glass Pill Dock for all 5 tabs */}
      <nav 
        id="mobile-bottom-navigation" 
        className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[420px]"
        aria-label="Navigation mobile"
      >
        <div className="flex items-center justify-between p-1 bg-white/95 backdrop-blur-2xl rounded-full border border-slate-200/90 shadow-xl shadow-slate-300/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-300 cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#005EA6] text-white shadow-sm scale-[1.02] border border-sky-400/40'
                    : 'text-slate-600 hover:text-[#005EA6] active:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-200' : 'text-current'}`} />
                <span className="text-[9px] font-bold tracking-tight mt-0.5 leading-tight truncate max-w-[58px]">
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
