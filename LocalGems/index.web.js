/**
 * Web-specific entry point
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import FullWebApp from './FullWebApp';

console.log('Starting full web app with React Navigation and React', React.version);

// Wait for DOM to be ready
const startApp = () => {
  const container = document.getElementById('root');
  if (container) {
    console.log('Found root container, creating React root');
    const root = createRoot(container);
    root.render(React.createElement(FullWebApp));
    console.log('Full Web App rendered successfully');
  } else {
    console.error('Root container not found');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
