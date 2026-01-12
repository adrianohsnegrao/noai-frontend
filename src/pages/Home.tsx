import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Timeline from '@/components/Timeline';
import PostComposer from '@/components/PostComposer';
import { Comment } from '@/components/CommentSection';

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

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<TimelinePost[]>([]);
  const [currentUser] = useState({
    id: 'user-1',
    full_name: 'John Doe',
    avatar_url: undefined,
  });

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = false;

      if (!isAuthenticated) {
        console.log('User not authenticated, staying on home for demo');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleNavigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  const handleCreatePost = async (content: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock response - in production this would come from the API
    const newPost: TimelinePost = {
      id: `post-${Date.now()}`,
      content,
      created_at: new Date().toISOString(),
      user: {
        id: currentUser.id,
        full_name: currentUser.full_name,
        avatar_url: currentUser.avatar_url,
      },
    };

    // Optimistically add to timeline
    setPosts(prev => [newPost, ...prev]);
  };

  const fetchPosts = useCallback(async (): Promise<TimelinePost[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockPosts: TimelinePost[] = [
      {
        id: '1',
        content: 'Welcome to NOAI! This is your timeline where you can see posts from people you follow. The system focuses on real human connections, not algorithms.',
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        user: {
          id: 'user-2',
          full_name: 'Alice Smith',
          avatar_url: undefined,
        },
      },
      {
        id: '2',
        content: 'Just had an amazing conversation with someone nearby. NOAI really helps you connect with real people in meaningful ways.',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        user: {
          id: 'user-3',
          full_name: 'Bob Johnson',
          avatar_url: undefined,
        },
      },
      {
        id: '3',
        content: 'The dark theme on this platform is so clean and easy on the eyes. Love the minimalist design philosophy.',
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        user: {
          id: 'user-4',
          full_name: 'Carol Williams',
          avatar_url: undefined,
        },
      },
      {
        id: '4',
        content: 'Finally, a social platform that prioritizes people over engagement metrics. This is refreshing!',
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        user: {
          id: 'user-5',
          full_name: 'David Brown',
          avatar_url: undefined,
        },
      },
    ];

    setPosts(mockPosts);
    return mockPosts;
  }, []);

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
          id: 'c1',
          content: 'This is exactly what I was looking for!',
          created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
          user_id: 'user-3',
          user_name: 'Bob Johnson',
          user_avatar: undefined,
        },
        {
          id: 'c2',
          content: 'Love the focus on human connections rather than algorithms.',
          created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
          user_id: 'user-4',
          user_name: 'Carol Williams',
          user_avatar: undefined,
        },
      ],
      '2': [
        {
          id: 'c3',
          content: 'Same here! Met some amazing people through this platform.',
          created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          user_id: 'user-2',
          user_name: 'Alice Smith',
          user_avatar: undefined,
        },
      ],
      '3': [],
      '4': [
        {
          id: 'c4',
          content: 'Totally agree! Finally a breath of fresh air.',
          created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
          user_id: 'user-2',
          user_name: 'Alice Smith',
          user_avatar: undefined,
        },
      ],
    };

    return mockComments[postId] || [];
  };

  const handleLoadLikes = async (postId: string): Promise<{ count: number; isLiked: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const mockLikes: Record<string, { count: number; isLiked: boolean }> = {
      '1': { count: 12, isLiked: false },
      '2': { count: 8, isLiked: true },
      '3': { count: 15, isLiked: false },
      '4': { count: 6, isLiked: false },
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
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Timeline
            </h1>
            <p className="text-muted-foreground">
              Posts from people you follow
            </p>
          </header>

          <PostComposer user={currentUser} onPost={handleCreatePost} />

          <Timeline
            currentUserId={currentUser.id}
            currentUserName={currentUser.full_name}
            currentUserAvatar={currentUser.avatar_url}
            onUserClick={handleNavigateToProfile}
            fetchPosts={fetchPosts}
            posts={posts}
            onLikeToggle={handleLikeToggle}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onLoadComments={handleLoadComments}
            onLoadLikes={handleLoadLikes}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
