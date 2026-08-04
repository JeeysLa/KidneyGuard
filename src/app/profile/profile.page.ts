import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonButton,
    IonChip,
    IonIcon,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class ProfilePage {
  user = {
    name: 'Ayu Pratiwi',
    age: 29,
    goal: 'Stay active and protect kidney health'
  };

  stats = [
    { label: 'Screenings', value: '3' },
    { label: 'Streak', value: '12 days' },
    { label: 'Hydration', value: '75%' }
  ];
}
