import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleTestApp = () => {
  console.log('SimpleTestApp rendering with React', React.version);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Local Gems - Test</Text>
      <Text style={styles.subtitle}>React Native Web is working!</Text>
      <Text style={styles.subtitle}>Next: Loading full app...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default SimpleTestApp;
