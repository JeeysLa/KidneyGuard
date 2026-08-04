import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonButton,
    IonBadge,
    IonIcon
  ]
})
export class EducationPage {
  articles = [
    {
      title: 'Early Symptoms of CKD',
      category: 'Kidney Health',
      description: 'Learn the early warning signs before kidney disease becomes serious.',
      icon: 'medical-outline',
      accent: 'primary'
    },
    {
      title: 'Foods That Protect Your Kidneys',
      category: 'Healthy Lifestyle',
      description: 'Find out which daily foods can help support kidney function.',
      icon: 'nutrition-outline',
      accent: 'success'
    },
    {
      title: 'Hydration Habits That Matter',
      category: 'Daily Care',
      description: 'Keep your fluid intake balanced for better kidney health.',
      icon: 'water-outline',
      accent: 'secondary'
    }
  ];
}
