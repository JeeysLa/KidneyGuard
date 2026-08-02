import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  imports: [IonContent, IonSpinner],
})
export class SplashPage implements OnInit, OnDestroy {
  private redirectTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly router: Router,
    public readonly languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.redirectTimer = window.setTimeout(() => {
      this.router.navigateByUrl('/onboarding');
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.redirectTimer) {
      window.clearTimeout(this.redirectTimer);
    }
  }
}
