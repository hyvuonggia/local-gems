import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Location, Review } from '../../types';
import FirebaseService from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';

interface LocationDetailsScreenProps {
  locationId: string;
}

const LocationDetailsScreen: React.FC<LocationDetailsScreenProps> = ({ locationId }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadLocationDetails();
    loadReviews();
    checkBookmarkStatus();
  }, [locationId]);

  const loadLocationDetails = async () => {
    try {
      const locationData = await FirebaseService.getLocation(locationId);
      setLocation(locationData);
    } catch (error) {
      console.error('Error loading location:', error);
      Alert.alert('Error', 'Failed to load location details');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const reviewsData = await FirebaseService.getReviews(locationId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const checkBookmarkStatus = async () => {
    if (!user) return;
    
    try {
      const bookmarkedLocations = await FirebaseService.getBookmarkedLocations(user.uid);
      setIsBookmarked(bookmarkedLocations.some(loc => loc.locationId === locationId));
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to bookmark locations');
      return;
    }

    try {
      await FirebaseService.toggleBookmark(user.uid, locationId);
      setIsBookmarked(!isBookmarked);
      Alert.alert('Success', isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      Alert.alert('Error', 'Failed to update bookmark');
    }
  };

  const handleGetDirections = async () => {
    if (!location) return;

    const { latitude, longitude } = location.coordinates;
    const url = Platform.OS === 'ios' 
      ? `maps:0,0?q=${latitude},${longitude}`
      : `geo:0,0?q=${latitude},${longitude}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No map application found');
      }
    } catch (error) {
      console.error('Error opening directions:', error);
      Alert.alert('Error', 'Failed to open directions');
    }
  };

  const handleAddReview = () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to add reviews');
      return;
    }
    // Navigate to add review screen
    Alert.alert('Add Review', 'This will open the add review screen');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '⭐' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  const renderTags = (tags: string[]) => {
    return tags.map((tag, index) => (
      <View key={index} style={styles.tag}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.errorContainer}>
        <Text>Location not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Gallery */}
      {location.imageUrls.length > 0 && (
        <ScrollView horizontal style={styles.imageGallery} showsHorizontalScrollIndicator={false}>
          {location.imageUrls.map((imageUrl, index) => (
            <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
          ))}
        </ScrollView>
      )}

      {/* Location Info */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{location.name}</Text>
          <TouchableOpacity onPress={handleBookmark}>
            <Text style={styles.bookmarkIcon}>
              {isBookmarked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.address}>{location.address}</Text>
        
        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(Math.round(location.averageRating))}
          </View>
          <Text style={styles.ratingText}>
            {location.averageRating.toFixed(1)} ({reviews.length} reviews)
          </Text>
        </View>

        {/* Tags */}
        {location.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {renderTags(location.tags)}
          </View>
        )}

        {/* Description */}
        <Text style={styles.description}>{location.description}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.directionsButton} onPress={handleGetDirections}>
            <Text style={styles.buttonText}>Get Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.reviewButton} onPress={handleAddReview}>
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first to review!</Text>
          ) : (
            reviews.map((review) => (
              <View key={review.reviewId} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.starsContainer}>
                    {renderStars(review.rating)}
                  </View>
                  <Text style={styles.reviewDate}>
                    {review.createdAt.toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGallery: {
    height: 200,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 10,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  bookmarkIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  address: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  star: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  directionsButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  noReviews: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingVertical: 20,
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  reviewComment: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
});

export default LocationDetailsScreen;
