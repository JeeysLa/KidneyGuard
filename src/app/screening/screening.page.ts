import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonButton,
  IonChip
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,

    IonItem,
    IonLabel,
    IonInput,
    IonToggle,

    IonButton,
    IonChip
  ]
})
export class ScreeningPage {

  age: number | null = null;
  weight: number | null = null;
  height: number | null = null;

  diabetes = false;
  hypertension = false;
  familyHistory = false;
  smoking = false;

  waterIntake: number | null = null;
  exercise: number | null = null;

  risk = 18;
  riskStatus = 'Low Risk';

  constructor() {}

  predictRisk() {

    // Dummy Prediction
    // Nanti diganti AI / Machine Learning

    let score = 0;

    if (this.diabetes) score += 30;
    if (this.hypertension) score += 25;
    if (this.familyHistory) score += 20;
    if (this.smoking) score += 15;

    if ((this.waterIntake ?? 0) < 1500) score += 5;

    this.risk = score;

    if (score < 30) {
      this.riskStatus = 'Low Risk';
    } else if (score < 60) {
      this.riskStatus = 'Medium Risk';
    } else {
      this.riskStatus = 'High Risk';
    }
  }

}