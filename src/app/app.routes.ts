import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./entry/entry.page').then((m) => m.EntryPage),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./onboarding/onboarding.page').then((m) => m.OnboardingPage),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () =>
      import('./auth/forgot-password/forgot-password.page').then((m) => m.ForgotPasswordPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'screening',
    loadComponent: () =>
      import('./screening/screening.page').then((m) => m.ScreeningPage),
  },
  {
    path: 'screening-result',
    loadComponent: () =>
      import('./screening-result/screening-result.page').then((m) => m.ScreeningResultPage),
  },
  {
    path: 'tracker',
    loadComponent: () =>
      import('./tracker/tracker.page').then((m) => m.TrackerPage),
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./education/education.page').then((m) => m.EducationPage),
  },
  {
    path: 'education-detail',
    loadComponent: () =>
      import('./education-detail/education-detail.page').then((m) => m.EducationDetailPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notifications/notifications.page').then((m) => m.NotificationsPage),
  },
];