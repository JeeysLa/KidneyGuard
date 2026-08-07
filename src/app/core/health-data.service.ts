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
  urineColor: 'clear' | 'yellow' | 'orange' | null;
  checklist: {
    water: boolean;
    walk: boolean;
    urine: boolean;
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
  lastUpdateDate: string; // Used for daily reset
}

@Injectable({
  providedIn: 'root'
})
export class HealthDataService {
  private activeUserEmail = 'guest@kidneyguard.ai';

  private defaultStats: HealthStats = {
    riskScore: 0,
    riskStatus: 'No Screening',
    waterIntake: 0,
    waterGoal: 2000,
    urineColor: null,
    checklist: {
      water: false,
      walk: false,
      urine: false
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
    exercise: 0,
    exerciseTarget: 30,
    screeningHistory: [],
    lastUpdateDate: new Date().toDateString()
  };

  private statsSubject = new BehaviorSubject<HealthStats>(this.defaultStats);
  stats$ = this.statsSubject.asObservable();

  constructor(private injector: Injector) {
    setTimeout(() => {
      const auth = this.injector.get(AuthService);
      auth.currentUser$.subscribe(user => {
        this.activeUserEmail = user ? user.email : 'guest@kidneyguard.ai';
        let loaded = this.loadStats();

        // Apply daily reset if date has changed
        loaded = this.checkDailyReset(loaded);

        if (user && !user.isGuest) {
          loaded.userName = user.fullName;
        }
        this.statsSubject.next(loaded);
      });
    }, 0);
  }

  private checkDailyReset(stats: HealthStats): HealthStats {
    const today = new Date().toDateString();
    if (stats.lastUpdateDate !== today) {
      // It's a new day! Reset daily metrics
      return {
        ...stats,
        waterIntake: 0,
        exercise: 0,
        urineColor: null,
        checklist: {
          water: false,
          walk: false,
          urine: false
        },
        lastUpdateDate: today
      };
    }
    return stats;
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
    const newIntake = Math.max(0, current.waterIntake + amount);
    const isGoalMet = newIntake >= current.waterGoal;

    this.saveStats({
      ...current,
      waterIntake: newIntake,
      checklist: { ...current.checklist, water: isGoalMet }
    });
  }

  updateUrineColor(color: 'clear' | 'yellow' | 'orange') {
    const current = this.statsSubject.value;
    this.saveStats({
      ...current,
      urineColor: color,
      checklist: { ...current.checklist, urine: true }
    });
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
    const isGoalMet = minutes >= current.exerciseTarget;
    this.saveStats({
      ...current,
      exercise: minutes,
      checklist: { ...current.checklist, walk: isGoalMet }
    });
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
