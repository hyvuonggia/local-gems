import { User } from '../types';
import FirebaseService from './firebase';

export interface PointsAction {
  action: 'add_location' | 'write_review' | 'upload_photo' | 'first_gem' | 'verified_location';
  points: number;
  badge?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

// Points system configuration
export const POINTS_CONFIG: Record<string, PointsAction> = {
  ADD_LOCATION: { action: 'add_location', points: 10 },
  WRITE_REVIEW: { action: 'write_review', points: 5 },
  UPLOAD_PHOTO: { action: 'upload_photo', points: 3 },
  FIRST_GEM: { action: 'first_gem', points: 20, badge: 'first-gem' },
  VERIFIED_LOCATION: { action: 'verified_location', points: 15 },
};

// Badge definitions
export const BADGES: Record<string, Badge> = {
  'first-gem': {
    id: 'first-gem',
    name: 'First Gem',
    description: 'Added your first location to Local Gems',
    icon: '💎',
    requirement: 'Add your first location',
  },
  'explorer': {
    id: 'explorer',
    name: 'Explorer',
    description: 'Added 5 or more locations',
    icon: '🗺️',
    requirement: 'Add 5 locations',
  },
  'critic': {
    id: 'critic',
    name: 'Critic',
    description: 'Written 10 or more reviews',
    icon: '✍️',
    requirement: 'Write 10 reviews',
  },
  'photographer': {
    id: 'photographer',
    name: 'Photographer',
    description: 'Uploaded 25 quality photos',
    icon: '📷',
    requirement: 'Upload 25 photos',
  },
  'local-expert': {
    id: 'local-expert',
    name: 'Local Expert',
    description: 'Added 20 locations in your area',
    icon: '🏆',
    requirement: 'Add 20 local locations',
  },
  'community-helper': {
    id: 'community-helper',
    name: 'Community Helper',
    description: 'Helped verify 10 locations',
    icon: '🤝',
    requirement: 'Verify 10 locations',
  },
};

class PointsService {
  /**
   * Award points to a user for a specific action
   */
  static async awardPoints(userId: string, actionType: keyof typeof POINTS_CONFIG): Promise<void> {
    try {
      const action = POINTS_CONFIG[actionType];
      const user = await FirebaseService.getUser(userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      const newPoints = user.points + action.points;
      const newBadges = [...user.badges];

      // Check if user earns a badge with this action
      if (action.badge && !user.badges.includes(action.badge)) {
        newBadges.push(action.badge);
      }

      // Check for milestone badges
      const milestones = await this.checkMilestoneBadges(userId, newPoints);
      milestones.forEach(badge => {
        if (!newBadges.includes(badge)) {
          newBadges.push(badge);
        }
      });

      // Update user points and badges
      await FirebaseService.updateUser(userId, {
        points: newPoints,
        badges: newBadges,
      });

      console.log(`Awarded ${action.points} points to user ${userId} for ${action.action}`);
      
      // Show notification or achievement popup here
      if (action.badge || milestones.length > 0) {
        // Trigger badge notification
      }
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  }

  /**
   * Check if user qualifies for milestone badges
   */
  static async checkMilestoneBadges(userId: string, currentPoints: number): Promise<string[]> {
    const newBadges: string[] = [];
    
    try {
      // Get user's statistics
      const stats = await this.getUserStats(userId);
      
      // Check explorer badge (5+ locations)
      if (stats.locationsAdded >= 5 && !stats.currentBadges.includes('explorer')) {
        newBadges.push('explorer');
      }
      
      // Check critic badge (10+ reviews)
      if (stats.reviewsWritten >= 10 && !stats.currentBadges.includes('critic')) {
        newBadges.push('critic');
      }
      
      // Check photographer badge (25+ photos)
      if (stats.photosUploaded >= 25 && !stats.currentBadges.includes('photographer')) {
        newBadges.push('photographer');
      }
      
      // Check local expert badge (20+ locations)
      if (stats.locationsAdded >= 20 && !stats.currentBadges.includes('local-expert')) {
        newBadges.push('local-expert');
      }
    } catch (error) {
      console.error('Error checking milestone badges:', error);
    }
    
    return newBadges;
  }

  /**
   * Get user statistics for badge calculations
   */
  static async getUserStats(userId: string): Promise<{
    locationsAdded: number;
    reviewsWritten: number;
    photosUploaded: number;
    currentBadges: string[];
  }> {
    try {
      const user = await FirebaseService.getUser(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Count user's locations
      const userLocations = await FirebaseService.getUserLocations(userId);
      
      // Count user's reviews (you'd need to implement this in FirebaseService)
      // const userReviews = await FirebaseService.getUserReviews(userId);
      
      // For now, using placeholder values
      return {
        locationsAdded: userLocations.length,
        reviewsWritten: 0, // Implement this
        photosUploaded: 0, // Implement this
        currentBadges: user.badges,
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return {
        locationsAdded: 0,
        reviewsWritten: 0,
        photosUploaded: 0,
        currentBadges: [],
      };
    }
  }

  /**
   * Get leaderboard data
   */
  static async getLeaderboard(limit: number = 10): Promise<User[]> {
    try {
      return await FirebaseService.getTopUsers(limit);
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  /**
   * Get badge information
   */
  static getBadgeInfo(badgeId: string): Badge | null {
    return BADGES[badgeId] || null;
  }

  /**
   * Get all available badges
   */
  static getAllBadges(): Badge[] {
    return Object.values(BADGES);
  }

  /**
   * Format points for display
   */
  static formatPoints(points: number): string {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M`;
    } else if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K`;
    }
    return points.toString();
  }
}

export default PointsService;
