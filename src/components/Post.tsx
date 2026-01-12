import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import CommentSection, { Comment } from './CommentSection';

interface PostProps {
  post: {
    id: string;
    content: string;
    created_at: string;
    user: {
      id: string;
      full_name: string;
      avatar_url?: string;
    };
  };
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  initialLikeCount?: number;
  initialIsLiked?: boolean;
  initialComments?: Comment[];
  onUserClick: (userId: string) => void;
  onLikeToggle: (postId: string, isLiked: boolean) => Promise<void>;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLoadComments: (postId: string) => Promise<Comment[]>;
}

const Post = ({
  post,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  initialLikeCount = 0,
  initialIsLiked = false,
  initialComments = [],
  onUserClick,
  onLikeToggle,
  onAddComment,
  onDeleteComment,
  onLoadComments,
}: PostProps) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setIsLoadingComments(true);
      try {
        const loadedComments = await onLoadComments(post.id);
        setComments(loadedComments);
      } catch (error) {
        console.error('Failed to load comments:', error);
      } finally {
        setIsLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (postId: string, content: string) => {
    await onAddComment(postId, content);
    const updatedComments = await onLoadComments(postId);
    setComments(updatedComments);
  };

  const handleDeleteComment = async (commentId: string) => {
    await onDeleteComment(commentId);
    setComments(comments.filter(c => c.id !== commentId));
  };

  return (
    <article className="bg-card border border-border rounded-lg p-4
                       hover:border-border/80 transition-colors">
      <div className="flex gap-3">
        <button
          onClick={() => onUserClick(post.user.id)}
          className="flex-shrink-0 group"
          aria-label={`View profile of ${post.user.full_name}`}
        >
          <Avatar className="w-12 h-12 border-2 border-border group-hover:border-primary transition-colors">
            <AvatarImage src={post.user.avatar_url} alt={post.user.full_name} />
            <AvatarFallback className="bg-secondary text-foreground">
              {post.user.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => onUserClick(post.user.id)}
              className="font-medium text-foreground hover:text-primary
                       transition-colors noai-link"
            >
              {post.user.full_name}
            </button>
            <span className="text-xs text-muted-foreground">·</span>
            <time className="text-xs text-muted-foreground" dateTime={post.created_at}>
              {timeAgo}
            </time>
          </div>

          <p className="text-foreground leading-relaxed whitespace-pre-wrap break-words mb-3">
            {post.content}
          </p>

          {/* Interaction Buttons */}
          <div className="flex items-center gap-6 pt-2">
            <LikeButton
              postId={post.id}
              initialLikeCount={initialLikeCount}
              initialIsLiked={initialIsLiked}
              onLikeToggle={onLikeToggle}
            />
            <CommentButton
              commentCount={comments.length}
              isActive={showComments}
              onClick={handleToggleComments}
            />
          </div>

          {/* Comments Section */}
          {showComments && !isLoadingComments && (
            <CommentSection
              postId={post.id}
              comments={comments}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              currentUserAvatar={currentUserAvatar}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onUserClick={onUserClick}
            />
          )}

          {isLoadingComments && (
            <div className="mt-4 text-center text-sm text-muted-foreground py-4">
              Loading comments...
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
