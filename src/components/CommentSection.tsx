import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onUserClick: (userId: string) => void;
}

const CommentSection = ({
  postId,
  comments,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onAddComment,
  onDeleteComment,
  onUserClick,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = newComment.trim();
    if (!content || isSubmitting) return;

    setIsSubmitting(true);
    setNewComment('');

    try {
      await onAddComment(postId, content);
    } catch (error) {
      console.error('Failed to add comment:', error);
      setNewComment(content);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="mt-4 border-t border-border pt-4 space-y-4 animate-fade-in">
      {/* Comments List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 group">
              <button
                onClick={() => onUserClick(comment.user_id)}
                className="flex-shrink-0"
                aria-label={`View profile of ${comment.user_name}`}
              >
                <Avatar className="w-8 h-8 border border-border group-hover:border-primary transition-colors">
                  <AvatarImage src={comment.user_avatar} alt={comment.user_name} />
                  <AvatarFallback className="bg-secondary text-foreground text-xs">
                    {comment.user_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => onUserClick(comment.user_id)}
                    className="font-medium text-sm text-foreground hover:text-primary
                             transition-colors noai-link"
                  >
                    {comment.user_name}
                  </button>
                  <span className="text-xs text-muted-foreground">·</span>
                  <time className="text-xs text-muted-foreground" dateTime={comment.created_at}>
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </time>
                </div>

                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </div>

              {comment.user_id === currentUserId && (
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity
                           text-muted-foreground hover:text-destructive p-1"
                  aria-label="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 items-start">
        <Avatar className="w-8 h-8 border border-border flex-shrink-0">
          <AvatarImage src={currentUserAvatar} alt={currentUserName} />
          <AvatarFallback className="bg-secondary text-foreground text-xs">
            {currentUserName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            disabled={isSubmitting}
            className={cn(
              'w-full min-h-[40px] max-h-[120px] px-3 py-2 pr-12',
              'bg-secondary border border-border rounded-lg resize-none',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:border-primary/50 noai-input-glow',
              'transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            rows={1}
          />

          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className={cn(
              'absolute right-2 bottom-2 p-1.5 rounded-md',
              'transition-all duration-200',
              newComment.trim() && !isSubmitting
                ? 'text-primary hover:bg-primary/10'
                : 'text-muted-foreground cursor-not-allowed'
            )}
            aria-label="Send comment"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
