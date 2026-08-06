import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationItem {
  id: string;
  titleKey: 'waterReminderTitle' | 'screeningReminderTitle' | 'articleReminderTitle' | 'resultReminderTitle';
  bodyKey: 'waterReminderBody' | 'screeningReminderBody' | 'articleReminderBody' | 'resultReminderBody';
  timestamp: Date;
  read: boolean;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationItem[]>(this.loadNotifications());
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  private loadNotifications(): NotificationItem[] {
    const saved = localStorage.getItem('kidney_guard_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) }));
      } catch {
        return this.getDefaultNotifications();
      }
    }
    return this.getDefaultNotifications();
  }

  private getDefaultNotifications(): NotificationItem[] {
    return [
      {
        id: '1',
        titleKey: 'resultReminderTitle',
        bodyKey: 'resultReminderBody',
        timestamp: new Date(Date.now() - 3600000 * 2),
        read: false,
        icon: 'pulse-outline',
        color: 'success'
      },
      {
        id: '2',
        titleKey: 'waterReminderTitle',
        bodyKey: 'waterReminderBody',
        timestamp: new Date(Date.now() - 3600000 * 4),
        read: true,
        icon: 'water-outline',
        color: 'primary'
      },
      {
        id: '3',
        titleKey: 'articleReminderTitle',
        bodyKey: 'articleReminderBody',
        timestamp: new Date(Date.now() - 3600000 * 24),
        read: true,
        icon: 'book-outline',
        color: 'secondary'
      }
    ];
  }

  private saveNotifications(list: NotificationItem[]) {
    localStorage.setItem('kidney_guard_notifications', JSON.stringify(list));
    this.notificationsSubject.next(list);
  }

  getNotifications(): NotificationItem[] {
    return this.notificationsSubject.value;
  }

  getUnreadCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

  markAllAsRead() {
    const updated = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.saveNotifications(updated);
  }

  addNotification(titleKey: any, bodyKey: any, icon: string, color: string) {
    const newItem: NotificationItem = {
      id: Date.now().toString(),
      titleKey,
      bodyKey,
      timestamp: new Date(),
      read: false,
      icon,
      color
    };
    const updated = [newItem, ...this.notificationsSubject.value];
    this.saveNotifications(updated);
  }

  clearAll() {
    this.saveNotifications([]);
  }
}
