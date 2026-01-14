import { useState, useEffect } from 'react';
import { TrendingUp, Loader2, Flame } from 'lucide-react';
import DiscoveryLayout from '@/components/DiscoveryLayout';
import UserCard from '@/components/UserCard';

interface TrendingUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  searchCount: number;
  trendingRank: number;
  isFollowing: boolean;
}

const MostSearched = () => {
  const [users, setUsers] = useState<TrendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPeople = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers: TrendingUser[] = [
          { id: '10', full_name: 'Alex Turner', searchCount: 15420, trendingRank: 1, isFollowing: false },
          { id: '11', full_name: 'Maya Patel', searchCount: 12890, trendingRank: 2, isFollowing: true },
          { id: '12', full_name: 'Lucas Martin', searchCount: 9845, trendingRank: 3, isFollowing: false },
          { id: '13', full_name: 'Sophie Anderson', searchCount: 8234, trendingRank: 4, isFollowing: false },
          { id: '14', full_name: 'Ryan Lee', searchCount: 7123, trendingRank: 5, isFollowing: true },
          { id: '15', full_name: 'Isabella Garcia', searchCount: 6789, trendingRank: 6, isFollowing: false },
          { id: '16', full_name: 'Noah Thompson', searchCount: 5432, trendingRank: 7, isFollowing: false },
          { id: '17', full_name: 'Ava Mitchell', searchCount: 4567, trendingRank: 8, isFollowing: false },
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error('Failed to fetch trending people:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingPeople();
  }, []);

  const formatSearchCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k searches`;
    }
    return `${count} searches`;
  };

  const getDescriptor = (user: TrendingUser) => {
    if (user.trendingRank <= 3) {
      return `🔥 #${user.trendingRank} Trending • ${formatSearchCount(user.searchCount)}`;
    }
    return `#${user.trendingRank} • ${formatSearchCount(user.searchCount)}`;
  };

  const handleFollowToggle = async (userId: string, isFollowing: boolean) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
  };

  return (
    <DiscoveryLayout
      title="Most searched"
      subtitle="Trending profiles this week"
      icon={<TrendingUp className="w-5 h-5" />}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading trending profiles...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <TrendingUp className="w-12 h-12 mb-4 opacity-50" />
          <p>No trending profiles right now</p>
          <p className="text-sm mt-2">Check back later</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              descriptor={getDescriptor(user)}
              isFollowing={user.isFollowing}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      )}
    </DiscoveryLayout>
  );
};

export default MostSearched;
