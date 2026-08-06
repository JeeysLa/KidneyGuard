import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslationService } from '../core/translation.service';
import { AuthService } from '../core/auth.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-screening-result',
  templateUrl: './screening-result.page.html',
  styleUrls: ['./screening-result.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonChip,
    IonIcon,
    IonBadge
  ]
})
export class ScreeningResultPage implements OnInit {
  score = 18;
  status = 'Low Risk';
  userName = 'Guest User';
  isGuest = true;

  constructor(
    public ts: TranslationService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.score = params['score'] ? parseInt(params['score']) : 18;
      this.status = params['status'] || 'Low Risk';
      this.userName = params['name'] || 'Guest User';
    });

    const user = this.auth.currentUser;
    this.isGuest = user ? user.isGuest : true;
  }

  get riskColor(): string {
    if (this.score >= 60) return 'danger';
    if (this.score >= 30) return 'warning';
    return 'success';
  }

  get strokeDashoffset(): number {
    const c = 282.7;
    return c - (this.score / 100) * c;
  }

  get tipsList(): string[] {
    const lang = this.ts.activeLanguage;
    if (this.score >= 60) {
      return lang === 'en' 
        ? [
            'Schedule a kidney check with a Nephrologist immediately.',
            'Maintain strict control over Blood Pressure (target < 130/80 mmHg).',
            'Reduce dietary sodium intake to under 1500mg daily.',
            'Regularly screen for proteinuria/albuminuria.'
          ]
        : [
            'Segera jadwalkan konsultasi ginjal dengan dokter spesialis Nefrologi.',
            'Jaga kontrol ketat terhadap tekanan darah (target < 130/80 mmHg).',
            'Kurangi asupan natrium/garam hingga di bawah 1500mg per hari.',
            'Lakukan skrining proteinuria/albuminuria secara berkala.'
          ];
    } else if (this.score >= 30) {
      return lang === 'en'
        ? [
            'Check blood sugar and HbA1c levels to rule out early diabetes.',
            'Increase daily water intake to 2.0 - 2.5 liters.',
            'Engage in moderate exercises (walking/cycling) for 150 minutes/week.',
            'Limit NSAID pain relievers (like Ibuprofen) which strain kidneys.'
          ]
        : [
            'Periksa kadar gula darah dan HbA1c untuk mencegah diabetes dini.',
            'Tingkatkan konsumsi air putih harian menjadi 2.0 - 2.5 liter.',
            'Lakukan olahraga ringan (jalan kaki/bersepeda) selama 150 menit/minggu.',
            'Batasi obat pereda nyeri NSAID (seperti Ibuprofen) karena membebani ginjal.'
          ];
    } else {
      return lang === 'en'
        ? [
            'Maintain standard healthy hydration habits (2L/day).',
            'Eat a balanced diet rich in leafy greens and low in processed foods.',
            'Keep an active lifestyle and maintain normal BMI levels.',
            'Screen for risk trends once every year.'
          ]
        : [
            'Pertahankan kebiasaan hidrasi sehat harian (minum 2L air/hari).',
            'Konsumsi makanan bergizi seimbang tinggi sayuran dan rendah makanan olahan.',
            'Jaga gaya hidup aktif untuk mempertahankan berat badan ideal (BMI normal).',
            'Lakukan skrining berkala satu tahun sekali.'
          ];
    }
  }

  get explanation(): string {
    const lang = this.ts.activeLanguage;
    if (this.score >= 60) {
      return lang === 'en'
        ? 'Your indicators show elevated kidney hazard factors. We highly recommend consulting a physician.'
        : 'Indikator Anda menunjukkan faktor risiko ginjal yang tinggi. Sangat disarankan berkonsultasi dengan dokter.';
    } else if (this.score >= 30) {
      return lang === 'en'
        ? 'You have moderate risk factors. Adopting healthy lifestyle changes can reduce risk significantly.'
        : 'Anda memiliki faktor risiko sedang. Memperbaiki pola hidup dapat menekan risiko secara signifikan.';
    } else {
      return lang === 'en'
        ? 'Congratulations! Your kidney risk indicators are within safe ranges. Maintain your healthy routines.'
        : 'Selamat! Indikator risiko ginjal Anda berada dalam rentang aman. Pertahankan rutinitas sehat Anda.';
    }
  }

  saveToAccount() {
    this.router.navigateByUrl('/auth/register');
  }

  goToDashboard() {
    this.router.navigateByUrl('/home');
  }
}
