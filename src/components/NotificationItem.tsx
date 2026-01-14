import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Notification, NotificationType } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return <Heart className="w-4 h-4 text-red-500" />;
    case 'comment':
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case 'follow':
      return <UserPlus className="w-4 h-4 text-green-500" />;
  }
};

const getNotificationIconBg = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return 'bg-red-500/10';
    case 'comment':
      return 'bg-blue-500/10';
    case 'follow':
      return 'bg-green-500/10';
  }
};

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(notification.created_at), { addSuffix: true });

  return (
    <button
      onClick={() => onClick(notification)}
      className={`w-full flex items-start gap-3 p-4 text-left transition-colors duration-200
                  hover:bg-noai-surface-hover group
                  ${notification.isRead ? 'opacity-70' : 'bg-primary/5'}`}
    >
      {/* Avatar with notification type indicator */}
      <div className="relative flex-shrink-0">
        <Avatar className="w-10 h-10 border border-border">
          <AvatarImage src={notification.sender.avatar_url} alt={notification.sender.full_name} />
          <AvatarFallback className="bg-secondary text-foreground text-sm">
            {notification.sender.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Type indicator */}
        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-card
                        ${getNotificationIconBg(notification.type)}`}>
          {getNotificationIcon(notification.type)}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-relaxed ${notification.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
          <span className="font-medium group-hover:text-primary transition-colors">
            {notification.sender.full_name}
          </span>
          {' '}
          {notification.message.replace(notification.sender.full_name, '').trim()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {timeAgo}
        </p>
      </div>

      {/* Unread indicator */}
      {!notification.isRead && (
        <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full" />
      )}
    </button>
  );
};

export default NotificationItem;
