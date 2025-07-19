import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Location } from '../../types';
import FirebaseService from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';

const MapScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView>(null);
  const { user } = useAuth();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    loadLocationsInArea();
  }, [region]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Local Gems needs access to your location to show nearby spots',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // iOS permissions are handled through Info.plist
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
      },
      (error) => {
        console.error('Error getting location:', error);
        Alert.alert('Location Error', 'Unable to get your current location');
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 10000 
      }
    );
  };

  const loadLocationsInArea = async () => {
    setLoading(true);
    try {
      const nearbyLocations = await FirebaseService.getLocationsInArea(
        region.latitude,
        region.longitude,
        10 // 10km radius
      );
      setLocations(nearbyLocations);
    } catch (error) {
      console.error('Error loading locations:', error);
      Alert.alert('Error', 'Failed to load nearby locations');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (location: Location) => {
    // Navigate to location details
    // This will be implemented when navigation is set up
    Alert.alert(location.name, location.description);
  };

  const handleAddNewLocation = () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to add new locations');
      return;
    }
    // Navigate to add new location screen
    // This will be implemented when navigation is set up
    Alert.alert('Add Location', 'This will open the add location screen');
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={false}
        loadingEnabled={loading}
      >
        {locations.map((location) => (
          <Marker
            key={location.locationId}
            coordinate={{
              latitude: location.coordinates.latitude,
              longitude: location.coordinates.longitude,
            }}
            title={location.name}
            description={location.description}
            onPress={() => handleMarkerPress(location)}
          />
        ))}
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
      >
        <Text style={styles.buttonText}>📍</Text>
      </TouchableOpacity>

      {/* Add New Location Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddNewLocation}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* View Toggle Button (Map/List) */}
      <TouchableOpacity
        style={styles.viewToggleButton}
        onPress={() => Alert.alert('List View', 'This will toggle to list view')}
      >
        <Text style={styles.buttonText}>📋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButton: {
    position: 'absolute',
    bottom: 160,
    right: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  viewToggleButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 20,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;
