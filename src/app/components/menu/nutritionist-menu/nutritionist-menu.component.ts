import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu';

@Component({
  selector: 'app-nutritionist-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ],
  templateUrl: './nutritionist-menu.component.html',
  styleUrl: './nutritionist-menu.component.css'
})
export class NutritionistMenuComponent {
  menu: MenuItem[] = [
    { label: 'Profile', routerLink: 'nutritionist/profile'},
    { label: 'My Clients', routerLink: 'nutritionist/clients'},
  ]
}
