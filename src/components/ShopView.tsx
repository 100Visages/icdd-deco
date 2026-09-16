import React, { useState } from 'react';
import { ICDD_SHOP_PRODUCTS, getWhatsAppProductLink, ICDD_WHATSAPP_NUMBER } from '../data/shop';
import { ShopCategory, ShopProduct } from '../types';
import { 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  Search, 
  Paintbrush, 
  DoorClosed, 
  ChefHat, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  Eye,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

interface ShopViewProps {
  openQuoteModal: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ openQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);
  const [openShopDetails, setOpenShopDetails] = useState<Record<string, boolean>>({});

  const toggleProductDetails = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenShopDetails(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const categories: { id: ShopCategory; label: string; icon: React.ElementType; count: number }[] = [
    {
      id: 'Tous',
      label: 'Tous les matériaux',
      icon: Sparkles,
      count: ICDD_SHOP_PRODUCTS.length,
    },
    {
      id: 'Peintures',
      label: '🎨 Peintures',
      icon: Paintbrush,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Peintures').length,
    },
    {
      id: 'Portes',
      label: '🚪 Portes',
      icon: DoorClosed,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Portes').length,
    },
    {
      id: 'Cuisines',
      label: '🍳 Cuisines',
      icon: ChefHat,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Cuisines').length,
    },
    {
      id: 'Matériaux',
      label: '🏛️ Staff & Moulures',
      icon: Layers,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Matériaux').length,
    },
  ];

  const filteredProducts = ICDD_SHOP_PRODUCTS.filter(p => {
    if (selectedCategory !== 'Tous' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="shop-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-5 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Shop Header Banner - Minimalist & Épuré */}
        <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#005EA6] text-xs font-semibold border border-sky-200/80">
              <ShoppingBag className="w-3.5 h-3.5 text-[#005EA6]" />
              <span>Boutique Matériaux ICDD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-slate-900">
              Matériaux et finitions <span className="font-semibold text-slate-900">haut de gamme</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Peintures velours, blocs-portes acoustiques, cuisines modernes et staff d’art à Kinshasa. Commandez directement sur WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${ICDD_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour ICDD, je souhaite des conseils pour acheter des matériaux ou des finitions de décoration.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white font-medium text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-white/80" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* Categories Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`shop-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
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

          {/* Search */}
          <div className="relative w-full sm:w-64 lg:w-72 flex-shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-50 text-slate-900 text-xs font-light placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white border border-slate-200/80 shadow-2xs"
            />
          </div>

        </div>

        {/* Product Cards Grid - Photo-First with Compact 'Voir le détail' on Photo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const whatsappUrl = getWhatsAppProductLink(product);
            const isExpanded = !!openShopDetails[product.id];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Photo with Badges & "Voir le détail" Button */}
                <div 
                  onClick={() => toggleProductDetails(product.id)}
                  className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 cursor-pointer select-none"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                      {product.category}
                    </span>

                    {/* Availability */}
                    <span className="bg-black/50 text-white backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-light flex items-center gap-1 border border-white/10 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {product.availability}
                    </span>
                  </div>

                  {/* Bottom of Photo: Price + Compact "Voir le détail" Button */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold bg-white text-slate-900 px-2.5 py-0.8 rounded-lg shadow-xs border border-white/90 block">
                        {product.priceDisplay}
                      </span>
                    </div>

                    {/* Small Button ON THE PHOTO */}
                    <button
                      type="button"
                      onClick={(e) => toggleProductDetails(product.id, e)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md border transition-all duration-200 cursor-pointer shadow-xs flex items-center gap-1.5 active:scale-95 flex-shrink-0 ${
                        isExpanded
                          ? 'bg-[#005EA6] text-white border-sky-400'
                          : 'bg-white/95 hover:bg-white text-slate-900 border-white/80'
                      }`}
                      title={isExpanded ? "Masquer les détails" : "Voir le détail"}
                    >
                      <Eye className="w-3 h-3 text-[#005EA6]" />
                      <span>{isExpanded ? 'Masquer' : 'Voir le détail'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-normal text-slate-900 group-hover:text-[#005EA6] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    
                    {/* Expandable details: Hidden by default on mobile unless toggled */}
                    {isExpanded ? (
                      <div className="space-y-2.5 pt-2 animate-in fade-in duration-200">
                        <p className="text-xs text-slate-600 font-light leading-relaxed">
                          {product.shortDesc}
                        </p>

                        {/* Specifications Checklist */}
                        {product.specs && (
                          <div className="space-y-1 pt-1 border-t border-slate-100">
                            {product.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                <span className="font-light">{spec}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 font-light line-clamp-1">
                        {product.shortDesc}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Action Buttons (Simple, Direct, Clean) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-normal text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Commander</span>
                    </a>

                    <button
                      onClick={() => setActiveModalProduct(product)}
                      title="Fiche technique complète"
                      className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/90 backdrop-blur-xl rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Aucun produit ne correspond à cette recherche
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Changez de catégorie ou réinitialisez la recherche.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#005EA6] text-white text-xs font-bold hover:bg-[#004f8c] transition-colors cursor-pointer"
            >
              Afficher tous les matériaux
            </button>
          </div>
        )}

        {/* Order Guidance Footer */}
        <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-[28px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              Comment se passe une commande de matériaux chez ICDD ?
            </h4>
            <p className="text-xs text-slate-600 max-w-2xl font-normal">
              1. Cliquez sur le bouton WhatsApp pour nous transmettre votre besoin • 2. Nos conseillers confirment le stock ou le délai de fabrication sur mesure à Kinshasa • 3. Livraison rapide sur votre chantier ou retrait en agence.
            </p>
          </div>

          <a
            href={`https://wa.me/${ICDD_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour ICDD, je souhaite commander des matériaux d’architecture intérieure.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Échanger avec un conseiller</span>
          </a>
        </div>

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 w-full overflow-hidden bg-slate-100">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-slate-800 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 block">
                  {activeModalProduct.category} • {activeModalProduct.availability}
                </span>
                <h3 className="text-xl font-black">{activeModalProduct.name}</h3>
                <span className="text-sm font-bold text-emerald-300 mt-1 block">
                  {activeModalProduct.priceDisplay}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold text-slate-400">Description</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {activeModalProduct.description}
                </p>
              </div>

              {activeModalProduct.specs && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs uppercase font-bold text-slate-400">Caractéristiques & Application</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalProduct.specs.map((sp, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200 border border-slate-200"
                >
                  Fermer
                </button>

                <a
                  href={getWhatsAppProductLink(activeModalProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Commander sur WhatsApp (+243 897504570)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
