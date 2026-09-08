import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, MapPin, Layers, Lightbulb, CheckCircle2, ChevronLeft, ChevronRight, FileText, Bookmark, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ICDD_OFFERS_CONFIG } from '../data/projects';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

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
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [project]);

  if (!project) return null;

  const images = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.coverImage];

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const offerInfo = project.category && ICDD_OFFERS_CONFIG[project.category as keyof typeof ICDD_OFFERS_CONFIG]
    ? ICDD_OFFERS_CONFIG[project.category as keyof typeof ICDD_OFFERS_CONFIG]
    : null;

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour ICDD 🦺✨\nJe suis très intéressé(e) par votre réalisation :\n` +
      `"${project.title}" (${project.category})\n` +
      `Lieu : ${project.location}\n` +
      `Pouvez-vous me renseigner pour un projet similaire ?`
    );
    window.open(`https://wa.me/243897504570?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-8 bg-slate-950/75 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Glass Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[24px] sm:rounded-[36px] border border-white/80 dark:border-white/20 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button Floating Top Right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top Image Slider */}
        <div className="relative h-56 sm:h-80 md:h-[380px] w-full bg-slate-950 overflow-hidden flex-shrink-0">
          <img
            src={images[activeImgIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

          {/* Slider Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-900 dark:text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-900 dark:text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Header Info Overlay inside Image */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white pr-6">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow">
                {project.category}
              </span>
              {project.startingPrice && (
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500 text-white text-[10px] sm:text-xs font-black shadow">
                  dès {project.startingPrice}
                </span>
              )}
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 border border-white/30">
                <div className="w-3.5 h-3.5 rounded-full overflow-hidden bg-white dark:bg-slate-900 flex-shrink-0 relative">
                  <img 
                    src={icddOfficialLogo} 
                    alt="Logo ICDD" 
                    className="w-full h-full object-cover scale-[1.32]" 
                    referrerPolicy="no-referrer" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                    }}
                  />
                </div>
                <span>Réalisation ICDD</span>
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium flex items-center gap-1 border border-white/30">
                <MapPin className="w-3 h-3 text-amber-400" />
                {project.location}
              </span>
            </div>

            <h2 className="text-lg sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl mt-0.5 sm:mt-1 line-clamp-2">
              {project.subtitle}
            </p>
          </div>

          {/* Thumbnails bar */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md p-1 rounded-full border border-white/20">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 transition-all ${
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
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 flex-1">
          
          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Espace Mural</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {project.wallSurface || `${project.area} m²`}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tarif Matériaux</span>
              <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                {project.startingPrice ? `à partir de ${project.startingPrice}` : (offerInfo?.badge || 'Sur devis')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Finition</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{project.style}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Contact Direct</span>
              <a href="tel:+243897504570" className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                +243 897504570
              </a>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              🎨 Présentation & Finitions Réalisées
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {project.fullDescription}
            </p>
          </div>

          {/* Materials & Lighting Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Noble Materials Palette */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm">
                <Layers className="w-4 h-4" />
                <span>Matériaux & Produits de Décoration</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.specs.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                  >
                    ✨ {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Lighting & Scenography */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>Ambiance & Harmonie des Couleurs</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {project.specs.lighting}
              </p>
            </div>

          </div>

          {/* Key Bespoke Features Checklist */}
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Détails des Réalisations & Finitions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Disclaimer Banner */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300/60 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-snug text-[11px] sm:text-xs">
              <strong>📝 Note ICDD :</strong> Les tarifs indiqués concernent uniquement les matériaux de décoration. La main-d'œuvre, les meubles et les accessoires ne sont pas inclus. Un devis détaillé sera établi selon les besoins de votre projet.
            </p>
          </div>

          {/* Footer Action Call */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-500 block">Disponible du lundi au samedi</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                Transformons vos espaces avec élégance et modernité
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => toggleFavorite(project)}
                className={`px-3.5 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                  isFavorite(project.id)
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700'
                }`}
                title={isFavorite(project.id) ? "Retirer des favoris" : "Enregistrer dans mes favoris"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorite(project.id) ? 'fill-current text-white' : ''}`} />
                <span>{isFavorite(project.id) ? 'Enregistré' : 'Favori'}</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onRequestSimilar(project);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs tracking-wide shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Demander un Devis</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
