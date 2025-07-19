import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/MockAuthContext';

const SimpleMapScreen: React.FC = () => {
  const { user } = useAuth();

  const handleAddLocation = () => {
    Alert.alert('Add Location', 'This will open the add location screen');
  };

  const handleSearch = () => {
    Alert.alert('Search', 'This will open the search functionality');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Local Gems</Text>
        <Text style={styles.subtitle}>Welcome, {user?.displayName}!</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🗺️</Text>
        <Text style={styles.mapLabel}>Interactive Map</Text>
        <Text style={styles.mapDescription}>
          Google Maps integration will show hidden gems here
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddLocation}>
          <Text style={styles.buttonText}>➕ Add New Gem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>🔍 Search Locations</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>App Features:</Text>
        <Text style={styles.infoItem}>✅ User Authentication</Text>
        <Text style={styles.infoItem}>✅ Navigation Structure</Text>
        <Text style={styles.infoItem}>✅ Screen Components</Text>
        <Text style={styles.infoItem}>🔄 Firebase Integration (Next)</Text>
        <Text style={styles.infoItem}>🔄 Google Maps (Next)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  mapText: {
    fontSize: 60,
    marginBottom: 10,
  },
  mapLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  mapDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
});

export default SimpleMapScreen;
