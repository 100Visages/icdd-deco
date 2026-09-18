import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Calculator, 
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
  Paintbrush,
  Layers,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  FileText,
  Clock,
  ChevronRight
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
    { id: 'Chambre', label: 'Chambre à coucher', icon: Compass },
    { id: 'Bureau', label: 'Bureau de direction', icon: Briefcase },
    { id: 'Appartement complet', label: 'Appartement complet', icon: Building2 },
    { id: 'Espace Commercial', label: 'Espace Commercial', icon: Store },
  ];

  const surfacePresets = [
    { label: '25 m²', sub: 'Chambre standard', value: 25 },
    { label: '50 m²', sub: 'Salon classique', value: 50 },
    { label: '85 m²', sub: 'Grand séjour / Suite', value: 85 },
    { label: '150 m²', sub: 'Appartement / Étage', value: 150 },
    { label: '250 m²', sub: 'Villa complète', value: 250 },
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
    'Autre commune / En dehors de Kinshasa'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

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
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim(),
        clientPhone: formData.clientPhone.trim(),
        clientMessage: fullMessage,
        selectedOffer: formData.selectedOffer,
        wallArea: Number(formData.wallArea),
        roomType: formData.roomType,
        materialsIncluded: formData.materialsIncluded || [],
        estimatedBudgetMin: Number(formData.estimatedBudgetMin),
        estimatedBudgetMax: Number(formData.estimatedBudgetMax),
        currency: 'USD ($)',
        laborIncluded: false, // Transparent materials quote
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
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientMessage: formData.clientMessage,
      commune: selectedCommune,
      preferredDate: formData.preferredDate,
      referenceId: quoteReference || undefined,
      inspirationPhotoUrl: referenceImage,
    });
    openWhatsAppChat(msg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl xl:max-w-6xl my-auto bg-white rounded-[28px] sm:rounded-[36px] border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-5 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-sky-50/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm flex-shrink-0 relative">
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#005EA6]">ICDD</span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estimateur en Ligne</span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Demande de Devis & Calcul de Budget
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre de devis"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-slate-200/80"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {!submitted ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8">
            
            {/* 3-Step Breadcrumb Bar */}
            <div className="mb-6 sm:mb-8">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto">
                
                {/* Step 1 Pill */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-3 py-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    step === 1
                      ? 'bg-[#005EA6] text-white border-sky-400 shadow-md shadow-[#005EA6]/20'
                      : step > 1
                      ? 'bg-sky-50 text-[#005EA6] border-sky-200 hover:bg-sky-100'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    step === 1 
                      ? 'bg-white text-[#005EA6]' 
                      : step > 1 
                      ? 'bg-[#005EA6] text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold opacity-80 block tracking-wider">Étape 1</span>
                    <span className="text-xs font-bold truncate block">Offre & Murs</span>
                  </div>
                </button>

                {/* Step 2 Pill */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-3 py-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    step === 2
                      ? 'bg-[#005EA6] text-white border-sky-400 shadow-md shadow-[#005EA6]/20'
                      : step > 2
                      ? 'bg-sky-50 text-[#005EA6] border-sky-200 hover:bg-sky-100'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    step === 2 
                      ? 'bg-white text-[#005EA6]' 
                      : step > 2 
                      ? 'bg-[#005EA6] text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold opacity-80 block tracking-wider">Étape 2</span>
                    <span className="text-xs font-bold truncate block">Espace & Finitions</span>
                  </div>
                </button>

                {/* Step 3 Pill */}
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`px-3 py-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    step === 3
                      ? 'bg-[#005EA6] text-white border-sky-400 shadow-md shadow-[#005EA6]/20'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    step === 3 
                      ? 'bg-white text-[#005EA6]' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    3
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold opacity-80 block tracking-wider">Étape 3</span>
                    <span className="text-xs font-bold truncate block">Validation</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Main Content: 2-Column Grid on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Steps (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* STEP 1: Offer & Wall Dimensions */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#005EA6]" />
                          <span>1. Sélectionnez votre niveau de décoration</span>
                        </label>
                        <span className="text-[11px] text-slate-500 font-medium">5 formules sur mesure</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(Object.keys(ICDD_OFFERS_CONFIG) as DecorOffer[]).map(offer => {
                          const item = ICDD_OFFERS_CONFIG[offer];
                          const isSelected = formData.selectedOffer === offer;
                          return (
                            <div
                              key={offer}
                              onClick={() => handleOfferChange(offer)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                                isSelected
                                  ? 'bg-sky-50/80 border-[#005EA6] shadow-md ring-2 ring-[#005EA6]/30'
                                  : 'bg-slate-50/80 text-slate-800 border-slate-200/90 hover:bg-slate-100/80'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className={`text-xs font-extrabold block ${isSelected ? 'text-[#005EA6]' : 'text-slate-900'}`}>
                                    {offer}
                                  </span>
                                  <span className="text-sm font-black text-slate-900 mt-0.5 block">
                                    {item.badge}
                                  </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                  isSelected ? 'bg-[#005EA6] text-white shadow-sm' : 'border border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>

                              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-normal">
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Wall Surface Slider & Quick Presets */}
                    <div className="p-5 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-[#005EA6]" />
                            <span>2. Superficie estimée de vos murs</span>
                          </label>
                          <span className="text-[11px] text-slate-500">Ajustez au curseur ou tapez directement la surface</span>
                        </div>

                        {/* Direct input badge */}
                        <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3.5 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
                          <input 
                            type="number" 
                            min="10" 
                            max="500" 
                            value={formData.wallArea}
                            onChange={(e) => handleAreaChange(parseInt(e.target.value) || 20)}
                            className="w-14 text-right text-lg font-black text-[#005EA6] focus:outline-none"
                          />
                          <span className="text-xs font-bold text-slate-500">m² de murs</span>
                        </div>
                      </div>

                      {/* Slider Control */}
                      <div className="space-y-2 pt-1">
                        <input
                          type="range"
                          min="15"
                          max="300"
                          step="5"
                          value={formData.wallArea}
                          onChange={(e) => handleAreaChange(Number(e.target.value))}
                          className="w-full accent-[#005EA6] cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-0.5">
                          <span>15 m² (Studio)</span>
                          <span>85 m² (Séjour)</span>
                          <span>150 m² (Grand duplex)</span>
                          <span>300 m² (Villa)</span>
                        </div>
                      </div>

                      {/* Surface Quick Preset Buttons */}
                      <div className="pt-2 border-t border-slate-200/70">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">
                          Raccourcis rapides de superficie :
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {surfacePresets.map((preset) => (
                            <button
                              key={preset.value}
                              type="button"
                              onClick={() => handleAreaChange(preset.value)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                formData.wallArea === preset.value
                                  ? 'bg-[#005EA6] text-white border-[#005EA6] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <span>{preset.label}</span>
                              <span className="text-[10px] opacity-75 ml-1.5 font-normal">({preset.sub})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/25 border border-sky-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continuer vers l'étape 2</span>
                        <ArrowRight className="w-4 h-4 text-sky-200" />
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 2: Room Type & Desired Finishes */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    
                    {/* Room Type */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
                        1. Type d'espace à transformer
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {roomOptions.map(r => {
                          const IconComp = r.icon;
                          const isSelected = formData.roomType === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, roomType: r.id }))}
                              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-sky-50/90 border-[#005EA6] text-[#005EA6] shadow-md ring-2 ring-[#005EA6]/20 font-bold'
                                  : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                              }`}
                            >
                              <IconComp className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#005EA6]' : 'text-slate-400'}`} />
                              <span className="text-xs font-bold">{r.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Finishes Checkboxes */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                          2. Finitions et effets décoratifs souhaités
                        </label>
                        <span className="text-[11px] text-slate-500 font-medium">Sélection multiple</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {finishOptions.map(opt => {
                          const isSelected = formData.materialsIncluded.includes(opt.label);
                          return (
                            <div
                              key={opt.label}
                              onClick={() => handleFinishToggle(opt.label)}
                              className={`p-3.5 rounded-2xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <div className="space-y-0.5 pr-2">
                                <span className="font-semibold block leading-snug">{opt.label}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-bold ${
                                  isSelected ? 'bg-sky-500/20 text-sky-200' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {opt.tag}
                                </span>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-sky-400 text-slate-950 font-black' : 'border border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-3">
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
                  <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>Nom et prénom *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="M. / Mme Nom et Prénom"
                          value={formData.clientName}
                          onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>Adresse email *</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="votre.email@domaine.com"
                          value={formData.clientEmail}
                          onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>Téléphone WhatsApp *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+243 ..."
                          value={formData.clientPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                        />
                      </div>

                      {/* Commune / Location */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#005EA6]" />
                          <span>Commune / Quartier à Kinshasa</span>
                        </label>
                        <select
                          value={selectedCommune}
                          onChange={(e) => setSelectedCommune(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                        >
                          {kinshasaCommunes.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Desired Date */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#005EA6]" />
                        <span>Date souhaitée d'intervention ou visite de chantier (Optionnel)</span>
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Précisions / Message */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#005EA6]" />
                        <span>Précisions sur vos murs ou vos souhaits spécifiques</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Murs neufs à peindre, enduit à poncer, présence de moulures ou de corniches..."
                        value={formData.clientMessage}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientMessage: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005EA6]/30 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Security & Response Guarantee Box */}
                    <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#005EA6] flex-shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong>Engagement ICDD :</strong> Vos données sont traitées de manière strictement confidentielle. Notre bureau technique analyse vos superficies et vous recontacte du lundi au samedi pour fixer une visite ou affiner votre devis.
                      </div>
                    </div>

                    {/* Submit Error Alert if any */}
                    {submitError && (
                      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour</span>
                      </button>

                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={sendDirectWhatsApp}
                          className="flex-1 sm:flex-none px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Direct</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 sm:flex-none px-7 py-3.5 rounded-full bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/25 border border-sky-400/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Envoi en cours...</span>
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

              {/* Right Column: Live Quotation Preview Board (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-0 bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5">
                  
                  {/* Bordereau Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#005EA6] text-white flex items-center justify-center font-black text-xs shadow-sm">
                        IC
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estimation Provisoire</span>
                        <span className="text-xs font-black text-slate-100">Bordereau Matériaux</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Calcul en direct
                    </span>
                  </div>

                  {/* Summary Breakdown Items */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Offre sélectionnée</span>
                      <span className="font-extrabold text-sky-300 text-right">{formData.selectedOffer}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Surface murale</span>
                      <span className="font-extrabold text-white text-right">{formData.wallArea} m²</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Type de pièce</span>
                      <span className="font-extrabold text-white text-right">{formData.roomType}</span>
                    </div>

                    {step === 3 && selectedCommune && (
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                        <span className="text-slate-400 font-medium">Localisation</span>
                        <span className="font-extrabold text-white text-right">{selectedCommune}</span>
                      </div>
                    )}

                    {formData.materialsIncluded.length > 0 && (
                      <div className="py-1">
                        <span className="text-slate-400 font-medium block mb-1.5">Options retenues :</span>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.materialsIncluded.map((m, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo de référence du décor */}
                  {referenceImage && (
                    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/60 p-2.5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
                        <span className="font-semibold flex items-center gap-1.5 text-slate-200">
                          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                          <span>Décor de référence</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Photo incluse sur WhatsApp
                        </span>
                      </div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                        <img 
                          src={referenceImage} 
                          alt="Décor choisi" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-medium text-white drop-shadow-sm truncate">
                          {preselectedProject ? preselectedProject.title : formData.selectedOffer}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Highlighted Price Range */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/80 space-y-1 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                      Budget Matériaux Estimé
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                      {formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $
                    </div>
                    <span className="text-[10px] text-slate-400 block pt-1 leading-snug">
                      * Tarifs calculés sur la base des matériaux nobles ICDD à Kinshasa. Devis définitif établi après visite technique.
                    </span>
                  </div>

                  {/* Dual Direct Assistance */}
                  <div className="pt-2 border-t border-slate-800 space-y-2.5">
                    <button
                      type="button"
                      onClick={sendDirectWhatsApp}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Transmettre ce devis avec photo sur WhatsApp</span>
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-sky-400" />
                        <span>Du lundi au samedi</span>
                      </span>
                      <a href="tel:+243897504570" className="text-sky-300 font-bold hover:underline">
                        +243 897504570
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-6 sm:p-12 text-center my-auto space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Demande confirmée • Réf. {quoteReference}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Votre devis a bien été transmis à ICDD !
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Merci <strong>{formData.clientName}</strong>. Notre équipe technique prend en charge votre estimation pour <strong>{formData.wallArea} m²</strong> en <strong>{formData.selectedOffer}</strong> et vous contactera rapidement au <strong>{formData.clientPhone}</strong>.
              </p>
            </div>

            {/* Recap Ticket */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span>Détail du projet :</span>
                <span className="text-[#005EA6]">{formData.roomType} ({selectedCommune})</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Estimation matériaux :</span>
                <span className="font-extrabold text-slate-900">{formData.estimatedBudgetMin} $ – {formData.estimatedBudgetMax} $</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={sendDirectWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ouvrir sur WhatsApp</span>
              </button>

              <a
                href="tel:+243897504570"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#005EA6] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-sky-300" />
                <span>Appeler le +243 897504570</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
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
