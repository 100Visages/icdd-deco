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
    <header id="top-navigation-bar" className="w-full z-30 pt-2 sm:pt-4 px-3 sm:px-6 md:px-8 flex-shrink-0">
      
      {/* MOBILE TOP HEADER */}
      <div className="md:hidden relative">
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/80 shadow-md">
          
          {/* Brand Monogram & Name */}
          <div 
            onClick={() => {
              setActiveTab('accueil');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-xs shadow-sm border-2 border-sky-400 tracking-tight overflow-hidden relative flex-shrink-0">
              <span className="text-[10px] text-[#005EA6]">IC</span>
              <img 
                src={icddOfficialLogo} 
                alt="Logo ICDD" 
                className="absolute inset-0 w-full h-full object-cover scale-[1.32]" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs tracking-wider text-slate-900 uppercase leading-none">
                  ICDD
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-sky-50 text-[#005EA6] text-[8px] font-black uppercase tracking-tight border border-sky-200/60">
                  Kinshasa
                </span>
              </div>
              <span className="text-[9px] font-medium text-slate-500 tracking-tight leading-tight mt-0.5">
                Interior & Design
              </span>
            </div>
          </div>

          {/* Right Actions on Mobile */}
          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement%20sur%20vos%20prestations%20d%27am%C3%A9nagement."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-95 transition-transform flex items-center justify-center"
              title="WhatsApp ICDD (+243 897504570)"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            {/* Quick Devis CTA Button */}
            <button
              id="mobile-btn-devis"
              onClick={() => {
                openQuoteModal();
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-[11px] shadow-sm border border-sky-400/40 flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
            >
              <PhoneCall className="w-3 h-3 text-sky-200" />
              <span>Devis</span>
            </button>

            {/* Mobile Menu Toggle Button (Hamburger / Close) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95 transition-all shadow-sm border border-slate-200 cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-rose-500" />
              ) : (
                <Menu className="w-4 h-4 text-[#005EA6]" />
              )}
            </button>
          </div>

        </div>

        {/* MOBILE MENU DROPDOWN DRAWER */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu-drawer"
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/98 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            {/* Header info in drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-700">
                  ICDD Design – Kinshasa
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <MapPin className="w-3 h-3 text-[#005EA6]" />
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
                        ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/25 border border-sky-400/40'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-sky-200' : 'bg-slate-100 text-[#005EA6]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none">{tab.label}</div>
                        <div className={`text-[10px] mt-1 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                          {tab.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0.5' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions inside drawer */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  openQuoteModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform border border-sky-400/40"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-200" />
                <span>Calculer & Demander un Devis Gratuit</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+243897504570"
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Phone className="w-3 h-3 text-[#005EA6]" />
                  <span>Appeler</span>
                </a>
                <a
                  href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
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
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3 h-3" />}
                      </div>
                    )}
                    <span className="text-xs font-medium text-slate-700">
                      {user.displayName || 'Connecté'}
                    </span>
                    {favorites.length > 0 && (
                      <span className="text-[10px] font-bold text-[#005EA6] flex items-center gap-0.5 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
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
                    className="text-xs font-bold text-[#005EA6] flex items-center gap-1.5 py-1"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Se connecter avec Google</span>
                  </button>
                )}
                <span className="text-[10px] text-slate-400 font-medium">v2.5</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DESKTOP TOP HEADER (The 5 main tabs requested by user) */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setActiveTab('accueil')}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm cursor-pointer hover:scale-105 transition-transform group"
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
            <span className="font-black text-sm tracking-wider text-slate-900 uppercase leading-none">
              ICDD
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-tight leading-tight">
              Interior & Construction / Design
            </span>
          </div>
        </div>

        {/* Center: The 5 Main Tabs (Accueil | Réalisations | Services | Shop | Contact) */}
        <nav 
          aria-label="Navigation principale" 
          className="flex items-center gap-1 p-1.5 bg-white/95 backdrop-blur-2xl rounded-full border border-slate-200/80 shadow-sm"
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
                    ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/25 border border-sky-400/40 scale-[1.02]'
                    : 'text-slate-700 hover:text-[#005EA6] hover:bg-slate-50'
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
            className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
            title="Échanger sur WhatsApp (+243 897504570)"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Prominent Button requested by user: 📞 Demander un devis */}
          <button
            id="btn-demander-devis"
            onClick={openQuoteModal}
            className="px-5 py-2.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all duration-300 border border-sky-400/40 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-200" />
            <span>Demander un devis</span>
          </button>

          {/* User Profile / Google Auth */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse border border-slate-200" />
          ) : user ? (
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200/80 shadow-sm">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  className="w-6 h-6 rounded-full object-cover border border-sky-400"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3 h-3" />}
                </div>
              )}
              {favorites.length > 0 && (
                <span className="text-[10px] font-bold text-[#005EA6] pr-1.5 flex items-center gap-0.5">
                  <Bookmark className="w-3 h-3 fill-current" />
                  {favorites.length}
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={signIn}
              className="p-2 rounded-full bg-white text-slate-700 hover:text-[#005EA6] shadow-sm active:scale-95 transition-transform cursor-pointer border border-slate-200"
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
