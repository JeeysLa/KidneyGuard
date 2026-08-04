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
      import('./education-detail/education-detail.page').then(
        (m) => m.EducationDetailPage
      ),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
];