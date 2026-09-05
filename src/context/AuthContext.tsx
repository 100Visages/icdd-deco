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
  logoutUser, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { Project } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: string[];
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  toggleFavorite: (project: Project) => Promise<void>;
  isFavorite: (projectId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  favorites: [],
  signIn: async () => {},
  signOut: async () => {},
  toggleFavorite: async () => {},
  isFavorite: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
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

  const signIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isFavorite = (projectId: string) => favorites.includes(projectId);

  const toggleFavorite = async (project: Project) => {
    if (!user) {
      // If not logged in, prompt user to sign in
      await signIn();
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
