/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import SimpleTestApp from './SimpleTestApp';

// Use explicit app name
const appName = 'LocalGems';

console.log('Registering app with name:', appName);
console.log('Platform:', Platform.OS);

// Use minimal test app for debugging
AppRegistry.registerComponent(appName, () => SimpleTestApp);

// For web, also run the app immediately
if (Platform.OS === 'web') {
  console.log('Running app for web platform');
  
  // Wait for DOM to be ready
  const runApp = () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      AppRegistry.runApplication(appName, {
        rootTag: rootElement,
      });
    } else {
      console.error('Root element not found');
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runApp);
  } else {
    runApp();
  }
}

export default SimpleTestApp;
