import React, { useState } from 'react';
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
    <div id="services-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-10 pb-28 sm:pb-20">

        {/* Hero Banner Services - Prestige & Épuré */}
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
              <span>Nos 6 Domaines d'Expertise</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Ce que ICDD réalise <span className="text-[#005EA6]">pour vos espaces</span>
            </h2>
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
              Architecture intérieure, staffage d'art, cuisines sur mesure et décoration haut de gamme à Kinshasa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20renseignement%20sur%20vos%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#005EA6]/20 border border-sky-400/40"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {ICDD_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            const isExpanded = !!expandedServices[service.id];

            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Header (Photo with Overlay Controls) */}
                <div 
                  onClick={() => toggleService(service.id)}
                  className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 cursor-pointer select-none"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 border border-white/60 shadow-sm">
                      {service.tag}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-slate-950/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-sm">
                      <IconComponent className="w-4 h-4 text-sky-300" />
                    </div>
                  </div>

                  {/* Bottom on Photo: Title & Compact "Détails" Button */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                    <div className="text-white space-y-0.5 pr-2 pointer-events-none">
                      <span className="text-[10px] text-sky-300 font-bold uppercase tracking-widest block">
                        Service 0{index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold tracking-tight line-clamp-1 drop-shadow-sm">
                        {service.title}
                      </h3>
                    </div>

                    {/* Small Button directly on photo */}
                    <button
                      type="button"
                      onClick={(e) => toggleService(service.id, e)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5 active:scale-95 flex-shrink-0 ${
                        isExpanded
                          ? 'bg-[#005EA6] text-white border-sky-400'
                          : 'bg-white/95 hover:bg-white text-slate-900 border-white/80'
                      }`}
                      title={isExpanded ? "Masquer les détails" : "Voir les détails"}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#005EA6]" />
                      <span>{isExpanded ? 'Masquer' : 'Détails'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Short description always visible */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Expandable Technical Details */}
                  {isExpanded && (
                    <div className="space-y-4 pt-3 border-t border-slate-100 text-xs animate-in fade-in duration-200">
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {service.fullDesc}
                      </p>

                      {/* Points Checklist */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                          Ce que comprend la prestation :
                        </span>
                        <ul className="space-y-1.5">
                          {service.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="font-normal">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleServiceExplore(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005EA6] hover:underline cursor-pointer group/link"
                    >
                      <span>Voir les projets</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleServiceWhatsApp(service, e)}
                        className="p-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200 shadow-xs cursor-pointer"
                        title="Demander des infos sur WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={openQuoteModal}
                        className="px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-[#005EA6] text-[#005EA6] hover:text-white text-xs font-bold transition-all border border-sky-200 cursor-pointer shadow-xs"
                      >
                        Devis
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Commitment Banner */}
        <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-[28px] border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 text-[#005EA6] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Qualité & Finitions Garanties</h4>
                <p className="text-xs text-slate-600">
                  Matériaux certifiés, ponçage soigné et absence de bavures ou de raccords visibles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 text-[#005EA6] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Respect des Délais à Kinshasa</h4>
                <p className="text-xs text-slate-600">
                  Planning clair dès le début du chantier et reporting régulier d’avancement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 text-[#005EA6] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Interlocuteur Unique Dédié</h4>
                <p className="text-xs text-slate-600">
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
