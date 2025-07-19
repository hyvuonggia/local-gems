import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { User, AuthContextType } from '../types';
import FirebaseService from '../services/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // From Firebase console
    });

    // Listen for authentication state changes
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser: FirebaseAuthTypes.User | null) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          let userData = await FirebaseService.getUser(firebaseUser.uid);
          
          if (!userData) {
            // Create user document if it doesn't exist
            const newUser: Omit<User, 'uid'> = {
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              bookmarkedLocationIds: [],
              points: 0,
              badges: [],
            };
            
            await FirebaseService.createUser(newUser);
            userData = { ...newUser, uid: firebaseUser.uid };
          }
          
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      
      // Update the user's display name
      await result.user.updateProfile({
        displayName,
      });
      
      // Create user document in Firestore
      const newUser: Omit<User, 'uid'> = {
        email,
        displayName,
        photoURL: '',
        bookmarkedLocationIds: [],
        points: 0,
        badges: ['first-gem'], // Award first badge
      };
      
      await FirebaseService.createUser(newUser);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
