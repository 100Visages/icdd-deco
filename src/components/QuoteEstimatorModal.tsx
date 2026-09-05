import React, { useState, useEffect } from 'react';
import { X, Check, Calculator, Sparkles, Send, Calendar, CheckCircle2, ShieldCheck, Loader2, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { QuoteFormData, Project, DecorOffer } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ICDD_OFFERS_CONFIG } from '../data/projects';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: Project | null;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  preselectedProject,
}) => {
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialOffer: DecorOffer = (preselectedProject?.category as DecorOffer) || 'Décoration Top Modèle';

  const [formData, setFormData] = useState<QuoteFormData>({
    selectedOffer: initialOffer,
    wallArea: preselectedProject ? preselectedProject.area : 50,
    roomType: 'Salon',
    preferredFinish: 'Finitions professionnelles adaptées au style',
    materialsIncluded: ['Matériaux de décoration sélectionnés', 'Enduits haute résistance'],
    estimatedBudgetMin: 800,
    estimatedBudgetMax: 1050,
    clientName: user?.displayName || '',
    clientEmail: user?.email || '',
    clientPhone: '+243 ',
    clientMessage: preselectedProject ? `Je souhaite un projet similaire à "${preselectedProject.title}".` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Recalculate estimated materials budget in $ based on offer & wall dimension
  const calculateEstimate = (offer: DecorOffer, area: number) => {
    const conf = ICDD_OFFERS_CONFIG[offer];
    const ratio = Math.max(1, area / conf.minWallM2);
    const min = Math.round(conf.basePrice * ratio);
    const max = Math.round(min * 1.3);
    return { min, max };
  };

  // Pre-fill user data when user logs in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        clientName: prev.clientName || user.displayName || '',
        clientEmail: prev.clientEmail || user.email || '',
      }));
    }
  }, [user]);

  // Reset or sync when modal opens or preselectedProject changes
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSubmitError(null);
      setStep(1);
      const offer: DecorOffer = (preselectedProject?.category as DecorOffer) || 'Décoration Top Modèle';
      const area = preselectedProject ? preselectedProject.area : 50;
      const { min, max } = calculateEstimate(offer, area);
      setFormData(prev => ({
        ...prev,
        selectedOffer: offer,
        wallArea: area,
        estimatedBudgetMin: min,
        estimatedBudgetMax: max,
        clientMessage: preselectedProject ? `Intéressé par l'offre ${offer} (inspiré de ${preselectedProject.title}).` : '',
      }));
    }
  }, [isOpen, preselectedProject]);

  const handleOfferChange = (offer: DecorOffer) => {
    const { min, max } = calculateEstimate(offer, formData.wallArea);
    setFormData(prev => ({
      ...prev,
      selectedOffer: offer,
      estimatedBudgetMin: min,
      estimatedBudgetMax: max,
    }));
  };

  const handleAreaChange = (val: number) => {
    const { min, max } = calculateEstimate(formData.selectedOffer, val);
    setFormData(prev => ({
      ...prev,
      wallArea: val,
      estimatedBudgetMin: min,
      estimatedBudgetMax: max,
    }));
  };

  const finishOptions = [
    'Peinture mate poudrée haute résistance',
    'Finition veloutée soyeuse sans traces',
    'Enduit stuc effet marbré vénitien',
    'Patine nacrée & touches dorées Gold',
    'Fresque murale artistique 3D & reliefs',
    'Baguettes & moulures décoratives peintes',
  ];

  const handleFinishToggle = (finish: string) => {
    setFormData(prev => {
      const exists = prev.materialsIncluded.includes(finish);
      const updated = exists 
        ? prev.materialsIncluded.filter(m => m !== finish) 
        : [...prev.materialsIncluded, finish];
      return { ...prev, materialsIncluded: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const quoteDocId = 'q_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const quoteDocRef = doc(db, 'quotes', quoteDocId);

    try {
      await setDoc(quoteDocRef, {
        userId: user ? user.uid : 'guest',
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim(),
        clientPhone: formData.clientPhone.trim(),
        clientMessage: formData.clientMessage?.trim() || '',
        selectedOffer: formData.selectedOffer,
        wallArea: Number(formData.wallArea),
        roomType: formData.roomType,
        materialsIncluded: formData.materialsIncluded || [],
        estimatedBudgetMin: Number(formData.estimatedBudgetMin),
        estimatedBudgetMax: Number(formData.estimatedBudgetMax),
        currency: 'USD ($)',
        laborIncluded: false, // Explicitly marked as per user mandate
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setSubmitError("Une erreur est survenue lors de l'enregistrement de votre devis. Vous pouvez nous contacter directement au +243 897504570.");
      handleFirestoreError(err, OperationType.WRITE, `quotes/${quoteDocId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour ICDD 🦺✨\nJe souhaite obtenir un devis pour mes murs :\n` +
      `- Offre : ${formData.selectedOffer}\n` +
      `- Dimension murale estimée : ${formData.wallArea} m²\n` +
      `- Espace : ${formData.roomType}\n` +
      `- Estimation matériaux : ${formData.estimatedBudgetMin} $ - ${formData.estimatedBudgetMax} $\n` +
      `- Nom : ${formData.clientName}\n` +
      `- Message : ${formData.clientMessage || 'Merci de me contacter pour convenir d’un devis détaillé.'}`
    );
    window.open(`https://wa.me/243897504570?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Glass Panel */}
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[24px] sm:rounded-[36px] border border-white/80 dark:border-white/20 shadow-2xl overflow-y-auto custom-scrollbar p-5 sm:p-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Modal Header with ICDD Identity */}
            <div className="mb-5 sm:mb-6 space-y-1.5 sm:space-y-2 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/30 text-amber-950 dark:text-amber-300 text-xs font-bold border border-amber-300">
                <Calculator className="w-3.5 h-3.5 text-amber-600" />
                <span>ICDD • Estimateur de Matériaux de Décoration</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Estimer vos Travaux de Décoration & Peinture
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Sélectionnez votre offre et ajustez la dimension de votre espace mural pour une estimation instantanée.
              </p>
            </div>

            {/* Step Progress Pills */}
            <div className="flex items-center gap-2 mb-5 sm:mb-7 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setStep(1)}
                className={`whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  step === 1
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                1. Offre & Surface Murale
              </button>
              <button
                onClick={() => setStep(2)}
                className={`whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  step === 2
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                2. Finitions & Pièce
              </button>
              <button
                onClick={() => setStep(3)}
                className={`whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  step === 3
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                3. Coordonnées & Envoi
              </button>
            </div>

            {/* STEP 1: Offer selection & wall area slider */}
            {step === 1 && (
              <div className="space-y-6">
                
                {/* 5 Real ICDD Offers Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    💰 Choisissez votre Offre ICDD
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {(Object.keys(ICDD_OFFERS_CONFIG) as DecorOffer[]).map(offer => {
                      const item = ICDD_OFFERS_CONFIG[offer];
                      const isSelected = formData.selectedOffer === offer;
                      return (
                        <button
                          key={offer}
                          type="button"
                          onClick={() => handleOfferChange(offer)}
                          className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                              : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black">{offer}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                            </div>
                            <div className={`text-sm font-black mt-1 ${isSelected ? 'text-amber-400' : 'text-amber-600 dark:text-amber-400'}`}>
                              {item.badge}
                            </div>
                          </div>
                          <p className={`text-[10px] mt-1.5 leading-snug line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Wall Area Slider */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-xs font-bold text-slate-900 dark:text-white block">
                        ✨ Dimension de votre espace mural
                      </label>
                      <span className="text-[11px] text-slate-500">Surface totale des murs à peindre / décorer</span>
                    </div>
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                      {formData.wallArea} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="250"
                    step="5"
                    value={formData.wallArea}
                    onChange={(e) => handleAreaChange(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>15 m² (Petite chambre)</span>
                    <span>60 m² (Grand Salon)</span>
                    <span>250 m² (Villa complète)</span>
                  </div>
                </div>

                {/* Live Estimate Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">
                      Fourchette Estimative des Matériaux
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      {formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      (Pour {formData.wallArea} m² de murs en {formData.selectedOffer})
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer text-center"
                  >
                    Étape suivante &rarr;
                  </button>
                </div>

                {/* Official Disclaimer Note */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300/60 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200">
                  <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>📝 Important :</strong> Les tarifs indiqués concernent uniquement les matériaux de décoration. La main-d'œuvre, les meubles et les accessoires ne sont pas inclus. Un devis détaillé sera établi selon les besoins de votre projet.
                  </span>
                </div>

              </div>
            )}

            {/* STEP 2: Room Type & Desired Finishes */}
            {step === 2 && (
              <div className="space-y-6">
                
                {/* Room Type */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Type de Pièce à Décorer
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {(['Salon', 'Chambre', 'Bureau', 'Appartement complet', 'Espace Commercial'] as const).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, roomType: r }))}
                        className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          formData.roomType === r
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-extrabold'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decorative Finishes Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Finitions et effets décoratifs souhaités
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {finishOptions.map(finish => {
                      const isSelected = formData.materialsIncluded.includes(finish);
                      return (
                        <button
                          key={finish}
                          type="button"
                          onClick={() => handleFinishToggle(finish)}
                          className={`p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span className="truncate">{finish}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    &larr; Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    Suivant (Vos coordonnées) &rarr;
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Contact details & booking */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. / Mme"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@exemple.com"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Téléphone (ex: +243 ...) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+243 ..."
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Disponibilité souhaitée (Lundi au Samedi)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Précisions sur vos murs (commune, état actuel des murs...)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Murs du salon avec quelques trous à reboucher, nous sommes à Gombe..."
                    value={formData.clientMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientMessage: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Recap Box */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <span className="font-bold block text-slate-900 dark:text-white">Récapitulatif de l'estimation :</span>
                  <p><strong>{formData.selectedOffer}</strong> pour {formData.wallArea} m² de surface murale ({formData.roomType})</p>
                  <p className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                    Matériaux estimés : {formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $
                  </p>
                  <p className="text-[10px] text-slate-500">
                    * Hors main-d'œuvre et accessoires. Devis final détaillé convenu avec vous.
                  </p>
                </div>

                {/* Submit Error Alert if any */}
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-50"
                  >
                    &larr; Retour
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={sendDirectWhatsApp}
                      className="flex-1 sm:flex-none px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Valider & Envoyer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            )}
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-10 space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Demande Reçue avec Succès par ICDD !
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Merci {formData.clientName}. Notre équipe étudie les dimensions de vos murs ({formData.wallArea} m²) et vous contactera au {formData.clientPhone} du lundi au samedi.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="tel:+243897504570"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Appeler le +243 897504570</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-600 transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
