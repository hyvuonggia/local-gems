import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Location } from '../../types';
import FirebaseService from '../../services/firebase';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const results = await FirebaseService.searchLocations(searchQuery.trim());
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
      Alert.alert('Error', 'Failed to search locations');
    } finally {
      setLoading(false);
    }
  };

  const renderLocationItem = (location: Location) => (
    <TouchableOpacity key={location.locationId} style={styles.locationItem}>
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.locationDescription}>{location.description}</Text>
      <Text style={styles.locationAddress}>{location.address}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ {location.averageRating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.title}>Search Hidden Gems</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search places worldwide..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Searching...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          searchResults.map(renderLocationItem)
        ) : searchQuery.length > 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          </View>
        ) : (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              Enter a search term to find hidden gems around the world
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchHeader: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#3498db',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  locationDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  locationAddress: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  instructionsText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default SearchScreen;
