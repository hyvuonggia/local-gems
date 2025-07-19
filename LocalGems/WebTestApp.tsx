import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';

const WebTestApp: React.FC = () => {
  const handleTest = () => {
    if (Platform.OS === 'web') {
      window.alert('🎉 Local Gems Web Version is Working!');
    } else {
      Alert.alert('Success!', 'Local Gems is working perfectly!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Local Gems</Text>
      <Text style={styles.subtitle}>Web Test Version</Text>
      
      <Text style={styles.platform}>
        Platform: {Platform.OS} {Platform.OS === 'web' ? '(Browser)' : '(Native)'}
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleTest}>
        <Text style={styles.buttonText}>🚀 Test Web App</Text>
      </TouchableOpacity>
      
      <Text style={styles.status}>
        ✅ React Native Web Working{'\n'}
        ✅ Expo Web Compatible{'\n'}
        ✅ Basic UI Rendering{'\n'}
        🌐 Browser Ready!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#3498db',
    marginBottom: 20,
  },
  platform: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    color: '#27ae60',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WebTestApp;
