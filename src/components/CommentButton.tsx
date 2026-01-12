import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentButtonProps {
  commentCount: number;
  isActive: boolean;
  onClick: () => void;
}

const CommentButton = ({ commentCount, isActive, onClick }: CommentButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 group transition-colors"
      aria-label="View comments"
    >
      <MessageCircle
        className={cn(
          'w-5 h-5 transition-colors',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground group-hover:text-primary'
        )}
      />
      <span
        className={cn(
          'text-sm transition-colors',
          isActive
            ? 'text-primary font-medium'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {commentCount}
      </span>
    </button>
  );
};

export default CommentButton;
