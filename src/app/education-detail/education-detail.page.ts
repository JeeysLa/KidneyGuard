import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-education-detail',
  templateUrl: './education-detail.page.html',
  styleUrls: ['./education-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonBadge,
    IonIcon
  ]
})
export class EducationDetailPage {
  article = {
    title: 'Why hydration matters for kidney health',
    category: 'Daily Care',
    summary: 'Drinking enough water supports kidney function, especially when you are active or exposed to heat.',
    tips: [
      'Drink water regularly throughout the day instead of waiting until you feel thirsty.',
      'Use a bottle reminder if you often forget to hydrate.',
      'Reduce sugary drinks and choose water as your main beverage.'
    ]
  };
}
