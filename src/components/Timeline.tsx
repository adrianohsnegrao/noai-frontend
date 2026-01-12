import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Post from './Post';
import { Comment } from './CommentSection';

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

interface TimelineProps {
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  onUserClick: (userId: string) => void;
  fetchPosts: () => Promise<TimelinePost[]>;
  posts?: TimelinePost[];
  onLikeToggle: (postId: string, isLiked: boolean) => Promise<void>;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLoadComments: (postId: string) => Promise<Comment[]>;
  onLoadLikes: (postId: string) => Promise<{ count: number; isLiked: boolean }>;
}

const Timeline = ({
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onUserClick,
  fetchPosts,
  posts: externalPosts,
  onLikeToggle,
  onAddComment,
  onDeleteComment,
  onLoadComments,
  onLoadLikes,
}: TimelineProps) => {
  const [internalPosts, setInternalPosts] = useState<TimelinePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postLikes, setPostLikes] = useState<Record<string, { count: number; isLiked: boolean }>>({});

  const posts = externalPosts && externalPosts.length > 0 ? externalPosts : internalPosts;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchPosts();
      setInternalPosts(data);

      const likesMap: Record<string, { count: number; isLiked: boolean }> = {};
      await Promise.all(
        data.map(async (post) => {
          try {
            likesMap[post.id] = await onLoadLikes(post.id);
          } catch (err) {
            console.error(`Failed to load likes for post ${post.id}:`, err);
            likesMap[post.id] = { count: 0, isLiked: false };
          }
        })
      );
      setPostLikes(likesMap);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={loadPosts}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg
                     hover:brightness-110 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <p className="text-muted-foreground text-lg mb-2">No posts yet</p>
          <p className="text-muted-foreground text-sm">
            Start following people to see their posts in your timeline
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          currentUserAvatar={currentUserAvatar}
          initialLikeCount={postLikes[post.id]?.count || 0}
          initialIsLiked={postLikes[post.id]?.isLiked || false}
          onUserClick={onUserClick}
          onLikeToggle={onLikeToggle}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          onLoadComments={onLoadComments}
        />
      ))}
    </div>
  );
};

export default Timeline;
