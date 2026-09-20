import React from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '../data/projects';
import { Sparkles, Award, ShieldCheck, Compass, Users, CheckCircle2, ArrowUpRight, Phone, MessageCircle, Clock } from 'lucide-react';
import { NavTab } from '../types';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface AgencyViewProps {
  openQuoteModal: () => void;
  setActiveTab: (tab: NavTab) => void;
}

export const AgencyView: React.FC<AgencyViewProps> = ({ openQuoteModal, setActiveTab }) => {
  const processSteps = [
    {
      step: '01',
      title: 'Diagnostic de votre Espace Mural',
      desc: 'Analyse de vos murs, prise des dimensions précises et évaluation du style architectural de votre intérieur.'
    },
    {
      step: '02',
      title: 'Sélection de l’Offre & Matériaux',
      desc: 'Choix entre Décoration simple, classique, luxueuse, Gold ou Top Modèle selon vos goûts et votre budget.'
    },
    {
      step: '03',
      title: 'Finitions Professionnelles & Application',
      desc: 'Mise en œuvre par nos peintres et décorateurs qualifiés : enduits soignés, stuc, effets 3D et patines raffinées.'
    },
    {
      step: '04',
      title: 'Contrôle Qualité & Livraison',
      desc: 'Nettoyage minutieux du chantier et remise d’un espace transformé avec modernité, élégance et garantie.'
    }
  ];

  return (
    <div className="w-full h-full min-h-0 overflow-y-auto p-3 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 pb-28 sm:pb-20">
        
        {/* Hero Section */}
        <div className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] border border-white/20 shadow-2xl space-y-4 sm:space-y-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 text-[#00D7FF] text-xs font-bold border border-white/20 shadow-sm w-fit">
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
              <span className="text-slate-200">Excellence en Décoration & Architecture</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            ICDD – Le bien-être de tous, pour construire un monde meilleur
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed max-w-3xl">
            Nous transformons vos espaces avec <strong>élégance, modernité et créativité</strong> grâce à des finitions professionnelles adaptées à votre style. Que vous souhaitiez un rafraîchissement épuré ou une décoration prestigieuse, nous matérialisons votre vision murale et architecturale.
          </p>

          {/* Quick Contact & Availability */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 text-slate-200 text-xs font-medium border border-white/15">
              <Clock className="w-3.5 h-3.5 text-[#00D7FF]" />
              <span>Disponible du lundi au samedi</span>
            </div>
            <a
              href="tel:+243897504570"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact : +243 897504570</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-white/15">
            <div>
              <span className="text-xl sm:text-3xl font-black text-white block">5 Domaines</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">De l'étude à la pose</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-[#00D7FF] block">Kinshasa</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Interventions sur mesure</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-white block">100%</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Finitions Professionnelles</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-white block">Garantie</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Engagement qualité</span>
            </div>
          </div>
        </div>

        {/* Methodology Process Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto px-2">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Notre Démarche en 4 Étapes Clés
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-2">
              Une méthode rigoureuse pour vous assurer un résultat impeccable, durable et conforme à vos envies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] border border-white/20 hover:border-sky-400/50 shadow-xl space-y-2.5 relative overflow-hidden text-white group"
              >
                <span className="text-3xl sm:text-4xl font-black text-white/10 absolute top-4 right-5 pointer-events-none">
                  {item.step}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#005EA6] text-white font-bold text-xs flex items-center justify-center border border-sky-400/30">
                  {item.step}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#00D7FF] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="space-y-6">
          <div className="px-2 text-center md:text-left">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Les Artisans & Experts Décorateurs ICDD
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Des maîtres peintres, enduiseurs et créateurs d'ambiances passionnés par la perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                whileHover={{ y: -5 }}
                className="bg-slate-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-[28px] border border-white/20 hover:border-sky-400/50 shadow-xl space-y-3 flex flex-col items-center text-center text-white"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-sky-400/40 shadow-md relative bg-slate-950 flex-shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover scale-[1.32]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {member.name}
                  </h4>
                  <span className="text-xs font-bold text-[#00D7FF] block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call To Action Banner with WhatsApp & Call */}
        <div className="bg-slate-900/90 backdrop-blur-2xl text-white p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D7FF]">
              Disponible du lundi au samedi
            </span>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Prêt à métamorphoser vos murs ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-normal">
              Contactez-nous directement au <strong>+243 897504570</strong> ou calculez votre devis estimatif en quelques clics.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20des%20renseignements%20pour%20la%20d%C3%A9coration%20de%20mes%20murs."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#005EA6]/30 border border-sky-400/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculer un Devis</span>
              <ArrowUpRight className="w-4 h-4 text-sky-200" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
