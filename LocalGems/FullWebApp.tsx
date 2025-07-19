import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import auth context from our web app
import { AuthProvider, useAuth } from './context/AuthContext';

// Create web-compatible screens that replace the problematic native ones
import WebMapScreen from './src/screens/web/WebMapScreen';
import WebSearchScreen from './src/screens/web/WebSearchScreen';
import WebCollectionsScreen from './src/screens/web/WebCollectionsScreen';
import WebProfileScreen from './src/screens/web/WebProfileScreen';

// Auth screens (these should work on web)
import WebLoginScreen from './src/screens/web/WebLoginScreen';
import WebRegisterScreen from './src/screens/web/WebRegisterScreen';

import { RootStackParamList, AuthStackParamList, MainTabParamList } from './src/types';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Auth Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={WebLoginScreen} />
      <AuthStack.Screen name="Register" component={WebRegisterScreen} />
    </AuthStack.Navigator>
  );
};

// Tab Navigator with web-compatible icons
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'MapDiscover':
              iconName = '🗺️';
              break;
            case 'Search':
              iconName = '🔍';
              break;
            case 'Collections':
              iconName = '📋';
              break;
            case 'Profile':
              iconName = '👤';
              break;
            default:
              iconName = '❓';
          }

          return <Text style={{ fontSize: size }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <MainTab.Screen 
        name="MapDiscover" 
        component={WebMapScreen}
        options={{ title: 'Discover' }}
      />
      <MainTab.Screen 
        name="Search" 
        component={WebSearchScreen}
        options={{ title: 'Search' }}
      />
      <MainTab.Screen 
        name="Collections" 
        component={WebCollectionsScreen}
        options={{ title: 'Collections' }}
      />
      <MainTab.Screen 
        name="Profile" 
        component={WebProfileScreen}
        options={{ title: 'Profile' }}
      />
    </MainTab.Navigator>
  );
};

// Main Navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>🗺️</Text>
        <Text style={styles.loadingSubtext}>Loading Local Gems...</Text>
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <RootStack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

// Main App Component
const FullWebApp: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingSubtext: {
    fontSize: 18,
    color: '#6c757d',
  },
});

export default FullWebApp;
