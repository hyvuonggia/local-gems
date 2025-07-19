import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Location } from '../../types';
import FirebaseService from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const [bookmarkedLocations, setBookmarkedLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      loadBookmarkedLocations();
    }
  }, [user]);

  const loadBookmarkedLocations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const locations = await FirebaseService.getBookmarkedLocations(user.uid);
      setBookmarkedLocations(locations);
    } catch (error) {
      console.error('Error loading bookmarked locations:', error);
      Alert.alert('Error', 'Failed to load saved locations');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  const renderBookmarkedLocation = (location: Location) => (
    <TouchableOpacity key={location.locationId} style={styles.locationItem}>
      {location.imageUrls.length > 0 && (
        <Image source={{ uri: location.imageUrls[0] }} style={styles.locationImage} />
      )}
      <View style={styles.locationContent}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationDescription}>{location.description}</Text>
        <Text style={styles.locationAddress}>{location.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {location.averageRating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBadge = (badge: string) => (
    <View key={badge} style={styles.badge}>
      <Text style={styles.badgeText}>{badge}</Text>
    </View>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>Please log in to view your profile</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultProfileImage}>
              <Text style={styles.defaultProfileText}>
                {user.displayName ? user.displayName[0].toUpperCase() : '?'}
              </Text>
            </View>
          )}
          <Text style={styles.displayName}>{user.displayName || 'Anonymous User'}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{bookmarkedLocations.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Badges */}
        {user.badges.length > 0 && (
          <View style={styles.badgesContainer}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <View style={styles.badgesRow}>
              {user.badges.map(renderBadge)}
            </View>
          </View>
        )}
      </View>

      {/* Saved Locations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Locations</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading saved locations...</Text>
          </View>
        ) : bookmarkedLocations.length > 0 ? (
          bookmarkedLocations.map(renderBookmarkedLocation)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved locations yet</Text>
            <Text style={styles.emptySubtext}>Start exploring and save your favorite places!</Text>
          </View>
        )}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Edit Profile</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Offline Downloads</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy Settings</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Help & Support</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, styles.signOutItem]} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
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
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notLoggedInText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  profileHeader: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  defaultProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  defaultProfileText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  badgesContainer: {
    width: '100%',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  locationImage: {
    width: 80,
    height: 80,
  },
  locationContent: {
    flex: 1,
    padding: 15,
  },
  locationName: {
    fontSize: 16,
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
    marginBottom: 5,
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
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  settingText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  settingArrow: {
    fontSize: 18,
    color: '#bdc3c7',
  },
  signOutItem: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  signOutText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
  },
});

export default ProfileScreen;
