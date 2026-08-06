import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-entry',
  template: `
    <ion-content></ion-content>
  `,
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class EntryPage implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user && !user.isGuest) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      const completed = localStorage.getItem('onboardingCompleted') === 'true';
      if (completed) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/onboarding', { replaceUrl: true });
      }
    }
  }
}
