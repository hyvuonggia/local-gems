// User types based on Firestore schema
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bookmarkedLocationIds: string[];
  points: number;
  badges: string[];
}

// Location types based on Firestore schema
export interface Location {
  locationId: string;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  imageUrls: string[];
  tags: string[];
  creatorId: string;
  createdAt: Date;
  averageRating: number;
}

// Review types (sub-collection within locations)
export interface Review {
  reviewId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

// Collection types based on Firestore schema
export interface Collection {
  collectionId: string;
  name: string;
  description: string;
  creatorId: string;
  locationIds: string[];
  isPublic: boolean;
  createdAt: Date;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  MapDiscover: undefined;
  Search: undefined;
  Collections: undefined;
  Profile: undefined;
};

export type MapStackParamList = {
  MapView: undefined;
  LocationDetails: { locationId: string };
  AddNewLocation: undefined;
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  FilterOptions: undefined;
};

export type CollectionsStackParamList = {
  MyCollections: undefined;
  PublicCollections: undefined;
  CollectionDetails: { collectionId: string };
};

export type ProfileStackParamList = {
  UserProfile: undefined;
  SavedLocations: undefined;
  Settings: undefined;
  OfflineDownloads: undefined;
};

// Auth context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}
