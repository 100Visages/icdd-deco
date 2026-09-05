import React from 'react';
import { TEAM_MEMBERS } from '../data/projects';
import { Sparkles, Award, ShieldCheck, Compass, Users, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { NavTab } from '../types';

interface AgencyViewProps {
  openQuoteModal: () => void;
  setActiveTab: (tab: NavTab) => void;
}

export const AgencyView: React.FC<AgencyViewProps> = ({ openQuoteModal, setActiveTab }) => {
  const processSteps = [
    {
      step: '01',
      title: 'Consultation & Étude de Faisabilité',
      desc: 'Analyse approfondie de votre mode de vie, de la lumière naturelle et du potentiel architectural de votre lieu.'
    },
    {
      step: '02',
      title: 'Conception 3D & Matériauthèque',
      desc: 'Modélisation volumétrique photoréaliste et sélection rigoureuse d’échantillons physiques de marbres, bois et laitons.'
    },
    {
      step: '03',
      title: 'Gestion Administrative & Artisans',
      desc: 'Prise en charge complète des autorisations de copropriété, permis et coordination des meilleurs maîtres artisans.'
    },
    {
      step: '04',
      title: 'Suivi de Chantier Clef en Main',
      desc: 'Supervision hebdomadaire rigoureuse jusqu’à la livraison finale avec installation du mobilier et scénographie lumineuse.'
    }
  ];

  return (
    <div className="w-full h-full min-h-0 overflow-y-auto p-4 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12 pb-16">
        
        {/* Hero Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[36px] border border-white/80 dark:border-white/20 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>L’Agence ICDD Design</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            L'Élégance Architecturale au Service du Mode de Vie
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-normal leading-relaxed max-w-3xl">
            Fondé à Paris, le cabinet <strong className="text-slate-900 dark:text-white">ICDD (Interior Concept & Design Direction)</strong> façonne des espaces de vie d’exception où chaque détail est pensé comme une œuvre sur-mesure. Nous marions la rigueur de l’architecture d’intérieur à la sensualité des matériaux nobles.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">100+</span>
              <span className="text-xs text-slate-500 font-medium">Projets D’exception Livrés</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">20 Ans</span>
              <span className="text-xs text-slate-500 font-medium">D’Excellence à Paris & Int.</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">100%</span>
              <span className="text-xs text-slate-500 font-medium">Menuiserie & Mobilier Sur-Mesure</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">1 Chantier</span>
              <span className="text-xs text-slate-500 font-medium">1 Interlocuteur Dédié</span>
            </div>
          </div>
        </div>

        {/* Methodology Process Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Notre Méthodologie en 4 Étapes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Un processus structuré garantissant sérénité, respect des délais et maîtrise budgétaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-[28px] border border-white/80 dark:border-white/20 shadow-lg space-y-3 relative overflow-hidden"
              >
                <span className="text-4xl font-black text-amber-500/20 dark:text-amber-400/20 absolute top-4 right-6 pointer-events-none">
                  {item.step}
                </span>
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                L'Équipe des Architectes & Designers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Des passionnés d'architecture, d'ébénisterie et de scénographie lumineuse.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/80 dark:border-white/20 shadow-lg space-y-4 flex flex-col items-center text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h4>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action Banner */}
        <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Prêt à concrétiser votre vision ?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Discutons de votre futur projet d’intérieur
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Prenez rendez-vous directement pour un premier échange en agence à Paris ou en visioconférence.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>Prendre RDV en Agence</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
