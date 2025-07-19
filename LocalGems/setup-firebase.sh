#!/bin/bash

echo "🔥 Local Gems - Firebase Setup Assistant"
echo "========================================"
echo

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo
fi

echo "🔧 Firebase Configuration Steps:"
echo "1. Go to https://console.firebase.google.com"
echo "2. Create a new project called 'Local Gems'"
echo "3. Enable Authentication (Email/Password + Google)"
echo "4. Create Firestore database"
echo "5. Enable Storage"
echo "6. Get your config and update .env file"
echo

echo "🗺️ Google Maps API Steps:"
echo "1. Go to https://console.cloud.google.com"
echo "2. Enable Maps SDK for Android"
echo "3. Enable Maps SDK for iOS"
echo "4. Create API key with Maps restrictions"
echo "5. Add API key to .env file"
echo

echo "📱 Ready for Testing:"
echo "Device connected: $(adb devices | grep device | wc -l) device(s)"
echo "Metro bundler: $(lsof -i :8081 >/dev/null 2>&1 && echo 'Running' || echo 'Stopped')"
echo

read -p "Press Enter to open Firebase Console..." -r
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "https://console.firebase.google.com"
elif command -v open >/dev/null 2>&1; then
    open "https://console.firebase.google.com"
else
    echo "Please manually open: https://console.firebase.google.com"
fi

echo
echo "🎯 After configuring Firebase:"
echo "1. Update .env with your Firebase config"
echo "2. Update .env with Google Maps API key"
echo "3. Run: npm start (if Metro not running)"
echo "4. Test on device or emulator"
echo
echo "📚 See CORE_COMPLETE.md for detailed instructions"
