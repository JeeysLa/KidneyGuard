import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TranslationService } from '../../core/translation.service';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon
  ]
})
export class RegisterPage {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  errorMessage = '';

  constructor(
    public ts: TranslationService,
    private auth: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = this.ts.translate('validationError');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = this.ts.activeLanguage === 'en'
        ? 'Passwords do not match.'
        : 'Sandi konfirmasi tidak cocok.';
      return;
    }

    const success = this.auth.register(this.fullName, this.email, this.password);
    if (success) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.errorMessage = this.ts.activeLanguage === 'en'
        ? 'Email is already registered.'
        : 'Email sudah terdaftar.';
    }
  }
}
