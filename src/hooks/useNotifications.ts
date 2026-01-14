import { useState, useCallback, useEffect } from 'react';

export type NotificationType = 'like' | 'comment' | 'follow';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  sender: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
  targetId?: string; // post id or profile id
  isRead: boolean;
  created_at: string;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  hasNewNotification: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearNewNotificationFlag: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockNotifications: Notification[] = [
        {
          id: 'n1',
          type: 'like',
          message: 'Maria liked your post',
          sender: {
            id: 'user-maria',
            full_name: 'Maria Santos',
            avatar_url: undefined,
          },
          targetId: 'post-1',
          isRead: false,
          created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        },
        {
          id: 'n2',
          type: 'comment',
          message: 'João commented on your post',
          sender: {
            id: 'user-joao',
            full_name: 'João Silva',
            avatar_url: undefined,
          },
          targetId: 'post-2',
          isRead: false,
          created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: 'n3',
          type: 'follow',
          message: 'Ana started following you',
          sender: {
            id: 'user-ana',
            full_name: 'Ana Costa',
            avatar_url: undefined,
          },
          targetId: 'user-ana',
          isRead: false,
          created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: 'n4',
          type: 'like',
          message: 'Carlos liked your post',
          sender: {
            id: 'user-carlos',
            full_name: 'Carlos Oliveira',
            avatar_url: undefined,
          },
          targetId: 'post-1',
          isRead: true,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: 'n5',
          type: 'comment',
          message: 'Lucia commented: "Great post!"',
          sender: {
            id: 'user-lucia',
            full_name: 'Lucia Ferreira',
            avatar_url: undefined,
          },
          targetId: 'post-3',
          isRead: true,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        },
        {
          id: 'n6',
          type: 'follow',
          message: 'Pedro started following you',
          sender: {
            id: 'user-pedro',
            full_name: 'Pedro Almeida',
            avatar_url: undefined,
          },
          targetId: 'user-pedro',
          isRead: true,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    // Optimistic update
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      // Revert on error
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, isRead: false } : n
        )
      );
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const previousNotifications = notifications;
    
    // Optimistic update
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      // Revert on error
      setNotifications(previousNotifications);
      console.error('Failed to mark all notifications as read:', error);
    }
  }, [notifications]);

  const clearNewNotificationFlag = useCallback(() => {
    setHasNewNotification(false);
  }, []);

  // Simulate receiving new notifications periodically (for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of new notification every 30 seconds
      if (Math.random() < 0.1) {
        setHasNewNotification(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    hasNewNotification,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    clearNewNotificationFlag,
  };
};
