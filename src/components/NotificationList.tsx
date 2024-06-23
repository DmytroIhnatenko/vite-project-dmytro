import React, { useEffect, useState } from 'react';
import { notificationService, Notification } from '../services/NotificationService';

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const subscription = notificationService.list().subscribe(notifications => {
      setNotifications(notifications);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMarkAsRead = (index: number) => {
    notificationService.markAsRead(index);
  };

  return (
    <div className="notification-list">
      <h3>Notifications</h3>
      <ul className="list-group">
        {notifications.map((notification, index) => (
          <li key={index} className={`list-group-item ${notification.read ? 'list-group-item-light' : ''}`}>
            <div>
              <h5>{notification.title}</h5>
              <p>{notification.message}</p>
              <small>{new Date(notification.date).toLocaleString()}</small>
              <button
                className="btn btn-sm btn-primary float-right"
                onClick={() => handleMarkAsRead(index)}
              >
                Mark as read
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;