import React, { useState, useRef } from 'react';
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
  Briefcase
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

  const realisationsRef = useRef<HTMLDivElement>(null);

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
    if (selectedSpace === 'Salon' || selectedSpace === 'Chambre') {
      targetCategory = 'Décoration';
    } else if (selectedSpace === 'Cuisine') {
      targetCategory = 'Cuisines';
    } else if (selectedSpace === 'Staff') {
      targetCategory = 'Staff';
    } else if (selectedSpace === 'Portes') {
      targetCategory = 'Portes';
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
    <div id="accueil-view-container" className="relative w-full h-full min-h-0 overflow-y-auto custom-scrollbar p-3 sm:p-6 md:p-10 pointer-events-auto">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 pb-28 sm:pb-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Transformé pour ICDD DECO – Grande photo d'un vrai salon) */}
        {/* ========================================================================= */}
        <section className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white/95 text-slate-800 shadow-xl border border-slate-200/80 backdrop-blur-xl">
          
          {/* Header Bar inside Hero: Branding & Catchphrase */}
          <div className="pt-8 sm:pt-12 px-6 sm:px-12 text-center space-y-3 z-10 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-[11px] font-bold text-[#005EA6] backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00D7FF] animate-pulse" />
              <span>Architecture & Décoration d'Intérieur • Kinshasa, RDC</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-slate-900 uppercase">
              ICDD <span className="font-extrabold text-[#005EA6]">DECO</span>
            </h1>

            <p className="text-base sm:text-2xl md:text-3xl text-slate-700 font-light tracking-wide italic">
              « L'art de transformer vos espaces »
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 font-medium pt-1">
              <span>Décoration</span>
              <span>•</span>
              <span>Aménagement</span>
              <span>•</span>
              <span>Staff & Faux-Plafonds</span>
              <span>•</span>
              <span>Design Intérieur</span>
            </div>
          </div>

          {/* Large Architectural Photo of a real Living Room / Salon made by ICDD */}
          <div className="relative mt-6 sm:mt-8 mx-3 sm:mx-6 mb-3 sm:mb-6 rounded-[22px] sm:rounded-[28px] overflow-hidden h-[340px] sm:h-[460px] md:h-[540px] bg-slate-100 shadow-inner group border border-slate-200/60">
            <img
              src="/bright_luxury_living.jpg"
              alt="Salon contemporain lumineux et prestigieux par ICDD à Kinshasa"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/projects/real_project_4.jpg';
              }}
            />
            {/* Subtle Gradient Overlays for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-transparent pointer-events-none" />

            {/* Bottom floating badge on the hero photo */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div className="space-y-1 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#005EA6] border border-white/60 shadow-sm">
                  Réalisation Réelle • Kinshasa
                </span>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  Salon Contemporain, Faux-Plafonds en Staff & Gorges LED
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 max-w-lg drop-shadow">
                  Harmonie des enduits fins, éclairage indirect soigné et agencements sur mesure.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('realisations')}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <span>Explorer nos projets</span>
                  <ArrowRight className="w-4 h-4 text-[#005EA6]" />
                </button>
                <button
                  onClick={openQuoteModal}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white border border-[#00D7FF]/50 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Devis gratuit
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SECTION "TROUVE TON GOÛT" (Inspiré de "Find your best ville")         */}
        {/* ========================================================================= */}
        <section id="trouve-ton-gout" className="relative">
          <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[28px] sm:rounded-[34px] border border-slate-200/90 shadow-xl space-y-5">
            
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#005EA6]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#00D7FF]" />
                <span>Sélection Personnalisée</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Trouve ton goût
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Quel espace souhaitez-vous transformer ?
              </p>
            </div>

            {/* Selectors Bar matching the mock-up layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-end pt-2">
              
              {/* Selector 1: Type d'espace */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Type d'espace
                </label>
                <div className="relative">
                  <select
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs sm:text-sm font-semibold rounded-full px-4 py-3 pr-10 focus:outline-none focus:border-[#005EA6] focus:ring-2 focus:ring-[#00D7FF]/30 transition-all cursor-pointer shadow-sm"
                  >
                    <option value="Salon">Salon</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Staff">Staff & Plafonds</option>
                    <option value="Portes">Portes & Menuiserie</option>
                    <option value="Chambre">Chambre & Dressing</option>
                    <option value="Bureau">Bureau & Espace Pro</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Selector 2: Style */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Style
                </label>
                <div className="relative">
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs sm:text-sm font-semibold rounded-full px-4 py-3 pr-10 focus:outline-none focus:border-[#005EA6] focus:ring-2 focus:ring-[#00D7FF]/30 transition-all cursor-pointer shadow-sm"
                  >
                    <option value="Moderne">Moderne & Épuré</option>
                    <option value="Classique">Classique Élégant</option>
                    <option value="Luxe">Luxe Contemporain</option>
                    <option value="Gold">Gold Prestige</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Selector 3: Projet */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Projet
                </label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProjectType(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs sm:text-sm font-semibold rounded-full px-4 py-3 pr-10 focus:outline-none focus:border-[#005EA6] focus:ring-2 focus:ring-[#00D7FF]/30 transition-all cursor-pointer shadow-sm"
                  >
                    <option value="Appartement">Appartement</option>
                    <option value="Villa">Villa / Résidence</option>
                    <option value="Espace Pro">Espace Professionnel</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Button: Découvrir (like "Find Now" in the mock-up) */}
              <div className="pt-2 sm:pt-0">
                <button
                  onClick={handleDiscoverTaste}
                  className="w-full px-6 py-3 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-[#00D7FF]/40"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

            {/* Interactive Feedback Banner when user clicks "Découvrir" */}
            {tasteDiscovered && (
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-slate-700 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#005EA6] flex-shrink-0" />
                  <span>
                    Sélection active : <strong className="text-slate-900">{selectedSpace}</strong> en style <strong className="text-slate-900">{selectedStyle}</strong> pour <strong className="text-slate-900">{selectedProject}</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('realisations')}
                  className="text-xs font-bold text-[#005EA6] hover:underline cursor-pointer whitespace-nowrap"
                >
                  Voir tous les chantiers correspondants →
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. NOS RÉALISATIONS (Grille 6 cartes inspirée des 6 villas de la maquette) */}
        {/* ========================================================================= */}
        <section ref={realisationsRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#005EA6] block">
                Portfolio Réalisations ICDD
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Nos réalisations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Découvrez quelques-uns de nos projets conçus et exécutés à Kinshasa.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('realisations')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#005EA6] hover:text-[#004f8c] hover:underline cursor-pointer whitespace-nowrap"
            >
              <span>Voir toutes les réalisations</span>
              <ArrowRight className="w-4 h-4 text-[#00D7FF]" />
            </button>
          </div>

          {/* Grid of 6 Categories matching the mock-up's 6 cards in 2 rows of 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            
            {/* Card 1: SALONS */}
            <div 
              onClick={() => handleExploreCategory('Décoration')}
              className="group bg-white rounded-[24px] border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.project4}
                  alt="Salons contemporains et royaux par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-white/60 shadow-sm">
                  Salon & Séjour
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Salons</h3>
                    <p className="text-[11px] text-slate-200">Aménagements royaux & contemporains</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                    Dès 350 $
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-medium bg-slate-50/50">
                <span>Stuc vénitien, éclairage & confort</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#005EA6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: CUISINES */}
            <div 
              onClick={() => handleExploreCategory('Cuisines')}
              className="group bg-white rounded-[24px] border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.cuisine1}
                  alt="Cuisines modernes par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-white/60 shadow-sm">
                  Cuisine & Îlot
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Cuisines</h3>
                    <p className="text-[11px] text-slate-200">Sur mesure, îlots & plans quartz</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                    Dès 500 $
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-medium bg-slate-50/50">
                <span>Rangements toute hauteur & LED</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#005EA6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: STAFF & PLAFONDS */}
            <div 
              onClick={() => handleExploreCategory('Staff')}
              className="group bg-white rounded-[24px] border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.project1}
                  alt="Staff et plafonds par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-white/60 shadow-sm">
                  Staff & Plafonds
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Staff</h3>
                    <p className="text-[11px] text-slate-200">Gorges LED & corniches sculptées</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                    Dès 250 $
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-medium bg-slate-50/50">
                <span>Maîtres staffeurs & plâtre fibré</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#005EA6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: PORTES */}
            <div 
              onClick={() => handleExploreCategory('Portes')}
              className="group bg-white rounded-[24px] border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.porte1}
                  alt="Portes intérieures réalisées par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-white/60 shadow-sm">
                  Menuiserie Intérieure
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Portes</h3>
                    <p className="text-[11px] text-slate-200">Blocs-portes isophoniques modernes</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                    Dès 290 $
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-medium bg-slate-50/50">
                <span>Vantaux pleins, serrures magnétiques</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#005EA6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: CHAMBRES */}
            <div 
              onClick={() => handleExploreCategory('Décoration')}
              className="group bg-white rounded-[24px] border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.project7}
                  alt="Chambres et suites parentales par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-white/60 shadow-sm">
                  Chambre & Nuit
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Chambres</h3>
                    <p className="text-[11px] text-slate-200">Suites parentales & atmosphères douces</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                    Dès 450 $
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-medium bg-slate-50/50">
                <span>Harmonies feutrées & finitions Gold</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#005EA6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 6: BUREAUX & ESPACES PROS */}
            <div 
              onClick={() => handleExploreCategory('Appartements')}
              className="group bg-white rounded-[24px] border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={ICDD_ASSETS.project3}
                  alt="Bureaux et espaces professionnels par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-white/60 shadow-sm">
                  Espace Pro & Bureau
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Bureaux</h3>
                    <p className="text-[11px] text-slate-200">Agencements de travail & réceptions</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                    Sur devis
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-medium bg-slate-50/50">
                <span>Reliefs muraux, acoustique & prestige</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#005EA6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Centered button "Voir toutes les réalisations" */}
          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('realisations')}
              className="px-8 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              Voir toutes les réalisations →
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DÉCOUVREZ NOTRE SAVOIR-FAIRE (Inspiré de "Information about our villes") */}
        {/* ========================================================================= */}
        <section className="space-y-10 sm:space-y-14 pt-4 border-t border-slate-200">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#005EA6] block">
              Architectural & Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Découvrez notre savoir-faire
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Une maîtrise complète de l'espace intérieur où chaque matière, chaque ligne de plâtre et chaque source de lumière dialoguent harmonieusement.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16">

            {/* Block 1: SALON (Image on Left, Text on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div className="rounded-[26px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200 h-64 sm:h-80 md:h-96 relative group">
                <img
                  src={ICDD_ASSETS.project4}
                  alt="Salon contemporain réalisé par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md">
                  Chantier Réel • Gombe
                </div>
              </div>

              <div className="space-y-5 text-slate-700">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#005EA6] block">
                    Pièce de Vie Signature
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Salon contemporain
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Un espace pensé autour de l'élégance, du confort et de l'harmonie des matériaux. Nos architectes d'intérieur orchestrent les volumes, l'éclairage indirect et les textures pour créer un lieu de vie chaleureux et prestigieux.
                  </p>
                </div>

                {/* Specs / metrics like mock-up */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Finitions</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Stuc & Velours</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Éclairage</span>
                    <span className="text-xs sm:text-sm font-bold text-[#005EA6]">Gorges LED</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Style</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Moderne Épuré</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Décoration
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Staff
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Éclairage
                  </span>
                </div>
              </div>
            </div>

            {/* Block 2: CUISINE (Text on Left, Image on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
              
              <div className="space-y-5 text-slate-700 order-2 lg:order-1">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#005EA6] block">
                    Cœur de Maison
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Cuisine sur mesure
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Des espaces fonctionnels et conviviaux conçus pour s'intégrer harmonieusement à votre intérieur. Îlots centraux, façades épurées anti-traces, gorges LED et rangements ergonomiques personnalisés.
                  </p>
                </div>

                {/* Specs / metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Conception</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Sur Mesure</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Matériaux</span>
                    <span className="text-xs sm:text-sm font-bold text-[#005EA6]">Hydrofuge HD</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Confort</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Freins Amortis</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Îlot Central
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Rangements
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Plan Quartz
                  </span>
                </div>
              </div>

              <div className="rounded-[26px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200 h-64 sm:h-80 md:h-96 relative group order-1 lg:order-2">
                <img
                  src={ICDD_ASSETS.cuisine1}
                  alt="Cuisine moderne sur mesure réalisée par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md">
                  Chantier Réel • Kinshasa
                </div>
              </div>

            </div>

            {/* Block 3: STAFF & PLAFONDS (Image on Left, Text on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div className="rounded-[26px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200 h-64 sm:h-80 md:h-96 relative group">
                <img
                  src={ICDD_ASSETS.project1}
                  alt="Staff et plafonds sculptés par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md">
                  Ateliers Staff • Kinshasa
                </div>
              </div>

              <div className="space-y-5 text-slate-700">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#005EA6] block">
                    Art du Plâtre & Volume
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Staff & plafonds sculptés
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    L'art du plâtre façonné à la main par nos maîtres staffeurs. Faux-plafonds suspendus, corniches sculptées et gorges lumineuses LED dissimulées qui apportent profondeur et majesté aux volumes.
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Précision</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Moulage Manuel</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Lumière</span>
                    <span className="text-xs sm:text-sm font-bold text-[#005EA6]">Gorges LED</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Aspect</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Blanc Soyeux</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Gorges LED
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Corniches
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Rosaces
                  </span>
                </div>
              </div>
            </div>

            {/* Block 4: PORTES & MENUISERIE (Text on Left, Image on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
              
              <div className="space-y-5 text-slate-700 order-2 lg:order-1">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#005EA6] block">
                    Ouvertures & Menuiserie
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Portes intérieures & finitions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Véritables blocs-portes contemporains fabriqués dans nos ateliers de Kinshasa : vantaux pleins acoustiques, huisseries affleurantes, rainurages design et serrures magnétiques silencieuses.
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Acoustique</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Âme Pleine</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Paumelles</span>
                    <span className="text-xs sm:text-sm font-bold text-[#005EA6]">Invisibles 3D</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Fermeture</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Magnétique</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Blocs-portes
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Rainurages
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    Sur mesure
                  </span>
                </div>
              </div>

              <div className="rounded-[26px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200 h-64 sm:h-80 md:h-96 relative group order-1 lg:order-2">
                <img
                  src={ICDD_ASSETS.porte1}
                  alt="Porte intérieure contemporaine réalisée par ICDD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md">
                  Pose Chantier • Macampagne
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. NOS SERVICES (Ce que ICDD fait pour ses clients)                       */}
        {/* ========================================================================= */}
        <section className="bg-white/95 backdrop-blur-2xl p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#005EA6] block">
                Expertise & Métiers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Nos services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Ce que ICDD conçoit et réalise pour sublimer votre cadre de vie à Kinshasa.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="px-5 py-2.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white text-xs font-bold transition-all shadow cursor-pointer whitespace-nowrap"
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
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-sky-300 transition-all hover:scale-[1.02] cursor-pointer space-y-2.5 shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#005EA6] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#005EA6] transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
        <section className="bg-white/95 backdrop-blur-2xl p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                <ShoppingBag className="w-3 h-3 text-emerald-600" />
                <span>Matériaux & Produits Disponibles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Le Shop ICDD
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Achetez directement vos peintures haut de gamme, blocs-portes, éléments de cuisine et corniches.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('shop')}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow cursor-pointer whitespace-nowrap"
            >
              Voir tout le Shop
            </button>
          </div>

          {/* 4 Shop Products Preview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {[
              {
                title: 'Peintures',
                desc: 'Velours, mates, stucs minéraux & patines',
                badge: 'Dès 65 $',
                image: ICDD_ASSETS.project6
              },
              {
                title: 'Portes',
                desc: 'Blocs-portes contemporains acoustiques',
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
                title: 'Matériaux & Staff',
                desc: 'Corniches d’art & rosaces pour LED',
                badge: 'Dès 35 $',
                image: ICDD_ASSETS.project1
              }
            ].map((prod, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab('shop')}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500/50 shadow-md cursor-pointer hover:scale-105 transition-all duration-300 h-44 sm:h-52 flex flex-col justify-end p-3.5 text-white"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-black text-white">
                    {prod.badge}
                  </span>
                  <h4 className="text-sm font-extrabold tracking-tight group-hover:text-emerald-300 transition-colors">
                    {prod.title}
                  </h4>
                  <p className="text-[11px] text-slate-200 line-clamp-2 leading-snug">
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
        <section className="bg-gradient-to-br from-white via-sky-50/50 to-blue-50/40 backdrop-blur-2xl p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] border border-sky-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#005EA6] block">
              Démarrer Votre Projet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Parlons de votre projet
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Vous avez un projet de rénovation, de salon, de cuisine ou de villa à Kinshasa ? Contactez nos maîtres artisans pour un devis gratuit et personnalisé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20d%27am%C3%A9nagement."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 border border-[#00D7FF]/40"
            >
              <Phone className="w-4 h-4 text-[#00D7FF]" />
              <span>Demander un devis</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
