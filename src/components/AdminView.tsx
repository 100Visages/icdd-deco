import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X, 
  AlertCircle, 
  Loader2, 
  Database, 
  ExternalLink,
  Eye, 
  ArrowLeft, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Mail, 
  Lock, 
  RefreshCw, 
  Search, 
  Filter, 
  Copy, 
  CopyCheck,
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Tag, 
  Layers, 
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShopProducts, useStaffMembers, useQuotes, useContactMessages } from '../utils/useAppData';
import { uploadFileToSupabase, checkSupabaseStorageConnection, SUPABASE_URL } from '../lib/supabase';
import { ShopProduct, StaffMember, ClientQuote, ClientMessage, NavTab, ShopCategory } from '../types';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface AdminViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { products, saveProduct, deleteProduct, loading: productsLoading } = useShopProducts();
  const { staff, saveStaffMember, deleteStaffMember, loading: staffLoading } = useStaffMembers();
  const { quotes, updateQuoteStatus, deleteQuote, loading: quotesLoading } = useQuotes();
  const { messages, updateMessageStatus, deleteMessage, loading: messagesLoading } = useContactMessages();

  // Admin access validation: either user is the owner email or enters master PIN
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(
    user?.email === 'charlysalamau@gmail.com'
  );
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active primary tab in Admin
  const [adminTab, setAdminTab] = useState<'shop' | 'staff' | 'quotes' | 'messages' | 'storage'>('shop');

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('Tous');
  const [staffSearch, setStaffSearch] = useState('');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>('all');
  const [messageSearch, setMessageSearch] = useState('');

  // Product modal state
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productUploading, setProductUploading] = useState(false);

  // Staff modal state
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffUploading, setStaffUploading] = useState(false);

  // Supabase test upload state
  const [testUploadFile, setTestUploadFile] = useState<File | null>(null);
  const [testUploadUrl, setTestUploadUrl] = useState<string | null>(null);
  const [isTestingUpload, setIsTestingUpload] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{ connected: boolean; message: string }>({
    connected: true,
    message: 'Vérification en cours...'
  });

  // Notifications
  const [notification, setNotification] = useState<{ text: string; isError?: boolean } | null>(null);

  const showNotification = (text: string, isError = false) => {
    setNotification({ text, isError });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Check Supabase connection on load
  useEffect(() => {
    checkSupabaseStorageConnection().then((res) => {
      setSupabaseStatus({ connected: res.connected, message: res.message });
    });
  }, []);

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    if (cleanPin === '2026' || cleanPin === 'icdd2026' || cleanPin === 'admin' || cleanPin === 'icdd') {
      setIsAdminUnlocked(true);
      setPinError(false);
      showNotification('Accès Administrateur validé avec succès !');
    } else {
      setPinError(true);
    }
  };

  // ---------------------------------------------------------------------------
  // PRODUCT ACTIONS
  // ---------------------------------------------------------------------------
  const handleOpenAddProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      category: 'Peintures',
      shortDesc: '',
      description: '',
      priceDisplay: '85 $ / pot',
      priceValue: 85,
      availability: 'En stock à Kinshasa',
      image: '/realisations/icdd_realisation_6.jpg',
      badge: 'Nouveau',
      specs: ['Finition haute qualité', 'Garantie ICDD', 'Application intérieure'],
      whatsappMessage: 'Bonjour ICDD, je souhaite commander ce produit.',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ShopProduct) => {
    setEditingProduct({
      ...prod,
      specs: prod.specs && prod.specs.length > 0 ? [...prod.specs] : ['Qualité Premium ICDD']
    });
    setIsProductModalOpen(true);
  };

  const handleDuplicateProduct = async (prod: ShopProduct) => {
    const duplicated: ShopProduct = {
      ...prod,
      id: 'prod_' + Date.now(),
      name: `${prod.name} (Copie)`,
      badge: 'Nouveau',
    };
    try {
      await saveProduct(duplicated);
      showNotification(`Produit dupliqué avec succès : "${duplicated.name}"`);
    } catch {
      showNotification('Erreur lors de la duplication du produit.', true);
    }
  };

  const handleToggleProductAvailability = async (prod: ShopProduct) => {
    const nextAvailability = 
      prod.availability === 'En stock à Kinshasa' 
        ? 'Sur commande / Sur mesure' 
        : prod.availability === 'Sur commande / Sur mesure'
        ? 'Disponible'
        : 'En stock à Kinshasa';

    try {
      await saveProduct({ ...prod, availability: nextAvailability });
      showNotification(`Disponibilité mise à jour : "${nextAvailability}"`);
    } catch {
      showNotification('Erreur lors de la mise à jour.', true);
    }
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    setProductUploading(true);
    try {
      const res = await uploadFileToSupabase(file, 'shop', 'products');
      setEditingProduct({ ...editingProduct, image: res.url });
      showNotification(
        res.source === 'supabase'
          ? 'Image uploadée avec succès sur Supabase Storage !'
          : 'Image chargée en local avec succès.'
      );
    } catch {
      showNotification("Erreur lors de l'envoi de l'image.", true);
    } finally {
      setProductUploading(false);
    }
  };

  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name.trim()) {
      showNotification('Veuillez renseigner le nom du produit.', true);
      return;
    }

    try {
      await saveProduct(editingProduct);
      setIsProductModalOpen(false);
      setEditingProduct(null);
      showNotification(`Produit "${editingProduct.name}" enregistré avec succès !`);
    } catch {
      showNotification("Erreur lors de l'enregistrement.", true);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Confirmez-vous la suppression définitive du produit "${name}" ?`)) {
      try {
        await deleteProduct(id);
        showNotification(`Le produit "${name}" a été retiré de la boutique.`);
      } catch {
        showNotification('Impossible de supprimer ce produit.', true);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // STAFF ACTIONS
  // ---------------------------------------------------------------------------
  const handleOpenAddStaff = () => {
    setEditingStaff({
      id: '',
      name: '',
      role: '',
      department: 'Direction / Chantiers',
      badge: 'Responsable',
      badgeColor: 'sky',
      description: 'Supervision des chantiers et accompagnement clientèle ICDD.',
      photoUrl: '/icdd.jpeg',
      phone: '+243897504570',
      whatsappMessage: 'Bonjour, je souhaite échanger avec vous pour un projet.',
      email: 'contact@icdd.cd',
      order: staff.length + 1,
    });
    setIsStaffModalOpen(true);
  };

  const handleOpenEditStaff = (member: StaffMember) => {
    setEditingStaff({ ...member });
    setIsStaffModalOpen(true);
  };

  const handleStaffImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingStaff) return;

    setStaffUploading(true);
    try {
      const res = await uploadFileToSupabase(file, 'avatars', 'staff');
      setEditingStaff({ ...editingStaff, photoUrl: res.url });
      showNotification(
        res.source === 'supabase'
          ? 'Avatar uploadé sur Supabase Storage !'
          : 'Photo chargée en local avec succès.'
      );
    } catch {
      showNotification("Erreur lors de l'envoi de l'avatar.", true);
    } finally {
      setStaffUploading(false);
    }
  };

  const handleSaveStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    if (!editingStaff.name.trim() || !editingStaff.role.trim()) {
      showNotification('Veuillez renseigner le nom et le rôle du collaborateur.', true);
      return;
    }

    try {
      await saveStaffMember(editingStaff);
      setIsStaffModalOpen(false);
      setEditingStaff(null);
      showNotification(`Membre de l'équipe "${editingStaff.name}" enregistré avec succès !`);
    } catch {
      showNotification("Erreur lors de l'enregistrement.", true);
    }
  };

  const handleDeleteStaff = async (id: string, name: string) => {
    if (confirm(`Confirmez-vous le retrait du collaborateur "${name}" ?`)) {
      try {
        await deleteStaffMember(id);
        showNotification(`Le collaborateur "${name}" a été supprimé.`);
      } catch {
        showNotification('Impossible de supprimer ce travailleur.', true);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // QUOTE & MESSAGE ACTIONS
  // ---------------------------------------------------------------------------
  const handleUpdateQuoteStatus = async (quoteId: string, status: 'pending' | 'in_review' | 'contacted') => {
    try {
      await updateQuoteStatus(quoteId, status);
      showNotification(`Statut du devis mis à jour : ${status === 'contacted' ? 'Contacté' : status === 'in_review' ? 'En étude' : 'En attente'}`);
    } catch {
      showNotification('Erreur de mise à jour du devis.', true);
    }
  };

  const handleDeleteQuote = async (quoteId: string, clientName: string) => {
    if (confirm(`Supprimer la demande de devis de "${clientName}" ?`)) {
      try {
        await deleteQuote(quoteId);
        showNotification('Demande de devis supprimée.');
      } catch {
        showNotification('Erreur de suppression du devis.', true);
      }
    }
  };

  const handleUpdateMessageStatus = async (messageId: string, status: 'unread' | 'read') => {
    try {
      await updateMessageStatus(messageId, status);
      showNotification(`Message marqué comme ${status === 'read' ? 'Lu' : 'Non lu'}`);
    } catch {
      showNotification('Erreur de mise à jour.', true);
    }
  };

  const handleDeleteMessage = async (messageId: string, senderName: string) => {
    if (confirm(`Supprimer le message de "${senderName}" ?`)) {
      try {
        await deleteMessage(messageId);
        showNotification('Message supprimé.');
      } catch {
        showNotification('Erreur de suppression.', true);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // SUPABASE TEST UPLOADER
  // ---------------------------------------------------------------------------
  const handleTestUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTestUploadFile(file);
    setIsTestingUpload(true);
    setTestUploadUrl(null);
    try {
      const res = await uploadFileToSupabase(file, 'public', 'test');
      setTestUploadUrl(res.url);
      showNotification('Fichier uploadé avec succès sur Supabase Storage !');
    } catch {
      showNotification("Échec de l'upload test.", true);
    } finally {
      setIsTestingUpload(false);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    showNotification('Lien copié dans le presse-papiers !');
  };

  // Filtered lists
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(productSearch.toLowerCase()));
    const matchesCategory = productCategoryFilter === 'Tous' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredStaff = staff.filter((s) => {
    return (
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.role.toLowerCase().includes(staffSearch.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(staffSearch.toLowerCase()))
    );
  });

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = 
      q.clientName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.clientPhone.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.selectedOffer.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      (q.clientMessage && q.clientMessage.toLowerCase().includes(quoteSearch.toLowerCase()));
    const matchesStatus = quoteStatusFilter === 'all' || q.status === quoteStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMessages = messages.filter((m) => {
    return (
      m.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.subject.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (m.phone && m.phone.toLowerCase().includes(messageSearch.toLowerCase()))
    );
  });

  // Calculate stats
  const pendingQuotesCount = quotes.filter(q => q.status === 'pending').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  // ===========================================================================
  // LOCKED STATE: ADMIN PIN GATE
  // ===========================================================================
  if (!isAdminUnlocked) {
    return (
      <div className="relative z-10 flex-1 w-full h-full min-h-0 overflow-y-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 sm:p-8 shadow-2xl text-white space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#005EA6] to-[#00D7FF] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#005EA6]/40">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-white">Administration ICDD</h2>
            <p className="text-xs text-slate-300">
              Accès réservé pour la gestion de la boutique, de l'équipe et des devis clients.
            </p>
          </div>

          <form onSubmit={handleUnlockPin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Code d'accès Administrateur
              </label>
              <input
                type="password"
                placeholder="Entrez le code d'accès (ex: 2026)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800 text-white placeholder-slate-500 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              {pinError && (
                <p className="text-[11px] text-rose-400 font-semibold mt-1">
                  Code incorrect. Utilisez le code d'accès administrateur : <strong>2026</strong>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#005EA6] hover:bg-[#0072c4] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Déverrouiller le Mode Admin</span>
              <ShieldCheck className="w-4 h-4 text-sky-200" />
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('accueil')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // UNLOCKED STATE: COMPLETE EXECUTIVE ADMIN DASHBOARD
  // ===========================================================================
  return (
    <div 
      id="admin-view-container"
      className="relative z-10 flex-1 w-full h-full min-h-0 overflow-y-auto custom-scrollbar px-3 sm:px-6 md:px-10 py-5 sm:py-7 space-y-6 text-white pb-32"
    >
      
      {/* 1. TOP HEADER & EXECUTIVE IDENTITY */}
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md flex-shrink-0 relative">
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-[#00D7FF]">ICDD Executive</span>
              <span className="text-slate-400">•</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Super Admin Actif</span>
              </span>
              {user?.email && (
                <span className="text-[11px] text-slate-300 hidden sm:inline">
                  ({user.email})
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Espace de Gestion & Supabase Storage
            </h1>
          </div>
        </div>

        {/* Global Quick Action Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('shop')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir la boutique</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir la page Contact</span>
          </button>

          <button
            onClick={() => {
              setIsAdminUnlocked(false);
              showNotification('Session administrateur verrouillée.');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-xs font-bold text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-500/30"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Verrouiller</span>
          </button>
        </div>
      </div>

      {/* 2. KPI STATS CARDS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Products KPI */}
        <div 
          onClick={() => setAdminTab('shop')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            adminTab === 'shop'
              ? 'bg-sky-950/60 border-sky-400/50 shadow-md shadow-sky-500/10'
              : 'bg-slate-900/80 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Boutique</span>
            <ShoppingBag className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">{products.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Produits en ligne</div>
        </div>

        {/* Staff KPI */}
        <div 
          onClick={() => setAdminTab('staff')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            adminTab === 'staff'
              ? 'bg-sky-950/60 border-sky-400/50 shadow-md shadow-sky-500/10'
              : 'bg-slate-900/80 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Équipe Contact</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">{staff.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Collaborateurs affichés</div>
        </div>

        {/* Quotes KPI */}
        <div 
          onClick={() => setAdminTab('quotes')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            adminTab === 'quotes'
              ? 'bg-sky-950/60 border-sky-400/50 shadow-md shadow-sky-500/10'
              : 'bg-slate-900/80 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Devis Clients</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">{quotes.length}</span>
            {pendingQuotesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black border border-amber-500/30">
                {pendingQuotesCount} en attente
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Estimations reçues</div>
        </div>

        {/* Messages KPI */}
        <div 
          onClick={() => setAdminTab('messages')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            adminTab === 'messages'
              ? 'bg-sky-950/60 border-sky-400/50 shadow-md shadow-sky-500/10'
              : 'bg-slate-900/80 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Messages Showroom</span>
            <MessageCircle className="w-4 h-4 text-[#00D7FF]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">{messages.length}</span>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-black border border-sky-500/30">
                {unreadMessagesCount} non lus
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Formulaire Contact</div>
        </div>
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 animate-in fade-in duration-200 ${
          notification.isError
            ? 'bg-rose-950/90 border-rose-500/60 text-rose-200'
            : 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200'
        }`}>
          {notification.isError ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-semibold">{notification.text}</span>
        </div>
      )}

      {/* 3. MAIN SECTION TABS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        <button
          onClick={() => setAdminTab('shop')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            adminTab === 'shop'
              ? 'bg-[#005EA6] text-white shadow-lg shadow-[#005EA6]/30 border border-sky-400/40'
              : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Boutique ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('staff')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            adminTab === 'staff'
              ? 'bg-[#005EA6] text-white shadow-lg shadow-[#005EA6]/30 border border-sky-400/40'
              : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Équipe Contact ({staff.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('quotes')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            adminTab === 'quotes'
              ? 'bg-[#005EA6] text-white shadow-lg shadow-[#005EA6]/30 border border-sky-400/40'
              : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Devis Clients ({quotes.length})</span>
          {pendingQuotesCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setAdminTab('messages')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            adminTab === 'messages'
              ? 'bg-[#005EA6] text-white shadow-lg shadow-[#005EA6]/30 border border-sky-400/40'
              : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Messages Contact ({messages.length})</span>
          {unreadMessagesCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setAdminTab('storage')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            adminTab === 'storage'
              ? 'bg-[#005EA6] text-white shadow-lg shadow-[#005EA6]/30 border border-sky-400/40'
              : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase Storage</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* SECTION 1: BOUTIQUE & PRODUITS                                         */}
      {/* ===================================================================== */}
      {adminTab === 'shop' && (
        <div className="space-y-4">
          
          {/* Action & Filter toolbar */}
          <div className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un produit (nom, description)..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Category selector */}
              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="Tous">Toutes catégories ({products.length})</option>
                <option value="Peintures">Peintures</option>
                <option value="Portes">Portes</option>
                <option value="Cuisines">Cuisines</option>
                <option value="Matériaux">Matériaux Staff</option>
                <option value="Meubles">Meubles</option>
                <option value="Tables">Tables</option>
              </select>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Produit</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-sky-400" />
              <span>Chargement du catalogue...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-white/10 rounded-2xl space-y-2">
              <ShoppingBag className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-sm font-bold text-slate-300">Aucun produit ne correspond à vos filtres.</p>
              <button
                onClick={() => {
                  setProductSearch('');
                  setProductCategoryFilter('Tous');
                }}
                className="text-xs text-sky-400 underline font-semibold cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md hover:border-sky-400/50 transition-all group"
                >
                  <div className="space-y-2.5">
                    {/* Image and Badges */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                        }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-[#00D7FF] border border-sky-400/30">
                        {p.category}
                      </span>
                      {p.badge && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#005EA6] text-white shadow-sm">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Name & Short Description */}
                    <div>
                      <h3 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-sky-200 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                        {p.shortDesc || p.description}
                      </p>
                    </div>

                    {/* Price & Availability toggle pill */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-black text-emerald-400 text-sm">{p.priceDisplay}</span>
                      <button
                        onClick={() => handleToggleProductAvailability(p)}
                        title="Cliquer pour changer la disponibilité"
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          p.availability === 'En stock à Kinshasa'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                      >
                        {p.availability}
                      </button>
                    </div>

                    {/* Specs Tags Preview */}
                    {p.specs && p.specs.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.specs.slice(0, 2).map((s, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 truncate max-w-[120px]">
                            {s}
                          </span>
                        ))}
                        {p.specs.length > 2 && (
                          <span className="text-[9px] text-slate-400 self-center">
                            +{p.specs.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="flex items-center justify-between gap-1.5 pt-2.5 border-t border-white/10">
                    <button
                      onClick={() => handleDuplicateProduct(p)}
                      title="Dupliquer le produit"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-950/60 text-sky-300 hover:text-sky-200 border border-white/10 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 border border-white/10 text-xs cursor-pointer transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: ÉQUIPE & TRAVAILLEURS (CONTACT)                            */}
      {/* ===================================================================== */}
      {adminTab === 'staff' && (
        <div className="space-y-4">
          
          {/* Action & Filter toolbar */}
          <div className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un membre de l'équipe (nom, rôle)..."
                value={staffSearch}
                onChange={(e) => setStaffSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <button
              onClick={handleOpenAddStaff}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un Travailleur</span>
            </button>
          </div>

          {/* Staff Grid */}
          {staffLoading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-sky-400" />
              <span>Chargement de l'équipe...</span>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-white/10 rounded-2xl">
              <Users className="w-8 h-8 mx-auto text-slate-500 mb-2" />
              <p className="text-sm font-bold text-slate-300">Aucun collaborateur trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredStaff.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md hover:border-sky-400/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-400/70 bg-white p-0.5 shadow-sm flex-shrink-0">
                        <img
                          src={m.photoUrl}
                          alt={m.name}
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-sm text-white truncate">{m.name}</h3>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-[#00D7FF] border border-sky-400/30">
                            {m.badge || 'Membre'}
                          </span>
                        </div>
                        <span className="text-xs text-sky-300 font-semibold block truncate mt-0.5">{m.role}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{m.department}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {m.description}
                    </p>

                    <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-white/10">
                      {m.phone && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Phone className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{m.phone}</span>
                        </div>
                      )}
                      {m.email && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{m.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-2.5 border-t border-white/10">
                    <button
                      onClick={() => handleOpenEditStaff(m)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-950/60 text-sky-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Modifier</span>
                    </button>

                    <button
                      onClick={() => handleDeleteStaff(m.id, m.name)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-rose-300 text-xs cursor-pointer transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 3: DEVIS & ESTIMATIONS CLIENTS REÇUS                           */}
      {/* ===================================================================== */}
      {adminTab === 'quotes' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un devis (nom, téléphone, commune)..."
                value={quoteSearch}
                onChange={(e) => setQuoteSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={quoteStatusFilter}
                onChange={(e) => setQuoteStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="all">Tous les statuts ({quotes.length})</option>
                <option value="pending">En attente ({quotes.filter(q => q.status === 'pending').length})</option>
                <option value="in_review">En cours d'étude</option>
                <option value="contacted">Contactés</option>
              </select>
            </div>
          </div>

          {quotesLoading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-sky-400" />
              <span>Chargement des devis...</span>
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-white/10 rounded-2xl">
              <FileText className="w-8 h-8 mx-auto text-slate-500 mb-2" />
              <p className="text-sm font-bold text-slate-300">Aucune demande de devis trouvée.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md hover:border-sky-400/40 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base text-white">{q.clientName}</span>
                      <span className="text-xs text-sky-300 font-bold px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30">
                        {q.selectedOffer}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Surface: {q.wallArea} m² ({q.roomType})
                      </span>
                      {q.estimatedBudgetMin && q.estimatedBudgetMax && (
                        <span className="text-xs font-black text-white px-2 py-0.5 rounded-full bg-[#005EA6]">
                          Budget: {q.estimatedBudgetMin} $ - {q.estimatedBudgetMax} $
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        <span className="font-semibold">{q.clientPhone}</span>
                      </div>
                      {q.clientEmail && q.clientEmail !== 'Non spécifié' && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span>{q.clientEmail}</span>
                        </div>
                      )}
                    </div>

                    {q.clientMessage && (
                      <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-white/5 whitespace-pre-line">
                        {q.clientMessage}
                      </div>
                    )}
                  </div>

                  {/* Actions for Quote */}
                  <div className="flex items-center gap-2 flex-wrap lg:flex-col lg:items-end">
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Statut:</span>
                      <select
                        value={q.status}
                        onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          q.status === 'contacted'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : q.status === 'in_review'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        <option value="pending">En attente</option>
                        <option value="in_review">En cours d'étude</option>
                        <option value="contacted">Contacté</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {/* Direct WhatsApp Response Button */}
                      <a
                        href={`https://wa.me/${q.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${q.clientName}, suite à votre demande de devis ICDD pour "${q.selectedOffer}", nous vous contactons pour fixer votre relevé métrique.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Répondre WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleDeleteQuote(q.id, q.clientName)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-rose-300 text-xs cursor-pointer transition-colors"
                        title="Supprimer le devis"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 4: MESSAGES REÇUS DU FORMULAIRE CONTACT                       */}
      {/* ===================================================================== */}
      {adminTab === 'messages' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-white/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher dans les messages..."
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          {messagesLoading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-sky-400" />
              <span>Chargement des messages...</span>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-white/10 rounded-2xl">
              <MessageCircle className="w-8 h-8 mx-auto text-slate-500 mb-2" />
              <p className="text-sm font-bold text-slate-300">Aucun message de client pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((m) => (
                <div
                  key={m.id}
                  className={`border rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
                    m.status === 'unread'
                      ? 'bg-slate-900/95 border-sky-400/50 shadow-md'
                      : 'bg-slate-900/70 border-white/10'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-white">{m.name}</span>
                      <span className="text-xs font-bold text-[#00D7FF] px-2 py-0.5 rounded-full bg-slate-800 border border-white/10">
                        {m.subject}
                      </span>
                      {m.status === 'unread' && (
                        <span className="px-2 py-0.5 rounded-md bg-sky-500/30 text-sky-300 text-[10px] font-black uppercase">
                          Nouveau
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                      {m.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-sky-400" />
                          <span>{m.phone}</span>
                        </div>
                      )}
                      {m.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span>{m.email}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-xl border border-white/5 leading-relaxed mt-2 whitespace-pre-line">
                      {m.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleUpdateMessageStatus(m.id, m.status === 'read' ? 'unread' : 'read')}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                    >
                      {m.status === 'read' ? 'Marquer non lu' : 'Marquer comme lu'}
                    </button>

                    {m.phone && (
                      <a
                        href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${m.name}, nous avons bien reçu votre message via le showroom ICDD.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleDeleteMessage(m.id, m.name)}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-rose-300 text-xs cursor-pointer transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 5: SUPABASE STORAGE CONFIG & TEST UPLOADER                    */}
      {/* ===================================================================== */}
      {adminTab === 'storage' && (
        <div className="space-y-5">
          <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Connexion & Paramètres Supabase Storage</h2>
                  <span className="text-xs text-slate-400">Stockage dans le cloud pour vos images de boutique et de profil</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                <span className="text-xs font-bold text-emerald-400">Opérationnel à 100%</span>
              </div>
            </div>

            {/* Config details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">URL du projet Supabase</span>
                <p className="font-mono text-emerald-400 text-xs break-all select-all">{SUPABASE_URL}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Statut de la clé API</span>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Publishable Key active (Prêt à l'emploi)</span>
                </p>
              </div>
            </div>

            {/* Google OAuth & Redirection Domain Card */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-sky-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-sm flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#00D7FF]" />
                  <span>Redirection Connexion Google (Domaine Officiel)</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                  Configuré sur www.icdd.company
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Lorsque vos utilisateurs cliquent sur <strong>« Continuer avec Google »</strong>, la redirection OAuth renvoie directement vers votre domaine officiel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Lien de redirection configuré :</span>
                  <p className="font-mono text-sky-300 text-xs break-all">https://www.icdd.company</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">URI de callback Supabase OAuth :</span>
                  <p className="font-mono text-emerald-400 text-xs break-all">https://pjlwrlgldidpjpoffbuk.supabase.co/auth/v1/callback</p>
                </div>
              </div>
            </div>

            {/* Test Uploader Box */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-sky-400" />
                <span>Tester l'Upload d'un Fichier Direct vers Supabase</span>
              </h3>
              <p className="text-xs text-slate-300">
                Sélectionnez n'importe quelle photo pour tester la liaison immédiate. Un lien CDN permanent sera généré.
              </p>

              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#005EA6] hover:bg-[#0072c4] text-white font-bold text-xs cursor-pointer transition-transform active:scale-95 shadow-md">
                  {isTestingUpload ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{isTestingUpload ? 'Envoi en cours...' : 'Sélectionner un fichier test'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTestUpload}
                    className="hidden"
                  />
                </label>

                {testUploadUrl && (
                  <button
                    onClick={() => handleCopyLink(testUploadUrl)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedLink ? <CopyCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>Copier l'URL publique</span>
                  </button>
                )}
              </div>

              {testUploadUrl && (
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-3">
                  <img
                    src={testUploadUrl}
                    alt="Aperçu test"
                    className="w-12 h-12 rounded-lg object-cover border border-white/20"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-slate-400 block">URL générée :</span>
                    <span className="text-xs font-mono text-emerald-400 truncate block">{testUploadUrl}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: CRÉER / MODIFIER UN PRODUIT (BOUTIQUE)                       */}
      {/* ===================================================================== */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-auto bg-slate-900 border border-white/20 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-sky-400" />
                <span>{editingProduct.id ? 'Modifier le Produit' : 'Ajouter un Produit à la Boutique'}</span>
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Nom du produit *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Peinture Royale Velours 15L"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Catégorie</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ShopCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="Peintures">Peintures</option>
                    <option value="Portes">Portes</option>
                    <option value="Cuisines">Cuisines</option>
                    <option value="Matériaux">Matériaux Staff</option>
                    <option value="Meubles">Meubles</option>
                    <option value="Tables">Tables</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Prix affiché</label>
                  <input
                    type="text"
                    placeholder="Ex: 85 $ / pot ou Sur devis"
                    value={editingProduct.priceDisplay}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceDisplay: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Disponibilité</label>
                  <select
                    value={editingProduct.availability}
                    onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="En stock à Kinshasa">En stock à Kinshasa</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Sur commande / Sur mesure">Sur commande / Sur mesure</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Badge Marketing</label>
                  <input
                    type="text"
                    placeholder="Ex: Nouveau, Recommandé, Exclusif..."
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Photo Upload to Supabase */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2.5">
                <span className="font-bold block text-white flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Photo du produit (Supabase Storage)</span>
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-white/20 flex-shrink-0">
                    <img
                      src={editingProduct.image}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#005EA6] hover:bg-[#0072c4] text-white font-bold cursor-pointer transition-colors shadow-sm">
                      {productUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{productUploading ? 'Envoi Supabase...' : 'Uploader depuis votre appareil'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Ou collez une URL directe"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Description courte (carte)</label>
                <textarea
                  rows={2}
                  placeholder="Accroche visible sur la carte du produit..."
                  value={editingProduct.shortDesc}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Description détaillée (modal)</label>
                <textarea
                  rows={3}
                  placeholder="Détails techniques, application, finitions, temps de séchage..."
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0072c4] hover:from-[#005291] text-white font-bold flex items-center gap-1.5 shadow-md cursor-pointer active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer le produit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: CRÉER / MODIFIER UN MEMBRE (ÉQUIPE CONTACT)                  */}
      {/* ===================================================================== */}
      {isStaffModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg my-auto bg-slate-900 border border-white/20 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{editingStaff.id ? 'Modifier le Collaborateur' : 'Ajouter un Collaborateur'}</span>
              </h3>
              <button
                onClick={() => setIsStaffModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaffSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Nom / Titre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Direction Technique"
                    value={editingStaff.name}
                    onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Rôle *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Supervision Staff & Travaux"
                    value={editingStaff.role}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Département</label>
                  <input
                    type="text"
                    placeholder="Ex: Chantiers & Staff"
                    value={editingStaff.department}
                    onChange={(e) => setEditingStaff({ ...editingStaff, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Badge d'expertise</label>
                  <input
                    type="text"
                    placeholder="Ex: Chantiers, Conseil, C.E.O"
                    value={editingStaff.badge}
                    onChange={(e) => setEditingStaff({ ...editingStaff, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Photo Upload to Supabase */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2.5">
                <span className="font-bold block text-white flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Photo / Avatar (Supabase Storage)</span>
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-950 border-2 border-sky-400 flex-shrink-0">
                    <img
                      src={editingStaff.photoUrl}
                      alt="Aperçu avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#005EA6] hover:bg-[#0072c4] text-white font-bold cursor-pointer transition-colors shadow-sm">
                      {staffUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{staffUploading ? 'Envoi Supabase...' : 'Uploader la photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleStaffImageUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Ou collez une URL"
                      value={editingStaff.photoUrl}
                      onChange={(e) => setEditingStaff({ ...editingStaff, photoUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Missions & Description</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Coordination des équipes techniques, prise de rendez-vous sur site..."
                  value={editingStaff.description}
                  onChange={(e) => setEditingStaff({ ...editingStaff, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Téléphone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+243 89 750 4570"
                    value={editingStaff.phone || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@icdd.cd"
                    value={editingStaff.email || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0072c4] hover:from-[#005291] text-white font-bold flex items-center gap-1.5 shadow-md cursor-pointer active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer le collaborateur</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
