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
  IonCheckbox,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonCheckbox,
    IonIcon
  ]
})
export class LoginPage {
  email = '';
  password = '';
  rememberMe = true;
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
    if (!this.email || !this.password) {
      this.errorMessage = this.ts.translate('validationError');
      return;
    }
    
    const success = this.auth.login(this.email, this.password, this.rememberMe);
    if (success) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.errorMessage = this.ts.activeLanguage === 'en' 
        ? 'Invalid email or password.' 
        : 'Email atau kata sandi salah.';
    }
  }
}
