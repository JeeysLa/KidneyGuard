import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  water = 1500;
  waterTarget = 2000;

  exercise = 35;
  exerciseTarget = 30;

  sleep = 7.5;
  sleepTarget = 8;

  systolic = 120;
  diastolic = 80;

  weight = 68;
  bmi = 22.4;

  constructor() {}

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

  get bloodPressureText(): string {
    return this.systolic < 130 && this.diastolic < 80 ? 'Normal Blood Pressure' : 'Monitor Blood Pressure';
  }

  addWater() {
    if (this.water < this.waterTarget) {
      this.water += 250;
    }
  }

  addExercise() {
    this.exercise += 10;
  }

  updateSleep() {
    this.sleep += 0.5;
  }

  updateWeight() {
    this.weight += 0.5;
  }

}