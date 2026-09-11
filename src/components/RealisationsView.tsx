import React, { useState } from 'react';
import { Project, RealisationCategory } from '../types';
import { MapPin, ArrowUpRight, Search, Sparkles, Building2, Paintbrush, Layers, Bookmark, SlidersHorizontal, UtensilsCrossed, DoorClosed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

  const categories: { id: RealisationCategory; label: string; icon: React.ElementType; count: number }[] = [
    {
      id: 'Tous',
      label: 'Toutes les réalisations',
      icon: Sparkles,
      count: projects.length,
    },
    {
      id: 'Appartements',
      label: '🏠 Appartements',
      icon: Building2,
      count: projects.filter(p => p.mainCategory === 'Appartements').length,
    },
    {
      id: 'Cuisines',
      label: '🍳 Cuisines Modernes',
      icon: UtensilsCrossed,
      count: projects.filter(p => p.mainCategory === 'Cuisines').length,
    },
    {
      id: 'Portes',
      label: '🚪 Portes & Menuiserie',
      icon: DoorClosed,
      count: projects.filter(p => p.mainCategory === 'Portes').length,
    },
    {
      id: 'Décoration',
      label: '🎨 Décoration',
      icon: Paintbrush,
      count: projects.filter(p => p.mainCategory === 'Décoration').length,
    },
    {
      id: 'Staff',
      label: '✨ Staff & Plafonds',
      icon: Layers,
      count: projects.filter(p => p.mainCategory === 'Staff').length,
    },
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

  return (
    <div id="realisations-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Header Section */}
        <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#005EA6] text-xs font-bold border border-sky-200/80">
              <Sparkles className="w-3.5 h-3.5 text-[#005EA6]" />
              <span>Savoir-Faire & Chantiers Réalisés</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nos Réalisations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Explorez nos projets réels livrés à Kinshasa : aménagement d’appartements complets, décors muraux et plafonds sculptés en staff.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un projet, un lieu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-full bg-slate-50 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white border border-slate-200 shadow-sm"
            />
          </div>
        </div>

        {/* 3 Main Categories Bar (The Core Architecture requested by user) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                  isSelected
                    ? 'bg-[#005EA6] text-white border border-[#00D7FF]/50 shadow-md shadow-[#005EA6]/25 scale-[1.02]'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isSelected 
                    ? 'bg-[#00D7FF] text-[#005EA6]' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#005EA6]" />
            <span>{filteredProjects.length} réalisation(s) affichée(s)</span>
          </div>

          {(selectedCategory !== 'Tous' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="text-[#005EA6] font-bold hover:underline cursor-pointer"
            >
              Afficher tout
            </button>
          )}
        </div>

        {/* Realizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProject(project)}
              className="group bg-white rounded-[24px] sm:rounded-[30px] border border-slate-200/80 shadow-sm hover:shadow-xl hover:scale-[1.015] active:scale-[0.99] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Image & Badges */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_4.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                {/* Main Category Badge */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase text-[#005EA6] border border-slate-100 shadow-sm">
                  {project.mainCategory === 'Appartements' && '🏠 Appartement'}
                  {project.mainCategory === 'Décoration' && '🎨 Décoration'}
                  {project.mainCategory === 'Staff' && '✨ Staff & Plafonds'}
                </div>

                {/* Location & Favorite */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                  <div className="bg-white/95 text-slate-800 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-slate-200/80 shadow-sm">
                    <MapPin className="w-3 h-3 text-[#005EA6]" />
                    <span>{project.location}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(project);
                    }}
                    title={isFavorite(project.id) ? "Retirer des favoris" : "Enregistrer dans mes favoris"}
                    className={`p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-sm ${
                      isFavorite(project.id)
                        ? 'bg-[#005EA6] text-white border-[#00D7FF] scale-105'
                        : 'bg-white/95 text-slate-700 border-slate-200/80 hover:text-[#005EA6] hover:bg-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Title & Subtitle */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="text-lg font-black tracking-tight drop-shadow-md group-hover:text-[#00D7FF] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-100 drop-shadow line-clamp-1 font-medium mt-0.5">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Services Tags */}
                {project.services && project.services.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Services inclus :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.services.slice(0, 3).map((srv, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60 px-2.5 py-0.5 rounded-full"
                        >
                          • {srv}
                        </span>
                      ))}
                      {project.services.length > 3 && (
                        <span className="text-[10px] font-bold text-[#005EA6] px-1.5 py-0.5">
                          +{project.services.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-medium">Surface</span>
                    <span className="text-xs font-bold text-slate-800">
                      {project.wallSurface || `${project.area} m²`}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005EA6] group-hover:underline">
                    <span>Voir le projet</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white/90 backdrop-blur-xl rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Aucune réalisation ne correspond à cette recherche
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Changez de catégorie ou réinitialisez la recherche.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#005EA6] text-white text-xs font-bold hover:bg-[#004f8c] transition-colors border border-[#00D7FF]/40 shadow-md cursor-pointer"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-400/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black">
              Vous avez un projet similaire à réaliser ?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Nos architectes d'intérieur et décorateurs étudient vos plans et réalisent un devis personnalisé.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="px-6 py-3 rounded-full bg-white text-[#005EA6] hover:bg-sky-50 hover:text-[#005EA6] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Demander un devis gratuit
          </button>
        </div>

      </div>
    </div>
  );
};
