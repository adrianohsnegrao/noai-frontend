import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, Loader2, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { useIsMobile } from '@/hooks/use-mobile';

const NotificationsPanel = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    notifications,
    unreadCount,
    isLoading,
    hasNewNotification,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    clearNewNotificationFlag,
  } = useNotifications();

  // Fetch notifications when panel opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
      clearNewNotificationFlag();
    }
  }, [isOpen, fetchNotifications, clearNewNotificationFlag]);

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    // Navigate to relevant context
    if (notification.type === 'follow') {
      navigate(`/profile/${notification.sender.id}`);
    } else {
      // For likes and comments, navigate to the post (or home for now)
      navigate('/home');
    }

    setIsOpen(false);
  };

  const NotificationsBadge = () => (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className={`relative text-muted-foreground hover:text-foreground hover:bg-noai-surface-hover
                   ${hasNewNotification ? 'animate-pulse' : ''}`}
      >
        <Bell className="w-5 h-5" />
        
        {/* Unread count badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
                          bg-primary text-primary-foreground text-xs font-medium
                          rounded-full flex items-center justify-center
                          animate-scale-in">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
    </div>
  );

  const NotificationsContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Check className="w-3 h-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="p-3 bg-secondary rounded-full mb-3">
              <BellOff className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">You're all caught up</p>
            <p className="text-sm text-muted-foreground">
              No new notifications at the moment
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  // Mobile: Use Drawer (bottom sheet)
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <NotificationsBadge />
        </DrawerTrigger>
        <DrawerContent className="h-[85vh] bg-card border-border">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Notifications</DrawerTitle>
          </DrawerHeader>
          <NotificationsContent />
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Popover (dropdown)
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <NotificationsBadge />
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 bg-card border-border shadow-xl"
        align="end"
        sideOffset={8}
      >
        <div className="h-[480px]">
          <NotificationsContent />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPanel;
