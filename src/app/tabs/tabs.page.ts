import { Component } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  homeOutline,
  personCircleOutline,
  pulseOutline,
} from 'ionicons/icons';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  ],
})
export class TabsPage {

  constructor(public readonly languageService: LanguageService) {
    addIcons({
      bookOutline,
      homeOutline,
      personCircleOutline,
      pulseOutline,
    });
  }

  testClick(): void {
    alert('Tabs berhasil diklik!');
  }

}