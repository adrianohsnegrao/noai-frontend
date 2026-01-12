import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PostComposerProps {
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
  onPost: (content: string) => Promise<void>;
}

const MAX_CHARS = 500;
const SOFT_LIMIT = 280;

const PostComposer = ({ user, onPost }: PostComposerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isNearLimit = charCount > SOFT_LIMIT;
  const canPost = content.trim().length > 0 && !isOverLimit && !isPosting;

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!isPosting) {
      setIsOpen(open);
      if (!open) {
        setContent('');
        setError(null);
      }
    }
  };

  const handlePost = async () => {
    if (!canPost) return;

    try {
      setIsPosting(true);
      setError(null);
      await onPost(content.trim());
      setContent('');
      setIsOpen(false);
    } catch (err) {
      console.error('Error posting:', err);
      setError('Failed to post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCharCountColor = () => {
    if (isOverLimit) return 'text-destructive';
    if (isNearLimit) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <>
      {/* Compact Entry Point */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={user.avatar_url} alt={user.full_name} />
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {getInitials(user.full_name)}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 text-left px-4 py-3 bg-muted/50 hover:bg-muted 
                     rounded-full text-muted-foreground transition-colors
                     focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            What's on your mind?
          </button>
        </div>
      </div>

      {/* Composer Modal */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg bg-card border-border p-0 gap-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-foreground">Create Post</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 border border-border shrink-0">
                <AvatarImage src={user.avatar_url} alt={user.full_name} />
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm mb-2">
                  {user.full_name}
                </p>
                <Textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="min-h-[120px] resize-none bg-transparent border-none p-0 
                           text-foreground placeholder:text-muted-foreground
                           focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isPosting}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className={`text-sm ${getCharCountColor()}`}>
                <span className={isOverLimit ? 'font-medium' : ''}>
                  {charCount}
                </span>
                <span className="text-muted-foreground">/{MAX_CHARS}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                  disabled={isPosting}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handlePost}
                  disabled={!canPost}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1" />
                      Post
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostComposer;
