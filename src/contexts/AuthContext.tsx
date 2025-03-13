import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

type Role = 'student' | 'faculty' | 'startup' | 'mentor';

interface User {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, role: Role, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (userData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            role: userData.role,
            fullName: userData.fullName,
            profilePicture: userData.profilePicture
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, role: Role, userData: any) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email,
        role,
        fullName: userData.fullName,
        createdAt: new Date().toISOString()
      });

      await setDoc(doc(db, `${role}s`, firebaseUser.uid), userData);

      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        role,
        fullName: userData.fullName
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          role: userData.role,
          fullName: userData.fullName,
          profilePicture: userData.profilePicture
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const updateProfile = async (userData: FormData) => {
    try {
      if (!user) throw new Error('No user logged in');

      const updates = Object.fromEntries(userData);
      await updateDoc(doc(db, 'users', user.id), updates);
      
      const userDoc = await getDoc(doc(db, 'users', user.id));
      if (userDoc.exists()) {
        const updatedData = userDoc.data();
        setUser({
          ...user,
          fullName: updatedData.fullName,
          profilePicture: updatedData.profilePicture
        });
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };


  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}