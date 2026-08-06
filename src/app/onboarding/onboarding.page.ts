import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class OnboardingPage {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  startApp() {
    this.auth.setGuestSession();
    this.router.navigateByUrl('/screening', {
      replaceUrl: true
    });
  }
}