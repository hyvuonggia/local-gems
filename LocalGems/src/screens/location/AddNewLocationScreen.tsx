import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { launchImageLibrary } from 'react-native-image-picker';
import { Location } from '../../types';
import FirebaseService from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';

const AddNewLocationScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    tags: [],
  });
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const mapRef = useRef<MapView>(null);

  const availableTags = [
    'Coffee', 'Food', 'Quiet', 'Good for Work', 'Family Friendly',
    'Pet Friendly', 'Outdoor Seating', 'Wi-Fi', 'Parking', 'Budget Friendly'
  ];

  const handleMapPress = (event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
    
    // Reverse geocoding would go here to get address
    // For now, we'll use a placeholder
    setFormData(prev => ({
      ...prev,
      address: `${coordinate.latitude.toFixed(4)}, ${coordinate.longitude.toFixed(4)}`
    }));
  };

  const handleImageSelection = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 5,
      },
      (response) => {
        if (response.assets) {
          const imageUris = response.assets
            .filter(asset => asset.uri)
            .map(asset => asset.uri!);
          setSelectedImages(prev => [...prev, ...imageUris]);
        }
      }
    );
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a name for the location');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (!selectedLocation) {
      Alert.alert('Error', 'Please select a location on the map');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to add locations');
      return;
    }

    setLoading(true);
    try {
      // Upload images first
      const imageUrls: string[] = [];
      for (let i = 0; i < selectedImages.length; i++) {
        const imageUri = selectedImages[i];
        const imagePath = `locations/${Date.now()}_${i}.jpg`;
        const downloadUrl = await FirebaseService.uploadImage(imageUri, imagePath);
        imageUrls.push(downloadUrl);
      }

      // Create location object
      const newLocation: Omit<Location, 'locationId' | 'createdAt'> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        coordinates: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        address: formData.address,
        imageUrls,
        tags: formData.tags,
        creatorId: user.uid,
        averageRating: 0,
      };

      // Save to Firestore
      await FirebaseService.createLocation(newLocation);

      Alert.alert('Success', 'Location added successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back or reset form
            resetForm();
          },
        },
      ]);
    } catch (error) {
      console.error('Error adding location:', error);
      Alert.alert('Error', 'Failed to add location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      tags: [],
    });
    setSelectedLocation(null);
    setSelectedImages([]);
  };

  const renderTags = () => {
    return availableTags.map((tag) => (
      <TouchableOpacity
        key={tag}
        style={[
          styles.tag,
          formData.tags.includes(tag) && styles.selectedTag
        ]}
        onPress={() => toggleTag(tag)}
      >
        <Text style={[
          styles.tagText,
          formData.tags.includes(tag) && styles.selectedTagText
        ]}>
          {tag}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add New Hidden Gem</Text>
        <Text style={styles.subtitle}>Share your favorite spot with the community</Text>

        {/* Map for location selection */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Select Location</Text>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={region}
            onPress={handleMapPress}
            onRegionChangeComplete={setRegion}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title="New Location"
                draggable
                onDragEnd={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
              />
            )}
          </MapView>
          <Text style={styles.mapHint}>
            Tap on the map to place a marker, or drag the marker to adjust the location
          </Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Location Name *"
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description *"
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={4}
          />

          <TextInput
            style={styles.input}
            placeholder="Address (auto-filled from map)"
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
            editable={false}
          />
        </View>

        {/* Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          
          <TouchableOpacity style={styles.imageButton} onPress={handleImageSelection}>
            <Text style={styles.imageButtonText}>📷 Add Photos</Text>
          </TouchableOpacity>

          {selectedImages.length > 0 && (
            <ScrollView horizontal style={styles.imagePreview} showsHorizontalScrollIndicator={false}>
              {selectedImages.map((imageUri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: imageUri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <Text style={styles.tagHint}>Select tags that describe this location</Text>
          <View style={styles.tagsContainer}>
            {renderTags()}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding Location...' : 'Add Location'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  mapContainer: {
    marginBottom: 30,
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  mapHint: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    marginTop: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagHint: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e1e8ed',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTag: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  tagText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  selectedTagText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewLocationScreen;
