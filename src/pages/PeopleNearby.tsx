import { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import DiscoveryLayout from '@/components/DiscoveryLayout';
import UserCard from '@/components/UserCard';

interface NearbyUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  distance: number;
  isFollowing: boolean;
}

const PeopleNearby = () => {
  const [users, setUsers] = useState<NearbyUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNearbyPeople = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers: NearbyUser[] = [
          { id: '1', full_name: 'Sarah Johnson', distance: 0.5, isFollowing: false },
          { id: '2', full_name: 'Michael Chen', distance: 1.2, isFollowing: true },
          { id: '3', full_name: 'Emma Williams', distance: 2.3, isFollowing: false },
          { id: '4', full_name: 'James Rodriguez', distance: 3.1, isFollowing: false },
          { id: '5', full_name: 'Olivia Brown', distance: 4.5, isFollowing: true },
          { id: '6', full_name: 'Daniel Kim', distance: 5.8, isFollowing: false },
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        setLocationError('Unable to fetch nearby people');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyPeople();
  }, []);

  const formatDistance = (km: number) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m away`;
    }
    return `${km.toFixed(1)} km away`;
  };

  const handleFollowToggle = async (userId: string, isFollowing: boolean) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
  };

  return (
    <DiscoveryLayout
      title="People near you"
      subtitle="Discover people in your area"
      icon={<MapPin className="w-5 h-5" />}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Finding people nearby...</p>
        </div>
      ) : locationError ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-center">{locationError}</p>
          <p className="text-sm mt-2">Please enable location services to see nearby people</p>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p>No people found nearby</p>
          <p className="text-sm mt-2">Try expanding your search radius</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              descriptor={formatDistance(user.distance)}
              isFollowing={user.isFollowing}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      )}
    </DiscoveryLayout>
  );
};

export default PeopleNearby;
