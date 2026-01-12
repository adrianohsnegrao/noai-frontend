import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, UserMinus, Edit } from 'lucide-react';
import UserStats from './UserStats';

interface ProfileHeaderProps {
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
    bio?: string;
  };
  stats: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
  };
  isOwnProfile: boolean;
  isFollowing?: boolean;
  onEditProfile?: () => void;
  onFollowToggle?: () => void;
  onStatClick?: (stat: 'posts' | 'followers' | 'following') => void;
  isLoadingFollow?: boolean;
}

const ProfileHeader = ({
  user,
  stats,
  isOwnProfile,
  isFollowing = false,
  onEditProfile,
  onFollowToggle,
  onStatClick,
  isLoadingFollow = false,
}: ProfileHeaderProps) => {
  return (
    <header className="animate-fade-in">
      {/* Desktop/Tablet Layout */}
      <div className="hidden sm:flex gap-6 md:gap-10 items-start">
        {/* Avatar */}
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-border flex-shrink-0">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback className="bg-secondary text-foreground text-2xl md:text-4xl">
            {user.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <h1 className="text-xl md:text-2xl font-semibold text-foreground truncate">
              {user.full_name}
            </h1>
            
            {isOwnProfile ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onEditProfile}
                className="noai-button-glow"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={onFollowToggle}
                disabled={isLoadingFollow}
                className="noai-button-glow min-w-[100px]"
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="w-4 h-4 mr-2" />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="mb-4">
            <UserStats
              postsCount={stats.postsCount}
              followersCount={stats.followersCount}
              followingCount={stats.followingCount}
              onStatClick={onStatClick}
            />
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="sm:hidden flex flex-col items-center text-center">
        {/* Avatar */}
        <Avatar className="w-20 h-20 border-2 border-border mb-4">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback className="bg-secondary text-foreground text-2xl">
            {user.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <h1 className="text-xl font-semibold text-foreground mb-2">
          {user.full_name}
        </h1>

        {/* Bio */}
        {user.bio && (
          <p className="text-muted-foreground text-sm mb-4 max-w-xs leading-relaxed">
            {user.bio}
          </p>
        )}

        {/* Action Button */}
        <div className="mb-6">
          {isOwnProfile ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onEditProfile}
              className="noai-button-glow"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={onFollowToggle}
              disabled={isLoadingFollow}
              className="noai-button-glow min-w-[100px]"
            >
              {isFollowing ? (
                <>
                  <UserMinus className="w-4 h-4 mr-2" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </>
              )}
            </Button>
          )}
        </div>

        {/* Stats */}
        <UserStats
          postsCount={stats.postsCount}
          followersCount={stats.followersCount}
          followingCount={stats.followingCount}
          onStatClick={onStatClick}
        />
      </div>

      {/* Divider */}
      <div className="mt-6 md:mt-8 border-b border-border" />
    </header>
  );
};

export default ProfileHeader;
