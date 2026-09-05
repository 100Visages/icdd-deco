import React, { useState } from 'react';
import { Project, NavTab } from '../types';
import { ArrowUpRight, Heart, Bookmark, Share2, MapPin, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

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

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto custom-scrollbar flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 pointer-events-auto">
      
      {/* Hero Title & Descriptive Text (Center-Top Overlay) */}
      <div className="max-w-3xl lg:max-w-4xl pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 text-slate-900 dark:text-white text-xs font-semibold tracking-wide mb-3.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Cabinet d’Architecture d’Intérieur de Luxe</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-md leading-[1.08]">
          ICDD : Architecture d'Intérieur & Design
        </h1>
        
        <p className="mt-3.5 text-sm sm:text-base md:text-lg xl:text-xl text-slate-800 dark:text-slate-200 max-w-xl lg:max-w-2xl font-normal leading-relaxed drop-shadow bg-white/35 dark:bg-slate-900/35 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/50 shadow-sm">
          Sublimez vos espaces de vie. ICDD conçoit des intérieurs sur-mesure alliant élégance, fonctionnalité et créativité.
        </p>
      </div>

      {/* Bottom Row: Overlay Cards (Left Panel & Right Panel) */}
      <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-6 pt-6 mt-auto pb-4">
        
        {/* Left Panel (Action Card - Consultation / Devis) */}
        <div 
          onClick={openQuoteModal}
          className="w-full lg:w-[380px] xl:w-[420px] bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl p-6 sm:p-7 xl:p-8 rounded-[32px] border border-white/80 dark:border-white/20 shadow-2xl shadow-black/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
        >
          {/* Subtle gradient highlight on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/40 px-3 py-1 rounded-full border border-amber-300/40">
              Consultation & Devis
            </span>
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-amber-500 group-hover:rotate-45 transition-all duration-300 shadow-md">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            Un Projet en Tête ?
          </h3>

          <p className="text-xs sm:text-sm xl:text-base text-slate-600 dark:text-slate-300 font-medium mb-5 leading-relaxed">
            Réservez une première consultation avec nos architectes pour donner vie à vos idées.
          </p>

          {/* Social Proof & Stats */}
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Architecte ICDD"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80"
                  alt="Architecte ICDD"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
                  alt="Architecte ICDD"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                100+ Projets Réalisés
              </div>
            </div>
            
            <span className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Réserver
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Panel (Featured Project Card) */}
        <div 
          onClick={() => onOpenProject(featuredProject)}
          className="w-full lg:w-[480px] xl:w-[560px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-7 xl:p-8 rounded-[32px] border border-white/80 dark:border-white/20 shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer group relative"
        >
          {/* Card Header with Location & Action Arrow */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{featuredProject.location}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-amber-600 transition-colors">
                {featuredProject.title}
              </h3>
            </div>

            {/* Top Right Action Arrow */}
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-amber-500 group-hover:rotate-45 transition-all duration-300 shadow-lg flex-shrink-0">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mb-4 line-clamp-2 leading-relaxed">
            {featuredProject.description}
          </p>

          {/* Project Specifications Tag Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Superficie: {featuredProject.area}m²
            </span>
            <span className="text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Style: {featuredProject.style}
            </span>
            <span className="text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Année: {featuredProject.year}
            </span>
          </div>

          {/* Bottom Card Bar: Social Buttons & Circular ICDD Logo Badge */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            {/* Interactive Social Buttons */}
            <div className="flex items-center gap-2">
              {/* Like Button */}
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  liked
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
                title="Aimer ce projet"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>

              {/* Bookmark Button */}
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-full text-xs transition-all ${
                  bookmarked
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
                title="Enregistrer"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-xs bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white transition-all relative"
                title="Partager le projet"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                    Lien copié!
                  </span>
                )}
              </button>
            </div>

            {/* Required Circular ICDD Logo Badge (Bottom Right) */}
            <div 
              className="w-14 h-14 rounded-full bg-slate-950 text-white flex flex-col items-center justify-center font-black tracking-widest text-xs shadow-xl border-2 border-amber-400/80 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300 relative"
              title="Logo ICDD Architecture d'Intérieur"
            >
              <span className="text-[11px] leading-none text-white font-black tracking-tighter">ICDD</span>
              <span className="text-[7px] text-amber-400 font-semibold tracking-wider uppercase mt-0.5">PARIS</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
