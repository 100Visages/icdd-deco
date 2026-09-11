import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Sparkles, ExternalLink } from 'lucide-react';

interface ShowcaseCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({
  projects,
  onProjectClick,
  onViewAllProjects,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide effect (every 3.8 seconds unless paused)
  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, total]);

  // Touch handlers for mobile swipe
  const minSwipeDistance = 45;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const currentProject = projects[currentIndex] || projects[0];

  return (
    <section 
      id="section-realisations-majeure"
      aria-label="Réalisations Déjà Faites par ICDD"
      className="w-full relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header: Luxury Architectural Showcase */}
      <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3.5 px-1">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#00D7FF] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Décorations Déjà Faites par l'Agence</span>
            <span className="hidden sm:inline text-[#005EA6] dark:text-[#00D7FF] font-semibold lowercase">
              (défilement automatique)
            </span>
          </span>
        </div>

        {/* Action to go directly to the portfolio */}
        <button
          onClick={onViewAllProjects}
          className="text-[11px] sm:text-xs font-bold text-[#005EA6] dark:text-[#00D7FF] hover:underline flex items-center gap-1 group cursor-pointer transition-all"
        >
          <span>Voir tous les projets ({total})</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Main Interactive Carousel Display Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => onProjectClick(currentProject)}
        className="relative w-full h-[260px] xs:h-[290px] sm:h-[340px] md:h-[380px] lg:h-[420px] rounded-[22px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-white/60 dark:border-white/20 cursor-pointer group transition-transform duration-300 hover:scale-[1.008] bg-slate-950"
      >
        {/* Background Project Photography */}
        <img
          src={currentProject.coverImage}
          alt={currentProject.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/projects/real_project_4.jpg';
          }}
        />

        {/* Ambient Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/60" />

        {/* Top Badges Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#005EA6]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#00D7FF]/50 shadow-md">
              {currentProject.category}
            </span>
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1 border border-white/30 shadow">
              <MapPin className="w-3 h-3 text-[#00D7FF]" />
              {currentProject.location}
            </span>
          </div>

          {/* Realization Badge */}
          <div className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[#00D7FF] text-[10px] sm:text-xs font-bold border border-[#00D7FF]/40 shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00D7FF]" />
            <span className="hidden xs:inline">Réalisation ICDD</span>
            <span className="xs:hidden">ICDD</span>
          </div>
        </div>

        {/* Bottom Content: Minimalist, Bold & Architectural (Optimized for Mobile) */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-6 md:p-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
          <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00D7FF]">
                {currentProject.style}
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium">
                {currentProject.specs.wallSurface}
              </span>
            </div>

            <h3 className="text-base sm:text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md group-hover:text-[#00D7FF] transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
              {currentProject.title}
            </h3>

            {/* Subtitle visible on desktop, hidden or truncated on mobile to respect "pas trop de texte" */}
            <p className="hidden sm:block text-xs sm:text-sm text-slate-200/90 font-medium line-clamp-2 leading-relaxed">
              {currentProject.subtitle}
            </p>
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 pt-1 sm:pt-0">
            <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#005EA6] group-hover:bg-[#004f8c] text-white text-xs font-bold shadow-xl border border-[#00D7FF]/40 flex items-center gap-1.5 transition-all group-hover:scale-105">
              <span>Voir ce projet</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00D7FF]" />
            </div>
          </div>
        </div>

        {/* Navigation Arrows (Prev / Next) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Projet précédent"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-[#005EA6] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 z-20 cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Projet suivant"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-[#005EA6] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 z-20 cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Progress Dots / Bar Indicator */}
        <div className="absolute bottom-1.5 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Aller au projet ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 sm:w-6 h-1.5 bg-[#00D7FF] shadow-sm'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
          <span className="text-[9px] sm:text-[10px] text-white/80 font-bold ml-1">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>

      {/* Mobile-Only Fast Strip / Reel Preview: Tap to Open Projects */}
      <div className="sm:hidden mt-2.5 flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 px-0.5">
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            onClick={() => onProjectClick(proj)}
            className={`flex-shrink-0 flex items-center gap-1.5 p-1 pr-2.5 rounded-full border text-[10px] font-bold transition-all cursor-pointer ${
              i === currentIndex
                ? 'bg-[#005EA6] text-white border-[#00D7FF] shadow'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border-white/60'
            }`}
          >
            <img
              src={proj.coverImage}
              alt=""
              className="w-5 h-5 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="truncate max-w-[110px]">{proj.title.split('–')[0]}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
