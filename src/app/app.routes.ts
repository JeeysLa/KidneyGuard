import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding.page').then((m) => m.OnboardingPage),
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'screening',
        loadComponent: () => import('./screening/screening.page').then((m) => m.ScreeningPage),
      },
      {
        path: 'education',
        loadComponent: () => import('./education/education.page').then((m) => m.EducationPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
