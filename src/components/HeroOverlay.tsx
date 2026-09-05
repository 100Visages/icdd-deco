import React, { useState } from 'react';
import { Project, NavTab } from '../types';
import { ArrowUpRight, Heart, Bookmark, Share2, MapPin, Sparkles, Phone, MessageCircle, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ICDD_OFFERS_CONFIG } from '../data/projects';

interface HeroOverlayProps {
  featuredProject: Project;
  onOpenProject: (project: Project) => void;
  openQuoteModal: () => void;
  setActiveTab: (tab: NavTab) => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  featuredProject,
  onOpenProject,
  openQuoteModal,
  setActiveTab,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(148);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikesCount(prev => prev - 1);
      setLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setLiked(true);
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const offersList = Object.entries(ICDD_OFFERS_CONFIG);

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto custom-scrollbar flex flex-col justify-between p-3.5 sm:p-6 md:p-8 lg:p-10 xl:p-12 pointer-events-auto">
      
      {/* Hero Title & Official Presentation */}
      <div className="max-w-3xl lg:max-w-5xl pt-1 sm:pt-4 space-y-3 sm:space-y-4">
        
        {/* Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/90 dark:bg-amber-500/30 backdrop-blur-md border border-amber-300 text-slate-950 dark:text-amber-200 text-[11px] sm:text-xs font-bold tracking-wide shadow-md">
          <span className="text-base leading-none">🦺✨</span>
          <span>Bonjour chers clients, bienvenue chez ICDD</span>
        </div>
        
        {/* Main H1 Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-md leading-[1.12] sm:leading-[1.08]">
          ICDD – Excellence en Décoration & Peinture Intérieure
        </h1>
        
        {/* Official Description */}
        <p className="text-xs sm:text-base md:text-lg text-slate-800 dark:text-slate-100 max-w-3xl font-medium leading-relaxed drop-shadow bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/60 shadow-sm">
          Nous transformons vos espaces avec élégance, modernité et créativité grâce à des finitions professionnelles adaptées à votre style.
        </p>

        {/* Real Offers Horizontal Pricing Grid */}
        <div className="pt-1">
          <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
            <span>💰 Nos Offres de Décoration</span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium lowercase">(varient selon la dimension de votre espace mural)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {offersList.map(([name, conf]) => (
              <div 
                key={name}
                onClick={openQuoteModal}
                className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/80 dark:border-white/20 shadow-sm hover:shadow-md hover:border-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600">
                  {name}
                </div>
                <div className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 mt-0.5">
                  {conf.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Pricing Disclaimer Note */}
        <div className="bg-amber-500/15 dark:bg-amber-950/40 border border-amber-400/40 p-2.5 sm:p-3 rounded-xl backdrop-blur-md text-[11px] sm:text-xs text-slate-800 dark:text-amber-200/90 leading-snug flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Important :</strong> Les tarifs indiqués concernent uniquement les matériaux de décoration. La main-d'œuvre, les meubles et les accessoires ne sont pas inclus. Un devis détaillé sera établi selon les besoins de votre projet.
          </span>
        </div>

      </div>

      {/* Bottom Row: Action Panels */}
      <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4 sm:gap-6 pt-5 sm:pt-6 mt-auto pb-24 sm:pb-20 lg:pb-2">
        
        {/* Left Panel: Direct Contact & Devis Express */}
        <div className="w-full lg:w-[400px] xl:w-[440px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-white/80 dark:border-white/20 shadow-2xl shadow-black/15 flex flex-col justify-between gap-3">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/40 px-2.5 py-0.5 rounded-full border border-amber-300/40">
                Contact & Devis Direct
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                <Calendar className="w-3 h-3" />
                Lundi au Samedi
              </span>
            </div>

            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Prendre Contact avec ICDD
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Appelez-nous directement ou calculez votre estimation sur-mesure pour votre espace mural.
            </p>
          </div>

          {/* Contact Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:+243897504570"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-transform active:scale-95 shadow-md"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+243 897504570</span>
            </a>
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20des%20informations%20sur%20vos%20offres%20de%20d%C3%A9coration%20et%20peinture%20int%C3%A9rieure."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-transform active:scale-95 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={openQuoteModal}
            className="w-full py-2.5 px-4 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calculer mon Devis Matériaux</span>
          </button>
        </div>

        {/* Right Panel: Featured Project Showcase */}
        <div 
          onClick={() => onOpenProject(featuredProject)}
          className="w-full lg:w-[460px] xl:w-[520px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-white/80 dark:border-white/20 shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer group relative active:scale-[0.99]"
        >
          {/* Card Header with Location & Action Arrow */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{featuredProject.location}</span>
                <span className="font-bold text-amber-600">• {featuredProject.category}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-amber-600 transition-colors">
                {featuredProject.title}
              </h3>
            </div>

            {/* Top Right Action Arrow */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-amber-500 group-hover:rotate-45 transition-all duration-300 shadow-lg flex-shrink-0">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mb-3 line-clamp-2 leading-relaxed">
            {featuredProject.description}
          </p>

          {/* Project Specifications Tag Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            <span className="text-[10px] sm:text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              Murs: {featuredProject.specs.wallSurface}
            </span>
            <span className="text-[10px] sm:text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300">
              À partir de {featuredProject.startingPrice} $
            </span>
          </div>

          {/* Bottom Card Bar */}
          <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  liked
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
                title="Aimer"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>

              <button
                onClick={toggleBookmark}
                className={`p-1.5 rounded-full text-xs transition-all ${
                  bookmarked
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
                title="Enregistrer"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-full text-xs bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white transition-all relative"
                title="Partager"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                    Copié!
                  </span>
                )}
              </button>
            </div>

            {/* ICDD Logo Badge */}
            <div 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950 text-white flex flex-col items-center justify-center font-black tracking-widest text-xs shadow-xl border-2 border-amber-400 group-hover:scale-105 transition-all"
              title="ICDD Décoration & Peinture Intérieure"
            >
              <span className="text-[10px] leading-none text-white font-black">ICDD</span>
              <span className="text-[6px] text-amber-400 font-bold uppercase mt-0.5">DÉCOR</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
