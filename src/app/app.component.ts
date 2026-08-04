import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { filter } from 'rxjs/operators';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [CommonModule, IonApp, IonRouterOutlet, BottomNavComponent],
})
export class AppComponent implements OnInit {
  showBottomNav = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.showBottomNav = this.shouldShowBottomNav(event.urlAfterRedirects);
      });

    // Initialize bottom nav visibility based on current URL
    this.showBottomNav = this.shouldShowBottomNav(this.router.url);
  }

  private hasCompletedOnboarding(): boolean {
    return localStorage.getItem('onboardingCompleted') === 'true';
  }

  private shouldShowBottomNav(url: string): boolean {
    return !url.includes('/onboarding') && ['/home', '/tracker', '/education', '/profile'].includes(url);
  }
}
