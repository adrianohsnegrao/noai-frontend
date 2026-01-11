import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  onUserClick: (userId: string) => void;
}

const Post = ({ post, onUserClick }: PostProps) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

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

          <p className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Post;
