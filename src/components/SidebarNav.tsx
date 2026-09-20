import React from 'react';
import { Home, Sparkles, Compass, ShoppingBag, Phone } from 'lucide-react';
import { NavTab } from '../types';

interface SidebarNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isScrolledDown?: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ 
  activeTab, 
  setActiveTab,
  isScrolledDown = false
}) => {
  // Sur l'accueil (Sitora Hero plein écran), la barre de navigation ne s'affiche que si l'utilisateur défile vers le bas.
  const shouldShowMobileNav = activeTab === 'accueil' ? isScrolledDown : true;
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
      {/* Mobile Floating Bottom Navigation: Glass Pill Dock for all 5 tabs (Desktop uses the TopBar) */}
      <nav 
        id="mobile-bottom-navigation" 
        className={`md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[420px] transition-all duration-500 ease-out transform ${
          shouldShowMobileNav
            ? 'translate-y-0 opacity-100 pointer-events-auto scale-100 shadow-xl'
            : 'translate-y-24 opacity-0 pointer-events-none scale-95'
        }`}
        aria-label="Navigation mobile"
      >
        <div className="flex items-center justify-between p-1.5 bg-slate-950/90 backdrop-blur-2xl rounded-full border border-white/20 shadow-[0_14px_40px_rgba(0,0,0,0.7)]">
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
                    ? 'bg-[#005EA6] text-white shadow-md scale-[1.02] border border-sky-400/50'
                    : 'text-slate-300 hover:text-white active:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-200' : 'text-slate-300'}`} />
                <span className={`text-[9px] font-bold tracking-tight mt-0.5 leading-tight truncate max-w-[58px] ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}>
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
