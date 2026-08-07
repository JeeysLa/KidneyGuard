import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HealthDataService, HealthStats } from '../core/health-data.service';
import { TranslationService } from '../core/translation.service';
import { Observable } from 'rxjs';

import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonProgressBar,
  IonIcon,
  IonBadge,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonProgressBar,
    IonIcon,
    IonBadge,
    IonButtons
  ]
})
export class TrackerPage {
  stats$: Observable<HealthStats>;

  constructor(
    public ts: TranslationService,
    private healthData: HealthDataService
  ) {
    this.stats$ = this.healthData.stats$;
  }

  get activeBmi(): number {
    const stats = this.healthData.currentStats;
    if (stats.height > 0) {
      const hMeters = stats.height / 100;
      return parseFloat((stats.weight / (hMeters * hMeters)).toFixed(1));
    }
    return 0;
  }

  get bpStatusColor(): string {
    const s = this.healthData.currentStats.systolic;
    const d = this.healthData.currentStats.diastolic;
    if (s < 120 && d < 80) return 'success';
    if (s < 130 && d < 80) return 'warning';
    return 'danger';
  }

  get bpStatusLabel(): string {
    const s = this.healthData.currentStats.systolic;
    const d = this.healthData.currentStats.diastolic;
    const lang = this.ts.activeLanguage;

    if (s < 120 && d < 80) return lang === 'en' ? 'Normal' : 'Normal';
    if (s >= 120 && s <= 129 && d < 80) return lang === 'en' ? 'Elevated' : 'Meningkat';
    if (s >= 130 && s <= 139 || (d >= 80 && d <= 89)) return lang === 'en' ? 'Hypertension S1' : 'Hipertensi T1';
    return lang === 'en' ? 'Hypertension S2' : 'Hipertensi T2';
  }

  addWater(ml: number) {
    this.healthData.updateWater(ml);
  }

  addExercise(mins: number) {
    const current = this.healthData.currentStats.exercise;
    this.healthData.updateExercise(current + mins);
  }

  updateBloodPressure(s: number, d: number) {
    this.healthData.updateBloodPressure(s, d);
  }

  updateWeight(kg: number) {
    const current = this.healthData.currentStats.weight;
    this.healthData.updateWeight(current + kg);
  }
}
