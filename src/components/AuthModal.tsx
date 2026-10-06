import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  LogOut, 
  User as UserIcon, 
  Mail, 
  Lock,
  Eye,
  EyeOff,
  Bookmark, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Loader2, 
  FileText,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFirebaseAuthErrorMessage } from '../lib/firebase';
import { ICDD_PROJECTS } from '../data/projects';
import { Project } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  onOpenQuoteModal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenQuoteModal,
}) => {
  const { 
    user, 
    loading, 
    favorites, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    resetPassword, 
    signOut 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    resetMessages();
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      console.error('Google Sign-In Error:', err);
      setError(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!email.trim() || !password) {
      setError('Veuillez renseigner votre email et mot de passe.');
      return;
    }
    setIsSubmitting(true);
    try {
      await signInWithEmail(email, password);
      onClose();
    } catch (err) {
      console.error('Email login error:', err);
      setError(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!displayName.trim()) {
      setError('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!email.trim()) {
      setError('Veuillez renseigner votre adresse email.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setIsSubmitting(true);
    try {
      await signUpWithEmail(email, password, displayName);
      onClose();
    } catch (err) {
      console.error('Registration error:', err);
      setError(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!email.trim()) {
      setError('Veuillez renseigner votre email.');
      return;
    }
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setSuccess(`Lien envoyé avec succès à ${email.trim()}.`);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  const favoriteProjects = ICDD_PROJECTS.filter((p) => favorites.includes(p.id));

  return (
    <div 
      id="auth-google-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md my-auto bg-slate-900 border border-white/20 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#005EA6]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#00D7FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Fermer la boîte de dialogue"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* ========================================================= */
          /* CONNECTED STATE: Profil & Favoris                         */
          /* ========================================================= */
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3.5">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#005EA6] to-[#00D7FF] text-white flex items-center justify-center text-xl font-bold shadow-md">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || <UserIcon className="w-6 h-6" />}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-white truncate">
                    {user.displayName || 'Client ICDD'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    Membre
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Compte vérifié & actif</span>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Projets favoris</span>
                  <Bookmark className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="text-xl font-extrabold text-white">
                  {favorites.length}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Sauvegardés dans le cloud
                </span>
              </div>

              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Consultations</span>
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xl font-extrabold text-white">
                  Accès direct
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Devis & estimation auto
                </span>
              </div>
            </div>

            {/* Saved Projects List if any */}
            {favoriteProjects.length > 0 ? (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">
                    Vos réalisations favorites
                  </span>
                  <span className="text-[11px] text-sky-300 font-semibold">
                    {favoriteProjects.length}
                  </span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {favoriteProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (onSelectProject) {
                          onSelectProject(p);
                          onClose();
                        }
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 transition-colors cursor-pointer group"
                    >
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {p.category} • {p.location}
                        </div>
                      </div>
                      <Bookmark className="w-3.5 h-3.5 text-sky-400 fill-sky-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-center">
                <Sparkles className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <p className="text-xs text-slate-300 font-medium">
                  Aucun projet sauvegardé pour le moment.
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Cliquez sur l'icône marque-page sur les projets pour les retrouver ici.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-2 flex flex-col gap-2">
              {onOpenQuoteModal && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuoteModal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#005EA6] to-[#0077c8] hover:from-[#006ec4] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98 border border-sky-400/30"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-sky-200" />
                  <span>Demander un devis personnalisé</span>
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* LOGGED OUT STATE: Formulaire Email / Mot de passe         */
          /* ========================================================= */
          <div className="space-y-4">
            
            {/* Header */}
            <div className="text-center space-y-1 pt-1">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#005EA6] to-[#00D7FF] text-white flex items-center justify-center mx-auto shadow-md shadow-[#005EA6]/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                {mode === 'register' ? 'Créer un Compte ICDD' : mode === 'forgot' ? 'Réinitialisation' : 'Connexion ICDD'}
              </h3>
              <p className="text-[11px] text-slate-300 max-w-xs mx-auto">
                {mode === 'register'
                  ? 'Inscrivez-vous pour enregistrer vos projets et gérer vos devis.'
                  : mode === 'forgot'
                  ? 'Recevez un lien par email pour redéfinir votre mot de passe.'
                  : 'Connectez-vous par email et mot de passe ou via Google.'}
              </p>
            </div>

            {/* Mode switch */}
            {mode !== 'forgot' && (
              <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-800 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setMode('login');
                  }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    mode === 'login' ? 'bg-[#005EA6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setMode('register');
                  }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    mode === 'register' ? 'bg-[#005EA6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  S'inscrire
                </button>
              </div>
            )}

            {/* Error / Success Banners */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-snug">{success}</span>
              </div>
            )}

            {/* Mode: Login */}
            {mode === 'login' && (
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-300">Mot de passe</label>
                    <button
                      type="button"
                      onClick={() => {
                        resetMessages();
                        setMode('forgot');
                      }}
                      className="text-[10px] text-sky-300 hover:underline"
                    >
                      Oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Mode: Register */}
            {mode === 'register' && (
              <form onSubmit={handleEmailRegister} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Nom et prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="M. / Mme Prénom et Nom"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Mot de passe (min. 6 car.)</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Confirmer mot de passe</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#005EA6] hover:bg-[#004f8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Créer mon compte</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Mode: Forgot Password */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <p className="text-xs text-slate-300">
                  Saisissez votre email. Nous vous transmettrons un lien de réinitialisation.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-xs border border-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetMessages();
                      setMode('login');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2 px-4 rounded-xl bg-[#005EA6] hover:bg-[#004f8c] text-white font-bold text-xs"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Envoyer le lien'}
                  </button>
                </div>
              </form>
            )}

            {/* OR Google */}
            {mode !== 'forgot' && (
              <>
                <div className="relative my-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <span className="relative px-2.5 bg-slate-900 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    ou
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 active:scale-98 text-slate-900 font-extrabold text-xs shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-4 h-4 text-slate-900 animate-spin" />
                  ) : (
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
                  )}
                  <span>Continuer avec Google</span>
                </button>
              </>
            )}

            <p className="text-[10px] text-slate-400 text-center pt-1">
              Connexion sécurisée aux normes de protection ICDD.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
