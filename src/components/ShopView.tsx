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
  Shirt,
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Phone
} from 'lucide-react';

interface ShopViewProps {
  openQuoteModal: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ openQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);

  const categories: { id: ShopCategory; label: string; icon: React.ElementType; count: number }[] = [
    {
      id: 'Tous',
      label: 'Tous les matériaux',
      icon: Sparkles,
      count: ICDD_SHOP_PRODUCTS.length,
    },
    {
      id: 'Peintures',
      label: '🎨 Peintures & Enduits',
      icon: Paintbrush,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Peintures').length,
    },
    {
      id: 'Portes',
      label: '🚪 Portes Intérieures',
      icon: DoorClosed,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Portes').length,
    },
    {
      id: 'Cuisines',
      label: '🍳 Cuisines Modernes',
      icon: ChefHat,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Cuisines').length,
    },
    {
      id: 'Matériaux',
      label: '🏛️ Matériaux & Staff',
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
    <div id="shop-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-20">
        
        {/* Shop Header Banner */}
        <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#005EA6] text-xs font-bold border border-sky-200/80">
              <ShoppingBag className="w-3.5 h-3.5 text-[#005EA6]" />
              <span>Boutique Matériaux & Solutions ICDD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Matériaux et solutions d’aménagement
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
              Retrouvez les peintures haut de gamme, portes contemporaines, agencements de cuisines et moulures en staff utilisés dans nos réalisations à Kinshasa. Commandez directement par WhatsApp ou demandez conseil à nos artisans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${ICDD_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour ICDD, je souhaite des conseils pour acheter des matériaux ou des finitions de décoration.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* Categories Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`shop-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                    isSelected
                      ? 'bg-[#005EA6] text-white border border-[#00D7FF]/50 shadow-md shadow-[#005EA6]/25'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
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

          {/* Search */}
          <div className="relative w-full sm:w-72 lg:w-80 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white border border-slate-200 shadow-sm"
            />
          </div>

        </div>

        {/* Product Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => {
            const whatsappUrl = getWhatsAppProductLink(product);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-[26px] border border-slate-200/80 shadow-sm hover:shadow-xl hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-slate-100 shadow-sm">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="bg-sky-100 text-[#005EA6] px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide shadow-sm border border-sky-200">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="bg-white/95 text-slate-800 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-slate-200/80 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {product.availability}
                    </span>
                  </div>

                  {/* Price Tag in Photo */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs sm:text-sm font-extrabold bg-[#005EA6] px-3 py-1 rounded-full border border-sky-400/40 shadow-sm">
                      {product.priceDisplay}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#005EA6] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Specifications Preview */}
                  {product.specs && (
                    <div className="space-y-1 pt-1">
                      {product.specs.slice(0, 2).map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-[11px] text-slate-500">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* WhatsApp Action Buttons (Simple, Direct, No heavy cart) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Commander sur WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setActiveModalProduct(product)}
                      title="Voir les détails complets"
                      className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
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
