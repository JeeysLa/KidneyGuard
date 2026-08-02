import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding',
  templateUrl: 'onboarding.page.html',
  styleUrls: ['onboarding.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class OnboardingPage {
  constructor(private readonly router: Router) {}

  continue(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
