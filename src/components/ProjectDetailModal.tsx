import React, { useState } from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Compass, Layers, Lightbulb, CheckCircle2, ChevronLeft, ChevronRight, FileText, Share2, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestSimilar: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  const { isFavorite, toggleFavorite } = useAuth();
  if (!project) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = project.galleryImages.length > 0 ? project.galleryImages : [project.coverImage];

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Glass Container */}
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[36px] border border-white/80 dark:border-white/20 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button Floating Top Right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xl border border-white/20 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Slider */}
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full bg-slate-950 overflow-hidden flex-shrink-0">
          <img
            src={images[activeImgIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Slider Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-900 dark:text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-900 dark:text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Header Info Overlay inside Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1 border border-white/30">
                <MapPin className="w-3 h-3 text-amber-400" />
                {project.location}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Thumbnails bar */}
          {images.length > 1 && (
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md p-1.5 rounded-full border border-white/20">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                    idx === activeImgIndex ? 'border-amber-400 scale-110' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="miniature" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-10 space-y-8 flex-1">
          
          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Superficie</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{project.area} m²</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Style Architectural</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{project.style}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Durée du Chantier</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{project.specs.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Année de Livraison</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{project.year}</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Présentation du Projet
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {project.fullDescription}
            </p>
          </div>

          {/* Materials & Lighting Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Noble Materials Palette */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>Matériaux Nobles Sélectionnés</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.specs.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                  >
                    ✨ {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Lighting & Scenography */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>Scénographie Lumineuse</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {project.specs.lighting}
              </p>
            </div>

          </div>

          {/* Key Bespoke Features Checklist */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Éléments Sur-Mesure & Aménagements Spécifiques
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action Call */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Vous aimez le style de ce projet ?</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">Concevons votre espace sur la même inspiration</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => toggleFavorite(project)}
                className={`px-5 py-3.5 rounded-full border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isFavorite(project.id)
                    ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
                title={isFavorite(project.id) ? "Retirer des favoris" : "Enregistrer dans mes favoris"}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite(project.id) ? 'fill-current text-white' : ''}`} />
                <span>{isFavorite(project.id) ? 'Enregistré' : 'Favori'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onRequestSimilar(project);
                }}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs tracking-wide shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un Projet Similaire</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
