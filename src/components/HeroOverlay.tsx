import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project, NavTab, RealisationCategory } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  Phone, 
  PhoneCall,
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
  Eye,
  Star,
  Share2,
  Heart,
  Check,
  Sofa
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
  // Filtre actif pour les réalisations présentées sur la page d'accueil
  const [homeCategoryFilter, setHomeCategoryFilter] = useState<RealisationCategory>('Tous');

  // Mobile clean view toggles
  const [showMobileHeroDetails, setShowMobileHeroDetails] = useState<boolean>(false);
  const [openDecoDetails, setOpenDecoDetails] = useState<Record<string, boolean>>({});
  const [openServiceHeroDetails, setOpenServiceHeroDetails] = useState<Record<number, boolean>>({});

  // Mobile Full-screen Media State (Photo principale IMG_0385.png 8s avec zoom Ken Burns, puis 2 photos de réalisations)
  const [mobileMediaMode, setMobileMediaMode] = useState<'main' | 'photo'>('main');
  const [photosShownInCycle, setPhotosShownInCycle] = useState<number>(0);
  const [mainPhotoKey, setMainPhotoKey] = useState<number>(0);

  // Photos de réalisations d'exception réalisées par ICDD
  const heroMobilePhotos = [
    {
      src: ICDD_ASSETS.r19,
      alt: 'Salon Contemporain & Lignes Épurées réalisé par ICDD',
      title: 'Salon Contemporain & Lignes Épurées',
      category: 'Déco Maison • Appartement',
      location: 'Kinshasa, Gombe',
    },
    {
      src: ICDD_ASSETS.r16,
      alt: 'Habillage Mural Tasseaux de Bois & Marbre Noir par ICDD',
      title: 'Habillage Mural Tasseaux & Marbre',
      category: 'Déco Maison • Appartement',
      location: 'Kinshasa, Ngaliema',
    },
    {
      src: ICDD_ASSETS.bureau1,
      alt: 'Bureau Exécutif & Espace de Travail Contemporain par ICDD',
      title: 'Bureau Exécutif Contemporain',
      category: 'Déco Bureau',
      location: 'Kinshasa, Gombe',
    },
    {
      src: ICDD_ASSETS.cuisine1,
      alt: 'Cuisine Moderne Américaine & Îlot Central sur mesure par ICDD',
      title: 'Cuisine Moderne Sur-Mesure',
      category: 'Déco Cuisine',
      location: 'Kinshasa, Gombe',
    },
    {
      src: ICDD_ASSETS.r22,
      alt: 'Espace de Vie & Décoration Contemporaine par ICDD',
      title: 'Espace de Vie & Décoration Contemporaine',
      category: 'Déco Maison • Appartement',
      location: 'Kinshasa, Macampagne',
    },
    {
      src: ICDD_ASSETS.chambre2,
      alt: 'Suite Parentale & Staff Profilé Lumineux par ICDD',
      title: 'Suite Parentale & Staff Lumineux',
      category: 'Déco Maison • Chambre',
      location: 'Kinshasa, Mont-Fleury',
    },
  ];
  const [currentHeroPhotoIdx, setCurrentHeroPhotoIdx] = useState<number>(0);

  // Sitora UI Interactive State (Heart/Like, Share)
  const [isHearted, setIsHearted] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(342);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: "ICDD - Architecture d'Intérieur Kinshasa",
          text: "Découvrez ICDD : Le bien-être de tous, pour construire un monde meilleur.",
          url: window.location.href,
        });
      } catch {
        // User dismissed share dialog
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    }
  };

  // Desktop media toggle (to also optionally preview the showcase on PC)
  const [desktopShowcaseMode, setDesktopShowcaseMode] = useState<'carousel' | 'video'>('carousel');

  // Minuterie exacte de 8 secondes pour la photo principale IMG_0385 avec zoom Ken Burns, puis 2 photos de réalisations
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (mobileMediaMode === 'main') {
      // Photo principale IMG_0385.png affichée avec zoom Ken Burns pendant 8 secondes
      timer = setTimeout(() => {
        setPhotosShownInCycle(1);
        setMobileMediaMode('photo');
      }, 8000);
    } else {
      // Mode photos de réalisations : chaque photo reste affichée 5 secondes
      timer = setTimeout(() => {
        if (photosShownInCycle < 2) {
          // Affiche la 2ème photo du cycle
          setPhotosShownInCycle((prev) => prev + 1);
          setCurrentHeroPhotoIdx((prev) => (prev + 1) % heroMobilePhotos.length);
        } else {
          // Après 2 photos affichées, retour sur la photo principale avec relance du zoom
          setPhotosShownInCycle(0);
          setMainPhotoKey((k) => k + 1);
          setMobileMediaMode('main');
          setCurrentHeroPhotoIdx((prev) => (prev + 1) % heroMobilePhotos.length);
        }
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [mobileMediaMode, photosShownInCycle, currentHeroPhotoIdx, heroMobilePhotos.length]);

  // Permettre à l'utilisateur de passer manuellement s'il le souhaite
  const handleNextMedia = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (mobileMediaMode === 'main') {
      setPhotosShownInCycle(1);
      setMobileMediaMode('photo');
    } else {
      if (photosShownInCycle >= 2) {
        setPhotosShownInCycle(0);
        setMainPhotoKey((k) => k + 1);
        setMobileMediaMode('main');
        setCurrentHeroPhotoIdx((prev) => (prev + 1) % heroMobilePhotos.length);
      } else {
        setPhotosShownInCycle((prev) => prev + 1);
        setCurrentHeroPhotoIdx((prev) => (prev + 1) % heroMobilePhotos.length);
      }
    }
  };

  const handlePrevMedia = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (mobileMediaMode === 'photo') {
      if (photosShownInCycle <= 1) {
        setPhotosShownInCycle(0);
        setMainPhotoKey((k) => k + 1);
        setMobileMediaMode('main');
      } else {
        setPhotosShownInCycle((prev) => prev - 1);
        setCurrentHeroPhotoIdx((prev) => (prev === 0 ? heroMobilePhotos.length - 1 : prev - 1));
      }
    } else {
      setPhotosShownInCycle(2);
      setMobileMediaMode('photo');
    }
  };

  const toggleDecoDetails = (id: string) => {
    setOpenDecoDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleServiceHeroDetails = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenServiceHeroDetails((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const realisationsRef = useRef<HTMLDivElement>(null);

  // Défilement automatique toutes les 2 secondes avec les photos choisies pour le HeroOverlay
  const heroRealisationSlides = [
    {
      id: 'hero-icdd-real-19',
      title: 'Salon Contemporain & Lignes Épurées',
      subtitle: 'Harmonie des enduits fins, éclairage indirect tamisé et agencement sur mesure.',
      category: 'Déco Maison • Appartement',
      location: 'Kinshasa, Gombe',
      image: ICDD_ASSETS.r19,
      targetProject: projects.find((p) => p.id === 'appartement-moderne-kinshasa') || projects[0],
    },
    {
      id: 'hero-icdd-real-16',
      title: 'Habillage Mural Tasseaux & Marbre Noir',
      subtitle: 'Combinaison raffinée de tasseaux de bois nobles, marbre sombre poli et rubans LED intégrés.',
      category: 'Déco Maison • Habillage Mural',
      location: 'Kinshasa, Ngaliema',
      image: ICDD_ASSETS.r16,
      targetProject: projects.find((p) => p.id === 'realisation-suite-moderne-kinshasa') || projects[0],
    },
    {
      id: 'hero-icdd-bureau-1',
      title: 'Bureau Exécutif & Espace de Direction',
      subtitle: 'Agencement professionnel contemporain, habillage mural acoustique et éclairage ergonomique.',
      category: 'Déco Bureau',
      location: 'Kinshasa, Gombe',
      image: ICDD_ASSETS.bureau1,
      targetProject: projects.find((p) => p.id === 'bureau-direction-prestige') || projects[0],
    },
    {
      id: 'hero-icdd-cuisine-1',
      title: 'Cuisine Moderne Américaine & Îlot Central',
      subtitle: 'Conception sur-mesure haut de gamme, placards intégrés et finitions laquées.',
      category: 'Déco Cuisine',
      location: 'Kinshasa, Gombe',
      image: ICDD_ASSETS.cuisine1,
      targetProject: projects.find((p) => p.id === 'cuisine-moderne-luxe') || projects[0],
    },
    {
      id: 'hero-icdd-real-22',
      title: 'Espace de Vie & Décoration Contemporaine',
      subtitle: 'Harmonie des volumes, boiseries décoratives et finitions soignées.',
      category: 'Déco Maison • Séjour',
      location: 'Kinshasa, Macampagne',
      image: ICDD_ASSETS.r22,
      targetProject: projects.find((p) => p.id === 'appartement-lounge-ngaliema') || projects[0],
    },
    {
      id: 'hero-icdd-chambre-2',
      title: 'Suite Parentale & Staff Profilé Lumineux',
      subtitle: 'Ambiance reposante, tête de lit sur-mesure et éclairage d’ambiance indirect.',
      category: 'Déco Maison • Chambre',
      location: 'Kinshasa, Mont-Fleury',
      image: ICDD_ASSETS.chambre2,
      targetProject: projects.find((p) => p.id === 'realisation-suite-moderne-kinshasa') || projects[0],
    },
    {
      id: 'hero-real-project-3',
      title: 'Salon Royal – Reliefs 3D & Dorures',
      subtitle: 'Enduits structurés artistiques, feuilles de dorure et mise en lumière rasante.',
      category: 'Déco Maison • Top Modèle',
      location: 'Kinshasa, Gombe',
      image: ICDD_ASSETS.project3,
      targetProject: projects.find((p) => p.id === 'residence-top-modele') || projects[0],
    },
    {
      id: 'hero-real-project-1',
      title: 'Salon Contemporain – Finition Gold & Boiseries',
      subtitle: 'Enduits veloutés, mobilier haut standing et boiseries d’exception.',
      category: 'Déco Maison • Finition Gold',
      location: 'Kinshasa, Ngaliema',
      image: ICDD_ASSETS.project1,
      targetProject: projects.find((p) => p.id === 'suite-gold-prestige') || projects[0],
    },
    {
      id: 'hero-deco-chambre-5',
      title: 'Chambre Moderne & Mur d’Accent Bois',
      subtitle: 'Camaïeux doux, textures chaleureuses et éclairage d’ambiance feutré.',
      category: 'Déco Maison • Chambre',
      location: 'Kinshasa, Ngaliema',
      image: ICDD_ASSETS.chambre5,
      targetProject: projects.find((p) => p.id === 'chambre-cosy-moderne-ngaliema') || projects[0],
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

  return (
    <div id="accueil-view-container" className="relative w-full h-full min-h-0 overflow-y-auto custom-scrollbar p-0 m-0 pointer-events-auto">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto pb-28 sm:pb-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                          */}
        {/* ========================================================================= */}

        {/* --- MOBILE HERO: PLEIN ÉCRAN (100vh / 100dvh) AVEC PHOTO PRINCIPALE IMG_0385 (8s AVEC ZOOM KEN BURNS) PUIS 2 PHOTOS --- */}
        <section 
          id="mobile-hero-fullscreen"
          className="md:hidden relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden flex flex-col select-none"
        >
          {/* Arrière-plan Médias (Photo principale IMG_0385.png avec Zoom Ken Burns 8s puis Séquence de 2 Photos) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-slate-950">
            
            {/* Photos de réalisations prestigieuses d'ICDD (Séquence alternée de 2 photos) */}
            {heroMobilePhotos.map((photo, idx) => {
              const isSelected = idx === currentHeroPhotoIdx;
              const isVisible = mobileMediaMode === 'photo' && isSelected;
              return (
                <img
                  key={idx}
                  src={photo.src}
                  alt={photo.alt}
                  className={`absolute inset-0 w-full h-full object-cover object-center brightness-[0.70] contrast-[1.05] transition-all duration-1000 ease-in-out ${
                    isVisible ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/realisations/icdd_realisation_19.jpg';
                  }}
                />
              );
            })}

            {/* Photo d'accueil principale IMG_0385.png en haute résolution avec Animation de zoom cinématographique (Ken Burns 8 secondes) */}
            <div
              key={mainPhotoKey}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                mobileMediaMode === 'main' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <img
                src="/IMG_0385.png"
                alt="ICDD Décoration & Architecture d'Intérieur Kinshasa"
                className={`w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05] ${
                  mobileMediaMode === 'main' ? 'animate-kenburns' : ''
                }`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/hero_mobile_banner.png';
                }}
              />
            </div>

            {/* Voile sombre d'atténuation uniforme et cinématographique */}
            <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/45 via-transparent to-black/45 pointer-events-none" />
          </div>

          {/* Superposition Sitora Épurée & Luxueuse : Plein écran, centre dégagé, bas ergonomique */}
          <div className="relative z-20 w-full h-full flex flex-col justify-between items-center px-4 pt-12 sm:pt-14 pb-6 pointer-events-none max-w-md mx-auto">
            
            {/* ESPACE SUPÉRIEUR ET CENTRAL DÉGAGÉ : Navigation gauche/droite tactile */}
            <div className="flex-1 w-full flex items-center justify-between pointer-events-auto py-4">
              <button
                type="button"
                onClick={handlePrevMedia}
                aria-label="Média précédent"
                className="w-1/3 h-full opacity-0 active:opacity-10 transition-opacity bg-white/10"
              />
              <button
                type="button"
                onClick={handleNextMedia}
                aria-label="Média suivant"
                className="w-2/3 h-full opacity-0 active:opacity-10 transition-opacity bg-white/10"
              />
            </div>

            {/* EN BAS : Card d'informations & Action Bar façon Sitora */}
            <div className="w-full pointer-events-auto flex flex-col gap-3">
              
              {/* Carte textuelle épurée avec titre, badge et citation officielle */}
              <div className="w-full text-left">
                {/* Ligne Titre + Badge d'évaluation Sitora */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      ICDD Kinshasa
                    </h1>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/25 text-sky-200">
                      RDC
                    </span>
                  </div>
                  
                  {/* Badge Star Pill */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span className="text-[11px]">4.9</span>
                  </div>
                </div>

                {/* Slogan officiel et description préservés */}
                <p className="text-[12.5px] sm:text-sm text-slate-200/95 font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] max-w-sm">
                  <span className="italic text-white font-medium">« Le bien-être de tous, pour construire un monde meilleur. »</span>{' '}
                  Architecture d'intérieur, aménagement 3D et décoration d'exception à Kinshasa.
                </p>
              </div>

              {/* Barre d'Action façon Sitora : Bouton Devis Pilule + Bouton Message Circulaire */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* Bouton Principal façon Sitora "Add To Cart" / "Devis" avec icône circulaire */}
                <button
                  id="sitora-hero-devis-btn"
                  onClick={openQuoteModal}
                  className="flex-1 h-12 rounded-full bg-white/25 hover:bg-white/35 active:scale-[0.98] backdrop-blur-xl border border-white/35 text-white shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex items-center justify-between pl-5 pr-1.5 transition-all group cursor-pointer"
                >
                  <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white">
                    Demander un Devis
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#005EA6]" />
                  </div>
                </button>

                {/* Bouton Circulaire Message / WhatsApp façon Sitora */}
                <a
                  href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement%20sur%20vos%20prestations%20d%27am%C3%A9nagement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-xl border border-white/25 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-all flex-shrink-0 cursor-pointer"
                  title="Contacter sur WhatsApp"
                  aria-label="Contacter sur WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                </a>
              </div>

              {/* Indicateur de défilement discret vers les projets */}
              <div className="flex justify-center pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('suite-du-site-content');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-300/80 hover:text-white transition-colors"
                >
                  <span>Découvrir nos projets</span>
                  <ChevronDown className="w-3.5 h-3.5 text-sky-300 animate-bounce" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* --- DESKTOP HERO: DESIGN ARCHITECTURAL GRAND FORMAT (Sur PC & écrans moyens/larges) --- */}
        <section className="hidden md:block relative w-full overflow-hidden bg-slate-900/90 text-white shadow-2xl border-b border-white/10 backdrop-blur-2xl mb-12 sm:mb-16 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 rounded-b-[36px] sm:rounded-b-[48px]">
          
          {/* Ambient luminous glow behind title */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-[#005EA6]/25 via-[#00D7FF]/10 to-transparent blur-3xl pointer-events-none" />

          {/* Header Bar inside Hero: Stylized Branding & Catchphrase */}
          <div className="px-4 sm:px-12 text-center space-y-3 sm:space-y-4 z-10 relative flex flex-col items-center">
            
            {/* Top Prestige Pill / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/20 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00D7FF] shadow-[0_0_8px_#00D7FF] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#00D7FF]">
                Architecture d'Intérieur & Décoration • Kinshasa
              </span>
              <Sparkles className="w-3 h-3 text-[#00D7FF]" />
            </div>

            {/* Stylized Sculptural ICDD Title */}
            <div className="relative inline-flex items-center justify-center w-full my-1">
              {/* Left Flanking Architectural Accent Line (visible on sm+) */}
              <div className="hidden sm:block flex-1 max-w-[100px] md:max-w-[160px] lg:max-w-[200px] h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-[#00D7FF]/60" />

              <h1 className="px-4 sm:px-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.16em] sm:tracking-[0.22em] uppercase bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,215,255,0.25)] select-none">
                ICDD
              </h1>

              {/* Right Flanking Architectural Accent Line (visible on sm+) */}
              <div className="hidden sm:block flex-1 max-w-[100px] md:max-w-[160px] lg:max-w-[200px] h-[1.5px] bg-gradient-to-l from-transparent via-white/30 to-[#00D7FF]/60" />
            </div>

            {/* Stylized Motto / Slogan Capsule */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full bg-slate-950/80 border border-white/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] backdrop-blur-md max-w-full">
              <span className="text-[#00D7FF] font-serif text-lg sm:text-xl font-bold leading-none select-none">“</span>
              <p className="text-xs sm:text-sm md:text-base font-normal tracking-wide text-slate-200 italic">
                Le bien-être de tous, <span className="font-semibold text-white not-italic">pour construire un monde meilleur</span>
              </p>
              <span className="text-[#00D7FF] font-serif text-lg sm:text-xl font-bold leading-none select-none">”</span>
            </div>

          </div>

          {/* Carrousel animé de photos de réalisations réelles ICDD – Défilement automatique toutes les 2 secondes */}
          <div 
            className="relative mt-4 sm:mt-6 mx-2 sm:mx-6 lg:mx-8 mb-2 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden h-[340px] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[640px] bg-slate-950 shadow-inner group border border-slate-200/40 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Desktop Slide Images or Video Showcase */}
            {desktopShowcaseMode === 'video' ? (
              <div className="absolute inset-0 z-10 bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                >
                  <source src="/hero_mobile_video.mp4" type="video/mp4" />
                  <source src="/hero_mobile_video_h264.mp4" type="video/mp4" />
                </video>
              </div>
            ) : (
              heroRealisationSlides.map((slide, idx) => {
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
              })
            )}

            {/* Subtle High-End Gradient Scrim */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Bar inside slider */}
            <div className="hidden sm:flex absolute top-5 left-6 right-6 z-30 items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-normal shadow-sm pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D7FF]" />
                <span className="tracking-wider text-white/90 uppercase text-[10px]">Décoration Maison</span>
                <span className="text-white/30">•</span>
                <span className="text-white/70 font-mono text-[11px]">
                  {currentSlideIndex + 1} / {heroRealisationSlides.length}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 pointer-events-auto">
                <div className="inline-flex items-center p-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px]">
                  <button
                    onClick={() => setDesktopShowcaseMode('carousel')}
                    className={`px-2.5 py-1 rounded-full transition-all font-medium cursor-pointer ${
                      desktopShowcaseMode === 'carousel' ? 'bg-white/25 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Diaporama
                  </button>
                  <button
                    onClick={() => setDesktopShowcaseMode('video')}
                    className={`px-2.5 py-1 rounded-full transition-all font-medium cursor-pointer ${
                      desktopShowcaseMode === 'video' ? 'bg-[#005EA6] text-white shadow-sm' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Vidéo Showcase
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/70 text-[10px] font-light">
                  <span>Auto 2s</span>
                  {isHovered && <span className="text-amber-300 font-normal">(Pause)</span>}
                </div>
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

        {/* Contenu de la suite du site avec marges adaptées */}
        <div id="suite-du-site-content" className="px-3 sm:px-6 md:px-8 lg:px-10 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">

        {/* ========================================================================= */}
        {/* 2. NOS RÉALISATIONS EMBLÉMATIQUES (Design & Composition Haute Facture)   */}
        {/* ========================================================================= */}
        <section ref={realisationsRef} id="nos-realisations-section" className="space-y-6 sm:space-y-8">
          
          {/* Section Header: Titre architectural & sélecteur de filtres rapides */}
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#005EA6] text-[11px] font-semibold border border-sky-200/70 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#005EA6]" />
                <span>Chantiers & Décors d'Exception à Kinshasa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight">
                Nos réalisations emblématiques
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Une sélection rigoureuse d'aménagements conçus et livrés par nos artisans : salons royaux, cuisines ergonomiques, staff sculptural, menuiserie acoustique et suites feutrées.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setActiveTab('realisations')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white text-xs font-medium transition-all shadow-xs cursor-pointer group"
              >
                <span>Voir tout le portfolio (+35 chantiers)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Filtres rapides pour la grille de la page d'accueil */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'Toutes nos créations', cat: 'Tous' as RealisationCategory },
              { label: 'Salons & Réceptions', cat: 'Décoration' as RealisationCategory },
              { label: 'Cuisines Épurées', cat: 'Cuisines' as RealisationCategory },
              { label: 'Staff & Faux-Plafonds', cat: 'Staff' as RealisationCategory },
              { label: 'Portes & Menuiserie', cat: 'Portes' as RealisationCategory },
              { label: 'Chambres & Suites', cat: 'Chambres' as RealisationCategory },
              { label: 'Bureaux & Salons Pro', cat: 'Bureaux' as RealisationCategory },
            ].map((f) => {
              const isActive = homeCategoryFilter === f.cat;
              return (
                <button
                  key={f.cat}
                  onClick={() => setHomeCategoryFilter(f.cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-[#005EA6] text-white shadow-sm ring-2 ring-[#005EA6]/30'
                      : 'bg-white/85 backdrop-blur-md text-slate-700 hover:text-slate-950 hover:bg-white border border-slate-200/80 shadow-xs'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Grille des cartes de réalisations : design immersif, grande lisibilité et composition structurée */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            
            {/* 1. SALONS & RÉCEPTIONS VIP */}
            {(homeCategoryFilter === 'Tous' || homeCategoryFilter === 'Décoration') && (
              <div 
                onClick={() => handleExploreCategory('Décoration')}
                className="group relative h-[420px] sm:h-[460px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.22)] border border-white/20 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none"
              >
                <img
                  src={ICDD_ASSETS.r7}
                  alt="Salons contemporains et royaux par ICDD à Kinshasa"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/realisations/icdd_realisation_19.jpg';
                  }}
                />
                
                {/* Masque architectural noirci & feutré pour faire ressortir les informations */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 group-hover:via-slate-950/40 transition-colors duration-500" />

                {/* Badges supérieurs */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1.5">
                    <Sofa className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>Salons & Réceptions VIP</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-white/70 shadow-xs">
                    Dès 350 $
                  </div>
                </div>

                {/* Contenu inférieur */}
                <div className="relative z-10 space-y-3">


                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-sky-200 transition-colors">
                      Salons Contemporains & Royaux
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      Stuc vénitien haut de gamme, corniches lumineuses, marbre de Carrare et agencement d'art pour villas privées.
                    </p>
                  </div>

                  {/* Puces de matériaux nobles */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Stuc vénitien</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Gorges LED</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Marbre</span>
                  </div>

                  {/* Bouton d'action */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Découvrir les réalisations salons</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CUISINES CONTEMPORAINES & ÎLOTS */}
            {(homeCategoryFilter === 'Tous' || homeCategoryFilter === 'Cuisines') && (
              <div 
                onClick={() => handleExploreCategory('Cuisines')}
                className="group relative h-[420px] sm:h-[460px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.22)] border border-white/20 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none"
              >
                <img
                  src={ICDD_ASSETS.cuisine3}
                  alt="Cuisines d'architecte sur mesure par ICDD à Kinshasa"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/realisations/icdd_realisation_22.jpg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 group-hover:via-slate-950/40 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>Cuisines & Art Culinaire</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-white/70 shadow-xs">
                    Dès 500 $
                  </div>
                </div>

                <div className="relative z-10 space-y-3">


                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-sky-200 transition-colors">
                      Cuisines Épurées sur Mesure
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      Plans en quartz Calacatta, îlots conviviaux rétroéclairés, façades laquées anti-traces et quincaillerie invisible.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Plans Quartz</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Îlot central</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">LED intégrées</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Découvrir les cuisines installées</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. STAFF, ROSACES & FAUX-PLAFONDS */}
            {(homeCategoryFilter === 'Tous' || homeCategoryFilter === 'Staff') && (
              <div 
                onClick={() => handleExploreCategory('Staff')}
                className="group relative h-[420px] sm:h-[460px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.22)] border border-white/20 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none"
              >
                <img
                  src={ICDD_ASSETS.sp3}
                  alt="Staff et faux-plafonds sculptés par les maîtres artisans ICDD"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 group-hover:via-slate-950/40 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>Staff & Plâtres Sculptés</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-white/70 shadow-xs">
                    Dès 250 $
                  </div>
                </div>

                <div className="relative z-10 space-y-3">


                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-sky-200 transition-colors">
                      Staff, Rosaces & Gorges LED
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      Faux-plafonds suspendus, corniches artistiques en plâtre fibré et gorges lumineuses invisibles pour magnifier vos volumes.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Plâtre fibré</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Corniches d'art</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Jeux de lumière</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Explorer les œuvres de staff</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. BLOCS-PORTES ISOPHONIQUES */}
            {(homeCategoryFilter === 'Tous' || homeCategoryFilter === 'Portes') && (
              <div 
                onClick={() => handleExploreCategory('Portes')}
                className="group relative h-[420px] sm:h-[460px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.22)] border border-white/20 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none"
              >
                <img
                  src={ICDD_ASSETS.porte2}
                  alt="Portes d'intérieur isophoniques contemporaines posées par ICDD"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/realisations/icdd_realisation_3.jpg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 group-hover:via-slate-950/40 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1.5">
                    <DoorClosed className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>Menuiserie & Portes Nobles</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-white/70 shadow-xs">
                    Dès 290 $
                  </div>
                </div>

                <div className="relative z-10 space-y-3">


                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-sky-200 transition-colors">
                      Blocs-Portes Isophoniques
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      Portes pleines au design minimaliste affleurant, charnières invisibles magnétiques et isolation acoustique certifiée.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Âme acoustique</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Charnières invisibles</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Serrures magnétiques</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Voir la menuiserie et blocs-portes</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. SUITES PARENTALES & CHAMBRES */}
            {(homeCategoryFilter === 'Tous' || homeCategoryFilter === 'Chambres') && (
              <div 
                onClick={() => handleExploreCategory('Chambres')}
                className="group relative h-[420px] sm:h-[460px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.22)] border border-white/20 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none"
              >
                <img
                  src={ICDD_ASSETS.chambre5}
                  alt="Suites parentales et chambres luxueuses conçues par ICDD"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/chambre_deco_1.jpg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 group-hover:via-slate-950/40 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>Suites & Espace Nuit</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-white/70 shadow-xs">
                    Dès 350 $
                  </div>
                </div>

                <div className="relative z-10 space-y-3">


                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-sky-200 transition-colors">
                      Chambres & Têtes de Lit Déco
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      Panneaux muraux en velours capitonné, tasseaux de bois précieux, dressings rétroéclairés et atmosphères calmes.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Têtes de lit velours</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Tasseaux chêne</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Dressing LED</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Découvrir les suites parentales</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. BUREAUX & ESPACES DIRIGEANTS */}
            {(homeCategoryFilter === 'Tous' || homeCategoryFilter === 'Bureaux') && (
              <div 
                onClick={() => handleExploreCategory('Bureaux')}
                className="group relative h-[420px] sm:h-[460px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.22)] border border-white/20 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none"
              >
                <img
                  src={ICDD_ASSETS.bureau2}
                  alt="Bureaux de direction et espaces professionnels réalisés par ICDD"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/bureau_deco_1.jpg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 group-hover:via-slate-950/40 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>Bureaux & Salons Exécutifs</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-white/70 shadow-xs">
                    Dès 350 $
                  </div>
                </div>

                <div className="relative z-10 space-y-3">


                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-sky-200 transition-colors">
                      Cabinets & Bureaux Dirigeants
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      Claustras bois nobles, panneaux acoustiques feutrés, bibliothèques intégrées et mobilier sur mesure renforçant l'image de marque.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Claustras bois</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Acoustique pro</span>
                    <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15">Design corporate</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Explorer les espaces de travail</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bandeau d'invitation à découvrir la galerie complète ou demander un devis */}
          <div className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-slate-900 via-[#003865] to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-white/15 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-light text-white tracking-tight">
                Vous avez un projet de décoration ou de rénovation à Kinshasa ?
              </h4>
              <p className="text-xs text-slate-300 font-light max-w-xl">
                Parcourez nos 35+ chantiers photographiés en haute définition ou échangez directement avec notre équipe technique pour une étude personnalisée.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('realisations')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-medium transition-all shadow-xs cursor-pointer text-center"
              >
                Explorer tout le portfolio
              </button>
              <button
                onClick={openQuoteModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#00D7FF] hover:bg-[#38bdf8] text-slate-950 text-xs font-semibold transition-all shadow-xs cursor-pointer text-center"
              >
                Demander un devis gratuit
              </button>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. DÉCOUVREZ NOTRE SAVOIR-FAIRE (Harmonisé au design actuel)             */}
        {/* ========================================================================= */}
        <section className="space-y-10 sm:space-y-12 pt-6 border-t border-white/15">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D7FF] block">
              Architectural & Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Découvrez notre savoir-faire
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto">
              Une maîtrise complète de l'espace intérieur où chaque matière, chaque ligne de plâtre et chaque source de lumière dialoguent harmonieusement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* Carte 1: SALON */}
            <div className="group rounded-[28px] overflow-hidden bg-slate-900/90 border border-white/20 shadow-2xl backdrop-blur-2xl hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(0,100,200,0.25)] transition-all duration-500 flex flex-col justify-between">
              
              {/* Photo Showcase */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={ICDD_ASSETS.r21}
                  alt="Salon contemporain réalisé par ICDD"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#00D7FF]" />
                    <span>Chantier Réel • Gombe</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-white/70 shadow-md">
                    Dès 450 $
                  </div>
                </div>

                {/* Bottom Image Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#005EA6]/90 backdrop-blur-sm text-[10px] font-bold text-white border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#00D7FF]" />
                    <span>Pièce de Vie Signature</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    Salon Contemporain & Espace de Vie
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                    Un espace pensé autour de l'élégance, du confort et de l'harmonie des matériaux. Nos architectes d'intérieur orchestrent les volumes, l'éclairage indirect et les textures pour créer un lieu de vie chaleureux et prestigieux.
                  </p>
                </div>

                {/* Specs / metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/15 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Finitions</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Stuc & Velours</span>
                  </div>
                  <div className="border-x border-white/15">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Éclairage</span>
                    <span className="text-xs font-bold text-sky-200 mt-0.5 block">Gorges LED</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Style</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Moderne Épuré</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Décoration murale</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Staff d'art</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Gorges lumineuses</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Tasseaux bois</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleExploreCategory('Décoration')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all border border-sky-400/40"
                  >
                    <span>Voir les salons réalisés</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={openQuoteModal}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    title="Devis pour ce style"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Devis</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Carte 2: CUISINE */}
            <div className="group rounded-[28px] overflow-hidden bg-slate-900/90 border border-white/20 shadow-2xl backdrop-blur-2xl hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(0,100,200,0.25)] transition-all duration-500 flex flex-col justify-between">
              
              {/* Photo Showcase */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={ICDD_ASSETS.cuisine1}
                  alt="Cuisine contemporaine réalisée par ICDD"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#00D7FF]" />
                    <span>Chantier Réel • Kinshasa</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-white/70 shadow-md">
                    Sur mesure
                  </div>
                </div>

                {/* Bottom Image Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#005EA6]/90 backdrop-blur-sm text-[10px] font-bold text-white border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#00D7FF]" />
                    <span>Cœur de Maison</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    Cuisine Contemporaine & Îlot
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                    Des espaces fonctionnels et conviviaux conçus pour s'intégrer harmonieusement à votre intérieur. Îlots centraux, façades épurées anti-traces, gorges LED et rangements ergonomiques personnalisés.
                  </p>
                </div>

                {/* Specs / metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/15 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Conception</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Sur Mesure 3D</span>
                  </div>
                  <div className="border-x border-white/15">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Matériaux</span>
                    <span className="text-xs font-bold text-sky-200 mt-0.5 block">Hydrofuge HD</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Confort</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Amortis Soft-close</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Îlot central</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Plan quartz</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Caissons hydrofuges</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">LED intégrées</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleExploreCategory('Cuisines')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all border border-sky-400/40"
                  >
                    <span>Voir les cuisines réalisées</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={openQuoteModal}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    title="Devis pour ce style"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Devis</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Carte 3: STAFF & PLAFONDS */}
            <div className="group rounded-[28px] overflow-hidden bg-slate-900/90 border border-white/20 shadow-2xl backdrop-blur-2xl hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(0,100,200,0.25)] transition-all duration-500 flex flex-col justify-between">
              
              {/* Photo Showcase */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={ICDD_ASSETS.sp2}
                  alt="Staff et plafonds sculptés par ICDD"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#00D7FF]" />
                    <span>Ateliers Staff • Kinshasa</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-white/70 shadow-md">
                    Dès 350 $
                  </div>
                </div>

                {/* Bottom Image Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#005EA6]/90 backdrop-blur-sm text-[10px] font-bold text-white border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#00D7FF]" />
                    <span>Art du Plâtre & Volume</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    Staff & Plafonds Sculptés
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                    L'art du plâtre façonné à la main par nos maîtres staffeurs à Kinshasa. Faux-plafonds suspendus, corniches sculptées et gorges lumineuses LED dissimulées qui apportent profondeur et majesté aux volumes.
                  </p>
                </div>

                {/* Specs / metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/15 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Précision</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Moulage Manuel</span>
                  </div>
                  <div className="border-x border-white/15">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Lumière</span>
                    <span className="text-xs font-bold text-sky-200 mt-0.5 block">Gorges LED doubles</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Aspect</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Blanc Soyeux</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Gorges LED</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Corniches d'art</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Rosaces staff</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Faux-plafonds</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleExploreCategory('Staff')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all border border-sky-400/40"
                  >
                    <span>Voir les plafonds réalisés</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={openQuoteModal}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    title="Devis pour ce style"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Devis</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Carte 4: PORTES & MENUISERIE */}
            <div className="group rounded-[28px] overflow-hidden bg-slate-900/90 border border-white/20 shadow-2xl backdrop-blur-2xl hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(0,100,200,0.25)] transition-all duration-500 flex flex-col justify-between">
              
              {/* Photo Showcase */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={ICDD_ASSETS.porte3}
                  alt="Porte intérieure contemporaine réalisée par ICDD"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#00D7FF]" />
                    <span>Pose Chantier • Macampagne</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-white/70 shadow-md">
                    Dès 290 $
                  </div>
                </div>

                {/* Bottom Image Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#005EA6]/90 backdrop-blur-sm text-[10px] font-bold text-white border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#00D7FF]" />
                    <span>Ouvertures & Menuiserie</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    Portes Contemporaines & Finitions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                    Véritables blocs-portes contemporains fabriqués dans nos ateliers de Kinshasa : vantaux pleins acoustiques, huisseries affleurantes, rainurages design et serrures magnétiques silencieuses.
                  </p>
                </div>

                {/* Specs / metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/15 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Acoustique</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Âme Pleine Isophonique</span>
                  </div>
                  <div className="border-x border-white/15">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Paumelles</span>
                    <span className="text-xs font-bold text-sky-200 mt-0.5 block">Invisibles 3D</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Fermeture</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">Serrure Magnétique</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Blocs-portes</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Rainurages CNC</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Charnières invisibles</span>
                  <span className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/15 font-medium">Finition laquée</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleExploreCategory('Portes')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all border border-sky-400/40"
                  >
                    <span>Voir les portes posées</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={openQuoteModal}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    title="Devis pour ce style"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Devis</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. NOS SERVICES (Ce que ICDD fait pour ses clients)                       */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 rounded-[28px] border border-white/20 shadow-2xl space-y-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D7FF] block">
                Expertise & Métiers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Nos services
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-normal">
                Ce que ICDD conçoit et réalise pour sublimer votre cadre de vie à Kinshasa.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap border border-sky-400/40 hover:scale-105 active:scale-95"
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
              const isExpanded = !!openServiceHeroDetails[idx];

              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab('services')}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 hover:bg-slate-950/95 border border-white/15 hover:border-sky-400/50 transition-all cursor-pointer space-y-3 shadow-lg group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#005EA6]/30 border border-sky-400/40 text-sky-200 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#005EA6] group-hover:text-white transition-all">
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Mobile toggle button */}
                    <button
                      type="button"
                      onClick={(e) => toggleServiceHeroDetails(idx, e)}
                      className="sm:hidden px-2.5 py-1 rounded-full text-[10px] text-sky-200 bg-white/10 border border-white/20 flex items-center gap-1 active:scale-95"
                    >
                      <span>{isExpanded ? 'Moins' : 'Détail'}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                    {srv.title}
                  </h4>

                  {/* Description */}
                  <p className={`text-xs text-slate-200 leading-relaxed font-light ${
                    isExpanded ? 'block' : 'hidden sm:block'
                  }`}>
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
        <section className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 rounded-[28px] border border-white/20 shadow-2xl space-y-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D7FF] block">
                Matériaux & Mobilier
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Le Shop ICDD
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-normal">
                Achetez directement vos peintures haut de gamme, blocs-portes, éléments de cuisine et corniches.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('shop')}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95"
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
                image: ICDD_ASSETS.r26
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
                image: ICDD_ASSETS.cuisine2
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
                className="group relative rounded-2xl overflow-hidden border border-white/20 hover:border-sky-400/50 shadow-md hover:shadow-[0_12px_30px_rgba(0,100,200,0.3)] cursor-pointer transition-all duration-500 h-48 sm:h-56 lg:h-64 flex flex-col justify-end p-4 text-white bg-slate-950"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
                    {prod.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-200 font-light line-clamp-1">
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
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#003865] backdrop-blur-2xl p-6 sm:p-8 lg:p-10 rounded-[28px] border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-1.5 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D7FF] block">
              Démarrer Votre Projet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Parlons de votre projet
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
              Vous avez un projet de rénovation, de salon, de cuisine ou de villa à Kinshasa ? Contactez nos maîtres artisans pour un devis gratuit et personnalisé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20d%27am%C3%A9nagement."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap border border-emerald-400/30 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 border border-sky-400/40 hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </section>

        </div>

      </div>
    </div>
  );
};
