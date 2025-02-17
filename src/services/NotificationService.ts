import { BehaviorSubject, Observable } from 'rxjs';

type ISOString = string;

export type Notification = {
  title: string;
  message: string;
  date: ISOString;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
};

class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject([]);
  private unreadCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  send(notification: Notification): void {
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
    this.updateUnreadCount();
  }

  list(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  unreadCount(): Observable<number> {
    return this.unreadCountSubject.asObservable();
  }

  markAsRead(index: number): void {
    if (this.notifications[index]) {
      this.notifications[index].read = true;
      this.notificationsSubject.next(this.notifications);
      this.updateUnreadCount();
    }
  }

  private updateUnreadCount(): void {
    const unreadCount = this.notifications.filter(notification => !notification.read).length;
    this.unreadCountSubject.next(unreadCount);
  }
}

export const notificationService = new NotificationService();