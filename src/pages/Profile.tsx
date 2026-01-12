import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProfileHeader from '@/components/ProfileHeader';
import Timeline from '@/components/Timeline';
import { Button } from '@/components/ui/button';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
}

interface UserStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

interface TimelinePost {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
}

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ postsCount: 0, followersCount: 0, followingCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);

  // Mock current user - replace with actual auth context
  const currentUserId = 'user-1';
  const isOwnProfile = userId === currentUserId;

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  // Fetch profile data from API
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data based on userId
      const mockProfiles: Record<string, UserProfile> = {
        'user-1': {
          id: 'user-1',
          full_name: 'John Doe',
          bio: 'Software developer passionate about building great products. Love connecting with real people.',
        },
        'user-2': {
          id: 'user-2',
          full_name: 'Alice Smith',
          bio: 'Digital minimalist. Believer in authentic human connections.',
        },
        'user-3': {
          id: 'user-3',
          full_name: 'Bob Johnson',
          bio: 'Tech enthusiast exploring the intersection of technology and humanity.',
        },
        'user-4': {
          id: 'user-4',
          full_name: 'Carol Williams',
          bio: 'Designer by day, philosopher by night. Creating meaningful experiences.',
        },
        'user-5': {
          id: 'user-5',
          full_name: 'David Brown',
          bio: 'Building communities, one connection at a time.',
        },
      };

      const profileData = mockProfiles[userId || 'user-1'] || {
        id: userId || 'unknown',
        full_name: 'Unknown User',
        bio: undefined,
      };

      setProfile(profileData);
      setStats({
        postsCount: Math.floor(Math.random() * 100) + 5,
        followersCount: Math.floor(Math.random() * 500) + 10,
        followingCount: Math.floor(Math.random() * 200) + 5,
      });
      setIsFollowing(Math.random() > 0.5);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user posts
  const fetchUserPosts = async (): Promise<TimelinePost[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!profile) return [];

    // Mock posts for this user
    return [
      {
        id: '1',
        content: 'Just finished working on a new project. Excited to share it with the community soon!',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        user: {
          id: profile.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        },
      },
      {
        id: '2',
        content: 'The best connections happen when we put our phones down and look into each other\'s eyes.',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        user: {
          id: profile.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        },
      },
      {
        id: '3',
        content: 'Grateful for all the genuine people I\'ve met through this platform. Real connections matter.',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        user: {
          id: profile.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        },
      },
    ];
  };

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    try {
      setIsLoadingFollow(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsFollowing(!isFollowing);
      setStats(prev => ({
        ...prev,
        followersCount: isFollowing ? prev.followersCount - 1 : prev.followersCount + 1,
      }));
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setIsLoadingFollow(false);
    }
  };

  const handleEditProfile = () => {
    console.log('Navigate to edit profile');
    // TODO: Navigate to edit profile page or open modal
  };

  const handleStatClick = (stat: 'posts' | 'followers' | 'following') => {
    console.log('Stat clicked:', stat);
    // TODO: Navigate to followers/following list
  };

  const handleNavigateToProfile = (clickedUserId: string) => {
    if (clickedUserId !== userId) {
      navigate(`/profile/${clickedUserId}`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">User not found</p>
          <Button variant="outline" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="hover:bg-muted"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-foreground">{profile.full_name}</h2>
            <p className="text-xs text-muted-foreground">{stats.postsCount} posts</p>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <ProfileHeader
          user={profile}
          stats={stats}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onEditProfile={handleEditProfile}
          onFollowToggle={handleFollowToggle}
          onStatClick={handleStatClick}
          isLoadingFollow={isLoadingFollow}
        />

        {/* Posts Section */}
        <section className="mt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Posts</h3>
          <Timeline
            onUserClick={handleNavigateToProfile}
            fetchPosts={fetchUserPosts}
          />
        </section>
      </main>
    </div>
  );
};

export default Profile;
