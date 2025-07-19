import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Auth Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

// Main Screens
import MapScreen from './src/screens/map/MapScreen';
import LocationDetailsScreen from './src/screens/location/LocationDetailsScreen';
import AddNewLocationScreen from './src/screens/location/AddNewLocationScreen';

// Placeholder screens for other tabs
import SearchScreen from './src/screens/search/SearchScreen';
import CollectionsScreen from './src/screens/collections/CollectionsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';

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
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

// Tab Navigator with placeholder tab icons
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
        component={MapScreen}
        options={{ title: 'Discover' }}
      />
      <MainTab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <MainTab.Screen 
        name="Collections" 
        component={CollectionsScreen}
        options={{ title: 'Collections' }}
      />
      <MainTab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </MainTab.Navigator>
  );
};

// Main Navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can create a proper loading screen component
    return null;
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
const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
