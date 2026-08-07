import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../core/translation.service';
import { NotificationService, NotificationItem } from '../core/notification.service';
import { Observable } from 'rxjs';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonButtons
  ]
})
export class NotificationsPage implements OnInit {
  notifications$: Observable<NotificationItem[]>;

  constructor(
    public ts: TranslationService,
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.notificationService.notifications$;
  }

  ngOnInit() {
    this.notificationService.markAllAsRead();
  }

  clearAll() {
    this.notificationService.clearAll();
  }
}
