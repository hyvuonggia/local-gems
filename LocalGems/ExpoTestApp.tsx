import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const ExpoTestApp: React.FC = () => {
  const handleTestLocation = () => {
    Alert.alert('Location Test', 'This would test location permissions and GPS functionality');
  };

  const handleTestAuth = () => {
    Alert.alert('Auth Test', 'This would test Firebase authentication');
  };

  const handleTestMaps = () => {
    Alert.alert('Maps Test', 'This would test React Native Maps integration');
  };

  const handleTestCamera = () => {
    Alert.alert('Camera Test', 'This would test image picker functionality');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🗺️ Local Gems</Text>
          <Text style={styles.subtitle}>Expo Test Version</Text>
          <Text style={styles.description}>
            Testing core functionality with Expo development environment
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>🎯 Core Features Test</Text>
          
          <TouchableOpacity style={styles.testButton} onPress={handleTestLocation}>
            <Text style={styles.testButtonIcon}>📍</Text>
            <View style={styles.testButtonContent}>
              <Text style={styles.testButtonTitle}>Location Services</Text>
              <Text style={styles.testButtonDescription}>
                GPS access, permissions, user location
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={handleTestAuth}>
            <Text style={styles.testButtonIcon}>🔐</Text>
            <View style={styles.testButtonContent}>
              <Text style={styles.testButtonTitle}>Authentication</Text>
              <Text style={styles.testButtonDescription}>
                Firebase Auth, Google Sign-In
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={handleTestMaps}>
            <Text style={styles.testButtonIcon}>🗺️</Text>
            <View style={styles.testButtonContent}>
              <Text style={styles.testButtonTitle}>Maps Integration</Text>
              <Text style={styles.testButtonDescription}>
                React Native Maps, markers, regions
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={handleTestCamera}>
            <Text style={styles.testButtonIcon}>📷</Text>
            <View style={styles.testButtonContent}>
              <Text style={styles.testButtonTitle}>Image Picker</Text>
              <Text style={styles.testButtonDescription}>
                Camera access, photo selection
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.sectionTitle}>📊 System Status</Text>
          
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Text style={styles.statusIcon}>✅</Text>
              <Text style={styles.statusText}>React Native</Text>
            </View>
            
            <View style={styles.statusItem}>
              <Text style={styles.statusIcon}>✅</Text>
              <Text style={styles.statusText}>TypeScript</Text>
            </View>
            
            <View style={styles.statusItem}>
              <Text style={styles.statusIcon}>✅</Text>
              <Text style={styles.statusText}>Expo SDK</Text>
            </View>
            
            <View style={styles.statusItem}>
              <Text style={styles.statusIcon}>🔧</Text>
              <Text style={styles.statusText}>Firebase</Text>
            </View>
          </View>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>📱 Testing Instructions</Text>
          
          <View style={styles.instruction}>
            <Text style={styles.instructionStep}>1.</Text>
            <Text style={styles.instructionText}>
              Install Expo Go app on your Huawei Mate 10
            </Text>
          </View>
          
          <View style={styles.instruction}>
            <Text style={styles.instructionStep}>2.</Text>
            <Text style={styles.instructionText}>
              Scan QR code from Expo development server
            </Text>
          </View>
          
          <View style={styles.instruction}>
            <Text style={styles.instructionStep}>3.</Text>
            <Text style={styles.instructionText}>
              Test each feature button above
            </Text>
          </View>
          
          <View style={styles.instruction}>
            <Text style={styles.instructionStep}>4.</Text>
            <Text style={styles.instructionText}>
              Verify app performance and responsiveness
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => Alert.alert('Success!', 'Local Gems Expo test is working perfectly! 🎉')}
        >
          <Text style={styles.primaryButtonText}>🚀 Test Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  testButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  testButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  testButtonContent: {
    flex: 1,
  },
  testButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  testButtonDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statusContainer: {
    marginBottom: 30,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  instructionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  instructionStep: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginRight: 12,
    width: 24,
  },
  instructionText: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ExpoTestApp;
