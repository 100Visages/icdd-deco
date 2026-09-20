import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  X,
  FileText
} from 'lucide-react';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

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
      label: 'Tous',
      icon: Sparkles,
      count: ICDD_SHOP_PRODUCTS.length,
    },
    {
      id: 'Peintures',
      label: 'Peintures',
      icon: Paintbrush,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Peintures').length,
    },
    {
      id: 'Portes',
      label: 'Portes',
      icon: DoorClosed,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Portes').length,
    },
    {
      id: 'Cuisines',
      label: 'Cuisines',
      icon: ChefHat,
      count: ICDD_SHOP_PRODUCTS.filter(p => p.category === 'Cuisines').length,
    },
    {
      id: 'Matériaux',
      label: 'Staff',
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
        
        {/* Shop Header Banner - Prestige & Épuré */}
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
              <span className="text-slate-200">Boutique Matériaux</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Matériaux et finitions <span className="text-[#00D7FF]">haut de gamme</span>
            </h2>
            <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed">
              Peintures velours, blocs-portes acoustiques, cuisines modernes et staff d’art à Kinshasa. Commandez directement sur WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${ICDD_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour ICDD, je souhaite des conseils pour acheter des matériaux ou des finitions de décoration.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 shadow-lg shadow-[#005EA6]/30 border border-sky-400/40"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* Categories Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1.5 -mx-1 px-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  id={`shop-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#005EA6] to-[#0077c8] text-white shadow-md shadow-[#005EA6]/35 border border-sky-400/50 scale-[1.02]'
                      : 'bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/15 hover:bg-slate-800 hover:text-white hover:border-white/30'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-200' : 'text-[#00D7FF]'}`} />
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

          {/* Search */}
          <div className="relative w-full sm:w-64 lg:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-full bg-slate-950/80 text-white text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 border border-white/20 transition-all shadow-inner"
            />
          </div>

        </div>

        {/* Product Cards Grid */}
        {/* Products Grid - Decorative Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product, index) => {
            const whatsappUrl = getWhatsAppProductLink(product);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 8) * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveModalProduct(product)}
                className="group relative h-[380px] sm:h-[420px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.3)] border border-white/20 hover:border-sky-400/50 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none text-white"
              >
                {/* Background Photo with Zoom */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_2.jpg';
                  }}
                />
                
                {/* Architectural Dark Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 group-hover:via-slate-950/30 transition-colors duration-500 pointer-events-none" />

                {/* Top Badges: Category & Price */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-white border border-white/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>{product.category}</span>
                  </div>

                  <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 shadow-xs">
                    {product.priceDisplay}
                  </span>
                </div>

                {/* Bottom Decorative Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-light line-clamp-1">
                    {product.shortDesc}
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 border border-emerald-400/40 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <div className="w-9 h-9 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
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
                title="Fermer"
              >
                <X className="w-4 h-4 text-slate-800" />
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
