/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';

const SimpleApp = () => {
  return React.createElement('div', {
    style: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, [
    React.createElement('h1', {
      key: 'title',
      style: { color: '#333', marginBottom: '20px' }
    }, '🗺️ Local Gems'),
    React.createElement('p', {
      key: 'message',
      style: { color: '#666', fontSize: '18px' }
    }, 'React Native Web is working!'),
    React.createElement('p', {
      key: 'status',
      style: { color: '#27ae60', marginTop: '20px' }
    }, '✅ Bundle loaded successfully')
  ]);
};

console.log('Registering SimpleApp');
AppRegistry.registerComponent('LocalGems', () => SimpleApp);

// Auto-run for web
if (typeof window !== 'undefined') {
  console.log('Running app for web');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    AppRegistry.runApplication('LocalGems', {
      rootTag: rootElement,
    });
    console.log('App should be running now');
  } else {
    console.error('Root element not found!');
  }
}

export default SimpleApp;
