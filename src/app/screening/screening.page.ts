import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline, pulseOutline } from 'ionicons/icons';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-screening',
  templateUrl: 'screening.page.html',
  styleUrls: ['screening.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonBadge,
    IonToggle,
  ],
})
export class ScreeningPage implements OnDestroy {
  age = 35;
  diabetes = false;
  hypertension = false;
  familyHistory = false;
  smoking = false;
  activity = 3;
  water = 2.5;
  riskLevel: 'low' | 'moderate' | 'high' = 'low';
  riskSummary = '';
  recommendations: string[] = [];

  private readonly languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
    this.changeDetectorRef.detectChanges();
    this.refreshAssessment();
  });

  constructor(
    public readonly languageService: LanguageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    addIcons({
      globeOutline,
      pulseOutline,
    });
    this.refreshAssessment();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  analyzeRisk(): void {
    this.refreshAssessment();
  }

  private refreshAssessment(): void {
    const score = Number(this.activity) < 3 ? 1 : 0;
    const hydrationRisk = Number(this.water) < 2 ? 1 : 0;
    const chronicRisk = Number(this.age) > 50 || this.diabetes || this.hypertension || this.familyHistory || this.smoking ? 1 : 0;

    if (this.diabetes && this.hypertension) {
      this.riskLevel = 'high';
    } else if (chronicRisk + score + hydrationRisk >= 2) {
      this.riskLevel = 'moderate';
    } else {
      this.riskLevel = 'low';
    }

    this.riskSummary = this.languageService.t(`risk${this.capitalize(this.riskLevel)}Text`);
    this.recommendations = this.languageService.tArray(`recommendations${this.capitalize(this.riskLevel)}`);
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
