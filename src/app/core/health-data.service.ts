import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface ScreeningRecord {
  id: string;
  date: string;
  riskScore: number;
  riskStatus: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  smoke: boolean;
  alcohol: boolean;
  activityLevel: string;
  dietQuality: string;
  sleepQuality: string;
  familyHistory: {
    kidney: boolean;
    hypertension: boolean;
    diabetes: boolean;
  };
  prevAki: boolean;
  prevUti: boolean;
  labs?: {
    systolic?: number;
    diastolic?: number;
    fastingSugar?: number;
    hba1c?: number;
  };
}

export interface HealthStats {
  riskScore: number;
  riskStatus: string;
  waterIntake: number;
  waterGoal: number;
  checklist: {
    water: boolean;
    walk: boolean;
    salt: boolean;
  };
  userName: string;
  userAge: number;
  userGoal: string;
  streakDays: number;
  weight: number;
  height: number;
  systolic: number;
  diastolic: number;
  sleep: number;
  sleepTarget: number;
  exercise: number;
  exerciseTarget: number;
  screeningHistory: ScreeningRecord[];
}

@Injectable({
  providedIn: 'root'
})
export class HealthDataService {
  private activeUserEmail = 'guest@kidneyguard.ai';
  
  private defaultStats: HealthStats = {
    riskScore: 0,
    riskStatus: 'No Screening',
    waterIntake: 1200,
    waterGoal: 2000,
    checklist: {
      water: false,
      walk: false,
      salt: false
    },
    userName: 'Guest User',
    userAge: 29,
    userGoal: 'Stay active and protect kidney health',
    streakDays: 12,
    weight: 68,
    height: 175,
    systolic: 120,
    diastolic: 80,
    sleep: 7.5,
    sleepTarget: 8,
    exercise: 35,
    exerciseTarget: 30,
    screeningHistory: []
  };

  private statsSubject = new BehaviorSubject<HealthStats>(this.defaultStats);
  stats$ = this.statsSubject.asObservable();

  constructor(private injector: Injector) {
    setTimeout(() => {
      const auth = this.injector.get(AuthService);
      auth.currentUser$.subscribe(user => {
        this.activeUserEmail = user ? user.email : 'guest@kidneyguard.ai';
        const loaded = this.loadStats();
        if (user && !user.isGuest) {
          loaded.userName = user.fullName;
        }
        this.statsSubject.next(loaded);
      });
    }, 0);
  }

  private get STORAGE_KEY(): string {
    return `kidney_guard_data_${this.activeUserEmail}`;
  }

  private loadStats(): HealthStats {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) return { ...this.defaultStats };
    try {
      const parsed = JSON.parse(saved);
      return { ...this.defaultStats, ...parsed };
    } catch {
      return { ...this.defaultStats };
    }
  }

  private saveStats(stats: HealthStats) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    this.statsSubject.next(stats);
  }

  updateRisk(score: number, status: string) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, riskScore: score, riskStatus: status });
  }

  updateWater(amount: number) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, waterIntake: amount });
  }

  updateChecklist(key: keyof HealthStats['checklist'], value: boolean) {
    const current = this.statsSubject.value;
    const newChecklist = { ...current.checklist, [key]: value };
    this.saveStats({ ...current, checklist: newChecklist });
  }

  updateProfile(name: string, goal: string) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, userName: name, userGoal: goal });
  }

  updateAgeHeightWeight(age: number, height: number, weight: number) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, userAge: age, height, weight });
  }

  updateExercise(minutes: number) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, exercise: minutes });
  }

  updateSleep(hours: number) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, sleep: hours });
  }

  updateWeight(weight: number) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, weight });
  }

  updateBloodPressure(systolic: number, diastolic: number) {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, systolic, diastolic });
  }

  saveScreening(record: Omit<ScreeningRecord, 'id' | 'date'>) {
    const current = this.statsSubject.value;
    const newRecord: ScreeningRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    const history = [newRecord, ...current.screeningHistory];
    
    this.saveStats({
      ...current,
      riskScore: record.riskScore,
      riskStatus: record.riskStatus,
      screeningHistory: history,
      userAge: record.age,
      weight: record.weight,
      height: record.height,
      systolic: record.labs?.systolic || current.systolic,
      diastolic: record.labs?.diastolic || current.diastolic
    });
  }

  clearHistory() {
    const current = this.statsSubject.value;
    this.saveStats({ ...current, screeningHistory: [] });
  }

  get currentStats(): HealthStats {
    return this.statsSubject.value;
  }
}
