import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
    <div id="realisations-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Header Section */}
        <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#005EA6] text-xs font-bold border border-sky-200/80 shadow-sm">
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
              <span className="uppercase tracking-widest text-[#005EA6] font-black">ICDD</span>
              <span className="text-slate-400">•</span>
              <span>Galerie Visuelle</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Nos Réalisations <span className="text-[#005EA6]">en Images</span>
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
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
                className="w-full pl-9 pr-4 py-3 rounded-full bg-slate-50 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/20 focus:bg-white border border-slate-200 transition-all shadow-xs"
              />
            </div>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#005EA6]/20 border border-sky-400/40 whitespace-nowrap"
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
                    ? 'bg-[#005EA6] text-white shadow-md shadow-[#005EA6]/25 border border-sky-400/40 scale-[1.02]'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:text-[#005EA6]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
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
            <span>{filteredPhotos.length} photos disponibles</span>
          </div>

          {(selectedCategory !== 'Tous' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="text-slate-700 text-xs hover:underline cursor-pointer"
            >
              Afficher toutes les photos
            </button>
          )}
        </div>

        {/* Visual Gallery Grid without Titles - Pure Focus on Imagery with Live Like Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredPhotos.map((photo, index) => {
            const photoLiked = isLiked(photo.id);
            const likesCount = getLikesCount(photo.id);

            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative h-64 sm:h-72 md:h-80 bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Image with Hover Zoom */}
                <img
                  src={photo.image}
                  alt={`Réalisation ICDD ${photo.mainCategory} ${photo.location}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_2.jpg';
                  }}
                />

                {/* Subtle Multi-directional Vignette & Gradients for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badges: Category & Location (NO TITLE) */}
                <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-slate-800 shadow-sm border border-white/60">
                    {photo.mainCategory}
                  </span>

                  <span className="bg-black/50 backdrop-blur-md text-white/95 px-2.5 py-1 rounded-full text-[10px] font-light flex items-center gap-1 border border-white/20 shadow-xs">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>{photo.location.split(',')[0]}</span>
                  </span>
                </div>

                {/* Bottom Bar: Action buttons on the left + Interactive LIKE COUNTER on the right */}
                <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between gap-2">
                  
                  {/* Left: Quick WhatsApp and Zoom actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleWhatsAppInquiry(photo, e)}
                      title="Contacter sur WhatsApp pour cette réalisation"
                      className="p-2 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white backdrop-blur-md border border-emerald-400/40 shadow-sm transition-all duration-200 active:scale-90 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      title="Agrandir en plein écran"
                      className="px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-[11px] font-medium backdrop-blur-md border border-white/60 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      <Maximize2 className="w-3 h-3 text-[#005EA6]" />
                      <span className="hidden sm:inline">Agrandir</span>
                    </button>
                  </div>

                  {/* Right: LIKE BUTTON WITH LIVE COUNTER */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(photo.id);
                    }}
                    title={photoLiked ? "Je n'aime plus" : "J'aime cette réalisation"}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer shadow-md active:scale-90 select-none ${
                      photoLiked
                        ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
                        : 'bg-white/95 hover:bg-white text-slate-700 hover:text-rose-600 border-white/80'
                    }`}
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        photoLiked ? 'fill-white text-white scale-110' : 'text-slate-600 group-hover:text-rose-500'
                      }`} 
                    />
                    <span className={`text-xs font-semibold tracking-tight ${photoLiked ? 'text-white' : 'text-slate-800'}`}>
                      {likesCount}
                    </span>
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white/80 rounded-2xl p-8 border border-slate-200/60">
            <h3 className="text-base font-normal text-slate-800 mb-1">
              Aucune photo trouvée
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
