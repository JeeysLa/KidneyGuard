import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  fullName: string;
  email: string;
  isGuest: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private loadUser(): UserProfile | null {
    const saved = localStorage.getItem('kidney_guard_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    const completed = localStorage.getItem('onboardingCompleted') === 'true';
    if (completed) {
      return { fullName: 'Guest User', email: 'guest@kidneyguard.ai', isGuest: true };
    }
    return null;
  }

  get currentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    const user = this.currentUser;
    return user !== null && !user.isGuest;
  }

  login(email: string, password: string, rememberMe: boolean): boolean {
    const savedUsers = this.getSavedUsers();
    const matched = savedUsers.find(u => u.email === email && u.password === password);
    
    if (matched) {
      const profile = { fullName: matched.fullName, email: matched.email, isGuest: false };
      this.setUserSession(profile, rememberMe);
      this.mergeGuestHistory(email);
      return true;
    }
    
    if (email === 'ayu@kidneyguard.ai' && password === 'password') {
      const profile = { fullName: 'Ayu Pratiwi', email: 'ayu@kidneyguard.ai', isGuest: false };
      this.setUserSession(profile, rememberMe);
      this.mergeGuestHistory(email);
      return true;
    }
    
    return false;
  }

  register(fullName: string, email: string, password: string): boolean {
    const savedUsers = this.getSavedUsers();
    if (savedUsers.find(u => u.email === email)) {
      return false;
    }
    
    savedUsers.push({ fullName, email, password });
    localStorage.setItem('kidney_guard_registered_users', JSON.stringify(savedUsers));
    
    const profile = { fullName, email, isGuest: false };
    this.setUserSession(profile, true);
    this.mergeGuestHistory(email);
    return true;
  }

  forgotPassword(email: string): boolean {
    return true;
  }

  changePassword(oldPassword: string, newPassword: string): boolean {
    const user = this.currentUser;
    if (!user || user.isGuest) return false;
    
    const savedUsers = this.getSavedUsers();
    const idx = savedUsers.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      savedUsers[idx].password = newPassword;
      localStorage.setItem('kidney_guard_registered_users', JSON.stringify(savedUsers));
      return true;
    }
    return true;
  }

  deleteAccount() {
    const user = this.currentUser;
    if (user && !user.isGuest) {
      const savedUsers = this.getSavedUsers();
      const filtered = savedUsers.filter(u => u.email !== user.email);
      localStorage.setItem('kidney_guard_registered_users', JSON.stringify(filtered));
      localStorage.removeItem(`screening_history_${user.email}`);
    }
    this.logout();
  }

  logout() {
    localStorage.removeItem('kidney_guard_user');
    localStorage.removeItem('onboardingCompleted');
    this.currentUserSubject.next(null);
  }

  setGuestSession() {
    localStorage.setItem('onboardingCompleted', 'true');
    const guest: UserProfile = { fullName: 'Guest User', email: 'guest@kidneyguard.ai', isGuest: true };
    this.currentUserSubject.next(guest);
  }

  private setUserSession(profile: UserProfile, rememberMe: boolean) {
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('kidney_guard_user', JSON.stringify(profile));
    this.currentUserSubject.next(profile);
  }

  private getSavedUsers(): any[] {
    const raw = localStorage.getItem('kidney_guard_registered_users');
    return raw ? JSON.parse(raw) : [];
  }

  private mergeGuestHistory(email: string) {
    const guestHistory = localStorage.getItem('screening_history_guest@kidneyguard.ai');
    if (guestHistory) {
      localStorage.setItem(`screening_history_${email}`, guestHistory);
      localStorage.removeItem('screening_history_guest@kidneyguard.ai');
    }
  }
}
