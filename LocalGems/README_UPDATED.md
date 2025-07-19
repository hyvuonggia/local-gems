# Local Gems 🗺️

> Discover hidden local treasures and share your favorite places with the community.

**Status**: ✅ **Ready for Development** - Metro bundler running, dependencies resolved, core architecture complete.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- React Native development environment

### Installation & Setup

```bash
# Navigate to project
cd /home/hyvuonggia/local-gems/LocalGems

# Dependencies are already installed
# Metro bundler should be running

# If Metro is not running, start it:
npm start

# Test the app (requires platform setup)
npx react-native run-android  # Android
npx react-native run-ios      # iOS (macOS only)
```

### Current Status

✅ **Completed**:
- React Native TypeScript project setup
- All dependencies installed and resolved
- Metro bundler configured and running
- Complete TypeScript types and interfaces
- Firebase service layer implemented
- Authentication context with Google Sign-In
- All core screens and navigation
- Test app available for immediate testing

🔧 **Ready for**:
- Platform-specific setup (Android/iOS)
- Firebase project configuration
- Google Maps API integration
- Device/emulator testing

## Project Structure

```
src/
├── types/           # TypeScript type definitions
├── services/        # Firebase and API services
├── context/         # React context providers
├── screens/         # App screens and components
├── utils/           # Utility functions
└── config/          # Configuration files
```

## Development

### Available Scripts

```bash
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios           # Run on iOS  
npx tsc --noEmit      # Type checking
```

### Testing the App

1. **Test App Available**: `TestApp.tsx` provides immediate testing capability
2. **Metro Running**: Development server ready at http://localhost:8081
3. **TypeScript**: All compilation errors resolved

## Next Steps

1. **Platform Setup**: Configure Android Studio or Xcode
2. **Firebase Config**: Set up Firebase project and add config
3. **Maps Integration**: Add Google Maps API key
4. **Device Testing**: Run on physical device or emulator

See `DEVELOPMENT_STATUS.md` for detailed next steps and configuration guides.

## Features

### Core Experience
- 🔐 **User Authentication** - Email/password and Google Sign-In
- 🗺️ **Interactive Map** - Discover locations with React Native Maps
- 📍 **Location Discovery** - Find and explore local gems
- ➕ **Add Locations** - Contribute new places with photos
- 🧭 **Navigation** - Get directions to any location
- 🔖 **Bookmarking** - Save favorite places
- 🔍 **Search** - Find specific types of locations

### Advanced Features (Planned)
- 📱 **Offline Mode** - Access saved content without internet
- 🔔 **Push Notifications** - Get notified about new nearby locations
- 📊 **Analytics** - Track your exploration progress
- 👥 **Social Features** - Follow other users and share collections

## Tech Stack

- **Framework**: React Native 0.72.6
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Maps**: React Native Maps + Google Maps
- **State Management**: React Context
- **Authentication**: Firebase Auth + Google Sign-In

## Contributing

This project is ready for active development. All core architecture is in place:

1. Fork the repository
2. Set up your development environment
3. Configure Firebase and Google Maps
4. Start building features!

## License

MIT License - see LICENSE file for details.

---

**Development Server**: http://localhost:8081  
**Project Path**: `/home/hyvuonggia/local-gems/LocalGems/`  
**Last Updated**: July 19, 2025
