import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, Calendar, FileText, Loader2, AlertCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ICDD_OFFERS_CONFIG } from '../data/projects';

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
    subject: 'Décoration Top Modèle',
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
    <div className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 pb-28 sm:pb-20">
        
        {/* Header with Welcome Announcement */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 sm:p-10 rounded-[24px] sm:rounded-[36px] border border-white/80 dark:border-white/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-400/80 dark:bg-amber-500/20 text-slate-950 dark:text-amber-200 text-xs font-bold border border-amber-300 shadow-sm">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-950 border border-amber-500/50 shadow-sm flex-shrink-0 relative">
                <span className="text-[8px] text-amber-400 flex items-center justify-center h-full">IC</span>
                <img 
                  src="/icdd.jpeg" 
                  alt="Logo ICDD" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-sm leading-none">🦺✨</span>
              <span>Bonjour chers clients, bienvenue chez ICDD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              🎨 ICDD – Excellence en Décoration et Peinture Intérieure
            </h2>
            <p className="text-xs sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl leading-relaxed">
              Nous transformons vos espaces avec élégance, modernité et créativité grâce à des finitions professionnelles adaptées à votre style.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Calculer mon Devis Matériaux</span>
          </button>
        </div>

        {/* 💰 Nos Offres Section */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-5 sm:p-8 rounded-[28px] border border-white/80 dark:border-white/20 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>💰 Nos offres de décoration</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                ✨ Les prix varient selon la dimension de votre espace mural.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold w-fit">
              <Calendar className="w-3.5 h-3.5" />
              <span>Disponible du lundi au samedi</span>
            </div>
          </div>

          {/* 5 Offers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {Object.entries(ICDD_OFFERS_CONFIG).map(([title, item]) => (
              <div 
                key={title} 
                onClick={openQuoteModal}
                className="bg-white/90 dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all hover:scale-[1.02] cursor-pointer shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                    {title}
                  </div>
                  <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-1 mb-2">
                    {item.badge}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] font-bold text-amber-700 dark:text-amber-300 flex items-center justify-between">
                  <span>Sélectionner</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice Banner */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 p-4 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
              <strong>📝 Important :</strong> Les tarifs indiqués concernent uniquement les matériaux de décoration. La main-d'œuvre, les meubles et les accessoires ne sont pas inclus. Un devis détaillé sera établi selon les besoins de votre projet.
            </div>
          </div>
        </div>

        {/* Content Grid: Left Contact Info / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column (2 Cols): Official Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-[28px] border border-white/80 dark:border-white/20 shadow-lg space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                Coordonnées Officielles ICDD
              </h3>

              {/* Direct Phone / Call */}
              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold text-sm">Téléphone & Appel Direct :</strong>
                  <a href="tel:+243897504570" className="text-amber-600 dark:text-amber-400 font-black text-base hover:underline">
                    +243 897504570
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Appel direct pour prise en charge rapide de vos projets.</p>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold text-sm">Discuter sur WhatsApp :</strong>
                  <a 
                    href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20des%20informations%20sur%20vos%20offres%20de%20d%C3%A9coration%20et%20peinture%20int%C3%A9rieure."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Ouvrir WhatsApp (+243 897504570)</span>
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Envoyez les photos ou dimensions de vos murs en direct.</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold text-sm">Jours de Disponibilité :</strong>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Disponible du lundi au samedi</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">08:00 – 18:00 (Interventions et chantiers sur-mesure)</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold text-sm">Zone d'intervention :</strong>
                  <span>Kinshasa & environs (Gombe, Ngaliema, Limete, Bandalungwa...)</span>
                </div>
              </div>

            </div>

            {/* Quick Call Action Card */}
            <div className="bg-slate-900 text-white p-6 rounded-[28px] border border-white/20 shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Assistance Décoration</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">Lundi au Samedi</span>
              </div>
              <h4 className="text-lg font-bold">Un conseil sur vos peintures ?</h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Contactez nos artisans décorateurs par téléphone ou sur WhatsApp pour un échange direct et la programmation d'une visite de vos locaux.
              </p>
              <div className="pt-2 flex gap-2">
                <a
                  href="tel:+243897504570"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black text-center transition-all shadow-md"
                >
                  Appeler +243 897504570
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (3 Cols): Interactive Form */}
          <div className="lg:col-span-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 sm:p-8 rounded-[24px] sm:rounded-[36px] border border-white/80 dark:border-white/20 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Demander un Devis ou Poser une Question
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. / Mme"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Email de contact *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+243 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Offre ou Objet souhaité
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="Décoration simple (dès 250 $)">Décoration simple (dès 250 $)</option>
                      <option value="Décoration classique (dès 350 $)">Décoration classique (dès 350 $)</option>
                      <option value="Décoration luxueuse (dès 500 $)">Décoration luxueuse (dès 500 $)</option>
                      <option value="Décoration Gold (dès 700 $)">Décoration Gold (dès 700 $)</option>
                      <option value="Décoration Top Modèle (dès 800 $)">Décoration Top Modèle (dès 800 $)</option>
                      <option value="Autre demande / Visite sur site">Autre demande / Visite sur site</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Votre Message ou Description de vos murs *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Précisez la dimension approximative de vos murs, votre commune, le type de pièce (salon, chambre, bureau) et vos attentes particulières..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    * ICDD s'engage à vous répondre sous 24h.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer la Demande</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Message Envoyé avec Succès !
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Merci {formData.name}. L'équipe ICDD a bien reçu votre demande et vous contactera au {formData.phone || formData.email}.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                  >
                    Envoyer un autre message
                  </button>
                  <a
                    href="https://wa.me/243897504570"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Contacter sur WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
