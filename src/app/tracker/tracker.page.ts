import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthDataService } from '../core/health-data.service';
import { TranslationService } from '../core/translation.service';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,

  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,

  IonButton,
  IonChip,
  IonProgressBar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
  standalone: true,
  imports: [
    CommonModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,

    IonButton,
    IonChip,
    IonProgressBar
  ]
})
export class TrackerPage {

  constructor(
    public ts: TranslationService,
    private healthData: HealthDataService
  ) {}

  get water(): number {
    return this.healthData.currentStats.waterIntake;
  }

  get waterTarget(): number {
    return this.healthData.currentStats.waterGoal;
  }

  get exercise(): number {
    return this.healthData.currentStats.exercise;
  }

  get exerciseTarget(): number {
    return this.healthData.currentStats.exerciseTarget;
  }

  get sleep(): number {
    return this.healthData.currentStats.sleep;
  }

  get sleepTarget(): number {
    return this.healthData.currentStats.sleepTarget;
  }

  get systolic(): number {
    return this.healthData.currentStats.systolic;
  }

  get diastolic(): number {
    return this.healthData.currentStats.diastolic;
  }

  get weight(): number {
    return this.healthData.currentStats.weight;
  }

  get bmi(): number {
    const stats = this.healthData.currentStats;
    if (stats.height > 0) {
      const hMeters = stats.height / 100;
      return parseFloat((stats.weight / (hMeters * hMeters)).toFixed(1));
    }
    return 0;
  }

  get waterProgress(): number {
    return Math.min(this.water / this.waterTarget, 1);
  }

  get exerciseProgress(): number {
    return Math.min(this.exercise / this.exerciseTarget, 1);
  }

  get sleepProgress(): number {
    return Math.min(this.sleep / this.sleepTarget, 1);
  }

  get bloodPressureStatus(): string {
    return this.systolic < 130 && this.diastolic < 80 ? 'Healthy' : 'Needs Attention';
  }

  get bpTextTranslated(): string {
    const isHealthy = this.systolic < 130 && this.diastolic < 80;
    if (this.ts.activeLanguage === 'en') {
      return isHealthy ? 'Normal Blood Pressure' : 'Monitor Blood Pressure';
    } else {
      return isHealthy ? 'Tekanan Darah Normal' : 'Pantau Tekanan Darah';
    }
  }

  get bpStatusTranslated(): string {
    const isHealthy = this.systolic < 130 && this.diastolic < 80;
    if (this.ts.activeLanguage === 'en') {
      return isHealthy ? 'Healthy' : 'Needs Attention';
    } else {
      return isHealthy ? 'Sehat' : 'Butuh Perhatian';
    }
  }

  addWater() {
    const current = this.healthData.currentStats;
    const newAmount = Math.min(current.waterGoal, current.waterIntake + 250);
    this.healthData.updateWater(newAmount);
  }

  addExercise() {
    const current = this.healthData.currentStats;
    this.healthData.updateExercise(current.exercise + 10);
  }

  updateSleep() {
    const current = this.healthData.currentStats;
    const newSleep = current.sleep >= 12 ? 4 : current.sleep + 0.5;
    this.healthData.updateSleep(newSleep);
  }

  updateWeight() {
    const current = this.healthData.currentStats;
    const newWeight = current.weight >= 150 ? 50 : current.weight + 0.5;
    this.healthData.updateWeight(newWeight);
  }

}