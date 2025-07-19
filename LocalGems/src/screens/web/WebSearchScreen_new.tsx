import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

interface SearchResult {
  id: number;
  name: string;
  type: string;
  rating: number;
  distance: string;
  description: string;
  isBookmarked?: boolean;
}

const WebSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Coffee shops',
    'Art galleries',
    'Parks',
    'Restaurants'
  ]);

  const mockResults: SearchResult[] = [
    { id: 1, name: 'Blue Bottle Coffee', type: 'Café', rating: 4.5, distance: '0.3 km', description: 'Artisanal coffee roasters with minimalist aesthetic', isBookmarked: false },
    { id: 2, name: 'SF Museum of Modern Art', type: 'Museum', rating: 4.7, distance: '1.2 km', description: 'Contemporary art museum with world-class collections', isBookmarked: true },
    { id: 3, name: 'Golden Gate Park', type: 'Park', rating: 4.8, distance: '2.1 km', description: 'Large urban park with gardens, lakes, and trails', isBookmarked: false },
    { id: 4, name: 'Tartine Bakery', type: 'Bakery', rating: 4.6, distance: '0.8 km', description: 'Famous bakery known for pastries and bread', isBookmarked: false },
    { id: 5, name: 'Lombard Street', type: 'Landmark', rating: 4.4, distance: '1.5 km', description: 'The most crooked street in the world', isBookmarked: true },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockResults.filter(result =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 3)]);
      }
      
      setIsSearching(false);
    }, 1000);
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => handleSearch(), 100);
  };

  const toggleBookmark = (resultId: number) => {
    setSearchResults(prev =>
      prev.map(result =>
        result.id === resultId
          ? { ...result, isBookmarked: !result.isBookmarked }
          : result
      )
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Search</Text>
        <Text style={styles.headerSubtitle}>Find amazing places around you</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for places, restaurants, cafes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
        >
          <Text style={styles.searchButtonText}>
            {isSearching ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Recent Searches */}
        {searchResults.length === 0 && !isSearching && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.recentList}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentItem}
                  onPress={() => handleRecentSearch(search)}
                >
                  <Text style={styles.recentText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>
              Search Results ({searchResults.length})
            </Text>
            {searchResults.map((result) => (
              <View key={result.id} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultName}>{result.name}</Text>
                  <View style={styles.resultActions}>
                    <TouchableOpacity
                      style={styles.bookmarkButton}
                      onPress={() => toggleBookmark(result.id)}
                    >
                      <Text style={styles.bookmarkIcon}>
                        {result.isBookmarked ? '❤️' : '🤍'}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.resultRating}>⭐ {result.rating}</Text>
                  </View>
                </View>
                <Text style={styles.resultType}>{result.type}</Text>
                <Text style={styles.resultDistance}>📍 {result.distance} away</Text>
                <Text style={styles.resultDescription}>{result.description}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* No Results */}
        {searchResults.length === 0 && !isSearching && searchQuery.length > 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>
              Try searching with different keywords
            </Text>
          </View>
        )}

        {/* Loading */}
        {isSearching && (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>🔍</Text>
            <Text style={styles.loadingSubtext}>Searching for places...</Text>
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
  searchSection: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  recentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentItem: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  recentText: {
    fontSize: 14,
    color: '#666',
  },
  resultsSection: {
    flex: 1,
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  resultActions: {
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
  resultRating: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: '600',
  },
  resultType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  resultDistance: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  viewDetailsButton: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 32,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#666',
  },
});

export default WebSearchScreen;
