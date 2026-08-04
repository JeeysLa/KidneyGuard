import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-entry',
  template: `
    <ion-content></ion-content>
  `,
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class EntryPage {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const completed = localStorage.getItem('onboardingCompleted') === 'true';
    if (completed) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/onboarding', { replaceUrl: true });
    }
  }
}
