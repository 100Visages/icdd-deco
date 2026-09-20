import React, { useState } from 'react';
import { NavTab } from '../types';
import { 
  PhoneCall, 
  MessageCircle, 
  LogIn, 
  User as UserIcon, 
  Bookmark, 
  Menu, 
  X, 
  Home, 
  Sparkles, 
  Compass, 
  ShoppingBag, 
  Phone,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface TopBarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  openQuoteModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  openQuoteModal,
}) => {
  const { user, loading, signIn, favorites } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'accueil', label: 'Accueil', icon: Home, desc: 'Présentation & Vision' },
    { id: 'realisations', label: 'Réalisations', icon: Sparkles, desc: 'Cuisines, Portes, Appartements' },
    { id: 'services', label: 'Services', icon: Compass, desc: 'Nos expertises sur mesure' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, desc: 'Matériaux, Cuisines & Portes' },
    { id: 'contact', label: 'Contact', icon: Phone, desc: 'Kinshasa & Devis gratuit' },
  ];

  const handleMobileNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      id="top-navigation-bar" 
      className="w-full z-30 flex-shrink-0 transition-all duration-300 absolute top-0 left-0 right-0 pt-2 sm:pt-3 px-3 sm:px-6 pointer-events-none [&>*]:pointer-events-auto md:relative md:pt-4 md:px-8 lg:px-10 xl:px-12"
    >
      
      {/* MOBILE TOP HEADER - Unifié et identique sur TOUTES les pages (comme la page home) */}
      <div className="md:hidden relative">
        <div className="flex items-center justify-between gap-3 px-1 py-1">
          {/* Left: Circular Frosted Glass Button (Navigation Menu) */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 rounded-full bg-slate-950/70 hover:bg-slate-900/90 active:scale-95 backdrop-blur-xl border border-white/25 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-rose-300" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Center: Brand Title 'ICDD' in pure luxury typography */}
          <div 
            onClick={() => {
              setActiveTab('accueil');
              setIsMobileMenuOpen(false);
            }}
            className="flex flex-col items-center cursor-pointer select-none group"
          >
            <span className="font-extrabold text-lg sm:text-xl tracking-[0.3em] uppercase text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] leading-tight group-hover:text-sky-200 transition-colors">
              ICDD
            </span>
            <span className="text-[8px] font-bold tracking-[0.24em] uppercase text-sky-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] leading-none">
              Interior & Design
            </span>
          </div>

          {/* Right: Circular Frosted Glass Button (Devis Modal Trigger) */}
          <button
            id="mobile-btn-devis"
            onClick={() => {
              openQuoteModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-11 h-11 rounded-full bg-slate-950/70 hover:bg-slate-900/90 active:scale-95 backdrop-blur-xl border border-white/25 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            title="Demander un devis"
            aria-label="Demander un devis"
          >
            <PhoneCall className="w-4 h-4 text-sky-200" />
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN DRAWER */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu-drawer"
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-950/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 text-white"
          >
            {/* Header info in drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D7FF] shadow-[0_0_8px_#00D7FF] animate-pulse" />
                <span className="text-[11px] font-bold text-white tracking-wide">
                  ICDD Kinshasa • Architecture
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-sky-200 font-medium">
                <MapPin className="w-3 h-3 text-[#00D7FF]" />
                <span>Gombe / Macampagne</span>
              </div>
            </div>

            {/* Navigation items */}
            <nav className="space-y-1.5" aria-label="Menu mobile déroulant">
              {navLinks.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleMobileNavClick(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/40 border border-sky-400/50'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-sky-200' : 'bg-white/10 text-sky-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none text-white">{tab.label}</div>
                        <div className={`text-[10px] mt-1 ${isActive ? 'text-white/90' : 'text-slate-300'}`}>
                          {tab.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0.5 text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions inside drawer */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  openQuoteModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform border border-sky-400/40"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-200" />
                <span>Calculer & Demander un Devis Gratuit</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+243897504570"
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/15"
                >
                  <Phone className="w-3 h-3 text-sky-300" />
                  <span>Appeler</span>
                </a>
                <a
                  href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm border border-emerald-400/30"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* User Account Bar in Drawer */}
              <div className="pt-2 flex items-center justify-between px-1">
                {user ? (
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Utilisateur'}
                        className="w-6 h-6 rounded-full object-cover border border-sky-400"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3 h-3" />}
                      </div>
                    )}
                    <span className="text-xs font-medium text-slate-200">
                      {user.displayName || 'Connecté'}
                    </span>
                    {favorites.length > 0 && (
                      <span className="text-[10px] font-bold text-sky-300 flex items-center gap-0.5 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                        <Bookmark className="w-2.5 h-2.5 fill-current" />
                        {favorites.length} projet{favorites.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      signIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-sky-300 hover:text-white flex items-center gap-1.5 py-1"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Se connecter avec Google</span>
                  </button>
                )}
                <span className="text-[10px] text-slate-400 font-medium">Kinshasa</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DESKTOP TOP HEADER (The 5 main tabs requested by user) - Uniforme sur toutes les pages */}
      <div className="hidden md:flex w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto items-center justify-between gap-6">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setActiveTab('accueil')}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-white/20 shadow-xl cursor-pointer hover:scale-105 hover:border-sky-400/50 transition-all group text-white"
          title="ICDD – Interior & Construction / Design"
        >
          <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-xs shadow-sm border border-sky-400 tracking-tight overflow-hidden relative flex-shrink-0">
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
            <span className="font-black text-sm tracking-wider text-white uppercase leading-none drop-shadow-sm group-hover:text-sky-200 transition-colors">
              ICDD
            </span>
            <span className="text-[10px] font-medium text-sky-200/90 tracking-tight leading-tight mt-0.5">
              Interior & Construction / Design
            </span>
          </div>
        </div>

        {/* Center: The 5 Main Tabs (Accueil | Réalisations | Services | Shop | Contact) */}
        <nav 
          aria-label="Navigation principale" 
          className="flex items-center gap-1 p-1.5 bg-slate-950/80 backdrop-blur-2xl rounded-full border border-white/20 shadow-xl"
        >
          {navLinks.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`top-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 lg:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/40 border border-sky-400/50 scale-[1.02]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Prominent "Demander un devis" + WhatsApp + Auth */}
        <div className="flex items-center gap-2.5">
          
          {/* Direct WhatsApp button */}
          <a
            href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement%20sur%20vos%20prestations%20d%27am%C3%A9nagement."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all hover:scale-105 active:scale-95 border border-emerald-400/30"
            title="Échanger sur WhatsApp (+243 897504570)"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Prominent Button: Demander un devis */}
          <button
            id="btn-demander-devis"
            onClick={openQuoteModal}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-sky-400/40 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-200" />
            <span>Demander un devis</span>
          </button>

          {/* User Profile / Google Auth */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse border border-white/20" />
          ) : user ? (
            <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xl p-1.5 rounded-full border border-white/20 shadow-lg text-white">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  className="w-6 h-6 rounded-full object-cover border border-sky-400"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3 h-3" />}
                </div>
              )}
              {favorites.length > 0 && (
                <span className="text-[10px] font-bold text-sky-300 pr-1.5 flex items-center gap-0.5">
                  <Bookmark className="w-3 h-3 fill-current" />
                  {favorites.length}
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={signIn}
              className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-200 hover:text-white shadow-lg active:scale-95 transition-all cursor-pointer border border-white/20 backdrop-blur-xl"
              title="Connexion"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

    </header>
  );
};
