import React, { useState } from 'react';
import { ICDD_SERVICES } from '../data/services';
import { ServiceItem, RealisationCategory } from '../types';
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
  MessageCircle
} from 'lucide-react';

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

  return (
    <div id="services-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-6 sm:space-y-10 pb-28 sm:pb-20">

        {/* Hero Banner Services - Minimalist & Épuré */}
        <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#005EA6] text-xs font-semibold border border-sky-200/80">
              <Sparkles className="w-3.5 h-3.5 text-[#005EA6]" />
              <span>Nos Domaines d'Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-slate-900">
              Ce que ICDD réalise <span className="font-semibold text-slate-900">pour vos espaces</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Architecture intérieure, staffage d'art, cuisines sur mesure et décoration haut de gamme à Kinshasa.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white font-medium text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white/80" />
            <span>Demander un devis</span>
          </button>
        </div>

        {/* 6 Services Grid - Photo-First with Compact 'Voir le détail' on Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {ICDD_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            const isExpanded = !!expandedServices[service.id];

            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Header (Photo with Overlay Controls) */}
                <div 
                  onClick={() => toggleService(service.id)}
                  className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer select-none"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider text-slate-800 border border-white/60 shadow-xs">
                      {service.tag}
                    </span>

                    <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-xs">
                      <IconComponent className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Bottom on Photo: Title & Compact "Voir le détail" Button */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div className="text-white space-y-0.5 pr-2 pointer-events-none">
                      <span className="text-[10px] text-sky-300 font-normal uppercase tracking-widest block">
                        Service 0{index + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-normal tracking-tight line-clamp-1 drop-shadow-xs">
                        {service.title}
                      </h3>
                    </div>

                    {/* Small Button directly on photo */}
                    <button
                      type="button"
                      onClick={(e) => toggleService(service.id, e)}
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

                {/* Body Content - Short preview on mobile unless expanded */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Short description always visible */}
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Expandable Technical Details (Collapsible on mobile) */}
                  {isExpanded && (
                    <div className="space-y-3.5 pt-3 border-t border-slate-100 text-xs animate-in fade-in duration-200">
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        {service.fullDesc}
                      </p>

                      {/* Points Checklist */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] uppercase font-medium tracking-wider text-slate-400 block">
                          Ce que comprend la prestation :
                        </span>
                        <ul className="space-y-1">
                          {service.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="font-light">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleServiceExplore(service)}
                      className="inline-flex items-center gap-1 text-xs font-normal text-[#005EA6] hover:underline cursor-pointer"
                    >
                      <span>Voir les projets</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={openQuoteModal}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-normal transition-all border border-slate-200 cursor-pointer shadow-2xs"
                    >
                      Devis gratuit
                    </button>
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
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 text-[#005EA6] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
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
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 text-[#005EA6] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
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
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 text-[#005EA6] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
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
