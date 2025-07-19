import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Simple mock context for web
interface User {
  id: number;
  name: string;
  email: string;
}

const AuthContext = React.createContext<{
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
});

// Simple auth provider for web
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  const login = () => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setUser({ id: 1, name: 'Demo User', email: 'demo@localgems.com' });
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Simple Login Screen for web
const LoginScreen = () => {
  const { login, loading } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Local Gems</Text>
      <Text style={styles.subtitle}>Discover amazing places around you</Text>
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Welcome Back!</Text>
        <Text style={styles.loginSubtitle}>Sign in to continue exploring</Text>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={login}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Signing In...' : 'Sign In with Demo Account'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.webNote}>
          Web version • Full features coming soon
        </Text>
      </View>
    </View>
  );
};

// Simple Main Screen for web
const MainScreen = () => {
  const { user, logout } = useAuth();
  const [currentScreen, setCurrentScreen] = React.useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'discover':
        return <DiscoverScreen onBack={() => setCurrentScreen('home')} />;
      case 'search':
        return <SearchScreen onBack={() => setCurrentScreen('home')} />;
      case 'collections':
        return <CollectionsScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🗺️ Local Gems</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      {renderScreen()}
    </View>
  );
};

// Home Screen Component
const HomeScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const { user } = useAuth();

  return (
    <View style={styles.mainContent}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
        <Text style={styles.welcomeSubtext}>
          Ready to discover amazing places around you?
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity 
          style={styles.featureItem} 
          onPress={() => onNavigate('discover')}
        >
          <Text style={styles.featureIcon}>🗺️</Text>
          <Text style={styles.featureTitle}>Discover</Text>
          <Text style={styles.featureText}>Find hidden gems near you</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureItem} 
          onPress={() => onNavigate('search')}
        >
          <Text style={styles.featureIcon}>🔍</Text>
          <Text style={styles.featureTitle}>Search</Text>
          <Text style={styles.featureText}>Search for specific places</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureItem} 
          onPress={() => onNavigate('collections')}
        >
          <Text style={styles.featureIcon}>📋</Text>
          <Text style={styles.featureTitle}>Collections</Text>
          <Text style={styles.featureText}>Save your favorite spots</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.comingSoon}>
        Full navigation and map features coming to web soon!
      </Text>
    </View>
  );
};

// Discover Screen
const DiscoverScreen = ({ onBack }: { onBack: () => void }) => {
  const [locations] = React.useState([
    { id: 1, name: 'Hidden Waterfall', type: 'Nature', rating: 4.8, distance: '2.3 km' },
    { id: 2, name: 'Local Art Gallery', type: 'Culture', rating: 4.6, distance: '1.1 km' },
    { id: 3, name: 'Rooftop Café', type: 'Food', rating: 4.9, distance: '0.8 km' },
    { id: 4, name: 'Secret Garden', type: 'Nature', rating: 4.7, distance: '3.2 km' },
  ]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Discover Places</Text>
      </View>

      <Text style={styles.sectionTitle}>Hidden Gems Near You</Text>
      
      <View style={styles.locationsList}>
        {locations.map((location) => (
          <View key={location.id} style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationRating}>⭐ {location.rating}</Text>
            </View>
            <Text style={styles.locationType}>{location.type}</Text>
            <Text style={styles.locationDistance}>📍 {location.distance} away</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Search Screen
const SearchScreen = ({ onBack }: { onBack: () => void }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const handleSearch = () => {
    // Mock search results
    const mockResults = [
      { id: 1, name: 'Coffee Bean Café', type: 'Restaurant', rating: 4.5 },
      { id: 2, name: 'City Park', type: 'Nature', rating: 4.3 },
      { id: 3, name: 'Museum of Arts', type: 'Culture', rating: 4.7 },
    ];
    setSearchResults(mockResults);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Search Places</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>What are you looking for?</Text>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchInput} onPress={() => {
            // In a real app, this would be a TextInput
            setSearchQuery('Local restaurants');
            handleSearch();
          }}>
            {searchQuery || 'Tap to search for places...'}
          </Text>
        </View>
      </View>

      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {searchResults.map((result) => (
            <View key={result.id} style={styles.locationCard}>
              <Text style={styles.locationName}>{result.name}</Text>
              <Text style={styles.locationType}>{result.type}</Text>
              <Text style={styles.locationRating}>⭐ {result.rating}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Collections Screen
const CollectionsScreen = ({ onBack }: { onBack: () => void }) => {
  const [collections] = React.useState([
    { id: 1, name: 'Favorite Restaurants', count: 12, icon: '🍽️' },
    { id: 2, name: 'Nature Spots', count: 8, icon: '🌿' },
    { id: 3, name: 'Weekend Plans', count: 5, icon: '📅' },
  ]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>My Collections</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Saved Places</Text>
      
      <View style={styles.collectionsList}>
        {collections.map((collection) => (
          <View key={collection.id} style={styles.collectionCard}>
            <Text style={styles.collectionIcon}>{collection.icon}</Text>
            <View style={styles.collectionInfo}>
              <Text style={styles.collectionName}>{collection.name}</Text>
              <Text style={styles.collectionCount}>{collection.count} places</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Create New Collection</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>🗺️</Text>
        <Text style={styles.loadingSubtext}>Loading Local Gems...</Text>
      </View>
    );
  }

  return user ? <MainScreen /> : <LoginScreen />;
};

// Main App Component
const WebApp = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingSubtext: {
    fontSize: 18,
    color: '#6c757d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 40,
  },
  mainContent: {
    flex: 1,
  },
  loginContainer: {
    margin: 20,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  webNote: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  welcomeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    margin: 10,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  comingSoon: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: 20,
  },
  // New styles for screens
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 6,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  locationsList: {
    flex: 1,
  },
  locationCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  locationRating: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: '600',
  },
  locationType: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 14,
    color: '#3498db',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  searchInputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  searchInput: {
    fontSize: 16,
    color: '#2c3e50',
    minHeight: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  collectionsList: {
    flex: 1,
  },
  collectionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  collectionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  collectionCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WebApp;
