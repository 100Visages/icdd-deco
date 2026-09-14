import React, { useState, useRef, useEffect } from 'react';
import { Project, NavTab, RealisationCategory } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Building2, 
  Paintbrush, 
  Layers, 
  DoorClosed, 
  ChefHat, 
  ShoppingBag, 
  Compass, 
  CheckCircle2, 
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  Home,
  BedDouble,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { ICDD_PROJECTS, ICDD_ASSETS } from '../data/projects';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface HeroOverlayProps {
  featuredProject: Project;
  projects?: Project[];
  onOpenProject: (project: Project) => void;
  openQuoteModal: () => void;
  setActiveTab: (tab: NavTab) => void;
  onSelectCategory?: (category: RealisationCategory) => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  projects = ICDD_PROJECTS,
  onOpenProject,
  openQuoteModal,
  setActiveTab,
  onSelectCategory,
}) => {
  // Filters for "Trouve ton goût"
  const [selectedSpace, setSelectedSpace] = useState<string>('Salon');
  const [selectedStyle, setSelectedStyle] = useState<string>('Moderne');
  const [selectedProject, setSelectedProjectType] = useState<string>('Appartement');
  const [tasteDiscovered, setTasteDiscovered] = useState<boolean>(false);

  // Mobile clean view toggles
  const [showMobileHeroDetails, setShowMobileHeroDetails] = useState<boolean>(false);
  const [openDecoDetails, setOpenDecoDetails] = useState<Record<string, boolean>>({});

  const toggleDecoDetails = (id: string) => {
    setOpenDecoDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const realisationsRef = useRef<HTMLDivElement>(null);

  // Défilement automatique toutes les 2 secondes avec photos réelles de réalisations ICDD - Déco Maison exclusivement
  const heroRealisationSlides = [
    {
      id: 'salon-contemporain',
      title: 'Salon Contemporain & Pièce de Vie',
      subtitle: 'Harmonie des enduits fins, éclairage indirect tamisé et agencement sur mesure.',
      category: 'Déco Maison • Salon',
      location: 'Kinshasa, Gombe',
      image: ICDD_ASSETS.project2,
      targetProject: projects.find((p) => p.id === 'appartement-moderne-kinshasa') || projects[0],
    },
    {
      id: 'suite-parentale-royale',
      title: 'Suite Parentale & Tête de Lit Sculptée',
      subtitle: 'Ambiance feutrée, habillage mural avec panneaux veloutés et éclairage d’ambiance.',
      category: 'Déco Maison • Chambre',
      location: 'Kinshasa, Gombe',
      image: ICDD_ASSETS.chambre1,
      targetProject: projects.find((p) => p.id === 'chambre-suite-royale-gombe') || projects[0],
    },
    {
      id: 'salon-prestige-staff',
      title: 'Grand Salon de Réception & Décoration Raffinée',
      subtitle: 'Décoration murale d’exception, gorges lumineuses indirectes et finitions soignées.',
      category: 'Déco Maison • Séjour',
      location: 'Kinshasa, Macampagne',
      image: ICDD_ASSETS.r4,
      targetProject: projects.find((p) => p.id === 'realisation-salon-prestige-kinshasa') || projects[0],
    },
    {
      id: 'cuisine-moderne-lumineuse',
      title: 'Cuisine Contemporaine de Maison & Îlot Central',
      subtitle: 'Mobilier ergonomique, façades épurées et rangements intégrés pour villa.',
      category: 'Déco Maison • Cuisine',
      location: 'Kinshasa, Mont-Fleury',
      image: ICDD_ASSETS.cuisine1,
      targetProject: projects.find((p) => p.id === 'cuisine-moderne-sur-mesure-kinshasa') || projects[0],
    },
    {
      id: 'chambre-moderne-cosy',
      title: 'Chambre Moderne Cosy & Mur d’Accent',
      subtitle: 'Camaïeux neutres chauds, boiseries décoratives et douceur intimiste.',
      category: 'Déco Maison • Chambre',
      location: 'Kinshasa, Ngaliema',
      image: ICDD_ASSETS.chambre2,
      targetProject: projects.find((p) => p.id === 'chambre-cosy-moderne-ngaliema') || projects[0],
    },
    {
      id: 'sejour-lounge-residentiel',
      title: 'Séjour Résidentiel & Espace Lounge Villa',
      subtitle: 'Architecture d’intérieur résidentielle, stuc vénitien et jeux de lumière.',
      category: 'Déco Maison • Séjour',
      location: 'Kinshasa, RDC',
      image: ICDD_ASSETS.project1,
      targetProject: projects.find((p) => p.id === 'appartement-moderne-kinshasa') || projects[0],
    },
    {
      id: 'suite-parentale-gold',
      title: 'Suite Résidentielle & Espace Nuit',
      subtitle: 'Teintes apaisantes, relief décoratif et éclairage chaleureux 2700K.',
      category: 'Déco Maison • Chambre',
      location: 'Kinshasa, Ngaliema',
      image: ICDD_ASSETS.r16,
      targetProject: projects.find((p) => p.id === 'realisation-suite-moderne-kinshasa') || projects[0],
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Défilement automatique toutes les 2 secondes (2000 ms)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroRealisationSlides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, heroRealisationSlides.length]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + heroRealisationSlides.length) % heroRealisationSlides.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % heroRealisationSlides.length);
  };

  const currentHeroSlide = heroRealisationSlides[currentSlideIndex];

  const handleExploreCategory = (cat: RealisationCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setActiveTab('realisations');
  };

  const handleDiscoverTaste = () => {
    setTasteDiscovered(true);

    // Map selected space to realization category
    let targetCategory: RealisationCategory = 'Tous';
    if (selectedSpace === 'Salon') {
      targetCategory = 'Décoration';
    } else if (selectedSpace === 'Chambre') {
      targetCategory = 'Chambres';
    } else if (selectedSpace === 'Cuisine') {
      targetCategory = 'Cuisines';
    } else if (selectedSpace === 'Staff') {
      targetCategory = 'Staff';
    } else if (selectedSpace === 'Portes') {
      targetCategory = 'Portes';
    } else if (selectedSpace === 'Bureau') {
      targetCategory = 'Bureaux';
    } else if (selectedProject === 'Appartement') {
      targetCategory = 'Appartements';
    }

    if (onSelectCategory) {
      onSelectCategory(targetCategory);
    }

    // Smooth scroll down to realisations section or navigate
    if (realisationsRef.current) {
      realisationsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="accueil-view-container" className="relative w-full h-full min-h-0 overflow-y-auto custom-scrollbar p-3 sm:p-5 md:p-7 lg:p-9 xl:p-10 pointer-events-auto">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 pb-28 sm:pb-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Minimalist, épuré, design architectural haut de gamme)   */}
        {/* ========================================================================= */}
        <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/95 text-slate-800 shadow-sm border border-slate-200/60 backdrop-blur-xl">
          
          {/* Header Bar inside Hero: Branding & Catchphrase */}
          <div className="pt-6 sm:pt-10 lg:pt-12 px-4 sm:px-12 text-center space-y-2 z-10 relative">
            {/* Tagline hidden on mobile per user request */}
            <p className="hidden sm:block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              Architecture d'Intérieur & Décoration • Kinshasa
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-900 uppercase">
              ICDD <span className="font-semibold text-slate-900">DÉCO</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-500 font-light tracking-wide italic">
              « L'art de sublimer vos espaces de vie »
            </p>
          </div>

          {/* Carrousel animé de photos de réalisations réelles ICDD – Défilement automatique toutes les 2 secondes */}
          <div 
            className="relative mt-4 sm:mt-6 mx-2 sm:mx-6 lg:mx-8 mb-2 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden h-[340px] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[640px] bg-slate-950 shadow-inner group border border-slate-200/40 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Slide Images with smooth crossfade & subtle scale */}
            {heroRealisationSlides.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-[3000ms] ease-out ${
                      isActive ? 'scale-104' : 'scale-100'
                    }`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/projects/real_project_2.jpg';
                    }}
                  />
                </div>
              );
            })}

            {/* Subtle High-End Gradient Scrim */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Bar inside slider: Hidden on mobile to keep photo completely clean */}
            <div className="hidden sm:flex absolute top-5 left-6 right-6 z-30 items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-normal shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D7FF]" />
                <span className="tracking-wider text-white/90 uppercase text-[10px]">Décoration Maison</span>
                <span className="text-white/30">•</span>
                <span className="text-white/70 font-mono text-[11px]">
                  {currentSlideIndex + 1} / {heroRealisationSlides.length}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/70 text-[10px] font-light">
                <span>Auto 2s</span>
                {isHovered && <span className="text-amber-300 font-normal">(Pause)</span>}
              </div>
            </div>

            {/* Manual Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              aria-label="Réalisation précédente"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/70 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95 group/nav"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover/nav:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNextSlide}
              aria-label="Réalisation suivante"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/70 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95 group/nav"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/nav:translate-x-0.5 transition-transform" />
            </button>

            {/* MOBILE ONLY: Clean Bottom Bar with Dots & "Voir les détails" Button */}
            <div className="sm:hidden absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-auto">
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
                {heroRealisationSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlideIndex(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentSlideIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`Photo ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileHeroDetails(!showMobileHeroDetails);
                }}
                className="px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 text-white text-[11px] font-medium backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-sky-300" />
                <span>{showMobileHeroDetails ? 'Masquer' : 'Détails'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMobileHeroDetails ? 'rotate-180 text-sky-300' : ''}`} />
              </button>
            </div>

            {/* MOBILE ONLY: Expandable Overlay for details (Hidden by default, shown on click) */}
            {showMobileHeroDetails && (
              <div className="sm:hidden absolute inset-x-2.5 bottom-12 z-30 p-3.5 rounded-xl bg-black/90 backdrop-blur-xl border border-white/15 text-white space-y-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/15 text-[9px] font-medium uppercase tracking-wider text-white/90 border border-white/10">
                    {currentHeroSlide.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-white/70 font-light">
                    <MapPin className="w-3 h-3 text-sky-300" />
                    {currentHeroSlide.location}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-white leading-tight">
                  {currentHeroSlide.title}
                </h3>

                <p className="text-[11px] text-white/70 leading-snug font-light">
                  {currentHeroSlide.subtitle}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  {currentHeroSlide.targetProject && (
                    <button
                      onClick={() => onOpenProject(currentHeroSlide.targetProject)}
                      className="flex-1 py-1.5 rounded-lg bg-white text-slate-950 text-[11px] font-medium text-center active:scale-95 transition-transform cursor-pointer"
                    >
                      Voir le projet
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('realisations')}
                    className="flex-1 py-1.5 rounded-lg bg-white/15 text-white text-[11px] font-medium text-center active:scale-95 transition-transform cursor-pointer border border-white/20"
                  >
                    Toutes nos réalisations
                  </button>
                </div>
              </div>
            )}

            {/* DESKTOP ONLY: Full Bottom floating content */}
            <div className="hidden sm:flex absolute bottom-6 left-6 right-6 z-30 flex-col sm:flex-row sm:items-end justify-between gap-4">
              
              {/* Project Title & Category Info */}
              <div className="space-y-2 text-white max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-medium uppercase tracking-[0.15em] text-white/90 border border-white/15 shadow-sm">
                    {currentHeroSlide.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-white/70 font-light">
                    <MapPin className="w-3 h-3 text-sky-300" />
                    {currentHeroSlide.location}
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-white leading-tight transition-all duration-300">
                  {currentHeroSlide.title}
                </h2>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light max-w-lg">
                  {currentHeroSlide.subtitle}
                </p>

                {/* Progress Indicators (Dots) */}
                <div className="flex items-center gap-1.5 pt-1">
                  {heroRealisationSlides.map((_, dotIdx) => {
                    const isDotActive = dotIdx === currentSlideIndex;
                    return (
                      <button
                        key={dotIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlideIndex(dotIdx);
                        }}
                        aria-label={`Aller à la réalisation ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isDotActive 
                            ? 'w-7 bg-white shadow-xs' 
                            : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                {currentHeroSlide.targetProject && (
                  <button
                    onClick={() => onOpenProject(currentHeroSlide.targetProject)}
                    className="px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-medium shadow-sm transition-all hover:bg-slate-100 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-700" />
                    <span>Voir ce projet</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('realisations')}
                  className="px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 text-xs font-medium backdrop-blur-md transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Réalisations</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                </button>

                <button
                  onClick={openQuoteModal}
                  className="px-5 py-2 rounded-full bg-[#005EA6] hover:bg-[#004b85] text-white text-xs font-medium shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Demander un devis
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SECTION "TROUVE TON GOÛT" (Sélecteur architectural épuré)              */}
        {/* ========================================================================= */}
        <section id="trouve-ton-gout" className="relative">
          <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
            
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                Sélection Personnalisée
              </span>
              <h2 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">
                Trouve ton goût
              </h2>
              <p className="text-xs text-slate-500 font-light">
                Quel espace souhaitez-vous transformer ?
              </p>
            </div>

            {/* Selectors Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-end pt-1">
              
              {/* Selector 1: Type d'espace */}
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                  Type d'espace
                </label>
                <div className="relative">
                  <select
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-normal rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-slate-400 transition-all cursor-pointer"
                  >
                    <option value="Salon">Salon</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Staff">Staff & Plafonds</option>
                    <option value="Portes">Portes & Menuiserie</option>
                    <option value="Chambre">Chambre & Dressing</option>
                    <option value="Bureau">Bureau & Espace Pro</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Selector 2: Style */}
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                  Style
                </label>
                <div className="relative">
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-normal rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-slate-400 transition-all cursor-pointer"
                  >
                    <option value="Moderne">Moderne & Épuré</option>
                    <option value="Classique">Classique Élégant</option>
                    <option value="Luxe">Luxe Contemporain</option>
                    <option value="Gold">Gold Prestige</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Selector 3: Projet */}
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                  Projet
                </label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProjectType(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-normal rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-slate-400 transition-all cursor-pointer"
                  >
                    <option value="Appartement">Appartement</option>
                    <option value="Villa">Villa / Résidence</option>
                    <option value="Espace Pro">Espace Professionnel</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Button: Découvrir */}
              <div className="pt-1 sm:pt-0">
                <button
                  onClick={handleDiscoverTaste}
                  className="w-full px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#005EA6] text-white text-xs font-medium transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                </button>
              </div>

            </div>

            {/* Interactive Feedback Banner */}
            {tasteDiscovered && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#005EA6] flex-shrink-0" />
                  <span className="font-light">
                    Sélection : <strong className="font-medium text-slate-900">{selectedSpace}</strong> • style <strong className="font-medium text-slate-900">{selectedStyle}</strong> • <strong className="font-medium text-slate-900">{selectedProject}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('realisations')}
                  className="text-xs font-medium text-[#005EA6] hover:underline cursor-pointer whitespace-nowrap"
                >
                  Voir les chantiers correspondants →
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. NOS RÉALISATIONS (Grille 6 cartes épurées et sobres)                   */}
        {/* ========================================================================= */}
        <section ref={realisationsRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                Portfolio Réalisations ICDD
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                Nos réalisations
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Sélection de projets de décoration intérieure conçus et réalisés à Kinshasa.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('realisations')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-[#005EA6] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Voir tout le portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid of 6 Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4 sm:gap-5">
            
            {/* Card 1: SALONS */}
            <div 
              onClick={() => handleExploreCategory('Décoration')}
              className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 lg:h-60 2xl:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.project2}
                  alt="Salons contemporains et royaux par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                  Salon & Séjour
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-normal tracking-tight">Salons</h3>
                    <p className="text-[11px] text-white/70 font-light">Aménagements contemporains</p>
                  </div>
                  <span className="text-[11px] font-normal text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    Dès 350 $
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex p-3 items-center justify-between text-xs text-slate-500 font-light bg-slate-50/50 border-t border-slate-100 group-hover:text-slate-800 transition-colors">
                <span>Stuc vénitien & éclairage</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 2: CUISINES */}
            <div 
              onClick={() => handleExploreCategory('Cuisines')}
              className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 lg:h-60 2xl:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.cuisine1}
                  alt="Cuisines modernes par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                  Cuisine & Îlot
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-normal tracking-tight">Cuisines</h3>
                    <p className="text-[11px] text-white/70 font-light">Sur mesure & plans quartz</p>
                  </div>
                  <span className="text-[11px] font-normal text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    Dès 500 $
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex p-3 items-center justify-between text-xs text-slate-500 font-light bg-slate-50/50 border-t border-slate-100 group-hover:text-slate-800 transition-colors">
                <span>Rangements & LED intégrées</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 3: STAFF & PLAFONDS */}
            <div 
              onClick={() => handleExploreCategory('Staff')}
              className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 lg:h-60 2xl:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.sp2}
                  alt="Staff et plafonds par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                  Staff & Plafonds
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-normal tracking-tight">Staff</h3>
                    <p className="text-[11px] text-white/70 font-light">Gorges LED & faux-plafonds</p>
                  </div>
                  <span className="text-[11px] font-normal text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    Dès 250 $
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex p-3 items-center justify-between text-xs text-slate-500 font-light bg-slate-50/50 border-t border-slate-100 group-hover:text-slate-800 transition-colors">
                <span>Maîtres staffeurs & plâtre fibré</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 4: PORTES */}
            <div 
              onClick={() => handleExploreCategory('Portes')}
              className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 lg:h-60 2xl:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.porte1}
                  alt="Portes intérieures réalisées par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                  Menuiserie
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-normal tracking-tight">Portes</h3>
                    <p className="text-[11px] text-white/70 font-light">Blocs-portes isophoniques</p>
                  </div>
                  <span className="text-[11px] font-normal text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    Dès 290 $
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex p-3 items-center justify-between text-xs text-slate-500 font-light bg-slate-50/50 border-t border-slate-100 group-hover:text-slate-800 transition-colors">
                <span>Vantaux pleins acoustiques</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 5: CHAMBRES */}
            <div 
              onClick={() => handleExploreCategory('Chambres')}
              className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 lg:h-60 2xl:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.chambre1}
                  alt="Décoration de chambres et suites parentales par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/chambre_deco_1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                  Chambre
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-normal tracking-tight">Chambres</h3>
                    <p className="text-[11px] text-white/70 font-light">Suites parentales & têtes de lit</p>
                  </div>
                  <span className="text-[11px] font-normal text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    Dès 350 $
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex p-3 items-center justify-between text-xs text-slate-500 font-light bg-slate-50/50 border-t border-slate-100 group-hover:text-slate-800 transition-colors">
                <span>Reliefs velours & lumières</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 6: BUREAUX */}
            <div 
              onClick={() => handleExploreCategory('Bureaux')}
              className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 lg:h-60 2xl:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.bureau1}
                  alt="Décoration de bureaux et espaces professionnels par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/bureau_deco_1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                  Bureau & Pro
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-normal tracking-tight">Bureaux</h3>
                    <p className="text-[11px] text-white/70 font-light">Espaces de travail & cabinets</p>
                  </div>
                  <span className="text-[11px] font-normal text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    Dès 350 $
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex p-3 items-center justify-between text-xs text-slate-500 font-light bg-slate-50/50 border-t border-slate-100 group-hover:text-slate-800 transition-colors">
                <span>Habillage mural & acoustique</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

          </div>

          {/* Centered button "Voir toutes les réalisations" */}
          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('realisations')}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium shadow-xs transition-all cursor-pointer"
            >
              Voir tout le portfolio →
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DÉCOUVREZ NOTRE SAVOIR-FAIRE (Carte info déco épurée)                 */}
        {/* ========================================================================= */}
        <section className="space-y-10 sm:space-y-14 pt-4 border-t border-slate-200/60">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
              Architectural & Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
              Découvrez notre savoir-faire
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Une maîtrise complète de l'espace intérieur où chaque matière, chaque ligne de plâtre et chaque source de lumière dialoguent harmonieusement.
            </p>
          </div>

          <div className="space-y-10 sm:space-y-14 lg:space-y-16">

            {/* Block 1: SALON (Image on Left, Text on Right) */}
            <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200/70 h-64 sm:h-80 md:h-96 lg:h-[400px] relative group">
                <img
                  src={ICDD_ASSETS.project2}
                  alt="Salon contemporain réalisé par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] font-light text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  Chantier Réel • Gombe
                </div>
              </div>

              {/* Mobile button: placed AFTER the image */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => toggleDecoDetails('salon')}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between shadow-xs ${
                    openDecoDetails['salon']
                      ? 'bg-slate-900 text-white border-slate-800'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      openDecoDetails['salon'] ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-normal tracking-tight">
                      {openDecoDetails['salon'] ? 'Masquer les détails' : 'Voir les détails de la déco (Salon)'}
                    </span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    openDecoDetails['salon'] ? 'rotate-180 text-white' : 'text-slate-400'
                  }`} />
                </button>
              </div>

              {/* Text: hidden on mobile unless toggled by the button */}
              <div className={`${openDecoDetails['salon'] ? 'block' : 'hidden'} lg:block lg:col-span-5 space-y-4 text-slate-700 pt-1 lg:pt-0 animate-in fade-in duration-300`}>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                    Pièce de Vie Signature
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">
                    Salon contemporain
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                    Un espace pensé autour de l'élégance, du confort et de l'harmonie des matériaux. Nos architectes d'intérieur orchestrent les volumes, l'éclairage indirect et les textures pour créer un lieu de vie chaleureux et prestigieux.
                  </p>
                </div>

                {/* Specs / metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Finitions</span>
                    <span className="text-xs font-normal text-slate-800">Stuc & Velours</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Éclairage</span>
                    <span className="text-xs font-normal text-slate-800">Gorges LED</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Style</span>
                    <span className="text-xs font-normal text-slate-800">Moderne Épuré</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-light text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Décoration
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Staff
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Éclairage
                  </span>
                </div>
              </div>
            </div>

            {/* Block 2: CUISINE (Text on Left, Image on Right) */}
            <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200/70 h-64 sm:h-80 md:h-96 lg:h-[400px] relative group order-1 lg:order-2">
                <img
                  src={ICDD_ASSETS.cuisine1}
                  alt="Cuisine moderne sur mesure réalisée par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] font-light text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  Chantier Réel • Kinshasa
                </div>
              </div>

              {/* Mobile button: placed AFTER the image */}
              <div className="order-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => toggleDecoDetails('cuisine')}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between shadow-xs ${
                    openDecoDetails['cuisine']
                      ? 'bg-slate-900 text-white border-slate-800'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      openDecoDetails['cuisine'] ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-normal tracking-tight">
                      {openDecoDetails['cuisine'] ? 'Masquer les détails' : 'Voir les détails de la déco (Cuisine)'}
                    </span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    openDecoDetails['cuisine'] ? 'rotate-180 text-white' : 'text-slate-400'
                  }`} />
                </button>
              </div>

              {/* Text: hidden on mobile unless toggled by the button */}
              <div className={`${openDecoDetails['cuisine'] ? 'block' : 'hidden'} lg:block lg:col-span-5 space-y-4 text-slate-700 order-3 lg:order-1 pt-1 lg:pt-0 animate-in fade-in duration-300`}>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                    Cœur de Maison
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">
                    Cuisine sur mesure
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                    Des espaces fonctionnels et conviviaux conçus pour s'intégrer harmonieusement à votre intérieur. Îlots centraux, façades épurées anti-traces, gorges LED et rangements ergonomiques personnalisés.
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Conception</span>
                    <span className="text-xs font-normal text-slate-800">Sur Mesure</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Matériaux</span>
                    <span className="text-xs font-normal text-slate-800">Hydrofuge HD</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Confort</span>
                    <span className="text-xs font-normal text-slate-800">Amortis</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-light text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Îlot Central
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Rangements
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Plan Quartz
                  </span>
                </div>
              </div>

            </div>

            {/* Block 3: STAFF & PLAFONDS (Image on Left, Text on Right) */}
            <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200/70 h-64 sm:h-80 md:h-96 lg:h-[400px] relative group">
                <img
                  src={ICDD_ASSETS.sp2}
                  alt="Staff et plafonds sculptés par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] font-light text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  Ateliers Staff • Kinshasa
                </div>
              </div>

              {/* Mobile button: placed AFTER the image */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => toggleDecoDetails('staff')}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between shadow-xs ${
                    openDecoDetails['staff']
                      ? 'bg-slate-900 text-white border-slate-800'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      openDecoDetails['staff'] ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-normal tracking-tight">
                      {openDecoDetails['staff'] ? 'Masquer les détails' : 'Voir les détails de la déco (Staff & Plafonds)'}
                    </span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    openDecoDetails['staff'] ? 'rotate-180 text-white' : 'text-slate-400'
                  }`} />
                </button>
              </div>

              {/* Text: hidden on mobile unless toggled by the button */}
              <div className={`${openDecoDetails['staff'] ? 'block' : 'hidden'} lg:block lg:col-span-5 space-y-4 text-slate-700 pt-1 lg:pt-0 animate-in fade-in duration-300`}>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                    Art du Plâtre & Volume
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">
                    Staff & plafonds sculptés
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                    L'art du plâtre façonné à la main par nos maîtres staffeurs à Kinshasa. Faux-plafonds suspendus, corniches sculptées et gorges lumineuses LED dissimulées qui apportent profondeur et majesté aux volumes.
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Précision</span>
                    <span className="text-xs font-normal text-slate-800">Moulage Manuel</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Lumière</span>
                    <span className="text-xs font-normal text-slate-800">Gorges LED</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Aspect</span>
                    <span className="text-xs font-normal text-slate-800">Blanc Soyeux</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-light text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Gorges LED
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Corniches
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Rosaces
                  </span>
                </div>
              </div>
            </div>

            {/* Block 4: PORTES & MENUISERIE (Text on Left, Image on Right) */}
            <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200/70 h-64 sm:h-80 md:h-96 lg:h-[400px] relative group order-1 lg:order-2">
                <img
                  src={ICDD_ASSETS.porte1}
                  alt="Porte intérieure contemporaine réalisée par ICDD"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] font-light text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  Pose Chantier • Macampagne
                </div>
              </div>

              {/* Mobile button: placed AFTER the image */}
              <div className="order-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => toggleDecoDetails('portes')}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between shadow-xs ${
                    openDecoDetails['portes']
                      ? 'bg-slate-900 text-white border-slate-800'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      openDecoDetails['portes'] ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-normal tracking-tight">
                      {openDecoDetails['portes'] ? 'Masquer les détails' : 'Voir les détails de la déco (Portes)'}
                    </span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    openDecoDetails['portes'] ? 'rotate-180 text-white' : 'text-slate-400'
                  }`} />
                </button>
              </div>

              {/* Text: hidden on mobile unless toggled by the button */}
              <div className={`${openDecoDetails['portes'] ? 'block' : 'hidden'} lg:block lg:col-span-5 space-y-4 text-slate-700 order-3 lg:order-1 pt-1 lg:pt-0 animate-in fade-in duration-300`}>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                    Ouvertures & Menuiserie
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">
                    Portes intérieures & finitions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                    Véritables blocs-portes contemporains fabriqués dans nos ateliers de Kinshasa : vantaux pleins acoustiques, huisseries affleurantes, rainurages design et serrures magnétiques silencieuses.
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Acoustique</span>
                    <span className="text-xs font-normal text-slate-800">Âme Pleine</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Paumelles</span>
                    <span className="text-xs font-normal text-slate-800">Invisibles 3D</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Fermeture</span>
                    <span className="text-xs font-normal text-slate-800">Magnétique</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-light text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Blocs-portes
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Rainurages
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Sur mesure
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. NOS SERVICES (Ce que ICDD fait pour ses clients)                       */}
        {/* ========================================================================= */}
        <section className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                Expertise & Métiers
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                Nos services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Ce que ICDD conçoit et réalise pour sublimer votre cadre de vie à Kinshasa.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="px-5 py-2 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white text-xs font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              Découvrir nos services
            </button>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                title: 'Architecture & Design',
                desc: 'Plans 2D/3D, restructuration des volumes, agencements personnalisés et décloisonnement.',
                icon: Compass,
              },
              {
                title: 'Décoration & Peinture',
                desc: 'Enduits stucs marbrés, peintures veloutées dépolluantes, patines et harmonies chromatiques.',
                icon: Paintbrush,
              },
              {
                title: 'Staff & Faux-Plafonds',
                desc: 'Faux-plafonds suspendus, corniches sculptées et gorges d’éclairage LED dissimulées.',
                icon: Layers,
              },
              {
                title: 'Cuisines & Menuiserie',
                desc: 'Cuisines contemporaines avec îlot, blocs-portes isophoniques et menuiserie sur mesure.',
                icon: ChefHat,
              },
            ].map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab('services')}
                  className="p-5 sm:p-6 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/60 hover:border-slate-300 transition-all cursor-pointer space-y-2.5 shadow-xs group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 text-slate-800 flex items-center justify-center shadow-xs">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-normal text-slate-900 group-hover:text-[#005EA6] transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SHOP (Matériaux / produits disponibles à la vente – Distinction nette)  */}
        {/* ========================================================================= */}
        <section className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
                Matériaux & Mobilier
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                Le Shop ICDD
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Achetez directement vos peintures haut de gamme, blocs-portes, éléments de cuisine et corniches.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('shop')}
              className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              Voir tout le Shop
            </button>
          </div>

          {/* 4 Shop Products Preview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
            {[
              {
                title: 'Peintures',
                desc: 'Velours, mates & stucs minéraux',
                badge: 'Dès 65 $',
                image: ICDD_ASSETS.project7
              },
              {
                title: 'Portes',
                desc: 'Blocs-portes acoustiques contemporains',
                badge: 'Dès 290 $',
                image: ICDD_ASSETS.porte1
              },
              {
                title: 'Cuisines',
                desc: 'Plans quartz, façades & caissons',
                badge: 'Sur devis',
                image: ICDD_ASSETS.cuisine1
              },
              {
                title: 'Staff & Corniches',
                desc: 'Corniches d’art & rosaces pour LED',
                badge: 'Dès 35 $',
                image: ICDD_ASSETS.sp8
              }
            ].map((prod, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab('shop')}
                className="group relative rounded-xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md cursor-pointer transition-all duration-500 h-44 sm:h-52 lg:h-60 flex flex-col justify-end p-3.5 text-white"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur-md border border-white/20 text-[9px] font-light text-white">
                    {prod.badge}
                  </span>
                  <h4 className="text-xs sm:text-sm font-normal tracking-tight">
                    {prod.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-white/70 font-light line-clamp-1">
                    {prod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACT / DEMANDE DE DEVIS (Parlons de votre projet)                   */}
        {/* ========================================================================= */}
        <section className="bg-slate-50/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left max-w-xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 block">
              Démarrer Votre Projet
            </span>
            <h2 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">
              Parlons de votre projet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Vous avez un projet de rénovation, de salon, de cuisine ou de villa à Kinshasa ? Contactez nos maîtres artisans pour un devis gratuit et personnalisé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20d%27am%C3%A9nagement."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-normal shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white text-xs font-normal shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-white/80" />
              <span>Demander un devis</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
