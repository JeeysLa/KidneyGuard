import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HealthDataService, HealthStats } from '../core/health-data.service';
import { TranslationService } from '../core/translation.service';
import { AuthService } from '../core/auth.service';
import { NotificationService } from '../core/notification.service';
import { Observable } from 'rxjs';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonGrid,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonRow,
    IonCol,
    IonGrid,
    IonBadge
  ]
})
export class HomePage {
  stats$: Observable<HealthStats>;

  constructor(
    public ts: TranslationService,
    public auth: AuthService,
    private healthData: HealthDataService,
    private notificationService: NotificationService
  ) {
    this.stats$ = this.healthData.stats$;
  }

  get greetingText(): string {
    const lang = this.ts.activeLanguage;
    const hour = new Date().getHours();

    let timeGreeting = 'Good Morning';
    if (hour >= 18) {
      timeGreeting = lang === 'en' ? 'Good Evening' : 'Selamat Malam';
    } else if (hour >= 12) {
      timeGreeting = lang === 'en' ? 'Good Afternoon' : 'Selamat Siang';
    } else {
      timeGreeting = lang === 'en' ? 'Good Morning' : 'Selamat Pagi';
    }

    const user = this.auth.currentUser;
    const rawName = user?.fullName?.trim();
    const name = rawName ? rawName.split(' ')[0] : 'Guest';
    return `${timeGreeting}, ${name}`;
  }

  get unreadNotifications(): number {
    return this.notificationService.getUnreadCount();
  }

  get latestScreening() {
    const stats = this.healthData.currentStats;
    if (stats.screeningHistory && stats.screeningHistory.length > 0) {
      return stats.screeningHistory[0];
    }
    return null;
  }

  get activeBmi(): number {
    const stats = this.healthData.currentStats;
    if (stats.height > 0) {
      const hMeters = stats.height / 100;
      return parseFloat((stats.weight / (hMeters * hMeters)).toFixed(1));
    }
    return 0;
  }

  get riskColor(): string {
    const stats = this.healthData.currentStats;
    if (stats.riskScore >= 60) return 'danger';
    if (stats.riskScore >= 30) return 'warning';
    return 'success';
  }

  get waterPercentage(): number {
    const stats = this.healthData.currentStats;
    if (stats.waterGoal === 0) return 0;
    return Math.min(100, Math.round((stats.waterIntake / stats.waterGoal) * 100));
  }

  get strokeDashoffset(): number {
    const c = 220; // 2 * PI * R where R = 35 is 219.9
    const percent = this.waterPercentage / 100;
    return c - percent * c;
  }

  updateChecklist(key: 'water' | 'walk' | 'urine', event: any) {
    this.healthData.updateChecklist(key, event.detail.checked);
  }

  addWaterAmount(ml: number) {
    this.healthData.updateWater(ml);
  }

  setUrineColor(color: 'clear' | 'yellow' | 'orange') {
    this.healthData.updateUrineColor(color);
  }

  resetWater() {
    this.healthData.updateWater(-this.healthData.currentStats.waterIntake);
  }
}
