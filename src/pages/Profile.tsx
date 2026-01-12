import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ProfileHeader from '@/components/ProfileHeader';
import Timeline from '@/components/Timeline';
import { Comment } from '@/components/CommentSection';

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
  const currentUser = {
    id: 'user-1',
    full_name: 'John Doe',
    avatar_url: undefined,
  };
  const isOwnProfile = userId === currentUser.id;

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
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!profile) return [];

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
  };

  const handleStatClick = (stat: 'posts' | 'followers' | 'following') => {
    console.log('Stat clicked:', stat);
  };

  const handleNavigateToProfile = (clickedUserId: string) => {
    navigate(`/profile/${clickedUserId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  const handleLikeToggle = async (postId: string, isLiked: boolean): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Post ${postId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  const handleAddComment = async (postId: string, content: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Comment added to post ${postId}:`, content);
  };

  const handleDeleteComment = async (commentId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Comment ${commentId} deleted`);
  };

  const handleLoadComments = async (postId: string): Promise<Comment[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockComments: Record<string, Comment[]> = {
      '1': [
        {
          id: 'pc1',
          content: 'Great project! Looking forward to seeing it.',
          created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
          user_id: 'user-2',
          user_name: 'Alice Smith',
          user_avatar: undefined,
        },
      ],
      '2': [
        {
          id: 'pc2',
          content: 'So true! Real connections are everything.',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          user_id: 'user-3',
          user_name: 'Bob Johnson',
          user_avatar: undefined,
        },
      ],
      '3': [
        {
          id: 'pc3',
          content: 'Same here! This platform is amazing.',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
          user_id: 'user-4',
          user_name: 'Carol Williams',
          user_avatar: undefined,
        },
      ],
    };

    return mockComments[postId] || [];
  };

  const handleLoadLikes = async (postId: string): Promise<{ count: number; isLiked: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const mockLikes: Record<string, { count: number; isLiked: boolean }> = {
      '1': { count: 24, isLiked: false },
      '2': { count: 18, isLiked: true },
      '3': { count: 31, isLiked: false },
    };

    return mockLikes[postId] || { count: 0, isLiked: false };
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar
        user={currentUser}
        onNavigateToProfile={handleNavigateToProfile}
        onLogout={handleLogout}
      />

      <main className="flex-1 min-w-0">
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground
                     mb-6 transition-colors group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-32 h-32 rounded-full bg-secondary" />
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="h-8 w-48 bg-secondary rounded mx-auto md:mx-0" />
                  <div className="h-4 w-64 bg-secondary rounded mx-auto md:mx-0" />
                </div>
              </div>
            </div>
          ) : profile ? (
            <div className="space-y-8">
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

              <section>
                <h3 className="text-lg font-medium text-foreground mb-4">Posts</h3>
                <Timeline
                  currentUserId={currentUser.id}
                  currentUserName={currentUser.full_name}
                  currentUserAvatar={currentUser.avatar_url}
                  onUserClick={handleNavigateToProfile}
                  fetchPosts={fetchUserPosts}
                  onLikeToggle={handleLikeToggle}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                  onLoadComments={handleLoadComments}
                  onLoadLikes={handleLoadLikes}
                />
              </section>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">User not found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
