import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu';

@Component({
  selector: 'app-staff-menu',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './staff-menu.component.html',
  styleUrl: './staff-menu.component.css'
})
export class StaffMenuComponent {
  menu: MenuItem[] = [
    { label: 'Profile', routerLink: 'staff/profile'},
    { label: 'Actions', routerLink: 'staff/actions'},
  ]
}
