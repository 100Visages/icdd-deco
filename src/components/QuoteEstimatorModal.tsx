import React, { useState, useEffect } from 'react';
import { X, Check, Calculator, Sparkles, Send, Calendar, CheckCircle2, Building, Home, Store, Layers, Loader2, AlertCircle } from 'lucide-react';
import { QuoteFormData, Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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

  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    propertyType: 'Appartement',
    surfaceArea: preselectedProject ? preselectedProject.area : 120,
    projectScope: 'Rénovation Complète',
    preferredStyle: preselectedProject ? preselectedProject.style : 'Minimaliste',
    materials: ['Chêne massif', 'Marbre de Carrare'],
    estimatedBudgetMin: 120000,
    estimatedBudgetMax: 210000,
    clientName: user?.displayName || '',
    clientEmail: user?.email || '',
    clientPhone: '',
    clientMessage: preselectedProject ? `Je souhaite un projet similaire à "${preselectedProject.title}".` : '',
  });

  const [submitted, setSubmitted] = useState(false);

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

  // Material options
  const materialOptions = [
    'Chêne massif blanchi',
    'Marbre de Carrare',
    'Travertin italien',
    'Laiton brossé',
    'Béton ciré',
    'Velours de soie',
    'Noyer d’Amérique',
    'Verre électrochrome'
  ];

  const handleMaterialToggle = (mat: string) => {
    setFormData(prev => {
      const exists = prev.materials.includes(mat);
      const updated = exists ? prev.materials.filter(m => m !== mat) : [...prev.materials, mat];
      return { ...prev, materials: updated };
    });
  };

  // Recalculate estimated budget
  const calculateEstimate = (area: number, scope: string) => {
    let pricePerM2Base = 1200;
    if (scope === 'Rénovation Complète') pricePerM2Base = 1800;
    if (scope === 'Design & Furnishing') pricePerM2Base = 1000;
    if (scope === 'Aménagement de Pièce') pricePerM2Base = 800;
    if (scope === 'Consultation 3D') pricePerM2Base = 350;

    const min = Math.round(area * pricePerM2Base);
    const max = Math.round(area * (pricePerM2Base * 1.5));
    return { min, max };
  };

  const handleAreaChange = (val: number) => {
    const { min, max } = calculateEstimate(val, formData.projectScope);
    setFormData(prev => ({
      ...prev,
      surfaceArea: val,
      estimatedBudgetMin: min,
      estimatedBudgetMax: max
    }));
  };

  const handleScopeChange = (scope: QuoteFormData['projectScope']) => {
    const { min, max } = calculateEstimate(formData.surfaceArea, scope);
    setFormData(prev => ({
      ...prev,
      projectScope: scope,
      estimatedBudgetMin: min,
      estimatedBudgetMax: max
    }));
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
        clientPhone: formData.clientPhone?.trim() || '',
        clientMessage: formData.clientMessage?.trim() || '',
        propertyType: formData.propertyType,
        surfaceArea: Number(formData.surfaceArea),
        projectScope: formData.projectScope,
        preferredStyle: formData.preferredStyle || 'Minimaliste',
        materials: formData.materials || [],
        estimatedBudgetMin: Number(formData.estimatedBudgetMin),
        estimatedBudgetMax: Number(formData.estimatedBudgetMax),
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setSubmitError("Une erreur est survenue lors de l'enregistrement de votre devis sur Firestore. Veuillez réessayer.");
      handleFirestoreError(err, OperationType.WRITE, `quotes/${quoteDocId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Glass Panel */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[36px] border border-white/80 dark:border-white/20 shadow-2xl overflow-y-auto custom-scrollbar p-6 sm:p-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Modal Header */}
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200">
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                <span>Estimateur de Devis Sur-Mesure</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Estimation de votre Projet D’Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Calculez un budget estimatif personnalisé pour vos travaux et réservez votre consultation en agence.
              </p>
            </div>

            {/* Step Progress Pills */}
            <div className="flex items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  step === 1
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                1. Caractéristiques du bien
              </button>
              <button
                onClick={() => setStep(2)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  step === 2
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                2. Style & Matériaux
              </button>
              <button
                onClick={() => setStep(3)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  step === 3
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                3. Consultation & Validation
              </button>
            </div>

            {/* STEP 1: Surface area & property type */}
            {step === 1 && (
              <div className="space-y-6">
                
                {/* Property Type Picker */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Type de Bien Immobilier
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(['Appartement', 'Maison / Villa', 'Espace Commercial', 'Penthouse'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                        className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                          formData.propertyType === type
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-extrabold'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {type === 'Appartement' && <Building className="w-5 h-5" />}
                        {type === 'Maison / Villa' && <Home className="w-5 h-5" />}
                        {type === 'Espace Commercial' && <Store className="w-5 h-5" />}
                        {type === 'Penthouse' && <Layers className="w-5 h-5" />}
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surface Area Slider */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">
                      Superficie Totale à Aménager
                    </label>
                    <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                      {formData.surfaceArea} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="5"
                    value={formData.surfaceArea}
                    onChange={(e) => handleAreaChange(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>30 m²</span>
                    <span>180 m² (Standard Villa)</span>
                    <span>500 m²</span>
                  </div>
                </div>

                {/* Project Scope */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Nature des Travaux
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(['Rénovation Complète', 'Design & Furnishing', 'Aménagement de Pièce', 'Consultation 3D'] as const).map(scope => (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => handleScopeChange(scope)}
                        className={`p-4 rounded-2xl text-xs font-bold text-left border transition-all cursor-pointer flex items-center justify-between ${
                          formData.projectScope === scope
                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{scope}</span>
                        {formData.projectScope === scope && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Estimate Card */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">
                      Fourchette Budgétaire Estimée
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {formData.estimatedBudgetMin.toLocaleString('fr-FR')} € – {formData.estimatedBudgetMax.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    Suivant &rarr;
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: Style & Materials */}
            {step === 2 && (
              <div className="space-y-6">
                
                {/* Style Choice */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Style Architectural Souhaité
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(['Minimaliste', 'Contemporain', 'Haussmannien', 'Japandi'] as const).map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferredStyle: st }))}
                        className={`p-3.5 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          formData.preferredStyle === st
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-extrabold'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Noble Materials Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Matériaux de Prédilection (Plusieurs Choix Possibles)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {materialOptions.map(mat => {
                      const isSelected = formData.materials.includes(mat);
                      return (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => handleMaterialToggle(mat)}
                          className={`p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span className="truncate">{mat}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900"
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
                      placeholder="ex: Jean Dupont"
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
                      placeholder="ex: jean.dupont@email.com"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="ex: 06 12 34 56 78"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Date de Rendez-vous Souhaitée
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
                    Détails ou précisions sur votre projet
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Parlez-nous de vos attentes, vos délais ou vos contraintes spécifiques..."
                    value={formData.clientMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientMessage: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Recap Badge */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <span className="font-bold block text-slate-900 dark:text-white">Récapitulatif de votre demande :</span>
                  <p>{formData.propertyType} de {formData.surfaceArea}m² ({formData.projectScope}) • Style {formData.preferredStyle}</p>
                  <p className="text-amber-600 dark:text-amber-400 font-extrabold">
                    Budget estimé : {formData.estimatedBudgetMin.toLocaleString('fr-FR')} € – {formData.estimatedBudgetMax.toLocaleString('fr-FR')} €
                  </p>
                </div>

                {/* Submit Error Alert if any */}
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-50"
                  >
                    &larr; Retour
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer & Réserver Consultation</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-12 space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Votre Demande a été Transmise à ICDD !
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Un architecte d'intérieur référent d'ICDD étudie votre estimation et vous recontactera sous 24h pour confirmer votre consultation.
            </p>
            <div className="pt-6">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 transition-colors cursor-pointer"
              >
                Fermer la fenêtre
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
