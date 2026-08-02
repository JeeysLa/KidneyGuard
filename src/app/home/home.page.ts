import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../core/language.service';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRange,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  bulbOutline,
  calendarOutline,
  heartOutline,
  moonOutline,
  notificationsOutline,
  pulseOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  waterOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonLabel,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonRange,
    IonSegment,
    IonSegmentButton,
    IonToggle,
  ],
})
export class HomePage {
  readonly metrics = [
    { icon: 'water-outline', value: '2.1L', labelKey: 'dashboardHydration' },
    { icon: 'pulse-outline', value: '78 bpm', labelKey: 'dashboardHeartRate' },
    { icon: 'moon-outline', value: '6.8', labelKey: 'dashboardSleep' },
  ];

  readonly insights = [
    {
      titleKey: 'insightFluid',
      textKey: 'insightFluidText',
      icon: 'sparkles-outline',
    },
    {
      titleKey: 'insightRisk',
      textKey: 'insightRiskText',
      icon: 'shield-checkmark-outline',
    },
    {
      titleKey: 'insightActivity',
      textKey: 'insightActivityText',
      icon: 'pulse-outline',
    },
    {
      titleKey: 'insightCare',
      textKey: 'insightCareText',
      icon: 'bulb-outline',
    },
  ];

  waterIntake = 2.0;
  exerciseFrequency: '0' | '1-2' | '3-4' | '5+' = '1-2';
  hypertension = false;
  diabetes = false;
  riskPercentage = 0;
  showRiskResult = false;
  riskMessage = '';

  readonly actions = [
    {
      titleKey: 'actionHydration',
      descriptionKey: 'actionHydrationText',
      badge: '5 min',
      badgeColor: 'primary',
      icon: 'heart-outline',
      color: 'primary',
      target: '/screening',
    },
    {
      titleKey: 'actionReview',
      descriptionKey: 'actionReviewText',
      badge: 'Today',
      badgeColor: 'success',
      icon: 'calendar-outline',
      color: 'success',
      target: '/profile',
    },
    {
      titleKey: 'actionAi',
      descriptionKey: 'actionAiText',
      badge: 'New',
      badgeColor: 'warning',
      icon: 'analytics-outline',
      color: 'warning',
      target: '/education',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly toastController: ToastController,
    public readonly languageService: LanguageService
  ) {
    addIcons({
      analyticsOutline,
      bulbOutline,
      calendarOutline,
      heartOutline,
      moonOutline,
      notificationsOutline,
      pulseOutline,
      shieldCheckmarkOutline,
      sparklesOutline,
      waterOutline,
    });
  }

testClick(): void {
  console.log('ANGULAR CLICK');
  alert('Angular Click');
}

  onQuickActions(): void {
    this.router.navigate(['/screening']);
  }

  onDailyReminders(): void {
    this.router.navigate(['/profile']);
  }

  async performAction(action: { titleKey: string; target: string }): Promise<void> {
    if (action.target) {
      await this.router.navigateByUrl(action.target);
      return;
    }

    const toast = await this.toastController.create({
      message: this.languageService.t(action.titleKey),
      duration: 1400,
      color: 'primary',
      position: 'bottom',
    });
    await toast.present();
  }

  async performMetric(metric: { labelKey: string }): Promise<void> {
    const toast = await this.toastController.create({
      message: this.languageService.t(metric.labelKey),
      duration: 1400,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  calculateRisk(): void {
    let score = 0;

    if (this.waterIntake < 2) {
      score += 20;
    }

    if (this.exerciseFrequency === '0') {
      score += 15;
    } else if (this.exerciseFrequency === '1-2') {
      score += 5;
    }

    if (this.hypertension) {
      score += 30;
    }

    if (this.diabetes) {
      score += 30;
    }

    this.riskPercentage = Math.min(100, score);
    this.showRiskResult = true;

    if (this.riskPercentage > 60) {
      this.riskMessage = 'High risk. Please consult a healthcare professional.';
    } else if (this.riskPercentage >= 30) {
      this.riskMessage = 'Moderate risk. Consider a lifestyle review and follow-up.';
    } else {
      this.riskMessage = 'Low risk. Keep your habits consistent.';
    }
  }
}
