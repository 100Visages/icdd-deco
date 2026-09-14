import React, { useState } from 'react';
import { Project, RealisationCategory } from '../types';
import { MapPin, Search, Bookmark, SlidersHorizontal, Eye, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ICDD_OFFERS_CONFIG } from '../data/projects';

interface RealisationsViewProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  openQuoteModal: () => void;
  selectedCategory?: RealisationCategory;
  onSelectCategory?: (category: RealisationCategory) => void;
  initialCategory?: RealisationCategory;
}

export const RealisationsView: React.FC<RealisationsViewProps> = ({
  projects,
  onOpenProject,
  openQuoteModal,
  selectedCategory: controlledCategory,
  onSelectCategory: controlledOnSelectCategory,
  initialCategory = 'Tous',
}) => {
  const { isFavorite, toggleFavorite } = useAuth();
  const [internalCategory, setInternalCategory] = useState<RealisationCategory>(initialCategory);
  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const setSelectedCategory = (cat: RealisationCategory) => {
    if (controlledOnSelectCategory) {
      controlledOnSelectCategory(cat);
    }
    setInternalCategory(cat);
  };
  const [searchQuery, setSearchQuery] = useState('');
  // Track open detail cards by project id
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  const toggleDetails = (projectId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedDetails(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const categories: { id: RealisationCategory; label: string; count: number }[] = [
    { id: 'Tous', label: 'Toutes', count: projects.length },
    { id: 'Appartements', label: 'Appartements', count: projects.filter(p => p.mainCategory === 'Appartements').length },
    { id: 'Chambres', label: 'Chambres', count: projects.filter(p => p.mainCategory === 'Chambres').length },
    { id: 'Bureaux', label: 'Bureaux & Pro', count: projects.filter(p => p.mainCategory === 'Bureaux').length },
    { id: 'Cuisines', label: 'Cuisines', count: projects.filter(p => p.mainCategory === 'Cuisines').length },
    { id: 'Portes', label: 'Portes & Menuiserie', count: projects.filter(p => p.mainCategory === 'Portes').length },
    { id: 'Décoration', label: 'Décoration', count: projects.filter(p => p.mainCategory === 'Décoration').length },
    { id: 'Staff', label: 'Staff & Plafonds', count: projects.filter(p => p.mainCategory === 'Staff').length },
  ];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory !== 'Tous' && p.mainCategory !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.services.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleWhatsAppProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Bonjour ICDD 🦺✨\nJe suis intéressé(e) par votre réalisation :\n"${project.title}" (${project.location})\nPouvez-vous me renseigner pour un projet similaire ?`
    );
    window.open(`https://wa.me/243897504570?text=${text}`, '_blank');
  };

  return (
    <div id="realisations-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Minimalist, Clean Header Section */}
        <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-slate-900">
              Nos Réalisations <span className="font-semibold text-slate-900">ICDD</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
              Photothèque épurée de nos chantiers d'aménagement et de décoration à Kinshasa
            </p>
          </div>

          {/* Minimal Search bar */}
          <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher une réalisation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 text-slate-800 text-xs font-normal placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white border border-slate-200 transition-all"
            />
          </div>
        </div>

        {/* Minimalist Categories Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-normal transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Count & Reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-1.5 font-normal">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>{filteredProjects.length} réalisations</span>
          </div>

          {(selectedCategory !== 'Tous' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="text-slate-700 text-xs hover:underline cursor-pointer"
            >
              Afficher tout
            </button>
          )}
        </div>

        {/* Minimalist Image-First Realizations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredProjects.map((project) => {
            const isExpanded = !!expandedDetails[project.id];
            const offerInfo = project.category && ICDD_OFFERS_CONFIG[project.category as keyof typeof ICDD_OFFERS_CONFIG]
              ? ICDD_OFFERS_CONFIG[project.category as keyof typeof ICDD_OFFERS_CONFIG]
              : null;

            return (
              <div
                key={project.id}
                className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Visual Image Container (Primary element) */}
                <div 
                  onClick={() => onOpenProject(project)}
                  className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-slate-100 cursor-pointer select-none"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/projects/real_project_2.jpg';
                    }}
                  />
                  
                  {/* Subtle Gradient for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                  {/* Top Badges (Category & Location) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                      {project.mainCategory}
                    </span>

                    <div className="flex items-center gap-1">
                      <span className="bg-black/40 backdrop-blur-md text-white/90 px-2.5 py-0.5 rounded-full text-[10px] font-light flex items-center gap-1 border border-white/20">
                        <MapPin className="w-2.5 h-2.5 text-slate-300" />
                        <span>{project.location.split(',')[0]}</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project);
                        }}
                        title={isFavorite(project.id) ? "Retirer des favoris" : "Favori"}
                        className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-xs ${
                          isFavorite(project.id)
                            ? 'bg-[#005EA6] text-white border-sky-400 scale-105'
                            : 'bg-white/90 text-slate-700 border-white/60 hover:text-slate-900 hover:bg-white'
                        }`}
                      >
                        <Bookmark className={`w-3 h-3 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom of Image: Title + The Compact "Voir le détail" Button ON THE PHOTO */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    
                    {/* Compact Title */}
                    <div className="text-white space-y-0.5 pr-2 pointer-events-none">
                      <h3 className="text-sm sm:text-base font-normal tracking-tight line-clamp-1 drop-shadow-xs">
                        {project.title}
                      </h3>
                      {project.startingPrice && (
                        <p className="text-[11px] text-white/80 font-light">
                          dès {project.startingPrice} $
                        </p>
                      )}
                    </div>

                    {/* Compact "Voir le détail" Button placed directly ON THE PHOTO */}
                    <button
                      type="button"
                      onClick={(e) => toggleDetails(project.id, e)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md border transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5 active:scale-95 flex-shrink-0 ${
                        isExpanded
                          ? 'bg-[#005EA6] text-white border-sky-400'
                          : 'bg-white/95 hover:bg-white text-slate-900 border-white/80 hover:shadow'
                      }`}
                      title={isExpanded ? "Masquer les détails" : "Voir le détail de cette réalisation"}
                    >
                      <Eye className="w-3 h-3 text-[#005EA6]" />
                      <span>{isExpanded ? 'Masquer' : 'Voir le détail'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                  </div>
                </div>

                {/* Conditional Expandable Details Panel (Revealed ONLY when clicking "Voir le détail") */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 space-y-3.5 text-xs text-slate-700 animate-in fade-in duration-200">
                    
                    {/* Description */}
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Services Tags */}
                    {project.services && project.services.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-medium tracking-wider text-slate-400 block">
                          Prestations réalisées :
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {project.services.map((srv, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-white text-slate-700 border border-slate-200/70 px-2 py-0.5 rounded-full"
                            >
                              • {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Surface</span>
                        <span className="font-medium text-slate-800">{project.wallSurface || `${project.area} m²`}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Gamme Déco</span>
                        <span className="font-medium text-slate-800">{project.category}</span>
                      </div>
                    </div>

                    {/* Materials preview */}
                    {project.specs?.materials && project.specs.materials.length > 0 && (
                      <div className="text-[11px] text-slate-500 font-light">
                        <span className="text-slate-400 font-medium">Matériaux : </span>
                        {project.specs.materials.slice(0, 3).join(', ')}
                      </div>
                    )}

                    {/* Action buttons inside details */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleWhatsAppProject(project, e)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenProject(project)}
                        className="py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Diaporama</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white/80 rounded-2xl p-8 border border-slate-200/60">
            <h3 className="text-base font-normal text-slate-800 mb-1">
              Aucune réalisation dans cette catégorie
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-light">
              Essayez un autre filtre ou réinitialisez la recherche.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* Minimal Bottom CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-normal">
              Vous avez un projet de décoration ou d'aménagement ?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl font-light">
              Étude personnalisée et devis gratuit réalisés sur mesure pour votre villa, appartement ou bureau à Kinshasa.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="px-5 py-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-medium text-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Demander un devis gratuit
          </button>
        </div>

      </div>
    </div>
  );
};
