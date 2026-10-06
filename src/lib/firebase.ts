import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId and long polling enabled for proxy/iframe compatibility
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  firebaseConfig.firestoreDatabaseId
); /* CRITICAL: The app will break without this line */

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Auth helpers
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email.trim(), password);
};

export const registerWithEmail = async (email: string, password: string, displayName?: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName: displayName.trim() });
  }
  return userCredential;
};

export const resetUserPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email.trim());
};

export const logoutUser = async () => {
  return await signOut(auth);
};

// Translate Firebase Auth error codes to user-friendly French messages
export function getFirebaseAuthErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return "Une erreur inattendue est survenue.";
  const errCode = (error as { code?: string }).code || '';
  switch (errCode) {
    case 'auth/user-not-found':
      return "Aucun compte n'a été trouvé avec cette adresse email.";
    case 'auth/wrong-password':
      return "Le mot de passe saisi est incorrect.";
    case 'auth/invalid-credential':
      return "Adresse email ou mot de passe incorrect. Veuillez vérifier vos identifiants.";
    case 'auth/email-already-in-use':
      return "Cette adresse email est déjà associée à un compte ICDD. Veuillez vous connecter.";
    case 'auth/weak-password':
      return "Le mot de passe doit comporter au moins 6 caractères.";
    case 'auth/invalid-email':
      return "Veuillez saisir une adresse email valide.";
    case 'auth/missing-password':
      return "Veuillez renseigner votre mot de passe.";
    case 'auth/too-many-requests':
      return "Trop de tentatives infructueuses. Veuillez patienter un instant avant de réessayer.";
    case 'auth/network-request-failed':
      return "Problème de connexion réseau. Veuillez vérifier votre connexion internet.";
    case 'auth/popup-closed-by-user':
      return "La fenêtre de connexion Google a été fermée avant la validation.";
    case 'auth/cancelled-popup-request':
      return "Connexion annulée.";
    default:
      return (error as { message?: string }).message || "Une erreur est survenue lors de l'authentification.";
  }
}

// Error handling conforming to Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot (optional & non-blocking)
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('unavailable'))) {
      console.warn("Firestore running in offline or long-polling fallback mode.");
    }
  }
}

// Automatically verify connection on module load without blocking
testConnection().catch(() => {});
