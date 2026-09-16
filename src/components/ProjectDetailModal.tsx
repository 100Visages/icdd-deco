import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, MapPin, Layers, Lightbulb, CheckCircle2, ChevronLeft, ChevronRight, FileText, Bookmark, MessageCircle, ShieldCheck, Sparkles, Info, Eye, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ICDD_OFFERS_CONFIG } from '../data/projects';
import icddOfficialLogo from '../assets/images/icdd.jpeg';
import { useLikes } from '../utils/useLikes';

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
  const { isLiked, getLikesCount, toggleLike } = useLikes();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
    setShowDetails(false);
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      
      {/* Modal Container: Full Visual Photo Experience */}
      <div 
        className="relative w-full max-w-5xl xl:max-w-6xl h-[88vh] sm:h-[90vh] bg-slate-950 rounded-[22px] sm:rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar with Close Button */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-2">
          {/* Toggle Button also in top-right for quick access */}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className={`py-1.5 px-3 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer shadow-md flex items-center gap-1.5 active:scale-95 ${
              showDetails
                ? 'bg-[#005EA6] text-white border-sky-300 shadow-sky-500/20'
                : 'bg-white/90 hover:bg-white text-slate-800 border-white/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">{showDetails ? 'Masquer les détails' : 'Voir le détail'}</span>
            <span className="sm:hidden">{showDetails ? 'Masquer' : 'Voir le détail'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md border border-white/40 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Main Photo Area (Occupies the full viewport of the modal) */}
        <div className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden">
          
          {/* Big Photo */}
          <img
            src={images[activeImgIndex]}
            alt={project.title}
            className="w-full h-full object-contain sm:object-cover transition-all duration-500 select-none"
            referrerPolicy="no-referrer"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Slider Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Photo précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Photo suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Top-Left: Mini Thumbnails Bar */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20 max-w-[65%] overflow-x-auto custom-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    idx === activeImgIndex ? 'border-[#00D7FF] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`miniature ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
              <span className="text-[10px] text-white/80 font-medium px-2 whitespace-nowrap">
                {activeImgIndex + 1}/{images.length}
              </span>
            </div>
          )}

          {/* BOTTOM FLOATING CONTROLS: Title + "Voir les détails" on-image button */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            
            {/* Title & Location Info */}
            <div className="text-white space-y-1 max-w-xl">
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#005EA6] text-white font-bold uppercase tracking-wider shadow-xs">
                  {project.mainCategory}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 border border-white/20 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  {project.location}
                </span>
                {project.startingPrice && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white font-medium">
                    dès {project.startingPrice} $
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                {project.mainCategory} • {project.location}
              </h2>
            </div>

            {/* Action buttons on the photo including Like counter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* LIKE BUTTON WITH LIVE COUNTER */}
              <button
                type="button"
                onClick={() => toggleLike(project.id)}
                title={isLiked(project.id) ? "Je n'aime plus" : "J'aime cette réalisation"}
                className={`py-2 px-3 sm:px-3.5 rounded-xl text-xs font-semibold backdrop-blur-xl border transition-all duration-300 cursor-pointer active:scale-95 shadow-lg flex items-center gap-1.5 ${
                  isLiked(project.id)
                    ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
                    : 'bg-white/95 hover:bg-white text-slate-900 border-white/90'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked(project.id) ? 'fill-white text-white scale-110' : 'text-rose-500'}`} />
                <span>{getLikesCount(project.id)}</span>
              </button>

              <button
                type="button"
                id="btn-voir-detail-photo"
                onClick={() => setShowDetails(!showDetails)}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs font-medium backdrop-blur-xl border transition-all duration-300 cursor-pointer active:scale-95 shadow-lg flex items-center gap-2 ${
                  showDetails
                    ? 'bg-[#005EA6] text-white border-sky-300 ring-2 ring-sky-400/40'
                    : 'bg-white/95 hover:bg-white text-slate-900 border-white/90 hover:shadow-xl'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-sky-600" />
                <span>{showDetails ? 'Masquer les détails' : 'Voir le détail'}</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="py-2 px-3 rounded-xl bg-emerald-600/95 hover:bg-emerald-600 text-white text-xs font-medium backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-lg flex items-center gap-1.5"
                title="WhatsApp direct"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>

          </div>

          {/* SLIDE-UP / OVERLAY DETAILS DRAWER: Comes out ONLY when user clicks "Voir les détails" */}
          {showDetails && (
            <div 
              className="absolute inset-x-0 bottom-0 max-h-[80%] sm:max-h-[75%] bg-white/98 text-slate-800 rounded-t-[24px] sm:rounded-t-[32px] border-t border-slate-200 shadow-2xl p-4 sm:p-7 overflow-y-auto custom-scrollbar z-40 animate-in slide-in-from-bottom duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#005EA6]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Fiche Technique & Prestations Réalisées
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Fermer les détails"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Specifications Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 my-4 text-left">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Catégorie</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {project.mainCategory}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Surface / Espace</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {project.wallSurface || `${project.area} m²`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tarif Matériaux</span>
                  <span className="text-xs sm:text-sm font-bold text-[#005EA6]">
                    {project.startingPrice ? `dès ${project.startingPrice} $` : (offerInfo?.badge || 'Sur devis')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Contact Direct</span>
                  <a href="tel:+243897504570" className="text-xs sm:text-sm font-bold text-emerald-600 hover:underline">
                    +243 897504570
                  </a>
                </div>
              </div>

              {/* Services Included */}
              {project.services && project.services.length > 0 && (
                <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/70 space-y-2 mb-4 text-left">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#005EA6] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#005EA6]" />
                    Services Réalisés sur ce Projet
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((srv, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-xs font-medium border border-slate-200 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#005EA6]" />
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              <div className="space-y-1.5 text-left mb-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-400">
                  Présentation & Finitions
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Materials & Lighting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mb-4">
                {project.specs?.materials && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[#005EA6] font-bold text-xs">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Matériaux de Décoration</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.specs.materials.map((mat, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.specs?.lighting && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[#005EA6] font-bold text-xs">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Éclairage & Ambiance</span>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {project.specs.lighting}
                    </p>
                  </div>
                )}
              </div>

              {/* Bespoke Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-2 text-left mb-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-400">
                    Points Clés du Chantier
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Note ICDD */}
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200/60 text-slate-800 text-xs flex items-start gap-2 text-left mb-4">
                <ShieldCheck className="w-4 h-4 text-[#005EA6] flex-shrink-0 mt-0.5" />
                <p className="leading-snug text-[11px]">
                  <strong>Note ICDD :</strong> Devis personnalisé gratuit réalisé sur mesure selon vos plans et vos envies.
                </p>
              </div>

              {/* Bottom Actions inside drawer */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => toggleFavorite(project)}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isFavorite(project.id)
                      ? 'bg-[#005EA6] text-white border-sky-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isFavorite(project.id) ? 'fill-current text-white' : ''}`} />
                  <span>{isFavorite(project.id) ? 'Enregistré' : 'Favori'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onRequestSimilar(project);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#005EA6] hover:bg-[#004f8c] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-200" />
                  <span>Demander un devis pour ce modèle</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
