import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Location, User, Review, Collection } from '../types';

class FirebaseService {
  // User service methods
  async createUser(user: Omit<User, 'uid'>): Promise<void> {
    const currentUser = auth().currentUser;
    if (!currentUser) throw new Error('No authenticated user');
    
    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .set({
        ...user,
        uid: currentUser.uid,
      });
  }

  async getUser(uid: string): Promise<User | null> {
    const doc = await firestore().collection('users').doc(uid).get();
    if (doc.exists) {
      return doc.data() as User;
    }
    return null;
  }

  async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    await firestore().collection('users').doc(uid).update(updates);
  }

  // Location service methods
  async createLocation(location: Omit<Location, 'locationId' | 'createdAt'>): Promise<string> {
    const docRef = await firestore()
      .collection('locations')
      .add({
        ...location,
        createdAt: firestore.Timestamp.now(),
      });
    
    // Update the document with its own ID
    await docRef.update({ locationId: docRef.id });
    return docRef.id;
  }

  async getLocation(locationId: string): Promise<Location | null> {
    const doc = await firestore().collection('locations').doc(locationId).get();
    if (doc.exists) {
      const data = doc.data();
      return {
        ...data,
        createdAt: data?.createdAt?.toDate() || new Date(),
      } as Location;
    }
    return null;
  }

  async getLocationsInArea(
    centerLat: number,
    centerLng: number,
    radiusKm: number = 10
  ): Promise<Location[]> {
    // For simplicity, we'll fetch all locations and filter client-side
    // In production, you'd want to use geohashing or similar for efficiency
    const snapshot = await firestore().collection('locations').get();
    
    const locations: Location[] = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const location = {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Location;
      
      // Simple distance calculation (for demo purposes)
      const distance = this.calculateDistance(
        centerLat,
        centerLng,
        location.coordinates.latitude,
        location.coordinates.longitude
      );
      
      if (distance <= radiusKm) {
        locations.push(location);
      }
    });
    
    return locations;
  }

  async searchLocations(query: string): Promise<Location[]> {
    // Simple text search - in production, you'd use a dedicated search service
    const snapshot = await firestore()
      .collection('locations')
      .orderBy('name')
      .startAt(query)
      .endAt(query + '\uf8ff')
      .get();
    
    const locations: Location[] = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      locations.push({
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Location);
    });
    
    return locations;
  }

  // Review service methods
  async addReview(locationId: string, review: Omit<Review, 'reviewId' | 'createdAt'>): Promise<void> {
    const reviewRef = await firestore()
      .collection('locations')
      .doc(locationId)
      .collection('reviews')
      .add({
        ...review,
        createdAt: firestore.Timestamp.now(),
      });
    
    await reviewRef.update({ reviewId: reviewRef.id });
    
    // Update location's average rating
    await this.updateLocationRating(locationId);
  }

  async getReviews(locationId: string): Promise<Review[]> {
    const snapshot = await firestore()
      .collection('locations')
      .doc(locationId)
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews: Review[] = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      reviews.push({
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Review);
    });
    
    return reviews;
  }

  private async updateLocationRating(locationId: string): Promise<void> {
    const reviewsSnapshot = await firestore()
      .collection('locations')
      .doc(locationId)
      .collection('reviews')
      .get();
    
    let totalRating = 0;
    let reviewCount = 0;
    
    reviewsSnapshot.docs.forEach(doc => {
      totalRating += doc.data().rating;
      reviewCount++;
    });
    
    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;
    
    await firestore()
      .collection('locations')
      .doc(locationId)
      .update({ averageRating });
  }

  // Collection service methods
  async createCollection(collection: Omit<Collection, 'collectionId' | 'createdAt'>): Promise<string> {
    const docRef = await firestore()
      .collection('collections')
      .add({
        ...collection,
        createdAt: firestore.Timestamp.now(),
      });
    
    await docRef.update({ collectionId: docRef.id });
    return docRef.id;
  }

  async getUserCollections(userId: string): Promise<Collection[]> {
    const snapshot = await firestore()
      .collection('collections')
      .where('creatorId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const collections: Collection[] = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      collections.push({
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Collection);
    });
    
    return collections;
  }

  async getPublicCollections(): Promise<Collection[]> {
    const snapshot = await firestore()
      .collection('collections')
      .where('isPublic', '==', true)
      .orderBy('createdAt', 'desc')
      .get();
    
    const collections: Collection[] = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      collections.push({
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Collection);
    });
    
    return collections;
  }

  // Storage service methods
  async uploadImage(uri: string, path: string): Promise<string> {
    const reference = storage().ref(path);
    await reference.putFile(uri);
    return await reference.getDownloadURL();
  }

  // Utility methods
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Bookmarking methods
  async toggleBookmark(userId: string, locationId: string): Promise<void> {
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      const userData = userDoc.data() as User;
      const bookmarkedIds = userData.bookmarkedLocationIds || [];
      
      if (bookmarkedIds.includes(locationId)) {
        // Remove bookmark
        await userRef.update({
          bookmarkedLocationIds: firestore.FieldValue.arrayRemove(locationId),
        });
      } else {
        // Add bookmark
        await userRef.update({
          bookmarkedLocationIds: firestore.FieldValue.arrayUnion(locationId),
        });
      }
    }
  }

  async getBookmarkedLocations(userId: string): Promise<Location[]> {
    const userDoc = await firestore().collection('users').doc(userId).get();
    
    if (!userDoc.exists) return [];
    
    const userData = userDoc.data() as User;
    const bookmarkedIds = userData.bookmarkedLocationIds || [];
    
    if (bookmarkedIds.length === 0) return [];
    
    const locations: Location[] = [];
    
    // Fetch locations in batches (Firestore 'in' query limit is 10)
    for (let i = 0; i < bookmarkedIds.length; i += 10) {
      const batch = bookmarkedIds.slice(i, i + 10);
      const snapshot = await firestore()
        .collection('locations')
        .where('locationId', 'in', batch)
        .get();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        locations.push({
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Location);
      });
    }
    
    return locations;
  }

  /**
   * Get all locations created by a specific user
   */
  static async getUserLocations(userId: string): Promise<Location[]> {
    try {
      const querySnapshot = await firestore()
        .collection('locations')
        .where('creatorId', '==', userId)
        .get();
      
      return querySnapshot.docs.map(doc => ({
        locationId: doc.id,
        ...doc.data()
      } as Location));
    } catch (error) {
      console.error('Error getting user locations:', error);
      throw error;
    }
  }

  /**
   * Get top users by points for leaderboard
   */
  static async getTopUsers(limit: number = 10): Promise<User[]> {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .orderBy('points', 'desc')
        .limit(limit)
        .get();
      
      return querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      } as User));
    } catch (error) {
      console.error('Error getting top users:', error);
      throw error;
    }
  }

  /**
   * Get user's review count
   */
  static async getUserReviewCount(userId: string): Promise<number> {
    try {
      const locationsSnapshot = await firestore()
        .collection('locations')
        .get();
      
      let reviewCount = 0;
      
      for (const locationDoc of locationsSnapshot.docs) {
        const reviewsSnapshot = await firestore()
          .collection('locations')
          .doc(locationDoc.id)
          .collection('reviews')
          .where('userId', '==', userId)
          .get();
        reviewCount += reviewsSnapshot.size;
      }
      
      return reviewCount;
    } catch (error) {
      console.error('Error getting user review count:', error);
      return 0;
    }
  }
}

export default new FirebaseService();
