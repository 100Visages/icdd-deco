import React from 'react';
import { motion } from 'motion/react';
import { Project, FilterState } from '../types';
import { MapPin, ArrowUpRight, Search, Sparkles, Filter, SlidersHorizontal, Bookmark, Ruler, Palette, Calendar, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

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
  const { isFavorite, toggleFavorite } = useAuth();
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
    <div className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Header Section - Prestige & Épuré */}
        <div className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-white/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 text-[#00D7FF] text-xs font-bold border border-white/20 shadow-sm">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-white border border-slate-200 shadow-sm flex-shrink-0 relative">
                <img 
                  src={icddOfficialLogo} 
                  alt="Logo ICDD" 
                  className="absolute inset-0 w-full h-full object-cover scale-[1.32]" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                  }}
                />
              </div>
              <span className="uppercase tracking-widest text-[#00D7FF] font-black">ICDD</span>
              <span className="text-white/40">•</span>
              <span className="text-slate-200">Portfolio d'Exception</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Nos Projets <span className="text-[#00D7FF]">de Référence</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-200 font-normal leading-relaxed">
              Découvrez nos conceptions d'architecture d'intérieur sur-mesure pour résidences privées, penthouses et espaces professionnels à Kinshasa.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par lieu, style..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-4 py-3 rounded-full bg-slate-950/80 text-white text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 border border-white/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Quick Category Horizontal Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
          {['Tous', 'Décoration Top Modèle', 'Décoration Gold', 'Décoration luxueuse', 'Décoration classique', 'Décoration simple'].map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white shadow-md shadow-[#005EA6]/35 border border-sky-400/50 scale-[1.02]'
                    : 'bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/15 hover:bg-slate-800 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter Pills Summary */}
        <div className="flex items-center justify-between text-xs text-slate-300 px-1 sm:px-2">
          <div className="flex items-center gap-2 font-normal">
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D7FF]" />
            <span className="font-semibold text-white">
              {filteredProjects.length} projet(s) trouvé(s)
            </span>
          </div>

          {(filters.category !== 'Tous' || filters.style !== 'Tous' || filters.budget !== 'Tous' || filters.searchQuery) && (
            <button
              onClick={() => setFilters({ category: 'Tous', style: 'Tous', budget: 'Tous', searchQuery: '' })}
              className="text-sky-300 hover:text-white font-medium hover:underline cursor-pointer"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (index % 6) * 0.06 }}
              whileHover={{ y: -5 }}
              onClick={() => onOpenProject(project)}
              className="group bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-sky-400/50 shadow-xl overflow-hidden hover:shadow-[0_15px_35px_rgba(0,40,90,0.3)] transition-all duration-300 cursor-pointer flex flex-col justify-between text-white"
            >
              {/* Image Thumbnail */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Category Badge Top Left */}
                <div className="absolute top-3.5 left-3.5 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs">
                  {project.category}
                </div>

                {/* Top Right: Bookmark Action */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(project);
                    }}
                    title={isFavorite(project.id) ? "Retirer des favoris" : "Enregistrer dans mes favoris"}
                    className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                      isFavorite(project.id)
                        ? 'bg-[#005EA6] text-white border-sky-400 shadow-md scale-105'
                        : 'bg-slate-950/70 text-slate-300 border-white/20 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFavorite(project.id) ? 'fill-current text-[#00D7FF]' : ''}`} />
                  </button>
                </div>

                {/* Title Overlay at bottom of image */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight drop-shadow-md group-hover:text-[#00D7FF] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 font-light">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-200 font-normal line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#00D7FF] group-hover:underline flex items-center gap-1">
                    <span>Découvrir le projet</span>
                  </span>

                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#005EA6] text-white flex items-center justify-center transition-all duration-300 border border-white/20 group-hover:border-sky-400/50 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/80 backdrop-blur-2xl rounded-[32px] p-8 border border-white/20 text-white">
            <h3 className="text-xl font-bold text-white mb-2">
              Aucun projet ne correspond à vos critères
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              Essayez de modifier vos filtres de recherche.
            </p>
            <button
              onClick={() => setFilters({ category: 'Tous', style: 'Tous', budget: 'Tous', searchQuery: '' })}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all border border-sky-400/40 shadow-md cursor-pointer"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
