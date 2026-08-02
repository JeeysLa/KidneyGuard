import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../core/language.service';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  bulbOutline,
  calendarOutline,
  heartOutline,
  notificationsOutline,
  pulseOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonChip,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class HomePage {
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

  readonly actions = [
    {
      titleKey: 'actionHydration',
      descriptionKey: 'actionHydrationText',
      badge: '5 min',
      badgeColor: 'primary',
      icon: 'heart-outline',
      color: 'primary',
    },
    {
      titleKey: 'actionReview',
      descriptionKey: 'actionReviewText',
      badge: 'Today',
      badgeColor: 'success',
      icon: 'calendar-outline',
      color: 'success',
    },
    {
      titleKey: 'actionAi',
      descriptionKey: 'actionAiText',
      badge: 'New',
      badgeColor: 'warning',
      icon: 'analytics-outline',
      color: 'warning',
    },
  ];

  constructor(public readonly languageService: LanguageService) {
    addIcons({
      analyticsOutline,
      bulbOutline,
      calendarOutline,
      heartOutline,
      notificationsOutline,
      pulseOutline,
      shieldCheckmarkOutline,
      sparklesOutline,
    });
  }

  onQuickActions(): void {
    console.log('Quick actions tapped');
  }

  onDailyReminders(): void {
    console.log('Daily reminders tapped');
  }

  performAction(action: { titleKey: string }): void {
    console.log('Action tapped:', action.titleKey);
  }
}
