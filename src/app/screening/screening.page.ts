import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HealthDataService } from '../core/health-data.service';
import { TranslationService } from '../core/translation.service';
import { PredictionService, PredictionRequest } from '../core/prediction.service';
import { finalize } from 'rxjs/operators';
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
  IonCheckbox,
  IonSpinner,
  IonRadio,
  IonRadioGroup,
  IonList
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
    IonCheckbox,
    IonSpinner,
    IonRadio,
    IonRadioGroup,
    IonList
  ]
})
export class ScreeningPage {
  private healthData = inject(HealthDataService);
  private router = inject(Router);
  private predictionService = inject(PredictionService);
  private cdr = inject(ChangeDetectorRef);
  public ts = inject(TranslationService);

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

  constructor() {}

  get bmi(): number {
    if (this.height && this.weight && this.height > 0) {
      const heightInMeters = this.height / 100;
      return parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return 0;
  }

  get stepProgress(): number {
    return this.currentStep / 5;
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
    } else if (this.currentStep === 4) {
      if (!this.validateLabs()) {
        return;
      }
      this.currentStep = 5;
    }
  }

  skipLabs() {
    this.systolic = null;
    this.diastolic = null;
    this.fastingSugar = null;
    this.hba1c = null;
    this.currentStep = 5;
  }

  predictRisk() {
    this.validationMessage = '';

    if (!this.validateStep1() || !this.validateLabs()) {
      return;
    }

    this.isCalculating = true;

    const currentBmi = this.bmi;

    // Map UI values to Backend API schema
    const requestData: PredictionRequest = {
      Age: this.age!,
      Gender: this.gender === 'male' ? 1 : 0,
      BMI: currentBmi,
      Smoking: this.smoke ? 1 : 0,
      AlcoholConsumption: this.alcohol ? 1.0 : 0.0,
      PhysicalActivity: this.activityLevel === 'low' ? 1.0 : this.activityLevel === 'medium' ? 3.0 : 5.0,
      DietQuality: this.dietQuality === 'poor' ? 2.0 : this.dietQuality === 'average' ? 5.0 : 8.0,
      SleepQuality: this.sleepQuality === 'poor' ? 4.0 : this.sleepQuality === 'average' ? 6.5 : 8.0,
      FamilyHistoryKidneyDisease: this.familyKidney ? 1 : 0,
      FamilyHistoryHypertension: this.familyHypertension ? 1 : 0,
      FamilyHistoryDiabetes: this.familyDiabetes ? 1 : 0,
      PreviousAcuteKidneyInjury: this.prevAki ? 1 : 0,
      UrinaryTractInfections: this.prevUti ? 1 : 0,
      SystolicBP: this.systolic || 120.0,
      DiastolicBP: this.diastolic || 80.0,
      FastingBloodSugar: this.fastingSugar || 90.0,
      HbA1c: this.hba1c || 5.4,
      // Default values for fields not yet in UI
      HeavyMetalsExposure: 0,
      OccupationalExposureChemicals: 0,
      WaterQuality: 1,
      MedicalCheckupsFrequency: 1.0,
      MedicationAdherence: 1.0,
      HealthLiteracy: 0.8
    };

    this.predictionService.predict(requestData)
      .pipe(
        finalize(() => {
          this.isCalculating = false;
          this.cdr.detectChanges(); // Force UI update
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Backend Response:', res);

          // Use backend result
          const riskScore = res.risk_percentage !== undefined ? Math.round(res.risk_percentage) : 15;
          const riskStatus = res.prediction || 'Calculated';

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
        },
        error: (err) => {
          console.error('API Error Details:', err);
          this.validationMessage = this.ts.activeLanguage === 'en'
            ? 'Connection failed. Please ensure the server is online (HTTPS required).'
            : 'Koneksi gagal. Pastikan server online (harus HTTPS).';
        }
      });
  }
}
