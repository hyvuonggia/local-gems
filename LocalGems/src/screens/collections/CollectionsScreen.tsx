import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Collection } from '../../types';
import FirebaseService from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';

const CollectionsScreen: React.FC = () => {
  const [myCollections, setMyCollections] = useState<Collection[]>([]);
  const [publicCollections, setPublicCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my' | 'public'>('my');
  const { user } = useAuth();

  useEffect(() => {
    loadCollections();
  }, [user]);

  const loadCollections = async () => {
    setLoading(true);
    try {
      if (user) {
        const userCollections = await FirebaseService.getUserCollections(user.uid);
        setMyCollections(userCollections);
      }
      
      const publicCollectionsData = await FirebaseService.getPublicCollections();
      setPublicCollections(publicCollectionsData);
    } catch (error) {
      console.error('Error loading collections:', error);
      Alert.alert('Error', 'Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to create collections');
      return;
    }
    // Navigate to create collection screen
    Alert.alert('Create Collection', 'This will open the create collection screen');
  };

  const renderCollectionItem = (collection: Collection) => (
    <TouchableOpacity key={collection.collectionId} style={styles.collectionItem}>
      <Text style={styles.collectionName}>{collection.name}</Text>
      <Text style={styles.collectionDescription}>{collection.description}</Text>
      <Text style={styles.collectionInfo}>
        {collection.locationIds.length} locations • {collection.isPublic ? 'Public' : 'Private'}
      </Text>
      <Text style={styles.collectionDate}>
        Created {collection.createdAt.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collections</Text>
        {user && (
          <TouchableOpacity style={styles.createButton} onPress={handleCreateCollection}>
            <Text style={styles.createButtonText}>+ Create</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
            My Collections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'public' && styles.activeTab]}
          onPress={() => setActiveTab('public')}
        >
          <Text style={[styles.tabText, activeTab === 'public' && styles.activeTabText]}>
            Public Collections
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading collections...</Text>
          </View>
        ) : activeTab === 'my' ? (
          user ? (
            myCollections.length > 0 ? (
              myCollections.map(renderCollectionItem)
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No collections yet</Text>
                <Text style={styles.emptySubtext}>Create your first collection to organize your favorite places</Text>
              </View>
            )
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Please log in to view your collections</Text>
            </View>
          )
        ) : (
          publicCollections.length > 0 ? (
            publicCollections.map(renderCollectionItem)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No public collections available</Text>
            </View>
          )
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  createButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  collectionItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  collectionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  collectionInfo: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 5,
  },
  collectionDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default CollectionsScreen;
