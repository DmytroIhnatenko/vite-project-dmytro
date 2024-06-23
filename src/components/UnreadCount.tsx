import React, { useEffect, useState } from 'react';
import { notificationService } from '../services/NotificationService';

const UnreadCount: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const subscription = notificationService.unreadCount().subscribe(count => {
      setUnreadCount(count);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="unread-count">
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && <span className="badge badge-danger">{unreadCount}</span>}
    </div>
  );
};

export default UnreadCount;