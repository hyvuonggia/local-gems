import React from 'react';
import { Text, View } from 'react-native';

interface TabIconProps {
  name: string;
  focused: boolean;
  color: string;
  size: number;
}

export const TabIcon: React.FC<TabIconProps> = ({ name, focused, color, size }) => {
  const getIcon = () => {
    switch (name) {
      case 'map':
        return '🗺️';
      case 'search':
        return '🔍';
      case 'collections':
        return '📚';
      case 'profile':
        return '👤';
      default:
        return '📍';
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size, color: focused ? color : '#95a5a6' }}>
        {getIcon()}
      </Text>
    </View>
  );
};
