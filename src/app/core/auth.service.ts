import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  fullName: string;
  email: string;
  isGuest: boolean;
}

interface StoredUser {
  fullName: string;
  email: string;
  passwordHash: string;
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

  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = (hash << 5) - hash + password.charCodeAt(i);
      hash |= 0;
    }
    return `kg_${Math.abs(hash).toString(16)}`;
  }

  login(email: string, password: string, rememberMe: boolean): boolean {
    const savedUsers = this.getSavedUsers();
    const passwordHash = this.hashPassword(password);
    const matched = savedUsers.find(u => u.email === email && u.passwordHash === passwordHash);
    
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

    savedUsers.push({ fullName, email, passwordHash: this.hashPassword(password) });
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
    if (idx === -1) {
      return false;
    }

    const oldPasswordHash = this.hashPassword(oldPassword);
    if (savedUsers[idx].passwordHash !== oldPasswordHash) {
      return false;
    }

    savedUsers[idx].passwordHash = this.hashPassword(newPassword);
    localStorage.setItem('kidney_guard_registered_users', JSON.stringify(savedUsers));
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

  private getSavedUsers(): StoredUser[] {
    const raw = localStorage.getItem('kidney_guard_registered_users');
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((u) => u && typeof u.email === 'string' && typeof u.fullName === 'string')
      .map((u) => {
        if (typeof u.passwordHash === 'string') {
          return u as StoredUser;
        }

        // Backward compatibility for older plaintext records.
        return {
          fullName: u.fullName,
          email: u.email,
          passwordHash: this.hashPassword(String(u.password ?? '')),
        };
      });
  }

  private mergeGuestHistory(email: string) {
    const guestHistory = localStorage.getItem('screening_history_guest@kidneyguard.ai');
    if (guestHistory) {
      localStorage.setItem(`screening_history_${email}`, guestHistory);
      localStorage.removeItem('screening_history_guest@kidneyguard.ai');
    }
  }
}
