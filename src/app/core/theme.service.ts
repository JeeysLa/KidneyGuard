import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeMode>(this.loadTheme());
  theme$ = this.themeSubject.asObservable();

  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.applyTheme(this.themeSubject.value);

    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.themeSubject.value === 'system') {
        this.applyTheme('system');
      }
    });
  }

  private loadTheme(): ThemeMode {
    const saved = localStorage.getItem('kidney_guard_theme') as ThemeMode;
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  }

  setTheme(theme: ThemeMode) {
    localStorage.setItem('kidney_guard_theme', theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  get activeTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  private applyTheme(theme: ThemeMode) {
    let isDark = false;

    if (theme === 'dark') {
      isDark = true;
    } else if (theme === 'light') {
      isDark = false;
    } else {
      // System
      isDark = this.mediaQuery.matches;
    }

    // Ionic 8 uses .ion-palette-dark
    document.documentElement.classList.toggle('ion-palette-dark', isDark);

    // Backward compatibility for custom .dark styles
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
