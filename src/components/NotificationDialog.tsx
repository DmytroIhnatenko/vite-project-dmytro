import React, { useEffect, useState } from 'react';
import { notificationService, Notification } from '../services/NotificationService';

const NotificationDialog: React.FC = () => {
  const [latestNotification, setLatestNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const subscription = notificationService.list().subscribe(notifications => {
      const latest = notifications[notifications.length - 1];
      if (latest && (latest.priority === 'medium' || latest.priority === 'high')) {
        setLatestNotification(latest);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!latestNotification) {
    return null;
  }

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{latestNotification.title}</h5>
            <button type="button" className="close" onClick={() => setLatestNotification(null)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{latestNotification.message}</p>
            <small>{new Date(latestNotification.date).toLocaleString()}</small>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={() => setLatestNotification(null)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;