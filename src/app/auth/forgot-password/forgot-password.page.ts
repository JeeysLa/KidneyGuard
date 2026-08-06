import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TranslationService } from '../../core/translation.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonText
  ]
})
export class ForgotPasswordPage {
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    public ts: TranslationService,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email) {
      this.errorMessage = this.ts.translate('validationError');
      return;
    }

    const success = this.auth.forgotPassword(this.email);
    if (success) {
      this.successMessage = this.ts.activeLanguage === 'en'
        ? 'Instructions sent. Please check your inbox.'
        : 'Instruksi telah dikirim. Silakan periksa kotak masuk Anda.';
    }
  }
}
