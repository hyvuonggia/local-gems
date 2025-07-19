// Location utility functions

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Format distance for display
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * Get address from coordinates (reverse geocoding)
 * This is a placeholder - in a real app you'd use a geocoding service
 */
export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  // Placeholder implementation
  // In a real app, you'd use Google Maps Geocoding API or similar
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
};

/**
 * Validate coordinates
 */
export const isValidCoordinate = (latitude: number, longitude: number): boolean => {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Generate a bounding box around a center point
 */
export const getBoundingBox = (
  centerLat: number,
  centerLng: number,
  radiusKm: number
): {
  north: number;
  south: number;
  east: number;
  west: number;
} => {
  const latOffset = radiusKm / 111; // Rough conversion: 1 degree ≈ 111km
  const lngOffset = radiusKm / (111 * Math.cos(centerLat * Math.PI / 180));

  return {
    north: centerLat + latOffset,
    south: centerLat - latOffset,
    east: centerLng + lngOffset,
    west: centerLng - lngOffset,
  };
};
