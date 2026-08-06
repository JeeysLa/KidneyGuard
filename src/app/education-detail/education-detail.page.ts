import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EducationService, Article } from '../core/education.service';
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
    RouterLink,
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
export class EducationDetailPage implements OnInit {
  article: Article = {
    id: 'hydration-habits',
    title: 'Why Hydration Matters for Kidney Health',
    category: 'Daily Care',
    description: 'Keep your fluid intake balanced for better kidney health.',
    summary: 'Drinking enough water supports kidney function, especially when you are active or exposed to heat. Water helps the kidneys remove wastes from your blood in the form of urine.',
    tips: [
      'Drink water regularly throughout the day instead of waiting until you feel thirsty.',
      'Use a bottle reminder if you often forget to hydrate.',
      'Reduce sugary drinks and choose water as your main beverage.'
    ],
    icon: 'water-outline',
    accent: 'secondary'
  };

  constructor(
    private route: ActivatedRoute,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const found = this.educationService.getArticleById(id);
        if (found) {
          this.article = found;
        }
      }
    });
  }
}
