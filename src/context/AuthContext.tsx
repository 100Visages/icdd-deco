import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  loginWithGoogle, 
  loginWithEmail,
  registerWithEmail,
  resetUserPassword,
  logoutUser, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { supabase, signInWithSupabaseGoogle, signOutSupabase } from '../lib/supabase';
import { Project } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: string[];
  signIn: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithSupabase: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  toggleFavorite: (project: Project) => Promise<void>;
  isFavorite: (projectId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  favorites: [],
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signInWithSupabase: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  resetPassword: async () => {},
  signOut: async () => {},
  toggleFavorite: async () => {},
  isFavorite: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // 1. Écoute de l'authentification Firebase
    const unsubscribeFirebase = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // Vérifie si une session Supabase active existe
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            const adaptedUser = {
              uid: session.user.id,
              email: session.user.email,
              displayName: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0],
              photoURL: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
              emailVerified: !!session.user.email_confirmed_at,
            } as unknown as User;
            setUser(adaptedUser);
          } else {
            setUser(null);
          }
          setLoading(false);
        });
      }
    });

    // 2. Écoute de l'authentification Supabase (OAuth Google)
    const { data: { subscription: unsubscribeSupabase } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && !auth.currentUser) {
        const adaptedUser = {
          uid: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0],
          photoURL: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
          emailVerified: !!session.user.email_confirmed_at,
        } as unknown as User;
        setUser(adaptedUser);
        setLoading(false);
      } else if (!session && !auth.currentUser) {
        setUser(null);
      }
    });

    return () => {
      unsubscribeFirebase();
      unsubscribeSupabase.unsubscribe();
    };
  }, []);

  // Sync favorites in real-time when user is authenticated
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const favPath = `users/${user.uid}/favorites`;
    const favCollectionRef = collection(db, 'users', user.uid, 'favorites');

    const unsubscribeFavorites = onSnapshot(
      favCollectionRef,
      (snapshot) => {
        const favIds = snapshot.docs.map(doc => doc.id);
        setFavorites(favIds);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, favPath);
      }
    );

    return () => unsubscribeFavorites();
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.warn('Firebase Google Auth a échoué, tentative via Supabase Google OAuth...', error);
      try {
        await signInWithSupabaseGoogle();
      } catch {
        throw error;
      }
    }
  };

  const signInWithSupabase = async () => {
    try {
      await signInWithSupabaseGoogle();
    } catch (error) {
      console.error('Erreur Supabase Google OAuth:', error);
      throw error;
    }
  };

  const signIn = signInWithGoogle;

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      await registerWithEmail(email, password, displayName);
    } catch (error) {
      console.error('Email registration error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await resetUserPassword(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Promise.allSettled([logoutUser(), signOutSupabase()]);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isFavorite = (projectId: string) => favorites.includes(projectId);

  const toggleFavorite = async (project: Project) => {
    if (!user) {
      // If not logged in, prompt user to sign in
      await signInWithGoogle();
      return;
    }

    const docPath = `users/${user.uid}/favorites/${project.id}`;
    const favDocRef = doc(db, 'users', user.uid, 'favorites', project.id);

    try {
      if (isFavorite(project.id)) {
        await deleteDoc(favDocRef);
      } else {
        await setDoc(favDocRef, {
          projectId: project.id,
          projectTitle: project.title,
          savedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(
        error, 
        isFavorite(project.id) ? OperationType.DELETE : OperationType.WRITE, 
        docPath
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        favorites,
        signIn,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        signOut,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
