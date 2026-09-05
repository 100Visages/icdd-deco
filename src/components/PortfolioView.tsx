import React from 'react';
import { Project, FilterState } from '../types';
import { MapPin, ArrowUpRight, Search, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

interface PortfolioViewProps {
  projects: Project[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenProject: (project: Project) => void;
  openQuoteModal: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  projects,
  filters,
  setFilters,
  onOpenProject,
  openQuoteModal,
}) => {
  // Filter logic
  const filteredProjects = projects.filter(project => {
    if (filters.category !== 'Tous' && project.category !== filters.category) return false;
    if (filters.style !== 'Tous' && project.style !== filters.style) return false;
    if (filters.budget !== 'Tous' && project.budgetRange !== filters.budget) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.style.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8 pb-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-6 sm:p-8 rounded-[32px] border border-white/80 dark:border-white/20 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Réalisations d'Exception</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Portfolio & Projets ICDD
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Découvrez nos conceptions d'architecture d'intérieur sur-mesure pour résidences privées, penthouses et espaces professionnels.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par lieu, style..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-white/80 dark:border-slate-700 shadow-inner"
            />
          </div>
        </div>

        {/* Filter Pills Summary */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 px-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span className="font-semibold">{filteredProjects.length} projet(s) trouvé(s)</span>
          </div>

          {(filters.category !== 'Tous' || filters.style !== 'Tous' || filters.budget !== 'Tous' || filters.searchQuery) && (
            <button
              onClick={() => setFilters({ category: 'Tous', style: 'Tous', budget: 'Tous', searchQuery: '' })}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProject(project)}
              className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[32px] border border-white/80 dark:border-white/20 shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Thumbnail */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Category Badge Top Left */}
                <div className="absolute top-4 left-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 dark:text-white border border-white/60">
                  {project.category}
                </div>

                {/* Location Top Right */}
                <div className="absolute top-4 right-4 bg-slate-950/80 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 border border-white/20">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{project.location}</span>
                </div>

                {/* Title Overlay at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold tracking-tight drop-shadow-md group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-200 opacity-90 line-clamp-1 font-medium">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Specs tag bar */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                    📐 {project.area}m²
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                    🎨 {project.style}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                    📅 {project.year}
                  </span>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    {project.budgetRange}
                  </span>

                  <button className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-amber-500 group-hover:rotate-45 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-8 border border-white/60">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Aucun projet ne correspond à vos critères
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Essayez de modifier vos filtres de catégorie, de style ou de budget.
            </p>
            <button
              onClick={() => setFilters({ category: 'Tous', style: 'Tous', budget: 'Tous', searchQuery: '' })}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
