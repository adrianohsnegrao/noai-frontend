import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';

interface UserCardProps {
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
    bio?: string;
  };
  descriptor?: string;
  showLiveIndicator?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: (userId: string, isFollowing: boolean) => Promise<void>;
}

const UserCard = ({ 
  user, 
  descriptor, 
  showLiveIndicator = false,
  isFollowing: initialFollowing = false,
  onFollowToggle 
}: UserCardProps) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    const newFollowState = !isFollowing;
    
    // Optimistic update
    setIsFollowing(newFollowState);

    try {
      if (onFollowToggle) {
        await onFollowToggle(user.id, newFollowState);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      // Revert on error
      setIsFollowing(!newFollowState);
      console.error('Failed to update follow status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl
                 hover:bg-noai-surface-hover transition-all duration-200 cursor-pointer group"
      onClick={handleNavigateToProfile}
    >
      <div className="relative">
        <Avatar className="w-14 h-14 border-2 border-border group-hover:border-primary transition-colors">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback className="bg-secondary text-foreground text-lg">
            {user.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {showLiveIndicator && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-card rounded-full animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {user.full_name}
        </p>
        {descriptor && (
          <p className="text-sm text-muted-foreground truncate">
            {descriptor}
          </p>
        )}
      </div>

      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={handleFollowToggle}
        disabled={isLoading}
        className={`min-w-[100px] ${
          isFollowing 
            ? 'border-border text-muted-foreground hover:border-destructive hover:text-destructive hover:bg-destructive/10' 
            : ''
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isFollowing ? (
          <>
            <UserMinus className="w-4 h-4 mr-1" />
            Unfollow
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4 mr-1" />
            Follow
          </>
        )}
      </Button>
    </div>
  );
};

export default UserCard;
