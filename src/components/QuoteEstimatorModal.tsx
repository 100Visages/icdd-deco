import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Send, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  AlertCircle, 
  Phone, 
  MessageCircle,
  Home,
  Briefcase,
  Building2,
  Store,
  Compass,
  Ruler,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Info,
  Zap
} from 'lucide-react';
import { QuoteFormData, Project, DecorOffer } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ICDD_OFFERS_CONFIG, ICDD_PROJECTS } from '../data/projects';
import icddOfficialLogo from '../assets/images/icdd.jpeg';
import { buildQuoteWhatsAppMessage, openWhatsAppChat } from '../utils/whatsapp';

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
  const [quoteReference, setQuoteReference] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('Gombe');
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const initialOffer: DecorOffer = (preselectedProject?.category as DecorOffer) || 'Décoration Top Modèle';

  const [formData, setFormData] = useState<QuoteFormData>({
    selectedOffer: initialOffer,
    wallArea: preselectedProject ? preselectedProject.area : 50,
    roomType: 'Salon',
    preferredFinish: 'Finitions professionnelles adaptées au style',
    materialsIncluded: [
      'Peinture mate poudrée haute résistance',
      'Finition veloutée soyeuse sans traces'
    ],
    estimatedBudgetMin: 800,
    estimatedBudgetMax: 1050,
    clientName: user?.displayName || '',
    clientEmail: user?.email || '',
    clientPhone: '+243 ',
    clientMessage: preselectedProject ? `Je souhaite un projet similaire à "${preselectedProject.title}".` : '',
    preferredDate: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Recalculate estimated materials budget in $ based on offer & wall dimension
  const calculateEstimate = (offer: DecorOffer, area: number) => {
    const conf = ICDD_OFFERS_CONFIG[offer];
    const safeArea = Math.max(10, Math.min(500, area));
    const ratio = Math.max(1, safeArea / conf.minWallM2);
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
      setShowOptionalDetails(false);
      setShowMobileSummary(false);
      const offer: DecorOffer = (preselectedProject?.category as DecorOffer) || 'Décoration Top Modèle';
      const area = preselectedProject ? preselectedProject.area : 50;
      const { min, max } = calculateEstimate(offer, area);
      setFormData(prev => ({
        ...prev,
        selectedOffer: offer,
        wallArea: area,
        estimatedBudgetMin: min,
        estimatedBudgetMax: max,
        clientMessage: preselectedProject ? `Intéressé par l'offre ${offer} (inspiré de "${preselectedProject.title}").` : '',
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
    const safeVal = isNaN(val) ? 20 : Math.max(10, Math.min(500, val));
    const { min, max } = calculateEstimate(formData.selectedOffer, safeVal);
    setFormData(prev => ({
      ...prev,
      wallArea: safeVal,
      estimatedBudgetMin: min,
      estimatedBudgetMax: max,
    }));
  };

  const finishOptions = [
    { label: 'Peinture mate poudrée haute résistance', tag: 'Durable' },
    { label: 'Finition veloutée soyeuse sans traces', tag: 'Élégant' },
    { label: 'Enduit stuc effet marbré vénitien', tag: 'Texturé' },
    { label: 'Patine nacrée & touches dorées Gold', tag: 'Prestige' },
    { label: 'Fresque murale artistique 3D & reliefs', tag: 'Art d’art' },
    { label: 'Baguettes & moulures décoratives peintes', tag: 'Classique' },
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

  const roomOptions: { id: QuoteFormData['roomType']; label: string; icon: React.ElementType }[] = [
    { id: 'Salon', label: 'Salon / Séjour', icon: Home },
    { id: 'Chambre', label: 'Chambre', icon: Compass },
    { id: 'Bureau', label: 'Bureau', icon: Briefcase },
    { id: 'Appartement complet', label: 'Appartement', icon: Building2 },
    { id: 'Espace Commercial', label: 'Commercial', icon: Store },
  ];

  const surfacePresets = [
    { label: '25 m²', sub: 'Chambre', value: 25 },
    { label: '50 m²', sub: 'Salon', value: 50 },
    { label: '85 m²', sub: 'Séjour', value: 85 },
    { label: '150 m²', sub: 'Appart.', value: 150 },
    { label: '250 m²', sub: 'Villa', value: 250 },
  ];

  const kinshasaCommunes = [
    'Gombe',
    'Ngaliema',
    'Limete',
    'Mont-Ngafula',
    'Kintambo',
    'Bandalungwa',
    'Lingwala',
    'Barumbu',
    'Autre commune / Hors Kinshasa'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedName = formData.clientName.trim();
    const trimmedEmail = formData.clientEmail.trim();
    const trimmedPhone = formData.clientPhone.trim();

    if (!trimmedName) {
      setSubmitError('Veuillez renseigner votre nom et prénom.');
      return;
    }

    if (!trimmedPhone || trimmedPhone === '+243' || trimmedPhone.length < 8) {
      setSubmitError('Veuillez renseigner un numéro de téléphone WhatsApp valide.');
      return;
    }

    setIsSubmitting(true);

    const refId = 'DEV-ICDD-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteReference(refId);

    const quoteDocId = 'q_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const quoteDocRef = doc(db, 'quotes', quoteDocId);

    const fullMessage = [
      `[Référence : ${refId}]`,
      `Commune / Lieu : ${selectedCommune}`,
      formData.preferredDate ? `Date souhaitée d'intervention : ${formData.preferredDate}` : null,
      formData.clientMessage?.trim() ? `Précisions : ${formData.clientMessage.trim()}` : null
    ].filter(Boolean).join('\n');

    try {
      await setDoc(quoteDocRef, {
        userId: user ? user.uid : 'guest',
        clientName: trimmedName,
        clientEmail: trimmedEmail || 'Non spécifié',
        clientPhone: trimmedPhone,
        clientMessage: fullMessage,
        selectedOffer: formData.selectedOffer,
        wallArea: Number(formData.wallArea),
        roomType: formData.roomType,
        materialsIncluded: formData.materialsIncluded || [],
        estimatedBudgetMin: Number(formData.estimatedBudgetMin),
        estimatedBudgetMax: Number(formData.estimatedBudgetMax),
        currency: 'USD ($)',
        laborIncluded: false,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setSubmitError("Une erreur est survenue lors de l'enregistrement de votre devis. Vous pouvez nous contacter directement au +243 897504570 ou via WhatsApp.");
      handleFirestoreError(err, OperationType.WRITE, `quotes/${quoteDocId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find reference photo for the selected decor or project
  const sampleProject = preselectedProject || ICDD_PROJECTS.find(p => p.category === formData.selectedOffer) || ICDD_PROJECTS[0];
  const referenceImage = preselectedProject?.coverImage || sampleProject?.coverImage;

  const sendDirectWhatsApp = () => {
    const msg = buildQuoteWhatsAppMessage({
      selectedOffer: formData.selectedOffer,
      wallArea: formData.wallArea,
      roomType: formData.roomType,
      materialsIncluded: formData.materialsIncluded,
      estimatedBudgetMin: formData.estimatedBudgetMin,
      estimatedBudgetMax: formData.estimatedBudgetMax,
      clientName: formData.clientName || undefined,
      clientPhone: formData.clientPhone !== '+243 ' ? formData.clientPhone : undefined,
      clientMessage: formData.clientMessage || undefined,
      commune: selectedCommune,
      preferredDate: formData.preferredDate || undefined,
      referenceId: quoteReference || undefined,
      inspirationPhotoUrl: referenceImage,
    });
    openWhatsAppChat(msg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl xl:max-w-6xl my-auto bg-white sm:rounded-[32px] border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-4 sm:px-8 py-3.5 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-sky-50/40 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm flex-shrink-0 relative">
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
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#005EA6]">ICDD</span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Devis Rapide</span>
              </div>
              <h2 className="text-sm sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Estimation de Budget & Devis
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Price Tag on Mobile Header */}
            {!submitted && (
              <div className="sm:hidden px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-right">
                <span className="text-[9px] uppercase font-bold text-emerald-600 block leading-none">Budget estimé</span>
                <span className="text-xs font-black text-emerald-700">{formData.estimatedBudgetMin}$ - {formData.estimatedBudgetMax}$</span>
              </div>
            )}

            <button
              onClick={onClose}
              aria-label="Fermer la fenêtre de devis"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-slate-200/80"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {!submitted ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-7 pb-24 sm:pb-8">
            
            {/* Mobile Fast-Track Banner (Instant WhatsApp) */}
            <div className="sm:hidden mb-3 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Zap className="w-4 h-4 fill-white text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-extrabold text-emerald-950 block truncate">Besoin d'un devis immédiat ?</span>
                  <span className="text-[10px] text-emerald-700 block truncate">Discussion directe avec nos décorateurs</span>
                </div>
              </div>
              <button
                type="button"
                onClick={sendDirectWhatsApp}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white text-[11px] font-extrabold flex items-center gap-1.5 flex-shrink-0 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Stepper Navigation */}
            {/* Desktop: 3 pills */}
            <div className="hidden sm:block mb-6">
              <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
                
                {/* Step 1 Pill */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-3 py-2 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    step === 1
                      ? 'bg-[#005EA6] text-white border-sky-400 shadow-md shadow-[#005EA6]/20'
                      : step > 1
                      ? 'bg-sky-50 text-[#005EA6] border-sky-200 hover:bg-sky-100'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                    step === 1 
                      ? 'bg-white text-[#005EA6]' 
                      : step > 1 
                      ? 'bg-[#005EA6] text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step > 1 ? <Check className="w-3 h-3 stroke-[3]" /> : '1'}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold opacity-80 block tracking-wider">Étape 1</span>
                    <span className="text-xs font-bold truncate block">Offre & Superficie</span>
                  </div>
                </button>

                {/* Step 2 Pill */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-3 py-2 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    step === 2
                      ? 'bg-[#005EA6] text-white border-sky-400 shadow-md shadow-[#005EA6]/20'
                      : step > 2
                      ? 'bg-sky-50 text-[#005EA6] border-sky-200 hover:bg-sky-100'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                    step === 2 
                      ? 'bg-white text-[#005EA6]' 
                      : step > 2 
                      ? 'bg-[#005EA6] text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step > 2 ? <Check className="w-3 h-3 stroke-[3]" /> : '2'}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold opacity-80 block tracking-wider">Étape 2</span>
                    <span className="text-xs font-bold truncate block">Espace & Finitions</span>
                  </div>
                </button>

                {/* Step 3 Pill */}
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`px-3 py-2 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    step === 3
                      ? 'bg-[#005EA6] text-white border-sky-400 shadow-md shadow-[#005EA6]/20'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                    step === 3 
                      ? 'bg-white text-[#005EA6]' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    3
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold opacity-80 block tracking-wider">Étape 3</span>
                    <span className="text-xs font-bold truncate block">Coordonnées</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Mobile: Ultra-sleek compact step indicator */}
            <div className="sm:hidden mb-4 bg-slate-100/90 rounded-2xl p-2.5 flex items-center justify-between border border-slate-200/70">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-[#005EA6] text-white text-[11px] font-black">
                  {step}/3
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {step === 1 && '1. Formule & Superficie'}
                  {step === 2 && '2. Pièce & Finitions'}
                  {step === 3 && '3. Vos Coordonnées'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(s as 1 | 2 | 3)}
                    aria-label={`Aller à l'étape ${s}`}
                    className={`h-2 rounded-full transition-all ${
                      s === step ? 'w-6 bg-[#005EA6]' : s < step ? 'w-2.5 bg-emerald-500' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Content Grid: Form on left, Desktop Board on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* STEP 1: Offer & Wall Dimensions */}
                {step === 1 && (
                  <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
                    
                    {/* Offer Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>1. Choisissez votre formule</span>
                        </label>
                        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">5 niveaux de finition</span>
                      </div>

                      {/* Offers Grid: On mobile, compact touch-friendly cards without giant text blocks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {(Object.keys(ICDD_OFFERS_CONFIG) as DecorOffer[]).map(offer => {
                          const item = ICDD_OFFERS_CONFIG[offer];
                          const isSelected = formData.selectedOffer === offer;
                          return (
                            <div
                              key={offer}
                              onClick={() => handleOfferChange(offer)}
                              className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                                isSelected
                                  ? 'bg-sky-50/90 border-[#005EA6] shadow-sm ring-2 ring-[#005EA6]/30'
                                  : 'bg-slate-50/90 text-slate-800 border-slate-200/90 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className={`text-xs font-extrabold truncate block ${isSelected ? 'text-[#005EA6]' : 'text-slate-900'}`}>
                                    {offer}
                                  </span>
                                  <span className="text-[11px] sm:text-xs font-black text-emerald-700 mt-0.5 block">
                                    {item.badge}
                                  </span>
                                </div>

                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                  isSelected ? 'bg-[#005EA6] text-white shadow-xs' : 'border border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>

                              {/* Description: Hidden on small screens to avoid clutter, visible on tablet/desktop */}
                              <p className="hidden sm:block text-[11px] text-slate-600 mt-2 leading-relaxed font-normal">
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Wall Surface: Streamlined controls */}
                    <div className="p-3.5 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Ruler className="w-3.5 h-3.5 text-[#005EA6]" />
                            <span>2. Superficie des murs</span>
                          </label>
                          <span className="text-[11px] text-slate-500 hidden sm:inline">Surface estimée à peindre ou décorer</span>
                        </div>

                        {/* Stepper with +/- and direct input */}
                        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleAreaChange(formData.wallArea - 5)}
                            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer active:scale-95"
                            aria-label="Diminuer surface de 5 m²"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <div className="flex items-center px-1">
                            <input 
                              type="number" 
                              min="10" 
                              max="500" 
                              value={formData.wallArea}
                              onChange={(e) => handleAreaChange(parseInt(e.target.value) || 20)}
                              className="w-12 text-center text-base sm:text-lg font-black text-[#005EA6] focus:outline-none"
                            />
                            <span className="text-xs font-bold text-slate-500 ml-0.5">m²</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAreaChange(formData.wallArea + 5)}
                            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer active:scale-95"
                            aria-label="Augmenter surface de 5 m²"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Slider Control */}
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="range"
                          min="15"
                          max="250"
                          step="5"
                          value={formData.wallArea}
                          onChange={(e) => handleAreaChange(Number(e.target.value))}
                          className="w-full accent-[#005EA6] cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-0.5">
                          <span>15 m² (Studio)</span>
                          <span>50 m² (Salon)</span>
                          <span>150 m² (Grand duplex)</span>
                          <span>250 m² (Villa)</span>
                        </div>
                      </div>

                      {/* Surface Quick Preset Pills */}
                      <div className="pt-2 border-t border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                          Suggestions rapides :
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {surfacePresets.map((preset) => (
                            <button
                              key={preset.value}
                              type="button"
                              onClick={() => handleAreaChange(preset.value)}
                              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                                formData.wallArea === preset.value
                                  ? 'bg-[#005EA6] text-white border-[#005EA6] shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <span>{preset.label}</span>
                              <span className="text-[10px] opacity-75 font-normal">({preset.sub})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons for Step 1 (Desktop) */}
                    <div className="hidden sm:flex items-center justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-7 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/25 border border-sky-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continuer vers l'étape 2</span>
                        <ArrowRight className="w-4 h-4 text-sky-200" />
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 2: Room Type & Desired Finishes */}
                {step === 2 && (
                  <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
                    
                    {/* Room Type */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 sm:mb-3">
                        1. Type d'espace à transformer
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {roomOptions.map(r => {
                          const IconComp = r.icon;
                          const isSelected = formData.roomType === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, roomType: r.id }))}
                              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center sm:flex-col sm:items-start justify-start sm:justify-between gap-2.5 sm:gap-2 ${
                                isSelected
                                  ? 'bg-sky-50/90 border-[#005EA6] text-[#005EA6] shadow-sm ring-2 ring-[#005EA6]/20 font-bold'
                                  : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                              }`}
                            >
                              <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-[#005EA6]' : 'text-slate-400'}`} />
                              <span className="text-xs font-bold truncate">{r.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Finishes Checkboxes */}
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                          2. Finitions souhaitées
                        </label>
                        <span className="text-[11px] text-slate-500 font-medium">Sélection multiple</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {finishOptions.map(opt => {
                          const isSelected = formData.materialsIncluded.includes(opt.label);
                          return (
                            <div
                              key={opt.label}
                              onClick={() => handleFinishToggle(opt.label)}
                              className={`p-2.5 sm:p-3 rounded-2xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <div className="space-y-0.5 pr-2 min-w-0">
                                <span className="font-semibold block leading-snug truncate sm:whitespace-normal">{opt.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-md inline-block font-bold ${
                                  isSelected ? 'bg-sky-500/20 text-sky-200' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {opt.tag}
                                </span>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-sky-400 text-slate-950 font-black' : 'border border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-7 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/25 border border-sky-400/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                      >
                        <span>Continuer (Coordonnées)</span>
                        <ArrowRight className="w-4 h-4 text-sky-200" />
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 3: Client Details & Submission */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                    
                    {/* Name & Phone are the 2 essentials */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>Nom et prénom *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Votre nom complet"
                          value={formData.clientName}
                          onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                        />
                      </div>

                      {/* Phone WhatsApp */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Numéro WhatsApp *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+243 89 750 4570"
                          value={formData.clientPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Commune Selection */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#005EA6]" />
                        <span>Commune / Quartier à Kinshasa</span>
                      </label>
                      <select
                        value={selectedCommune}
                        onChange={(e) => setSelectedCommune(e.target.value)}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                      >
                        {kinshasaCommunes.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Collapsible Optional Section (Email, Date, Notes) to keep mobile form ultra-short */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowOptionalDetails(!showOptionalDetails)}
                        className="w-full px-3.5 py-2 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2 text-slate-600">
                          <Info className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>Précisions facultatives (Email, date, message...)</span>
                        </span>
                        {showOptionalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {showOptionalDetails && (
                        <div className="space-y-3 pt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 mt-2 animate-in fade-in duration-150">
                          {/* Email (Optional) */}
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>Adresse email (Optionnel)</span>
                            </label>
                            <input
                              type="email"
                              placeholder="votre.email@domaine.com"
                              value={formData.clientEmail}
                              onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30"
                            />
                          </div>

                          {/* Date */}
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>Date souhaitée d'intervention ou visite de chantier</span>
                            </label>
                            <input
                              type="date"
                              value={formData.preferredDate || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30"
                            />
                          </div>

                          {/* Message */}
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>Précisions sur vos murs (Optionnel)</span>
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Ex: Murs neufs, enduit à poncer, corniches..."
                              value={formData.clientMessage}
                              onChange={(e) => setFormData(prev => ({ ...prev, clientMessage: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Guarantee Badge */}
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-sky-50/80 border border-sky-200/70 flex items-center gap-2 text-[11px] text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#005EA6] flex-shrink-0" />
                      <span>Rappel rapide du bureau technique ICDD Kinshasa (sans engagement).</span>
                    </div>

                    {/* Submit Error Alert */}
                    {submitError && (
                      <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Desktop Step 3 Buttons */}
                    <div className="hidden sm:flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={isSubmitting}
                        className="px-5 py-3 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour</span>
                      </button>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={sendDirectWhatsApp}
                          className="px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Direct</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-7 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/25 border border-sky-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Envoi...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-sky-200" />
                              <span>Valider la Demande</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </form>
                )}

              </div>

              {/* Right Column: Live Quotation Preview Board (Desktop only) */}
              <div className="hidden lg:block lg:col-span-5">
                <div className="sticky top-0 bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
                  
                  {/* Bordereau Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#005EA6] text-white flex items-center justify-center font-black text-xs shadow-sm">
                        IC
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estimation Provisoire</span>
                        <span className="text-xs font-black text-slate-100">Bordereau Matériaux</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Calcul en direct
                    </span>
                  </div>

                  {/* Summary Breakdown Items */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Formule</span>
                      <span className="font-extrabold text-sky-300 text-right">{formData.selectedOffer}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Superficie</span>
                      <span className="font-extrabold text-white text-right">{formData.wallArea} m²</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Type d'espace</span>
                      <span className="font-extrabold text-white text-right">{formData.roomType}</span>
                    </div>

                    {selectedCommune && (
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                        <span className="text-slate-400 font-medium">Commune</span>
                        <span className="font-extrabold text-white text-right">{selectedCommune}</span>
                      </div>
                    )}

                    {formData.materialsIncluded.length > 0 && (
                      <div className="py-1">
                        <span className="text-slate-400 font-medium block mb-1">Options sélectionnées :</span>
                        <div className="flex flex-wrap gap-1">
                          {formData.materialsIncluded.map((m, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reference photo preview */}
                  {referenceImage && (
                    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/60 p-2 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
                        <span className="font-semibold flex items-center gap-1.5 text-slate-200">
                          <Sparkles className="w-3 h-3 text-sky-400" />
                          <span>Inspiration réelle ICDD</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">Photo jointe sur WhatsApp</span>
                      </div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                        <img 
                          src={referenceImage} 
                          alt="Décor choisi" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-medium text-white truncate">
                          {preselectedProject ? preselectedProject.title : formData.selectedOffer}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Highlighted Price Range */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/80 space-y-1 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                      Budget Matériaux Estimé
                    </span>
                    <div className="text-2xl font-black text-emerald-400 tracking-tight">
                      {formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $
                    </div>
                    <span className="text-[10px] text-slate-400 block pt-0.5 leading-snug">
                      * Tarifs indicatifs matériaux à Kinshasa. Visite technique de confirmation.
                    </span>
                  </div>

                  {/* WhatsApp Direct Assistance */}
                  <button
                    type="button"
                    onClick={sendDirectWhatsApp}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Envoyer ce devis sur WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1 border-t border-slate-800/80">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-sky-400" />
                      <span>Lun. - Sam.</span>
                    </span>
                    <a href="tel:+243897504570" className="text-sky-300 font-bold hover:underline">
                      +243 897504570
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-6 sm:p-12 text-center my-auto space-y-5 max-w-xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Devis Envoyé • Réf. {quoteReference}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Votre devis a bien été transmis à ICDD !
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Merci <strong>{formData.clientName}</strong>. Notre équipe technique analyse votre demande pour <strong>{formData.wallArea} m²</strong> en <strong>{formData.selectedOffer}</strong> et vous contactera au <strong>{formData.clientPhone}</strong>.
              </p>
            </div>

            {/* Recap Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span>Détail du projet :</span>
                <span className="text-[#005EA6]">{formData.roomType} ({selectedCommune})</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Estimation matériaux :</span>
                <span className="font-extrabold text-slate-900">{formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                onClick={sendDirectWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ouvrir sur WhatsApp</span>
              </button>

              <a
                href="tel:+243897504570"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-sky-300" />
                <span>Appeler +243 897504570</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Mobile Sticky Bottom Action Bar (Only on mobile when form is active) */}
        {!submitted && (
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 shadow-2xl flex items-center justify-between gap-2.5">
            
            {/* Quick Price & Breakdown trigger */}
            <button
              type="button"
              onClick={() => setShowMobileSummary(!showMobileSummary)}
              className="flex flex-col text-left py-1 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase leading-none">
                <span>Détail</span>
                {showMobileSummary ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </div>
              <div className="text-xs font-black text-emerald-700 leading-tight">
                {formData.estimatedBudgetMin}$ - {formData.estimatedBudgetMax}$
              </div>
            </button>

            {/* Step Action Buttons on Mobile */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as 1 | 2)}
                  className="px-3 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs active:bg-slate-200 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Retour</span>
                </button>
              )}

              {step === 1 && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-[#005EA6] active:bg-[#004f8c] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#005EA6]/20"
                >
                  <span>Étape 2 (Pièce)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-200" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-[#005EA6] active:bg-[#004f8c] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#005EA6]/20"
                >
                  <span>Étape 3 (Coordonnées)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-200" />
                </button>
              )}

              {step === 3 && (
                <div className="flex items-center gap-1.5 flex-1 justify-end">
                  <button
                    type="button"
                    onClick={sendDirectWhatsApp}
                    className="px-3 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                    title="Envoyer directement sur WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 px-3.5 rounded-2xl bg-[#005EA6] active:bg-[#004f8c] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#005EA6]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-sky-200" />
                    )}
                    <span>Valider</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Mobile Summary Drawer Sheet (When user taps "Détail") */}
        {showMobileSummary && !submitted && (
          <div 
            className="sm:hidden fixed inset-x-0 bottom-16 z-30 bg-slate-900 text-white rounded-t-3xl p-4 shadow-2xl border-t border-slate-700 animate-in slide-in-from-bottom duration-200 max-h-[60vh] overflow-y-auto space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">Bordereau prévisionnel</span>
              <button
                type="button"
                onClick={() => setShowMobileSummary(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Formule :</span>
                <span className="font-bold text-sky-300">{formData.selectedOffer}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Surface :</span>
                <span className="font-bold text-white">{formData.wallArea} m²</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Pièce :</span>
                <span className="font-bold text-white">{formData.roomType}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Commune :</span>
                <span className="font-bold text-white">{selectedCommune}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Budget matériaux estimé</span>
              <span className="text-xl font-black text-emerald-400">{formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $</span>
            </div>

            <button
              type="button"
              onClick={sendDirectWhatsApp}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Transmettre ce devis sur WhatsApp</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
