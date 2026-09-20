import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, FileText, Loader2, MessageCircle, ShieldCheck, UserCheck, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface ContactViewProps {
  openQuoteModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ openQuoteModal }) => {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    subject: 'Architecture intérieure & Décoration',
    message: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const messageId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const msgDocRef = doc(db, 'messages', messageId);

    try {
      await setDoc(msgDocRef, {
        userId: user ? user.uid : 'guest',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        status: 'unread',
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error saving contact message:', err);
      setErrorMessage("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ou nous contacter au +243 897504570.");
      handleFirestoreError(err, OperationType.WRITE, `messages/${messageId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-view-container" className="w-full h-full min-h-0 overflow-y-auto pt-20 sm:pt-24 md:pt-28 px-3.5 sm:px-6 md:px-8 lg:px-10 pb-6 custom-scrollbar">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto space-y-8 sm:space-y-10 pb-28 sm:pb-20">
        
        {/* Simple & Elegant Header */}
        <div className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] border border-white/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-3xl">
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
              <span className="text-slate-200">Contact & Devis</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Contactez <span className="text-[#00D7FF]">ICDD</span>
            </h2>
            <p className="text-xs sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal">
              Vous avez un projet ? Parlez-nous de votre projet et obtenez un accompagnement adapté et sur mesure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={openQuoteModal}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/30 border border-sky-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          
          {/* 1. Phone */}
          <a
            href="tel:+243897504570"
            className="group bg-slate-900/90 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-white/20 shadow-xl hover:border-sky-400/50 hover:bg-slate-850 hover:scale-[1.02] transition-all flex flex-col justify-between text-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-[#00D7FF] flex items-center justify-center border border-sky-400/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Téléphone</span>
                <span className="text-sm sm:text-base font-black text-white group-hover:text-[#00D7FF] transition-colors">
                  +243 897504570
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-300 mt-2 font-medium">Appel direct & conseils</span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20d%27am%C3%A9nagement."
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/90 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-white/20 shadow-xl hover:border-emerald-400/50 hover:bg-slate-850 hover:scale-[1.02] transition-all flex flex-col justify-between text-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Direct</span>
                <span className="text-sm sm:text-base font-black text-emerald-400">
                  +243 897504570
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-300 mt-2 font-medium">Réponse rapide & devis</span>
          </a>

          {/* 3. Email */}
          <a
            href="mailto:contact@icdd-design.com"
            className="group bg-slate-900/90 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-white/20 shadow-xl hover:border-sky-400/50 hover:bg-slate-850 hover:scale-[1.02] transition-all flex flex-col justify-between text-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-[#00D7FF] flex items-center justify-center border border-sky-400/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Officiel</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">
                  contact@icdd-design.com
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-300 mt-2 font-medium">Pour plans & dossiers</span>
          </a>

          {/* 4. Adresse */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-white/20 shadow-xl flex flex-col justify-between text-white">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-[#00D7FF] flex items-center justify-center border border-sky-400/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Localisation</span>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  Gombe, Kinshasa, RDC
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-300 mt-2 font-medium">Intervention Kinshasa & environs</span>
          </div>

        </div>

        {/* Compact Team Section: C.E.O & Leaders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-[28px] border border-white/20 shadow-xl space-y-5 text-white"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#005EA6] to-[#00D7FF] p-[2px] shadow-sm flex-shrink-0">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-[#00D7FF]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  L'Équipe Dirigeante & Responsables ICDD
                </h3>
                <p className="text-xs text-slate-300 font-normal mt-0.5">
                  Des interlocuteurs dédiés pour la concrétisation et l'excellence de vos projets.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-xs font-semibold text-slate-300 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#00D7FF]" />
              <span>Direction Kinshasa</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. C.E.O */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/15 hover:border-sky-400/40 transition-colors flex flex-col justify-between space-y-3 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-400/40 bg-white p-0.5 shadow-sm">
                    <img src={icddOfficialLogo} alt="Logo C.E.O ICDD" className="w-full h-full object-cover" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-sky-500/20 to-[#005EA6]/30 text-[#00D7FF] border border-sky-400/30">
                    Fondateur / C.E.O
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                    Direction Générale
                  </h4>
                  <span className="text-[11px] font-semibold text-[#00D7FF] block mt-0.5">
                    C.E.O & Vision Globale
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Supervision de l'excellence architecturale, signature des projets et engagements de qualité.
                </p>
              </div>

              <a
                href="https://wa.me/243897504570?text=Bonjour%20la%20Direction%20ICDD,%20je%20souhaite%20un%20%C3%A9change%20pour%20un%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 flex items-center justify-between text-[11px] font-semibold text-sky-300 hover:text-white transition-colors border-t border-white/10"
              >
                <span>Contacter la direction</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 2. Directeur Technique */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/15 hover:border-sky-400/40 transition-colors flex flex-col justify-between space-y-3 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-400/40 bg-white p-0.5 shadow-sm">
                    <img src={icddOfficialLogo} alt="Logo Direction Technique ICDD" className="w-full h-full object-cover" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/15">
                    Chantiers
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                    Direction Technique
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-300 block mt-0.5">
                    Supervision Staff & Travaux
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Coordination des maîtres staffeurs, enduiseurs et contrôle minutieux des finitions murales.
                </p>
              </div>

              <a
                href="tel:+243897504570"
                className="pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 hover:text-white transition-colors border-t border-white/10"
              >
                <span>Suivi technique</span>
                <Phone className="w-3 h-3 text-sky-400" />
              </a>
            </div>

            {/* 3. Architecte d'Intérieur */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/15 hover:border-sky-400/40 transition-colors flex flex-col justify-between space-y-3 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-400/40 bg-white p-0.5 shadow-sm">
                    <img src={icddOfficialLogo} alt="Logo Design 3D ICDD" className="w-full h-full object-cover" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/15">
                    Design & 3D
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                    Pôle Conception & 3D
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-300 block mt-0.5">
                    Architecture & Ambiance
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Plans d'agencement, perspectives photoréalistes 3D et harmonies de matières sur mesure.
                </p>
              </div>

              <a
                href="https://wa.me/243897504570?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20la%20conception%203D."
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 hover:text-white transition-colors border-t border-white/10"
              >
                <span>Demander un plan 3D</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 4. Conseil Clientèle & Métré */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/15 hover:border-sky-400/40 transition-colors flex flex-col justify-between space-y-3 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-400/40 bg-white p-0.5 shadow-sm">
                    <img src={icddOfficialLogo} alt="Logo Relations Clients ICDD" className="w-full h-full object-cover" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Conseil
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                    Relations Clients & Devis
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-300 block mt-0.5">
                    Accueil & Visites sur Site
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Prise de rendez-vous pour relevé métrique, calculs estimatifs et accompagnement dédié.
                </p>
              </div>

              <a
                href="tel:+243897504570"
                className="pt-2 flex items-center justify-between text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors border-t border-white/10"
              >
                <span>Prendre RDV métré</span>
                <Phone className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Interactive Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 lg:p-8 rounded-[28px] border border-white/20 shadow-xl space-y-5 text-white">
              <h3 className="text-base sm:text-lg font-bold text-white border-b border-white/15 pb-3">
                Horaires & Engagement
              </h3>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-[#00D7FF] flex items-center justify-center flex-shrink-0 border border-sky-400/30">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold text-sm">Disponibilité :</strong>
                  <span>Du lundi au samedi : 08h00 – 18h00</span>
                  <p className="text-xs text-slate-400 mt-0.5">Visites techniques et métrés sur site à Kinshasa.</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 flex items-start gap-3.5 text-white">
                <ShieldCheck className="w-5 h-5 text-[#00D7FF] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong className="text-white">Engagement ICDD :</strong> Devis clair, respect scrupuleux du cahier des charges et des délais annoncés.
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 rounded-[28px] bg-gradient-to-br from-[#005EA6] to-[#0077c8] text-white shadow-xl space-y-4 border border-sky-400/30">
              <span className="text-xs uppercase font-extrabold tracking-wider text-sky-200 block">
                Estimation Express
              </span>
              <h4 className="text-xl font-black">Besoin d’un chiffrage précis ?</h4>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Utilisez notre outil d'estimation guidée pour configurer votre projet (surface, pièces, finitions et staff) en 2 minutes.
              </p>
              <button
                onClick={openQuoteModal}
                className="w-full mt-2 py-3.5 rounded-full bg-white text-[#005EA6] font-black text-xs uppercase tracking-wider hover:bg-sky-50 transition-all cursor-pointer shadow-md"
              >
                Lancer le simulateur de devis
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-[28px] border border-white/20 shadow-xl text-white">
            <h3 className="text-lg font-black text-white mb-1">
              Envoyez-nous un message
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Nos architectes d’intérieur vous répondront sous 24 heures.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/40">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Message bien reçu !
                </h4>
                <p className="text-xs text-emerald-200 max-w-sm mx-auto">
                  Merci pour votre confiance. L'équipe ICDD étudie votre demande et vous recontacte très rapidement.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors cursor-pointer shadow-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 block">
                      Votre Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Christian Mukendi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 text-white text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 transition-colors placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 block">
                      Numéro WhatsApp / Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+243 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 text-white text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 transition-colors placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 block">
                      Adresse Email (optionnel)
                    </label>
                    <input
                      type="email"
                      placeholder="exemple@domaine.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 text-white text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 transition-colors placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 block">
                      Sujet de votre demande
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 text-white text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 transition-colors"
                    >
                      <option value="Aménagement d'appartement complet" className="bg-slate-900 text-white">Aménagement d'appartement complet</option>
                      <option value="Décoration & finitions murales" className="bg-slate-900 text-white">Décoration & finitions murales</option>
                      <option value="Staff, plafonds & gorges LED" className="bg-slate-900 text-white">Staff, plafonds & gorges LED</option>
                      <option value="Achat de matériaux (Shop ICDD)" className="bg-slate-900 text-white">Achat de matériaux (Shop ICDD)</option>
                      <option value="Autre demande" className="bg-slate-900 text-white">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 block">
                    Votre Message ou Détails de votre projet *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Décrivez votre projet (lieu à Kinshasa, superficie approximative, style souhaité)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 text-white text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:bg-slate-950 resize-none placeholder-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 border border-sky-400/40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer mon message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
