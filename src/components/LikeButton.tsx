import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
  onLikeToggle: (postId: string, isLiked: boolean) => Promise<void>;
}

const LikeButton = ({ postId, initialLikeCount, initialIsLiked, onLikeToggle }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    const newIsLiked = !isLiked;
    const previousIsLiked = isLiked;
    const previousCount = likeCount;

    setIsLiked(newIsLiked);
    setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);
    setIsAnimating(true);

    setTimeout(() => setIsAnimating(false), 300);

    try {
      await onLikeToggle(postId, newIsLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
      setIsLiked(previousIsLiked);
      setLikeCount(previousCount);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 group transition-colors"
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <div className="relative">
        <Heart
          className={cn(
            'w-5 h-5 transition-all duration-200',
            isLiked
              ? 'fill-primary text-primary'
              : 'text-muted-foreground group-hover:text-primary',
            isAnimating && 'scale-125'
          )}
        />
      </div>
      <span
        className={cn(
          'text-sm transition-colors',
          isLiked
            ? 'text-primary font-medium'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {likeCount}
      </span>
    </button>
  );
};

export default LikeButton;
