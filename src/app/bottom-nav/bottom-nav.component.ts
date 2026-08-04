import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonIcon]
})
export class BottomNavComponent {
  items = [
    { label: 'Home', icon: 'home-outline', link: '/home' },
    { label: 'Tracker', icon: 'fitness-outline', link: '/tracker' },
    { label: 'Education', icon: 'book-outline', link: '/education' },
    { label: 'Profile', icon: 'person-outline', link: '/profile' }
  ];
}
