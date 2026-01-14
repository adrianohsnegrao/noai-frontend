import { useState, useEffect } from 'react';
import { Radio, Loader2 } from 'lucide-react';
import DiscoveryLayout from '@/components/DiscoveryLayout';
import UserCard from '@/components/UserCard';

interface LiveUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  lastActive: string;
  isFollowing: boolean;
}

const PeopleLive = () => {
  const [users, setUsers] = useState<LiveUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLivePeople = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers: LiveUser[] = [
          { id: '20', full_name: 'Jessica White', lastActive: 'Active now', isFollowing: false },
          { id: '21', full_name: 'David Park', lastActive: 'Active now', isFollowing: true },
          { id: '22', full_name: 'Rachel Green', lastActive: 'Active now', isFollowing: false },
          { id: '23', full_name: 'Chris Evans', lastActive: 'Active 2m ago', isFollowing: false },
          { id: '24', full_name: 'Amanda Taylor', lastActive: 'Active 5m ago', isFollowing: true },
          { id: '25', full_name: 'Kevin Zhang', lastActive: 'Active now', isFollowing: false },
          { id: '26', full_name: 'Lisa Johnson', lastActive: 'Active 1m ago', isFollowing: false },
          { id: '27', full_name: 'Tom Wilson', lastActive: 'Active now', isFollowing: false },
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error('Failed to fetch live people:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLivePeople();
  }, []);

  const handleFollowToggle = async (userId: string, isFollowing: boolean) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
  };

  return (
    <DiscoveryLayout
      title="People live"
      subtitle="See who's online right now"
      icon={<Radio className="w-5 h-5" />}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Finding active people...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Radio className="w-12 h-12 mb-4 opacity-50" />
          <p>No one is online right now</p>
          <p className="text-sm mt-2">Check back in a bit</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              descriptor={user.lastActive}
              showLiveIndicator={user.lastActive === 'Active now'}
              isFollowing={user.isFollowing}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      )}
    </DiscoveryLayout>
  );
};

export default PeopleLive;
