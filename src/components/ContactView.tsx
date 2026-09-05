import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, Calendar, FileText } from 'lucide-react';

interface ContactViewProps {
  openQuoteModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ openQuoteModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Projet d’Architecture d’Intérieur',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-8 md:p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12 pb-16">
        
        {/* Header */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[36px] border border-white/80 dark:border-white/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Contact & Consultation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Prendre Contact avec ICDD
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg">
              Nos équipes d'architectes et designers vous accueillent dans nos salons parisiens pour concevoir votre projet d'intérieur.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Calculer mon Devis en Ligne</span>
          </button>
        </div>

        {/* Content Grid: Left Contact Info / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column (2 Cols): Contact Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-[28px] border border-white/80 dark:border-white/20 shadow-lg space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                Coordonnées de l'Agence
              </h3>

              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold">Adresse du Showroom :</strong>
                  <span>48 Rue du Faubourg Saint-Honoré, 75008 Paris</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold">Téléphone :</strong>
                  <span>+33 (0)1 42 68 55 00</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold">Email Direct :</strong>
                  <span>contact@icdd-architecture.fr</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold">Horaires d’Ouverture :</strong>
                  <span>Lundi – Vendredi : 09:00 – 19:00<br />Samedi : Sur Rendez-vous uniquement</span>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="bg-slate-900 text-white p-6 rounded-[28px] border border-white/20 shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Paris 8ème</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Métro Concorde / Madeleine</span>
              </div>
              <h4 className="text-base font-bold">Rendez-vous confidentiel</h4>
              <p className="text-xs text-slate-300 font-normal">
                Stationnement privé réservé à nos clients sur demande lors de la confirmation de votre rendez-vous.
              </p>
            </div>

          </div>

          {/* Right Column (3 Cols): Interactive Form */}
          <div className="lg:col-span-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 rounded-[36px] border border-white/80 dark:border-white/20 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Envoyer un message à nos architectes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. / Mme Dupont"
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
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="06 00 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Objet de la demande
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="Projet d’Architecture d’Intérieur">Projet d’Architecture d’Intérieur</option>
                      <option value="Rénovation Haussmannienne">Rénovation Haussmannienne</option>
                      <option value="Espace Commercial / Showroom">Espace Commercial / Showroom</option>
                      <option value="Demande de Presse / Partenariat">Demande de Presse / Partenariat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Votre Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Décrivez votre projet (adresse du bien, superficie, style souhaité, calendrier...)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer le Message</span>
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
                  Merci {formData.name}. L'équipe d'ICDD reviendra vers vous à l'adresse {formData.email} dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                >
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
