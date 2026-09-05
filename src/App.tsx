import React, { useState } from 'react';
import { NavTab, FilterState, Project } from './types';
import { ICDD_PROJECTS } from './data/projects';
import { SidebarNav } from './components/SidebarNav';
import { TopBar } from './components/TopBar';
import { HeroOverlay } from './components/HeroOverlay';
import { PortfolioView } from './components/PortfolioView';
import { AgencyView } from './components/AgencyView';
import { ContactView } from './components/ContactView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('accueil');

  const [filters, setFilters] = useState<FilterState>({
    category: 'Tous',
    style: 'Tous',
    budget: 'Tous',
    searchQuery: '',
  });

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

  return (
    <div id="icdd-main-wrapper" className="h-screen w-screen overflow-hidden bg-[#dcd8d0] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-0 sm:p-2 lg:p-3 xl:p-4 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Outer Pill-Shaped Glass Frame matching reference image structure */}
      <main 
        id="pill-shaped-container"
        className="relative w-full h-full max-w-none rounded-none sm:rounded-[28px] lg:rounded-[36px] xl:rounded-[44px] border-0 sm:border-[3px] border-white/80 dark:border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-between bg-slate-950 transition-all duration-500"
      >
        
        {/* Main Background Image (Luxury ICDD Interior Photography) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={ICDD_PROJECTS[0].coverImage}
            alt="ICDD Interior Design"
            className={`w-full h-full object-cover transition-all duration-700 ${
              activeTab !== 'accueil' ? 'scale-105 blur-md opacity-40' : 'scale-100 opacity-90'
            }`}
            referrerPolicy="no-referrer"
          />
          {/* Subtle Vignetting & Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/70" />
        </div>

        {/* Sidebar Navigation (Reconstructed 4-Icon Sidebar on Left) */}
        <SidebarNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Mobile Top Navigation Pills (for mobile screens) */}
        <div className="md:hidden z-40 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-around border-b border-white/40">
          <button
            onClick={() => setActiveTab('accueil')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${activeTab === 'accueil' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
          >
            Accueil
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${activeTab === 'portfolio' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('agence')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${activeTab === 'agence' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
          >
            À Propos
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${activeTab === 'contact' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
          >
            Contact
          </button>
        </div>

        {/* Top Header Bar inside Pill Container */}
        <TopBar
          filters={filters}
          setFilters={setFilters}
          setActiveTab={setActiveTab}
          openQuoteModal={() => handleOpenQuoteModal()}
        />

        {/* Main Dynamic View Content */}
        <div className="relative z-20 flex-1 w-full overflow-hidden flex flex-col justify-between md:pl-20">
          
          {activeTab === 'accueil' && (
            <HeroOverlay
              featuredProject={featuredProject}
              onOpenProject={handleOpenProject}
              openQuoteModal={() => handleOpenQuoteModal()}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView
              projects={ICDD_PROJECTS}
              filters={filters}
              setFilters={setFilters}
              onOpenProject={handleOpenProject}
              openQuoteModal={() => handleOpenQuoteModal()}
            />
          )}

          {activeTab === 'agence' && (
            <AgencyView
              openQuoteModal={() => handleOpenQuoteModal()}
              setActiveTab={setActiveTab}
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
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProjectModal}
        onRequestSimilar={(p) => handleOpenQuoteModal(p)}
      />

      {/* Interactive Quote Estimator Modal */}
      <QuoteEstimatorModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preselectedProject={preselectedProjectForQuote}
      />

    </div>
  );
}
