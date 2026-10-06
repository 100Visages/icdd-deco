import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  LogOut, 
  Bookmark, 
  PhoneCall, 
  Compass, 
  ArrowLeft,
  KeyRound,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFirebaseAuthErrorMessage } from '../lib/firebase';
import { ICDD_PROJECTS } from '../data/projects';
import { Project, NavTab } from '../types';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

interface LoginViewProps {
  onOpenQuoteModal?: () => void;
  onNavigate?: (tab: NavTab) => void;
  onSelectProject?: (project: Project) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onOpenQuoteModal,
  onNavigate,
  onSelectProject,
}) => {
  const { 
    user, 
    loading: authLoading, 
    favorites, 
    signInWithEmail, 
    signUpWithEmail, 
    resetPassword, 
    signInWithGoogle, 
    signInWithSupabase,
    signOut 
  } = useAuth();

  // Mode: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetFormFeedback = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleModeChange = (newMode: 'login' | 'register' | 'forgot') => {
    resetFormFeedback();
    setMode(newMode);
  };

  // Submit Email Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormFeedback();

    if (!email.trim()) {
      setErrorMessage('Veuillez renseigner votre adresse email.');
      return;
    }
    if (!password) {
      setErrorMessage('Veuillez renseigner votre mot de passe.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(email, password);
      setSuccessMessage('Connexion réussie ! Bienvenue sur votre espace ICDD.');
    } catch (err) {
      console.error('Email login failed:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormFeedback();

    if (!displayName.trim()) {
      setErrorMessage('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Veuillez renseigner votre adresse email.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmail(email, password, displayName);
      setSuccessMessage('Votre compte ICDD a été créé avec succès !');
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormFeedback();

    if (!email.trim()) {
      setErrorMessage('Veuillez renseigner votre adresse email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setSuccessMessage(
        `Un lien de réinitialisation a été envoyé à ${email.trim()}. Vérifiez votre boîte de réception (et vos spams).`
      );
    } catch (err) {
      console.error('Password reset failed:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Sign-In helper
  const handleGoogleAuth = async () => {
    resetFormFeedback();
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      setSuccessMessage('Connexion Google réussie !');
    } catch (err) {
      console.error('Google auth failed:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSupabaseGoogleAuth = async () => {
    resetFormFeedback();
    setIsGoogleLoading(true);
    try {
      await signInWithSupabase();
    } catch (err: any) {
      console.error('Supabase Google auth failed:', err);
      setErrorMessage(err?.message || "Erreur lors de la redirection Google via Supabase.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      resetFormFeedback();
      setMode('login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const favoriteProjects = ICDD_PROJECTS.filter((p) => favorites.includes(p.id));

  return (
    <div 
      id="connexion-view-container"
      className="relative z-10 flex-1 w-full h-full min-h-0 overflow-y-auto custom-scrollbar px-3 sm:px-6 md:px-10 py-6 sm:py-10 flex flex-col justify-start items-center"
    >
      {/* Decorative Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#005EA6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#00D7FF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-xl my-auto bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.85)] text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header with official logo */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md flex-shrink-0 relative">
              <img 
                src={icddOfficialLogo} 
                alt="Logo officiel ICDD" 
                className="absolute inset-0 w-full h-full object-cover scale-[1.32]" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/icdd.jpeg';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#00D7FF]">ICDD</span>
                <span className="text-slate-400">•</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Espace Client</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                {user 
                  ? 'Votre Espace Personnel' 
                  : mode === 'register' 
                  ? 'Créer un Compte ICDD' 
                  : mode === 'forgot'
                  ? 'Mot de Passe Oublié'
                  : 'Connexion Client'
                }
              </h1>
            </div>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('accueil')}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Accueil</span>
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* STATE A: UTILISATEUR CONNECTÉ (Mon Compte & Favoris)       */}
        {/* ========================================================= */}
        {user ? (
          <div className="space-y-6">
            
            {/* User Profile Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-850/90 border border-white/15 flex items-center gap-4 shadow-inner">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-400 shadow-md flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#005EA6] to-[#00D7FF] text-white flex items-center justify-center text-xl font-black shadow-md flex-shrink-0">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || <UserIcon className="w-7 h-7" />}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-base sm:text-lg text-white truncate">
                    {user.displayName || 'Client ICDD'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Connecté</span>
                  </span>
                </div>

                <div className="text-xs text-slate-300 truncate flex items-center gap-1.5 mt-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3.5 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Projets sauvegardés</span>
                  <Bookmark className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-2xl font-black text-white">
                  {favorites.length}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Synchronisés dans votre cloud
                </span>
              </div>

              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3.5 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Devis en ligne</span>
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-black text-emerald-400">
                  Actif
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Assistance WhatsApp 6j/7
                </span>
              </div>
            </div>

            {/* Favoris list */}
            {favoriteProjects.length > 0 ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                    <span>Vos réalisations favorites ({favoriteProjects.length})</span>
                  </span>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('realisations')}
                      className="text-[11px] text-sky-300 hover:text-white font-medium"
                    >
                      Voir la galerie →
                    </button>
                  )}
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {favoriteProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (onSelectProject) onSelectProject(p);
                        else if (onNavigate) onNavigate('realisations');
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 transition-all cursor-pointer group"
                    >
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {p.category} • {p.location} ({p.area} m²)
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-300 transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 text-center space-y-1">
                <Sparkles className="w-5 h-5 text-sky-400 mx-auto" />
                <p className="text-xs text-slate-200 font-semibold">
                  Aucun projet sauvegardé pour l'instant
                </p>
                <p className="text-[11px] text-slate-400">
                  Parcourez la section Réalisations et cliquez sur l'icône marque-page pour retrouver vos décors préférés ici.
                </p>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('realisations')}
                    className="mt-2 text-xs font-bold text-sky-300 hover:text-white underline cursor-pointer"
                  >
                    Explorer les réalisations ICDD
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              {onOpenQuoteModal && (
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/30 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98 border border-sky-400/40"
                >
                  <PhoneCall className="w-4 h-4 text-sky-200" />
                  <span>Calculer un devis avec mes coordonnées</span>
                </button>
              )}

              {onNavigate && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Accéder à l'Espace Administrateur ICDD</span>
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-rose-950/50 text-slate-300 hover:text-rose-200 border border-white/10 hover:border-rose-500/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </button>
            </div>

          </div>
        ) : (
          /* ========================================================= */
          /* STATE B: UTILISATEUR DÉCONNECTÉ (Formulaire Email / Pass)  */
          /* ========================================================= */
          <div className="space-y-5">
            
            {/* Mode Switch Tabs: Se connecter vs Créer un compte */}
            {mode !== 'forgot' && (
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-850 border border-white/10">
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer text-center ${
                    mode === 'login'
                      ? 'bg-[#005EA6] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('register')}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer text-center ${
                    mode === 'register'
                      ? 'bg-[#005EA6] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Créer un compte
                </button>
              </div>
            )}

            {/* Feedback Banners */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUB-FORM 1: LOGIN AVEC EMAIL ET MOT DE PASSE                  */}
            {/* ------------------------------------------------------------- */}
            {mode === 'login' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                {/* Email field */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Adresse Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                  />
                </div>

                {/* Password field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-sky-400" />
                      <span>Mot de passe</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleModeChange('forgot')}
                      className="text-[11px] text-sky-300 hover:text-white font-medium transition-colors cursor-pointer"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-11 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md accent-[#005EA6] cursor-pointer"
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || authLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#005EA6] via-[#0072c4] to-[#0089e0] hover:from-[#005291] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/30 border border-sky-400/40 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight className="w-4 h-4 text-sky-200" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUB-FORM 2: INSCRIPTION NOUVEAU COMPTE                        */}
            {/* ------------------------------------------------------------- */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Nom et prénom</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="M. / Mme Prénom et Nom"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Adresse Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                  />
                </div>

                {/* Password field */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Créer un mot de passe (min. 6 caractères)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Au moins 6 caractères"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-11 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                    <span>Confirmer le mot de passe</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Répétez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                  />
                </div>

                {/* Submit Register button */}
                <button
                  type="submit"
                  disabled={isSubmitting || authLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#005EA6] via-[#0072c4] to-[#0089e0] hover:from-[#005291] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#005EA6]/30 border border-sky-400/40 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Création de votre compte...</span>
                    </>
                  ) : (
                    <>
                      <span>Créer mon compte</span>
                      <ArrowRight className="w-4 h-4 text-sky-200" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUB-FORM 3: RÉINITIALISATION MOT DE PASSE OUBLIÉ              */}
            {/* ------------------------------------------------------------- */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sky-200 text-xs leading-relaxed">
                  Entrez l'adresse email liée à votre compte. Nous vous enverrons immédiatement un lien sécurisé pour redéfinir votre mot de passe.
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Votre Adresse Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 text-white placeholder-slate-500 text-xs font-medium border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleModeChange('login')}
                    className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Retour
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <>
                        <span>Envoyer le lien</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Separator OR */}
            {mode !== 'forgot' && (
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative px-3 bg-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  ou
                </span>
              </div>
            )}

            {/* Google Authentication Options */}
            {mode !== 'forgot' && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isGoogleLoading || authLoading}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 active:scale-98 text-slate-900 font-extrabold text-xs shadow-lg flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isGoogleLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                      <span>Connexion Google...</span>
                    </>
                  ) : (
                    <>
                      {/* Google SVG Logo */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>
                        {mode === 'register' ? "S'inscrire avec Google" : 'Continuer avec Google'}
                      </span>
                    </>
                  )}
                </button>

                {/* Bouton direct Supabase OAuth */}
                <button
                  type="button"
                  onClick={handleSupabaseGoogleAuth}
                  disabled={isGoogleLoading || authLoading}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 active:scale-98 text-slate-300 hover:text-emerald-300 text-[11px] font-semibold border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>Connexion Google directe via Supabase</span>
                </button>
              </div>
            )}

            {/* Security Guarantee Box */}
            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between text-center">
              <div className="flex items-center gap-1.5 mx-auto">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>Vos données sont protégées et cryptées selon les normes ICDD.</span>
              </div>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer"
                  title="Accès Administrateur"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
