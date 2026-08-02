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
  IonItem,
  IonLabel,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline } from 'ionicons/icons';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-screening',
  standalone: true,
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
    IonItem,
    IonLabel,
    IonRange,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonToggle,
    IonBadge,
  ],
})
export class ScreeningPage implements OnDestroy {
  water = 2.0;
  activity: '0' | '1-2' | '3-4' | '5+' = '1-2';
  hypertension = false;
  diabetes = false;
  isAnalyzing = false;
  analysisReady = false;
  riskPercent = 0;
  riskLabel: 'Low' | 'Moderate' | 'High' = 'Low';
  riskColor = '#10dc60';

  private readonly languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
    this.changeDetectorRef.detectChanges();
    this.updateRisk();
  });

  constructor(
    public readonly languageService: LanguageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    addIcons({
      globeOutline,
    });
    this.updateRisk();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  updateRisk(): void {
    let score = 0;
    if (this.hypertension) score += 30;
    if (this.diabetes) score += 30;
    if (this.water < 2) score += 20;
    if (this.activity === '0') score += 15;

    this.riskPercent = Math.min(100, score);
    if (this.riskPercent > 60) {
      this.riskLabel = 'High';
      this.riskColor = '#ef445a';
    } else if (this.riskPercent >= 30) {
      this.riskLabel = 'Moderate';
      this.riskColor = '#ffc409';
    } else {
      this.riskLabel = 'Low';
      this.riskColor = '#10dc60';
    }
  }

  getRiskLabelText(): string {
    return this.languageService.t(`screening${this.riskLabel}`);
  }

  analyzeRisk(): void {
    this.isAnalyzing = true;
    this.analysisReady = false;
    this.updateRisk();

    setTimeout(() => {
      this.isAnalyzing = false;
      this.analysisReady = true;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }

  get gaugeCircumference(): number {
    return 2 * Math.PI * 52;
  }

  get gaugeOffset(): number {
    return this.gaugeCircumference - (this.gaugeCircumference * this.riskPercent) / 100;
  }
}
