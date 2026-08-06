import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HealthDataService } from '../core/health-data.service';
import { TranslationService, LanguageCode } from '../core/translation.service';
import { ThemeService, ThemeMode } from '../core/theme.service';
import { AuthService } from '../core/auth.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonButton,
    IonChip,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonSelect,
    IonSelectOption
  ]
})
export class ProfilePage {
  constructor(
    private router: Router,
    public ts: TranslationService,
    public themeService: ThemeService,
    public auth: AuthService,
    private healthData: HealthDataService,
    private alertController: AlertController
  ) {}

  get user() {
    const s = this.healthData.currentStats;
    const profile = this.auth.currentUser;
    return {
      name: profile ? profile.fullName : 'Guest User',
      age: s.userAge,
      goal: s.userGoal,
      isGuest: profile ? profile.isGuest : true
    };
  }

  get stats() {
    const s = this.healthData.currentStats;
    const hydrationPercent = s.waterGoal > 0 ? Math.round((s.waterIntake / s.waterGoal) * 100) : 0;
    return [
      { label: this.ts.translate('screeningTitle'), value: `${s.screeningHistory ? s.screeningHistory.length : 0}` },
      { label: this.ts.activeLanguage === 'en' ? 'Streak' : 'Hari Beruntun', value: `${s.streakDays} d` },
      { label: this.ts.activeLanguage === 'en' ? 'Hydration' : 'Hidrasi', value: `${hydrationPercent}%` }
    ];
  }

  get activeLanguage(): LanguageCode {
    return this.ts.activeLanguage;
  }

  setLanguage(event: any) {
    this.ts.setLanguage(event.detail.value);
  }

  get activeTheme(): ThemeMode {
    return this.themeService.activeTheme;
  }

  setTheme(event: any) {
    this.themeService.setTheme(event.detail.value);
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: this.ts.translate('editProfile'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Your Name',
          value: this.user.name
        },
        {
          name: 'goal',
          type: 'text',
          placeholder: 'Health Goal',
          value: this.user.goal
        }
      ],
      buttons: [
        {
          text: this.ts.translate('cancel'),
          role: 'cancel'
        },
        {
          text: this.ts.translate('save'),
          handler: (data) => {
            if (data.name && data.goal) {
              this.healthData.updateProfile(data.name, data.goal);
              if (!this.user.isGuest) {
                const currentUser = this.auth.currentUser;
                if (currentUser) {
                  currentUser.fullName = data.name;
                  localStorage.setItem('kidney_guard_user', JSON.stringify(currentUser));
                }
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async changePassword() {
    if (this.user.isGuest) return;

    const alert = await this.alertController.create({
      header: this.ts.translate('changePassword'),
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: this.ts.activeLanguage === 'en' ? 'Current Password' : 'Sandi Saat Ini'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: this.ts.activeLanguage === 'en' ? 'New Password' : 'Sandi Baru'
        }
      ],
      buttons: [
        {
          text: this.ts.translate('cancel'),
          role: 'cancel'
        },
        {
          text: this.ts.translate('save'),
          handler: (data) => {
            if (data.oldPassword && data.newPassword) {
              const success = this.auth.changePassword(data.oldPassword, data.newPassword);
              if (!success) {
                this.showErrorAlert(this.ts.activeLanguage === 'en' ? 'Password change failed.' : 'Gagal mengubah kata sandi.');
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async showErrorAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: this.ts.translate('deleteAccount'),
      message: this.ts.translate('confirmDelete'),
      buttons: [
        {
          text: this.ts.translate('cancel'),
          role: 'cancel'
        },
        {
          text: this.ts.activeLanguage === 'en' ? 'Delete' : 'Hapus',
          role: 'destructive',
          handler: () => {
            this.auth.deleteAccount();
            this.router.navigateByUrl('/onboarding', { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/onboarding', { replaceUrl: true });
  }
}
