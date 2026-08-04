import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardContent,
  IonChip,
  IonLabel,
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonProgressBar,
  IonList,
  IonBadge,
  IonCheckbox
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonChip,
    IonLabel,
    IonRow,
    IonCol,
    IonGrid,
    IonItem,
    IonProgressBar,
    IonList,
    IonBadge,
    IonCheckbox
  ]
})
export class HomePage {}