'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  signOut: () => Promise<void>;
  setGuestMode: (isGuest: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuest: false,
  signOut: async () => {},
  setGuestMode: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setIsGuest(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setIsGuest(false);
  };

  const setGuestMode = (isGuest: boolean) => {
    if (isGuest) {
      setUser(null);
    }
    setIsGuest(isGuest);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, isGuest, setGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};