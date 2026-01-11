import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Timeline from '@/components/Timeline';

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
    console.log('Navigate to profile:', userId);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  const fetchPosts = async (): Promise<TimelinePost[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
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

          <Timeline
            onUserClick={handleNavigateToProfile}
            fetchPosts={fetchPosts}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
