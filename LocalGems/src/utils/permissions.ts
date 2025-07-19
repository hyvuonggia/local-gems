import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export interface LocationPermissionResult {
  granted: boolean;
  message?: string;
}

export interface CurrentLocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

/**
 * Request location permissions based on platform
 */
export const requestLocationPermission = async (): Promise<LocationPermissionResult> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Local Gems Location Permission',
          message: 'Local Gems needs access to your location to show nearby gems and help you discover new places.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return { granted: true };
      } else {
        return { 
          granted: false, 
          message: 'Location permission denied. Please enable location access in settings to discover nearby gems.' 
        };
      }
    } else {
      // iOS permissions are handled by the library
      return { granted: true };
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return { 
      granted: false, 
      message: 'Error requesting location permission. Please try again.' 
    };
  }
};

/**
 * Get current user location
 */
export const getCurrentLocation = (): Promise<CurrentLocationResult> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

/**
 * Watch user location changes
 */
export const watchLocation = (
  onLocationUpdate: (location: CurrentLocationResult) => void,
  onError?: (error: any) => void
): number => {
  return Geolocation.watchPosition(
    (position) => {
      onLocationUpdate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    },
    (error) => {
      console.error('Error watching location:', error);
      if (onError) onError(error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // Update every 10 meters
      interval: 5000, // Update every 5 seconds
      fastestInterval: 2000, // Fastest update every 2 seconds
    }
  );
};

/**
 * Clear location watch
 */
export const clearLocationWatch = (watchId: number): void => {
  Geolocation.clearWatch(watchId);
};

/**
 * Show location permission alert
 */
export const showLocationPermissionAlert = (): void => {
  Alert.alert(
    'Location Access Required',
    'Local Gems needs location access to show you nearby gems and help you discover amazing places around you. Please enable location permissions in your device settings.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => {
          // You can implement opening device settings here
          console.log('Open device settings');
        },
      },
    ]
  );
};
