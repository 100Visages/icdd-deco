import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, FileText, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
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
    <div id="contact-view-container" className="w-full h-full min-h-0 overflow-y-auto p-3.5 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 pb-28 sm:pb-20">
        
        {/* Simple & Elegant Header */}
        <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
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
              <span>Contact & Devis</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contactez ICDD
            </h2>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
              Vous avez un projet ? Parlez-nous de votre projet et obtenez un accompagnement adapté et sur mesure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openQuoteModal}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/20 border border-sky-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* 1. Phone */}
          <a
            href="tel:+243897504570"
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#005EA6] hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#005EA6] flex items-center justify-center border border-sky-100">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Téléphone</span>
                <span className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#005EA6] transition-colors">
                  +243 897504570
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Appel direct & conseils</span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href="https://wa.me/243897504570?text=Bonjour%20ICDD,%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20d%27am%C3%A9nagement."
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-emerald-500 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Direct</span>
                <span className="text-sm sm:text-base font-black text-emerald-600">
                  +243 897504570
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Réponse rapide & devis</span>
          </a>

          {/* 3. Email */}
          <a
            href="mailto:contact@icdd-design.com"
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#005EA6] hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#005EA6] flex items-center justify-center border border-sky-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Officiel</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                  contact@icdd-design.com
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Pour plans & dossiers</span>
          </a>

          {/* 4. Adresse */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#005EA6] flex items-center justify-center border border-sky-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Localisation</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                  Gombe, Kinshasa, RDC
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Intervention Kinshasa & environs</span>
          </div>

        </div>

        {/* Main Interactive Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Horaires & Engagement
              </h3>

              <div className="flex items-start gap-3.5 text-xs text-slate-700">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#005EA6] flex items-center justify-center flex-shrink-0 border border-sky-100">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold text-sm">Disponibilité :</strong>
                  <span>Du lundi au samedi : 08h00 – 18h00</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Visites techniques et métrés sur site à Kinshasa.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/60 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#005EA6] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-800 leading-relaxed">
                  <strong>Engagement ICDD :</strong> Devis clair, respect scrupuleux du cahier des charges et des délais annoncés.
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-gradient-to-br from-[#005EA6] to-[#0077c8] text-white shadow-lg space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-sky-200 block">
                Estimation Express
              </span>
              <h4 className="text-lg font-black">Besoin d’un chiffrage précis ?</h4>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                Utilisez notre outil d'estimation guidée pour configurer votre projet (surface, pièces, finitions et staff) en 2 minutes.
              </p>
              <button
                onClick={openQuoteModal}
                className="w-full mt-2 py-3 rounded-full bg-white text-[#005EA6] font-black text-xs uppercase tracking-wider hover:bg-sky-50 transition-all cursor-pointer shadow-md"
              >
                Lancer le simulateur de devis
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form (3 cols) */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-[28px] border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Envoyez-nous un message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Nos architectes d’intérieur vous répondront sous 24 heures.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">
                  Message bien reçu !
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Merci pour votre confiance. L'équipe ICDD étudie votre demande et vous recontacte très rapidement.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Votre Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Christian Mukendi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Numéro WhatsApp / Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+243 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Adresse Email (optionnel)
                    </label>
                    <input
                      type="email"
                      placeholder="exemple@domaine.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Sujet de votre demande
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white"
                    >
                      <option value="Aménagement d'appartement complet">Aménagement d'appartement complet</option>
                      <option value="Décoration & finitions murales">Décoration & finitions murales</option>
                      <option value="Staff, plafonds & gorges LED">Staff, plafonds & gorges LED</option>
                      <option value="Achat de matériaux (Shop ICDD)">Achat de matériaux (Shop ICDD)</option>
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Votre Message ou Détails de votre projet *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Décrivez votre projet (lieu à Kinshasa, superficie approximative, style souhaité)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00D7FF] focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
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
