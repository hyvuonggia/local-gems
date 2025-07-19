# Local Gems - A Global Hidden Spots Finder

## Project Overview

**Local Gems** is a global, community-driven mobile application for discovering unique and authentic places (cafes, street food stalls, interesting spots) that are often overlooked by mainstream travel platforms.

### Vision & Philosophy
- **Core Idea**: "By locals, for everyone" - empowering users to share their own "hidden gems"
- **Target Audience**: Travelers seeking genuine experiences and locals who want to share hidden beauty of their cities
- **Philosophy**: Creating a trustworthy source for exploring the world authentically

## Technical Requirements

### Platform & Framework
- **Platform**: Cross-platform (iOS & Android)
- **Framework**: React Native
- **State Management**: React Context API for global states (user authentication, etc.)

### Backend & Services
- **Backend as a Service (BaaS)**: Firebase
- **Authentication**: Firebase Authentication (Email/Password and Google Sign-In)
- **Database**: Firestore (real-time NoSQL database)
- **Storage**: Firebase Storage for user-uploaded images

### Core Libraries
- `react-native-maps`: Map functionalities
- `react-native-geolocation-service`: User location coordinates
- `react-native-image-picker`: Photo selection from gallery
- `@react-native-firebase/app`: Firebase core
- `@react-native-firebase/firestore`: Firestore database
- `@react-native-firebase/auth`: Authentication
- `@react-native-firebase/storage`: File storage

### APIs
- **React Native Linking API**: Open external map applications for directions

## Data Model (Firestore Schema)

### Collection: `users`
```
{
  uid: string (document ID),
  email: string,
  displayName: string,
  photoURL: string,
  bookmarkedLocationIds: array of strings,
  points: number,
  badges: array of strings (e.g., "first-gem", "top-reviewer")
}
```

### Collection: `locations`
```
{
  locationId: string (document ID),
  name: string,
  description: string,
  coordinates: GeoPoint,
  address: string,
  imageUrls: array of strings,
  tags: array of strings (e.g., "Quiet", "Good for Work"),
  creatorId: string,
  createdAt: timestamp,
  averageRating: number
}
```

### Sub-collection: `reviews` (nested within each location)
```
{
  reviewId: string (document ID),
  userId: string,
  rating: number (1-5),
  comment: string,
  createdAt: timestamp
}
```

### Collection: `collections`
```
{
  collectionId: string (document ID),
  name: string (e.g., "Best Coffee Shops in Hanoi"),
  description: string,
  creatorId: string,
  locationIds: array of strings,
  isPublic: boolean,
  createdAt: timestamp
}
```

## Feature Requirements

### Part A: Core Experience

#### 1. User Authentication
- **Sign Up**: New users can register with email or Google account
- **Sign In**: Returning users can log in to access profile and contributions
- **Profile Management**: Users can update their profile information

#### 2. Location Discovery
- **Map View**: Main screen shows map centered on user's current location
- **Dynamic Loading**: New locations load automatically when panning/zooming
- **List View**: Toggle between map and list views for location browsing
- **Location Details**: Tap on markers/items to view detailed information

#### 3. Adding New "Gems"
- **Add Place Button**: Logged-in users can add new locations
- **Pin Dropping**: Interactive map for precise location selection
- **Auto-suggestion**: Automatic address suggestion based on coordinates
- **Form Completion**: Name, description, image upload, and tag selection
- **Validation**: Ensure all required fields are completed before submission

#### 4. Navigation & Directions
- **Get Directions**: Button to open default map app with route
- **External App Integration**: Seamless handoff to Google Maps/Apple Maps

### Part B: Engagement & Personalization

#### 5. Bookmarking System
- **Save Locations**: Bookmark icon on location details
- **Saved Section**: Dedicated profile section for bookmarked places
- **Quick Access**: Easy removal and organization of saved locations

#### 6. Collections Management
- **Create Collections**: Personal collections (e.g., "My Tokyo Food Tour")
- **Add to Collections**: Add any location to multiple collections
- **Public Collections**: View and share collections from other users
- **Collection Discovery**: Browse popular public collections

#### 7. Search & Filtering
- **Global Search**: Search places in any city worldwide
- **Tag Filtering**: Filter by location tags (Quiet, Good for Work, etc.)
- **Advanced Filters**: 
  - Open Now status
  - Price range ($, $$, $$$)
  - Amenities (Wi-Fi, Parking, etc.)
- **Search History**: Recent search terms and locations

### Part C: Community & Gamification

#### 8. Points & Rewards System
- **Point Earning**: 
  - Adding new high-quality locations
  - Writing helpful reviews
  - Uploading quality photos
- **Badge System**: 
  - "Explorer" (5+ gems added)
  - "Critic" (10+ reviews written)
  - "Photographer" (quality photos uploaded)
  - "First Gem" (first location added)
- **Profile Display**: Public showcase of points and badges

#### 9. Review System
- **Rating**: 1-5 star rating system
- **Comments**: Written reviews for locations
- **Review Moderation**: Community reporting and moderation tools

### Part D: Advanced Features

#### 10. Offline Mode
- **City Downloads**: Select and download city data for offline access
- **Map Tiles**: Offline map tile storage
- **Data Sync**: Synchronization when connection is restored
- **Storage Management**: Manage downloaded offline content

#### 11. Additional Features
- **Photo Gallery**: Swipeable image galleries for locations
- **Social Sharing**: Share locations and collections to social media
- **Push Notifications**: New locations, collection updates, achievement notifications
- **Multi-language Support**: Localization for global user base

## UI/UX Design Principles

### Design Guidelines
1. **Clarity & Simplicity**: Intuitive interface focused on content
2. **Image-First**: Emphasize high-quality imagery for visual appeal
3. **Performance**: Fast, responsive experience with loading indicators
4. **User Feedback**: Clear feedback for all actions ("Location Saved!", "Review Submitted!")
5. **Consistency**: Maintain consistent design language throughout

### Navigation Structure
```
Main App (Tab Navigator)
├── Map/Discover (Stack)
│   ├── Map View
│   ├── Location Details
│   └── Add New Location
├── Search (Stack)
│   ├── Search Screen
│   └── Filter Options
├── Collections (Stack)
│   ├── My Collections
│   ├── Public Collections
│   └── Collection Details
├── Profile (Stack)
│   ├── User Profile
│   ├── Saved Locations
│   ├── Settings
│   └── Offline Downloads
└── Auth (Stack)
    ├── Login
    ├── Register
    └── Forgot Password
```

## Development Phases

### Phase 1: MVP (Minimum Viable Product)
- User authentication
- Basic map view with location markers
- Add new locations
- Location details view
- Basic search functionality

### Phase 2: Core Features
- Bookmarking system
- Review and rating system
- Collections management
- Advanced search and filtering

### Phase 3: Community & Engagement
- Points and badge system
- Social features
- Enhanced profile management
- Push notifications

### Phase 4: Advanced Features
- Offline mode
- Advanced analytics
- Social sharing
- Multi-language support

## Success Metrics
- **User Engagement**: Daily/Monthly active users
- **Content Quality**: Number of locations added per user
- **Community Growth**: User-generated reviews and ratings
- **Retention**: User return rate and session duration
- **Geographic Coverage**: Global distribution of locations

## Technical Considerations
- **Performance**: Optimize map rendering and image loading
- **Scalability**: Design for global user base and data growth
- **Security**: Secure user data and prevent spam/fake locations
- **Accessibility**: Ensure app is accessible to users with disabilities
- **Testing**: Comprehensive testing across devices and platforms