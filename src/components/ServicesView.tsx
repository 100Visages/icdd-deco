import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ICDD_SERVICES } from '../data/services';
import { ServiceItem, RealisationCategory } from '../types';
import { buildServiceWhatsAppMessage, openWhatsAppChat } from '../utils/whatsapp';
import { 
  Compass, 
  Sparkles, 
  Layers, 
  Paintbrush, 
  LayoutGrid, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck,
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileText
} from 'lucide-react';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface ServicesViewProps {
  onSelectCategory?: (category: RealisationCategory) => void;
  openQuoteModal: () => void;
  onExploreRealisations?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Sparkles,
  Layers,
  Paintbrush,
  LayoutGrid,
  UserCheck,
};

export const ServicesView: React.FC<ServicesViewProps> = ({
  onSelectCategory,
  openQuoteModal,
  onExploreRealisations,
}) => {
  // Mobile expandable service details state
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  const toggleService = (serviceId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleServiceExplore = (service: ServiceItem) => {
    if (onSelectCategory) {
      if (service.id === 'amenagement-sur-mesure') {
        onSelectCategory('Cuisines');
      } else if (service.id === 'architecture-interieure') {
        onSelectCategory('Appartements');
      } else if (service.id === 'staff-plafonds') {
        onSelectCategory('Staff');
      } else {
        onSelectCategory('Décoration');
      }
    } else if (onExploreRealisations) {
      onExploreRealisations();
    }
  };

  const handleServiceWhatsApp = (service: ServiceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = buildServiceWhatsAppMessage(service);
    openWhatsAppChat(msg);
  };

  return (
    <div id="services-view-container" className="w-full h-full min-h-0 overflow-y-auto pt-20 sm:pt-24 md:pt-28 px-3.5 sm:px-6 md:px-8 lg:px-10 pb-6 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-10 pb-28 sm:pb-20">

        {/* Hero Banner Services - Prestige & Épuré */}
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
              <span className="text-slate-200">Nos 6 Domaines d'Expertise</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ce que ICDD réalise <span className="text-[#00D7FF]">pour vos espaces</span>
            </h2>
            <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed">
              Architecture intérieure, staffage d'art, cuisines sur mesure et décoration haut de gamme à Kinshasa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement%20sur%20vos%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#005EA6]/30 border border-sky-400/40"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* 6 Services Grid - Decorative Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ICDD_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => handleServiceExplore(service)}
                className="group relative h-[380px] sm:h-[440px] rounded-[26px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,40,90,0.3)] border border-white/20 hover:border-sky-400/50 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 select-none text-white"
              >
                {/* Background Photo with Zoom */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                  }}
                />
                
                {/* Architectural Dark Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 group-hover:via-slate-950/30 transition-colors duration-500 pointer-events-none" />

                {/* Top Badge: Icon + Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-white border border-white/20 flex items-center gap-1.5">
                    <IconComponent className="w-3.5 h-3.5 text-[#00D7FF]" />
                    <span>{service.tag}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceWhatsApp(service, e);
                    }}
                    title="WhatsApp direct"
                    className="p-2 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 hover:border-emerald-400 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:text-white" />
                  </button>
                </div>

                {/* Bottom Decorative Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/90 group-hover:text-[#00D7FF] transition-colors flex items-center gap-1.5">
                      <span>Découvrir les réalisations</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/15 group-hover:bg-[#005EA6] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commitment Banner */}
        <div className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-[28px] border border-white/20 shadow-2xl text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#005EA6]/30 border border-sky-400/40 text-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Qualité & Finitions Garanties</h4>
                <p className="text-xs text-slate-200">
                  Matériaux certifiés, ponçage soigné et absence de bavures ou de raccords visibles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#005EA6]/30 border border-sky-400/40 text-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Respect des Délais à Kinshasa</h4>
                <p className="text-xs text-slate-200">
                  Planning clair dès le début du chantier et reporting régulier d’avancement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#005EA6]/30 border border-sky-400/40 text-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Interlocuteur Unique Dédié</h4>
                <p className="text-xs text-slate-200">
                  Un chef de projet ICDD coordonne tous les corps d'état jusqu'à la remise des clés.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
