import React, { useState, useEffect } from 'react';
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>What are you looking for?</Text>
        <View style={styles.searchInputContainer}>
          <Text 
            style={styles.searchInput}
            onPress={() => handleSearch('restaurants')}
          >
            {searchQuery || 'Tap to search for places...'}
          </Text>
          {searchQuery && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Popular Searches */}
      {!searchQuery && (
        <View style={styles.popularContainer}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.popularGrid}>
            {popularSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularChip}
                onPress={() => handleSearch(search)}
              >
                <Text style={styles.popularChipText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Filters */}
      {searchQuery && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>All Types</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Within 5km</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>4+ Stars</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Loading */}
      {isSearching && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🔍 Searching...</Text>
        </View>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !isSearching && (
        <ScrollView style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>
            Found {searchResults.length} places
          </Text>
          {searchResults.map((result) => (
            <View key={result.id} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultName}>{result.name}</Text>
                <Text style={styles.resultRating}>⭐ {result.rating}</Text>
              </View>
              <Text style={styles.resultType}>{result.type}</Text>
              <View style={styles.resultFooter}>
                <Text style={styles.resultDistance}>📍 {result.distance}</Text>
                <Text style={styles.resultPrice}>{result.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsIcon}>🤷‍♂️</Text>
          <Text style={styles.noResultsText}>No places found</Text>
          <Text style={styles.noResultsSubtext}>
            Try searching for something else
          </Text>
        </View>
      )}
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
  searchContainer: {
    padding: 20,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    minHeight: 20,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#95a5a6',
  },
  popularContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularChip: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  popularChipText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultCard: {
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  resultRating: {
    fontSize: 12,
    color: '#f39c12',
    fontWeight: '600',
  },
  resultType: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultDistance: {
    fontSize: 12,
    color: '#3498db',
  },
  resultPrice: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '600',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default WebSearchScreen;
