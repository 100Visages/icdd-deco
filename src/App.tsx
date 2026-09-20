import React, { useState, useEffect } from 'react';
import { NavTab, Project, RealisationCategory } from './types';
import { ICDD_PROJECTS } from './data/projects';
import { SidebarNav } from './components/SidebarNav';
import { TopBar } from './components/TopBar';
import { HeroOverlay } from './components/HeroOverlay';
import { RealisationsView } from './components/RealisationsView';
import { ServicesView } from './components/ServicesView';
import { ShopView } from './components/ShopView';
import { ContactView } from './components/ContactView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal';
import icddDecoBg from './assets/realisations/icdd_realisation_19.jpg';
import icddDecoRealisations from './assets/realisations/icdd_realisation_11.jpg';
import icddDecoServices from './assets/realisations/icdd_realisation_6.jpg';
import icddDecoShop from './assets/realisations/icdd_realisation_8.jpg';
import icddDecoContact from './assets/realisations/icdd_realisation_1.jpg';

const TAB_BACKGROUNDS: Record<NavTab, string> = {
  accueil: icddDecoBg,
  realisations: icddDecoRealisations,
  services: icddDecoServices,
  shop: icddDecoShop,
  contact: icddDecoContact,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('accueil');
  const [selectedRealisationCategory, setSelectedRealisationCategory] = useState<RealisationCategory>('Tous');

  // État de défilement vers le bas pour afficher la barre de navigation uniquement après défilement
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.scrollTop === 'number') {
        setIsScrolledDown(target.scrollTop > 60);
      } else {
        const docScroll = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY || 0;
        setIsScrolledDown(docScroll > 60);
      }
    };

    // Phase de capture pour capter le scroll de tous les conteneurs enfants (dont #accueil-view-container)
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  // Réinitialisation / mise à jour lors d'un changement d'onglet
  useEffect(() => {
    const container = document.getElementById(`${activeTab}-view-container`);
    if (container) {
      setIsScrolledDown(container.scrollTop > 60);
    } else {
      setIsScrolledDown(false);
    }
  }, [activeTab]);

  // Featured project (e.g. Villa Riviera by default)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedProjectForQuote, setPreselectedProjectForQuote] = useState<Project | null>(null);

  const featuredProject = ICDD_PROJECTS[0];

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  const handleOpenQuoteModal = (project?: Project) => {
    if (project) {
      setPreselectedProjectForQuote(project);
    } else {
      setPreselectedProjectForQuote(null);
    }
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleSelectCategoryFromHome = (cat: RealisationCategory) => {
    setSelectedRealisationCategory(cat);
    setActiveTab('realisations');
  };

  return (
    <div id="icdd-main-wrapper" className="h-screen w-screen overflow-hidden bg-[#F4F6F9] text-slate-800 flex items-center justify-center p-0 sm:p-1.5 lg:p-2 xl:p-2.5 font-sans selection:bg-[#00D7FF] selection:text-[#005EA6]">
      
      {/* Outer Pill-Shaped Glass Frame */}
      <main 
        id="pill-shaped-container"
        className="relative w-full h-full max-w-none rounded-none sm:rounded-[24px] lg:rounded-[32px] xl:rounded-[38px] border-0 sm:border-[2px] border-slate-700/30 shadow-[0_25px_60px_-15px_rgba(0,10,30,0.3)] overflow-hidden flex flex-col bg-slate-950/40 transition-all duration-500"
      >
        
        {/* Main Background Image: Véritable photo de décoration d'intérieur réalisée par ICDD pour chaque page avec masque noirci élégant */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
          <img
            key={activeTab}
            src={TAB_BACKGROUNDS[activeTab] || icddDecoBg}
            alt="ICDD - Décoration et Aménagement d'Intérieur"
            className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.10] scale-100 opacity-75 transition-all duration-700 animate-in fade-in"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/realisations/icdd_realisation_19.jpg';
            }}
          />
          {/* Masque architectural noirci : élimination de l'excès blanc pour une ambiance feutrée et contrastée */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/70" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Sidebar Navigation (Left Vertical Pill on Desktop, Floating Bottom Dock on Mobile) */}
        <SidebarNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isScrolledDown={isScrolledDown}
        />

        {/* Top Header Bar inside Pill Container (5 Tabs: Accueil, Réalisations, Services, Shop, Contact) */}
        <TopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openQuoteModal={() => handleOpenQuoteModal()}
        />

        {/* Main Dynamic View Content */}
        <div className="relative z-20 flex-1 min-h-0 w-full overflow-hidden flex flex-col">
          
          {activeTab === 'accueil' && (
            <HeroOverlay
              featuredProject={featuredProject}
              projects={ICDD_PROJECTS}
              onOpenProject={handleOpenProject}
              openQuoteModal={() => handleOpenQuoteModal()}
              setActiveTab={setActiveTab}
              onSelectCategory={handleSelectCategoryFromHome}
            />
          )}

          {activeTab === 'realisations' && (
            <RealisationsView
              projects={ICDD_PROJECTS}
              selectedCategory={selectedRealisationCategory}
              onSelectCategory={setSelectedRealisationCategory}
              onOpenProject={handleOpenProject}
              openQuoteModal={() => handleOpenQuoteModal()}
            />
          )}

          {activeTab === 'services' && (
            <ServicesView
              openQuoteModal={() => handleOpenQuoteModal()}
              onSelectCategory={handleSelectCategoryFromHome}
              onExploreRealisations={() => setActiveTab('realisations')}
            />
          )}

          {activeTab === 'shop' && (
            <ShopView
              openQuoteModal={() => handleOpenQuoteModal()}
            />
          )}

          {activeTab === 'contact' && (
            <ContactView
              openQuoteModal={() => handleOpenQuoteModal()}
            />
          )}

        </div>

      </main>

      {/* Project Detail View Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseProjectModal}
          onRequestSimilar={(p) => handleOpenQuoteModal(p)}
        />
      )}

      {/* Interactive Quote Estimator Modal */}
      {isQuoteModalOpen && (
        <QuoteEstimatorModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          preselectedProject={preselectedProjectForQuote}
        />
      )}

    </div>
  );
}
