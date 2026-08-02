import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, globeOutline, helpCircleOutline } from 'ionicons/icons';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-education',
  templateUrl: 'education.page.html',
  styleUrls: ['education.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonContent, IonCard, IonCardContent, IonList, IonItem, IonLabel],
})
export class EducationPage {
  readonly articles = [
    {
      titleKey: 'educationArticle1',
      textKey: 'educationArticle1Text',
    },
    {
      titleKey: 'educationArticle2',
      textKey: 'educationArticle2Text',
    },
    {
      titleKey: 'educationArticle3',
      textKey: 'educationArticle3Text',
    },
  ];

  readonly faqItems = [
    {
      titleKey: 'faqOne',
      textKey: 'faqOneAnswer',
    },
    {
      titleKey: 'faqTwo',
      textKey: 'faqTwoAnswer',
    },
  ];

  constructor(public readonly languageService: LanguageService) {
    addIcons({
      bookOutline,
      globeOutline,
      helpCircleOutline,
    });
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  openArticle(article: { titleKey: string }): void {
    console.log('Open article:', article.titleKey);
  }
}
