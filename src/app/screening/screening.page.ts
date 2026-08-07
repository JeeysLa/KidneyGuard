import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HealthDataService } from '../core/health-data.service';
import { TranslationService } from '../core/translation.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonCheckbox
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonProgressBar,
    IonCheckbox
  ]
})
export class ScreeningPage {
  currentStep = 1;
  isCalculating = false;
  validationMessage = '';

  // Step 1: Personal Info
  fullName = '';
  age: number | null = null;
  gender = 'male';
  height: number | null = null;
  weight: number | null = null;

  // Step 2: Lifestyle
  smoke = false;
  alcohol = false;
  activityLevel = 'medium';
  dietQuality = 'average';
  sleepQuality = 'average';

  // Step 3: Medical History
  familyKidney = false;
  familyHypertension = false;
  familyDiabetes = false;
  prevAki = false;
  prevUti = false;

  // Step 4: Labs (Optional)
  systolic: number | null = null;
  diastolic: number | null = null;
  fastingSugar: number | null = null;
  hba1c: number | null = null;

  constructor(
    public ts: TranslationService,
    private healthData: HealthDataService,
    private router: Router
  ) {}

  get bmi(): number {
    if (this.height && this.weight && this.height > 0) {
      const heightInMeters = this.height / 100;
      return parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return 0;
  }

  get stepProgress(): number {
    return this.currentStep / 4;
  }

  get activityLabel(): string {
    switch (this.activityLevel) {
      case 'low':
        return this.ts.translate('activityLow');
      case 'medium':
        return this.ts.translate('activityMed');
      default:
        return this.ts.translate('activityHigh');
    }
  }

  get dietLabel(): string {
    switch (this.dietQuality) {
      case 'poor':
        return this.ts.translate('dietPoor');
      case 'average':
        return this.ts.translate('dietAvg');
      default:
        return this.ts.translate('dietHealthy');
    }
  }

  get sleepLabel(): string {
    switch (this.sleepQuality) {
      case 'poor':
        return this.ts.translate('sleepPoor');
      case 'average':
        return this.ts.translate('sleepAvg');
      default:
        return this.ts.translate('sleepGood');
    }
  }

  get genderLabel(): string {
    return this.ts.translate(this.gender === 'male' ? 'male' : 'female');
  }

  formatBoolean(value: boolean): string {
    return this.ts.translate(value ? 'yes' : 'no');
  }

  private isBetween(value: number | null, min: number, max: number): boolean {
    return value !== null && Number.isFinite(value) && value >= min && value <= max;
  }

  private validateStep1(): boolean {
    if (!this.fullName.trim()) {
      this.validationMessage = this.ts.translate('validationError');
      return false;
    }

    const validAge = this.isBetween(this.age, 1, 120);
    const validHeight = this.isBetween(this.height, 80, 250);
    const validWeight = this.isBetween(this.weight, 20, 300);

    if (!validAge || !validHeight || !validWeight) {
      this.validationMessage = this.ts.translate('validationError');
      return false;
    }

    return true;
  }

  private validateLabs(): boolean {
    const validSystolic = this.systolic === null || this.isBetween(this.systolic, 70, 260);
    const validDiastolic = this.diastolic === null || this.isBetween(this.diastolic, 40, 160);
    const validFastingSugar = this.fastingSugar === null || this.isBetween(this.fastingSugar, 40, 400);
    const validHba1c = this.hba1c === null || this.isBetween(this.hba1c, 3, 20);

    if (!validSystolic || !validDiastolic || !validFastingSugar || !validHba1c) {
      this.validationMessage = this.ts.translate('validationError');
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.currentStep = 1;
    this.validationMessage = '';

    this.fullName = '';
    this.age = null;
    this.gender = 'male';
    this.height = null;
    this.weight = null;

    this.smoke = false;
    this.alcohol = false;
    this.activityLevel = 'medium';
    this.dietQuality = 'average';
    this.sleepQuality = 'average';

    this.familyKidney = false;
    this.familyHypertension = false;
    this.familyDiabetes = false;
    this.prevAki = false;
    this.prevUti = false;

    this.systolic = null;
    this.diastolic = null;
    this.fastingSugar = null;
    this.hba1c = null;
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.validationMessage = '';
    }
  }

  nextStep() {
    this.validationMessage = '';

    if (this.currentStep === 1) {
      if (!this.validateStep1()) {
        return;
      }
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      this.currentStep = 3;
    } else if (this.currentStep === 3) {
      this.currentStep = 4;
    }
  }

  skipLabs() {
    this.systolic = null;
    this.diastolic = null;
    this.fastingSugar = null;
    this.hba1c = null;
    this.predictRisk();
  }

  predictRisk() {
    this.validationMessage = '';

    if (!this.validateStep1() || !this.validateLabs()) {
      return;
    }

    this.isCalculating = true;

    // Simulate AI Screening Model Processing on backend
    setTimeout(() => {
      this.isCalculating = false;

      let score = 15; // Baseline risk

      if (this.age && this.age > 50) score += 12;
      if (this.age && this.age > 65) score += 10;
      if (this.gender === 'male') score += 4;

      const currentBmi = this.bmi;
      if (currentBmi > 25) score += 8;
      if (currentBmi > 30) score += 15;

      if (this.smoke) score += 10;
      if (this.alcohol) score += 6;
      if (this.activityLevel === 'low') score += 10;
      if (this.activityLevel === 'high') score -= 5;
      if (this.dietQuality === 'poor') score += 14;
      if (this.dietQuality === 'healthy') score -= 5;
      if (this.sleepQuality === 'poor') score += 8;

      if (this.familyKidney) score += 20;
      if (this.familyHypertension) score += 15;
      if (this.familyDiabetes) score += 15;

      if (this.prevAki) score += 18;
      if (this.prevUti) score += 8;

      if (this.systolic && this.systolic > 140) score += 12;
      if (this.diastolic && this.diastolic > 90) score += 12;
      if (this.fastingSugar && this.fastingSugar > 126) score += 18;
      if (this.hba1c && this.hba1c > 6.5) score += 18;

      const riskScore = Math.max(8, Math.min(98, score));
      let riskStatus = 'Low Risk';

      if (riskScore >= 60) {
        riskStatus = 'High Risk';
      } else if (riskScore >= 30) {
        riskStatus = 'Medium Risk';
      }

      this.healthData.saveScreening({
        riskScore,
        riskStatus,
        age: this.age!,
        gender: this.gender,
        height: this.height!,
        weight: this.weight!,
        bmi: currentBmi,
        smoke: this.smoke,
        alcohol: this.alcohol,
        activityLevel: this.activityLevel,
        dietQuality: this.dietQuality,
        sleepQuality: this.sleepQuality,
        familyHistory: {
          kidney: this.familyKidney,
          hypertension: this.familyHypertension,
          diabetes: this.familyDiabetes
        },
        prevAki: this.prevAki,
        prevUti: this.prevUti,
        labs: {
          systolic: this.systolic || undefined,
          diastolic: this.diastolic || undefined,
          fastingSugar: this.fastingSugar || undefined,
          hba1c: this.hba1c || undefined
        }
      });

      this.router.navigate(['/screening-result'], {
        queryParams: {
          score: riskScore,
          status: riskStatus,
          name: this.fullName
        }
      });

      this.resetForm();
    }, 1800);
  }
}
