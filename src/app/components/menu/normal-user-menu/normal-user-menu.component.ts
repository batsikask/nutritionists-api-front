import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu';

@Component({
  selector: 'app-normal-user-menu',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './normal-user-menu.component.html',
  styleUrl: './normal-user-menu.component.css'
})
export class NormalUserMenuComponent {
  menu: MenuItem[] = [
    { label: 'Profile', routerLink: 'user/profile'},
    { label: 'My Nutritionists', routerLink: 'user/nutritionists'},
    { label: 'My Measurements', routerLink: 'user/measurements'},
    { label: 'My Diets', routerLink: 'user/diets'},
  ]
}
