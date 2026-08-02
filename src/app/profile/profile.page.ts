import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline, personCircleOutline, settingsOutline } from 'ionicons/icons';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonContent, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonAvatar, IonToggle],
})
export class ProfilePage {
  reminderEnabled = true;
  reportEnabled = true;

  constructor(public readonly languageService: LanguageService) {
    addIcons({
      globeOutline,
      personCircleOutline,
      settingsOutline,
    });
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
