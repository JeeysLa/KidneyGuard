import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeMode>(this.loadTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
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
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else if (theme === 'light') {
      document.body.classList.remove('dark');
    } else {
      // System
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }
}
