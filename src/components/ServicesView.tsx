import React from 'react';
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
  Calendar
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
    <div id="services-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-6 md:p-8 lg:p-10 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-8 sm:space-y-12 pb-28 sm:pb-20">

        {/* Hero Banner Services */}
        <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#005EA6] text-xs font-bold border border-sky-200/80">
              <Sparkles className="w-3.5 h-3.5 text-[#005EA6]" />
              <span>Nos Domaines d'Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Ce que ICDD réalise pour vos espaces
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
              De l'idée originelle aux finitions les plus subtiles, notre agence réunit sous un même toit les corps d'état de l'architecture intérieure, du staffage d'art et de la décoration haut de gamme à Kinshasa.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="px-7 py-4 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/25 border border-sky-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2 mx-auto md:mx-0 flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-sky-200" />
            <span>Demander un devis</span>
          </button>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {ICDD_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-[28px] border border-slate-200/80 shadow-sm hover:shadow-xl hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/projects/real_project_1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                  {/* Tag badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#005EA6] border border-slate-100 shadow-sm">
                    {service.tag}
                  </div>

                  {/* Icon badge */}
                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 text-[#005EA6] backdrop-blur-md border border-slate-200/80 flex items-center justify-center shadow-md">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <span className="text-[10px] text-sky-300 font-black uppercase tracking-widest block">
                      Service 0{index + 1}
                    </span>
                    <h3 className="text-lg font-black tracking-tight drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Points Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Ce que comprend la prestation :
                    </span>
                    <ul className="space-y-1.5">
                      {service.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleServiceExplore(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005EA6] hover:underline cursor-pointer"
                    >
                      <span>Voir les projets</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={openQuoteModal}
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#005EA6] hover:text-white text-slate-800 text-xs font-bold transition-all border border-slate-200 cursor-pointer shadow-sm"
                    >
                      Demander un devis
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
