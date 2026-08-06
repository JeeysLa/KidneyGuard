import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EducationService, Article } from '../core/education.service';
import { TranslationService } from '../core/translation.service';
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
  IonIcon,
  IonSearchbar,
  IonChip,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonButton,
    IonBadge,
    IonIcon,
    IonSearchbar,
    IonChip,
    IonLabel
  ]
})
export class EducationPage {
  searchQuery = '';
  selectedCategory = 'all';

  categories = [
    { key: 'all', labelKey: 'categoryAll' as const },
    { key: 'Kidney Health', labelKey: 'categoryHealth' as const },
    { key: 'Healthy Diet', labelKey: 'categoryDiet' as const },
    { key: 'Daily Care', labelKey: 'categoryCare' as const }
  ];

  constructor(
    public ts: TranslationService,
    private educationService: EducationService
  ) {}

  get articles(): Article[] {
    let list = this.educationService.getArticles();
    
    if (this.selectedCategory !== 'all') {
      list = list.filter(a => a.category === this.selectedCategory);
    }
    
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.description.toLowerCase().includes(q)
      );
    }
    
    return list;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
