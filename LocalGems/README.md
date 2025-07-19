# Local Gems - Hidden Spots Finder

A React Native application for discovering and sharing hidden gems and authentic places around the world.

## Features

### Core Experience (Phase 1 - MVP)
✅ **User Authentication**
- Email/Password registration and login
- Google Sign-In integration
- User profile management

✅ **Location Discovery**
- Interactive map view with location markers
- Real-time location loading based on map region
- Location details with images, ratings, and reviews
- Get directions integration

✅ **Adding New Locations**
- Interactive map for precise location selection
- Image upload functionality
- Tag-based categorization
- Form validation and submission

✅ **Search Functionality**
- Global text search for locations
- Real-time search results

✅ **User Profile & Bookmarking**
- Save/bookmark favorite locations
- View saved locations in profile
- User statistics (points, badges)
- Sign out functionality

✅ **Collections Management**
- Create and manage personal collections
- View public collections from other users
- Organize locations into themed collections

## Tech Stack

- **Framework**: React Native with TypeScript
- **Navigation**: React Navigation 6
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Maps**: React Native Maps (Google Maps)
- **Location**: React Native Geolocation Service
- **Image Handling**: React Native Image Picker
- **State Management**: React Context API

## Project Structure

```
LocalGems/
├── src/
│   ├── components/           # Reusable UI components
│   ├── screens/             # Screen components
│   │   ├── auth/            # Authentication screens
│   │   ├── map/             # Map-related screens
│   │   ├── location/        # Location detail screens
│   │   ├── search/          # Search screens
│   │   ├── collections/     # Collections screens
│   │   └── profile/         # Profile screens
│   ├── context/             # React Context providers
│   ├── services/            # API and Firebase services
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── config/              # Configuration files
├── App.tsx                  # Main app component
├── index.js                 # App entry point
└── package.json             # Dependencies and scripts
```

## Setup Instructions

### Prerequisites

1. **Node.js**: Install Node.js (version 16 or higher)
2. **React Native CLI**: Install globally
   ```bash
   npm install -g @react-native-community/cli
   ```
3. **Android Studio** (for Android development)
4. **Xcode** (for iOS development, macOS only)

### Firebase Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Configure Authentication**:
   - Enable Email/Password authentication
   - Enable Google Sign-In (optional)
   - Add your app's package name

3. **Set up Firestore**:
   - Create database in production mode
   - Set up security rules (start with test mode, then configure properly)

4. **Configure Firebase SDK**:
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place files in appropriate directories
   - Update `src/config/firebase.ts` with your configuration

### Installation

1. **Clone and Install Dependencies**:
   ```bash
   cd LocalGems
   npm install
   ```

2. **Install iOS Dependencies** (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Configure Google Maps**:
   - Get Google Maps API key from Google Cloud Console
   - Add to `android/app/src/main/AndroidManifest.xml`:
     ```xml
     <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="YOUR_API_KEY" />
     ```
   - Add to `ios/LocalGems/AppDelegate.m`:
     ```objc
     #import <GoogleMaps/GoogleMaps.h>
     [GMSServices provideAPIKey:@"YOUR_API_KEY"];
     ```

4. **Update Configuration**:
   - Update Firebase configuration in `src/config/firebase.ts`
   - Update Google Sign-In configuration in `src/context/AuthContext.tsx`

### Running the App

1. **Start Metro Server**:
   ```bash
   npm start
   ```

2. **Run on Android**:
   ```bash
   npm run android
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```

## Firebase Data Structure

### Collections

#### `users`
```typescript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  bookmarkedLocationIds: string[],
  points: number,
  badges: string[]
}
```

#### `locations`
```typescript
{
  locationId: string,
  name: string,
  description: string,
  coordinates: GeoPoint,
  address: string,
  imageUrls: string[],
  tags: string[],
  creatorId: string,
  createdAt: timestamp,
  averageRating: number
}
```

#### `locations/{locationId}/reviews` (subcollection)
```typescript
{
  reviewId: string,
  userId: string,
  rating: number,
  comment: string,
  createdAt: timestamp
}
```

#### `collections`
```typescript
{
  collectionId: string,
  name: string,
  description: string,
  creatorId: string,
  locationIds: string[],
  isPublic: boolean,
  createdAt: timestamp
}
```

## Development Notes

### Known Issues
- TypeScript compilation errors due to missing React Native dependencies (install packages to resolve)
- Google Sign-In requires proper configuration
- Maps require API keys and proper setup

### Next Steps (Phase 2)
- [ ] Review and rating system
- [ ] Advanced search filters
- [ ] Push notifications
- [ ] Offline mode
- [ ] Social sharing
- [ ] Enhanced UI/UX

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
