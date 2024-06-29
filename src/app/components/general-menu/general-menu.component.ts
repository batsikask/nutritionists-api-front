import { Component, effect, inject, signal } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NormalUserMenuComponent } from '../menu/normal-user-menu/normal-user-menu.component';
import { NutritionistMenuComponent } from '../menu/nutritionist-menu/nutritionist-menu.component';
import { StaffMenuComponent } from '../menu/staff-menu/staff-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-general-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    NormalUserMenuComponent,
    NutritionistMenuComponent,
    StaffMenuComponent,
  ],
  templateUrl: './general-menu.component.html',
  styleUrl: './general-menu.component.css'
})
export class GeneralMenuComponent {
  userService = inject(UserService);
  user: any;
  userRole : any;

  constructor() {
    effect(() => {
      this.user = this.userService.user;
      if (this.user()) {
        this.userRole = (this.userService.user().role);
      } else {
        this.userRole = null;
      }
    }, { allowSignalWrites: true });
  }
}
