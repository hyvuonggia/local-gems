import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

interface Location {
  id: number;
  name: string;
  type: string;
  rating: number;
  distance: string;
  description: string;
  coordinates: { lat: number; lng: number };
  isBookmarked?: boolean;
}

const WebMapScreen = () => {
  const [locations, setLocations] = useState<Location[]>([
    { 
      id: 1, 
      name: 'Hidden Waterfall', 
      type: 'Nature', 
      rating: 4.8, 
      distance: '2.3 km',
      description: 'A beautiful secluded waterfall perfect for hiking and photography.',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      isBookmarked: false
    },
    { 
      id: 2, 
      name: 'Local Art Gallery', 
      type: 'Culture', 
      rating: 4.6, 
      distance: '1.1 km',
      description: 'Contemporary art gallery featuring local artists.',
      coordinates: { lat: 37.7849, lng: -122.4094 },
      isBookmarked: true
    },
    { 
      id: 3, 
      name: 'Rooftop Café', 
      type: 'Food', 
      rating: 4.9, 
      distance: '0.8 km',
      description: 'Cozy café with amazing city views and great coffee.',
      coordinates: { lat: 37.7649, lng: -122.4294 },
      isBookmarked: false
    },
    { 
      id: 4, 
      name: 'Secret Garden', 
      type: 'Nature', 
      rating: 4.7, 
      distance: '3.2 km',
      description: 'A peaceful garden hidden in the heart of the city.',
      coordinates: { lat: 37.7549, lng: -122.4394 },
      isBookmarked: false
    },
    { 
      id: 5, 
      name: 'Jazz Club Downtown', 
      type: 'Entertainment', 
      rating: 4.5, 
      distance: '1.8 km',
      description: 'Intimate jazz club with live music every night.',
      coordinates: { lat: 37.7949, lng: -122.3994 },
      isBookmarked: false
    },
    { 
      id: 6, 
      name: 'Mountain View Point', 
      type: 'Nature', 
      rating: 4.9, 
      distance: '5.1 km',
      description: 'Breathtaking views of the city and surrounding mountains.',
      coordinates: { lat: 37.7349, lng: -122.4594 },
      isBookmarked: true
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);

  const locationTypes = ['All', 'Nature', 'Food', 'Culture', 'Entertainment'];

  useEffect(() => {
    let filtered = locations;

    // Filter by type
    if (filterType !== 'All') {
      filtered = filtered.filter(location => location.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLocations(filtered);
  }, [locations, filterType, searchQuery]);

  const toggleBookmark = (locationId: number) => {
    setLocations(prevLocations =>
      prevLocations.map(location =>
        location.id === locationId
          ? { ...location, isBookmarked: !location.isBookmarked }
          : location
      )
    );
  };

  const addNewLocation = () => {
    Alert.alert(
      'Add New Location',
      'This feature will allow you to add new hidden gems to the map. Coming soon!',
      [{ text: 'OK' }]
    );
  };

  const getDirections = (location: Location) => {
    Alert.alert(
      'Get Directions',
      `Getting directions to ${location.name}. In a real app, this would open maps with navigation.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🗺️ Discover</Text>
        <Text style={styles.headerSubtitle}>Hidden gems near you</Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewLocation}>
          <Text style={styles.addButtonText}>+ Add Location</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
          {locationTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filterType === type && styles.filterButtonActive
              ]}
              onPress={() => setFilterType(type)}
            >
              <Text style={[
                styles.filterButtonText,
                filterType === type && styles.filterButtonTextActive
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Mock Map Area */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>🗺️ Interactive Map</Text>
        <Text style={styles.mapNote}>
          Web map integration coming soon
        </Text>
        
        {/* Map pins mockup */}
        <View style={styles.mapPins}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.mapPin,
                { 
                  left: `${20 + (location.id * 15)}%`, 
                  top: `${30 + (location.id * 10)}%` 
                }
              ]}
              onPress={() => setSelectedLocation(location)}
            >
              <Text style={styles.pinIcon}>📍</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Location Details */}
      {selectedLocation && (
        <View style={styles.locationDetails}>
          <Text style={styles.locationName}>{selectedLocation.name}</Text>
          <Text style={styles.locationType}>{selectedLocation.type}</Text>
          <Text style={styles.locationRating}>⭐ {selectedLocation.rating}</Text>
          <Text style={styles.locationDistance}>📍 {selectedLocation.distance} away</Text>
          <Text style={styles.locationDescription}>{selectedLocation.description}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.directionsButton}
              onPress={() => getDirections(selectedLocation)}
            >
              <Text style={styles.buttonText}>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.saveButton,
                selectedLocation.isBookmarked && styles.savedButton
              ]}
              onPress={() => toggleBookmark(selectedLocation.id)}
            >
              <Text style={styles.buttonText}>
                {selectedLocation.isBookmarked ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Nearby Places List */}
      <ScrollView style={styles.nearbyList}>
        <Text style={styles.sectionTitle}>
          {filterType === 'All' ? 'Nearby Places' : `${filterType} Places`} 
          ({filteredLocations.length})
        </Text>
        {filteredLocations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={styles.locationCard}
            onPress={() => setSelectedLocation(location)}
          >
            <View style={styles.locationHeader}>
              <Text style={styles.cardLocationName}>{location.name}</Text>
              <View style={styles.cardLocationActions}>
                <TouchableOpacity
                  style={styles.bookmarkButton}
                  onPress={() => toggleBookmark(location.id)}
                >
                  <Text style={styles.bookmarkIcon}>
                    {location.isBookmarked ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.cardLocationRating}>⭐ {location.rating}</Text>
              </View>
            </View>
            <Text style={styles.cardLocationType}>{location.type}</Text>
            <Text style={styles.cardLocationDistance}>📍 {location.distance} away</Text>
            <Text style={styles.cardLocationDescription} numberOfLines={2}>
              {location.description}
            </Text>
          </TouchableOpacity>
        ))}
        
        {filteredLocations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No locations found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filter criteria
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
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#ecf0f1',
    margin: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mapPlaceholder: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapNote: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  mapPins: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mapPin: {
    position: 'absolute',
    padding: 4,
  },
  pinIcon: {
    fontSize: 24,
  },
  locationDetails: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  locationType: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  locationRating: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 12,
  },
  locationDescription: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  directionsButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  nearbyList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
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
    marginBottom: 6,
  },
  cardLocationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  cardLocationRating: {
    fontSize: 12,
    color: '#f39c12',
    fontWeight: '600',
  },
  cardLocationType: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  cardLocationDistance: {
    fontSize: 12,
    color: '#3498db',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  searchSection: {
    padding: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  cardLocationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkButton: {
    marginRight: 8,
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 16,
  },
  cardLocationDescription: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
    lineHeight: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#adb5bd',
    textAlign: 'center',
  },
  savedButton: {
    backgroundColor: '#27ae60',
  },
});

export default WebMapScreen;
