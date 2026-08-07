import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HealthDataService, HealthStats } from '../core/health-data.service';
import { TranslationService } from '../core/translation.service';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBadge,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonChip,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonBadge,
    IonSelect,
    IonSelectOption
  ]
})
export class ProfilePage {
  stats$: Observable<HealthStats>;

  constructor(
    public ts: TranslationService,
    private healthData: HealthDataService,
    private auth: AuthService,
    private router: Router
  ) {
    this.stats$ = this.healthData.stats$;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/onboarding', { replaceUrl: true });
  }
}
