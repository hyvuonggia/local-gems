import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isPublic: boolean;
}

const WebCollectionsScreen: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Favorite Cafes',
      description: 'My go-to coffee spots around the city',
      itemCount: 12,
      isPublic: true,
    },
    {
      id: '2',
      name: 'Hidden Gems',
      description: 'Secret spots only locals know about',
      itemCount: 8,
      isPublic: false,
    },
    {
      id: '3',
      name: 'Weekend Adventures',
      description: 'Perfect places for weekend getaways',
      itemCount: 15,
      isPublic: true,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        description: newCollectionDescription.trim(),
        itemCount: 0,
        isPublic: true,
      };
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
      setNewCollectionDescription('');
      setShowCreateForm(false);
    }
  };

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Collections</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreateForm(!showCreateForm)}
          >
            <Text style={styles.createButtonText}>
              {showCreateForm ? 'Cancel' : '+ New Collection'}
            </Text>
          </TouchableOpacity>
        </View>

        {showCreateForm && (
          <View style={styles.createForm}>
            <Text style={styles.formTitle}>Create New Collection</Text>
            <TextInput
              style={styles.input}
              placeholder="Collection name"
              value={newCollectionName}
              onChangeText={setNewCollectionName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              value={newCollectionDescription}
              onChangeText={setNewCollectionDescription}
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCreateCollection}
            >
              <Text style={styles.submitButtonText}>Create Collection</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.collectionsGrid}>
          {collections.map((collection) => (
            <View key={collection.id} style={styles.collectionCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.collectionName}>{collection.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCollection(collection.id)}
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.collectionDescription}>
                {collection.description}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemCount}>
                  {collection.itemCount} items
                </Text>
                <Text style={[
                  styles.visibility,
                  { color: collection.isPublic ? '#4CAF50' : '#FF9800' }
                ]}>
                  {collection.isPublic ? 'Public' : 'Private'}
                </Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Collection</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {collections.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No collections yet</Text>
            <Text style={styles.emptySubtext}>
              Create your first collection to start organizing your favorite places
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  createForm: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  collectionsGrid: {
    gap: 16,
  },
  collectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  collectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 12,
    color: '#999',
  },
  visibility: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default WebCollectionsScreen;
