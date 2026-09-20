import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Project, RealisationCategory } from '../types';
import { 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Eye, 
  MessageCircle, 
  Heart, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Maximize2,
  FileText
} from 'lucide-react';
import { ICDD_REALISATION_PHOTOS, ICDD_PROJECTS, RealisationPhotoItem } from '../data/projects';
import { useLikes } from '../utils/useLikes';
import icddOfficialLogo from '../assets/images/icdd.jpeg';
import { buildRealisationPhotoWhatsAppMessage, openWhatsAppChat } from '../utils/whatsapp';

interface RealisationsViewProps {
  projects?: Project[];
  onOpenProject?: (project: Project) => void;
  openQuoteModal: (project?: Project) => void;
  selectedCategory?: RealisationCategory;
  onSelectCategory?: (category: RealisationCategory) => void;
  initialCategory?: RealisationCategory;
}

export const RealisationsView: React.FC<RealisationsViewProps> = ({
  openQuoteModal,
  selectedCategory: controlledCategory,
  onSelectCategory: controlledOnSelectCategory,
  initialCategory = 'Tous',
}) => {
  const { isLiked, getLikesCount, toggleLike } = useLikes();
  const [internalCategory, setInternalCategory] = useState<RealisationCategory>(initialCategory);
  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const setSelectedCategory = (cat: RealisationCategory) => {
    if (controlledOnSelectCategory) {
      controlledOnSelectCategory(cat);
    }
    setInternalCategory(cat);
  };

  const [searchQuery, setSearchQuery] = useState('');
  
  // Full-screen lightbox photo modal index
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // All unique photos
  const allPhotos: RealisationPhotoItem[] = ICDD_REALISATION_PHOTOS;

  // Categories with exact photo counts
  const categories: { id: RealisationCategory; label: string; count: number }[] = useMemo(() => [
    { id: 'Tous', label: 'Toutes les photos', count: allPhotos.length },
    { id: 'Appartements', label: 'Appartements', count: allPhotos.filter(p => p.mainCategory === 'Appartements').length },
    { id: 'Chambres', label: 'Chambres', count: allPhotos.filter(p => p.mainCategory === 'Chambres').length },
    { id: 'Bureaux', label: 'Bureaux & Pro', count: allPhotos.filter(p => p.mainCategory === 'Bureaux').length },
    { id: 'Cuisines', label: 'Cuisines', count: allPhotos.filter(p => p.mainCategory === 'Cuisines').length },
    { id: 'Portes', label: 'Portes & Menuiserie', count: allPhotos.filter(p => p.mainCategory === 'Portes').length },
    { id: 'Décoration', label: 'Décoration', count: allPhotos.filter(p => p.mainCategory === 'Décoration').length },
    { id: 'Staff', label: 'Staff & Plafonds', count: allPhotos.filter(p => p.mainCategory === 'Staff').length },
  ], [allPhotos]);

  // Filtered photos based on active category & search query
  const filteredPhotos = useMemo(() => {
    return allPhotos.filter((photo) => {
      if (selectedCategory !== 'Tous' && photo.mainCategory !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCategory = photo.mainCategory.toLowerCase().includes(q);
        const matchesLocation = photo.location.toLowerCase().includes(q);
        const matchesServices = photo.services?.some(s => s.toLowerCase().includes(q)) || false;
        return matchesCategory || matchesLocation || matchesServices;
      }
      return true;
    });
  }, [allPhotos, selectedCategory, searchQuery]);

  // Handle WhatsApp inquiry directly for a photo with photo link included
  const handleWhatsAppInquiry = (photo: RealisationPhotoItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const msg = buildRealisationPhotoWhatsAppMessage(photo);
    openWhatsAppChat(msg);
  };

  // Keyboard navigation for full-screen photo modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activePhotoIndex === null) return;
    if (e.key === 'Escape') {
      setActivePhotoIndex(null);
    } else if (e.key === 'ArrowRight') {
      setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
    } else if (e.key === 'ArrowLeft') {
      setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null));
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div id="realisations-view-container" className="w-full h-full min-h-0 overflow-y-auto pt-20 sm:pt-24 md:pt-28 px-3 sm:px-6 md:px-8 lg:px-10 pb-6 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Header Section */}
        <div className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-white/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-3xl text-center md:text-left">
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
              <span className="text-slate-200">Galerie Visuelle</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Nos Réalisations <span className="text-[#00D7FF]">en Images</span>
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed">
              Explorez toutes nos photos de chantiers finis classées par univers : appartements, chambres, staff, cuisines et décoration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            {/* Search bar */}
            <div className="relative w-full sm:w-72 lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filtrer (Gombe, Staff, Cuisine...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-full bg-slate-950/80 text-white text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 border border-white/20 transition-all shadow-inner"
              />
            </div>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#005EA6]/30 border border-sky-400/40 whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1.5 -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white shadow-md shadow-[#005EA6]/35 border border-sky-400/50 scale-[1.02]'
                    : 'bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/15 hover:bg-slate-800 hover:text-white hover:border-white/30'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 text-slate-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Count & Reset */}
        <div className="flex items-center justify-between text-xs text-slate-300 px-1">
          <div className="flex items-center gap-1.5 font-normal">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
            <span>{filteredPhotos.length} photos disponibles</span>
          </div>

          {(selectedCategory !== 'Tous' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="text-sky-300 hover:text-white text-xs hover:underline cursor-pointer transition-colors"
            >
              Afficher toutes les photos
            </button>
          )}
        </div>

        {/* Visual Gallery Grid - Pure Focus on Decorative Imagery with Concise Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => {
            const shortTitle = photo.project?.title 
              ? photo.project.title.split('–')[0].replace('Kinshasa', '').trim()
              : photo.mainCategory;
            const shortLocation = photo.location ? photo.location.split(',')[0] : 'Kinshasa';

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min((index % 8) * 0.04, 0.3) }}
                whileHover={{ y: -4 }}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative h-80 sm:h-96 md:h-[390px] rounded-[24px] overflow-hidden cursor-pointer shadow-md hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.35)] border border-white/20 hover:border-sky-400/50 transition-all duration-500 flex flex-col justify-between p-5 bg-slate-900 select-none"
              >
                {/* Visual Image with Hover Zoom */}
                <img
                  src={photo.image}
                  alt={`Réalisation ICDD ${photo.mainCategory} ${photo.location}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_2.jpg';
                  }}
                />

                {/* Subtle Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20 group-hover:via-slate-950/40 transition-colors duration-500 pointer-events-none" />

                {/* Top Badges: Category & City */}
                <div className="relative z-10 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white border border-white/20 flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#00D7FF]" />
                    <span>{photo.mainCategory}</span>
                  </div>

                  <div className="bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-slate-200 border border-white/15 flex items-center gap-1 shadow-xs">
                    <MapPin className="w-3 h-3 text-sky-300" />
                    <span>{shortLocation}</span>
                  </div>
                </div>

                {/* Bottom Content: Clean, Concise & Informative */}
                <div className="relative z-10 space-y-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors line-clamp-1">
                      {shortTitle}
                    </h3>
                    {photo.project?.subtitle && (
                      <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 font-normal mt-0.5">
                        {photo.project.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-1.5 flex items-center justify-between border-t border-white/15">
                    <span className="text-xs font-semibold text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Agrandir</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-slate-900/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 text-white">
            <h3 className="text-base font-normal text-white mb-1">
              Aucune photo trouvée
            </h3>
            <p className="text-xs text-slate-300 mb-4 font-light">
              Essayez un autre filtre ou réinitialisez la recherche.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white text-xs font-bold border border-sky-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Afficher tout
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 block">
              Accompagnement Sur Mesure
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Une réalisation vous inspire pour votre intérieur ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Demandez une visite technique ou un devis gratuit pour votre appartement, villa, chambre ou bureau à Kinshasa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20j%27ai%20vu%20vos%20r%C3%A9alisations%20et%20je%20souhaite%20un%20devis."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 shadow-lg shadow-[#005EA6]/30 border border-sky-400/40"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL (Cinematic Photo Experience with Synchronized Like Counter) */}
      {activePhoto && activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div 
            className="relative w-full max-w-5xl xl:max-w-6xl h-[88vh] sm:h-[92vh] bg-slate-950 rounded-[24px] sm:rounded-[32px] border border-white/15 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Modal */}
            <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-40 flex items-center justify-between pointer-events-none">
              
              {/* Category & Location Badges */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-3 py-1 rounded-full bg-[#005EA6] text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                  {activePhoto.mainCategory}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs border border-white/20 flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>{activePhoto.location}</span>
                </span>
                <span className="text-xs text-white/70 font-light px-2 hidden sm:inline">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg border border-white/40 cursor-pointer"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Photo Viewport */}
            <div className="relative w-full h-full flex items-center justify-center bg-slate-950 select-none overflow-hidden">
              <img
                src={activePhoto.image}
                alt={`Réalisation ICDD ${activePhoto.mainCategory}`}
                className="w-full h-full object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Slider Arrows */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                    title="Photo précédente (Flèche gauche)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                    title="Photo suivante (Flèche droite)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Bar inside Modal: WhatsApp, Quote & Live Like Counter */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-40 flex items-center justify-between gap-3 bg-black/60 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/20 shadow-xl">
              
              {/* WhatsApp direct inquiry */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppInquiry(activePhoto)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Renseignements WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const active = activePhoto;
                    setActivePhotoIndex(null);
                    const matchingProject = ICDD_PROJECTS.find(p => p.id === active.projectRef) || ({
                      id: `decor-${active.id}`,
                      title: `${active.mainCategory} – ${active.location}`,
                      subtitle: active.services?.join(' • ') || 'Décoration & Aménagement intérieur',
                      location: active.location,
                      category: 'Décoration Top Modèle',
                      year: '2024',
                      area: 45,
                      duration: '3 semaines',
                      coverImage: active.image,
                      mainCategory: active.mainCategory,
                      description: `Réalisation de prestige : ${active.mainCategory} à ${active.location}.`,
                    } as unknown as Project);
                    openQuoteModal(matchingProject);
                  }}
                  className="hidden sm:flex px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-medium border border-white/20 items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Synchronized Like Button with Counter */}
              <button
                type="button"
                onClick={() => toggleLike(activePhoto.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                  isLiked(activePhoto.id)
                    ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
                    : 'bg-white/90 hover:bg-white text-slate-800 border-white/80'
                }`}
                title={isLiked(activePhoto.id) ? "Je n'aime plus" : "J'aime cette réalisation"}
              >
                <Heart 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isLiked(activePhoto.id) ? 'fill-white text-white scale-110' : 'text-rose-500'
                  }`} 
                />
                <span className="text-xs font-bold tracking-tight">
                  {getLikesCount(activePhoto.id)} J'aime
                </span>
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
