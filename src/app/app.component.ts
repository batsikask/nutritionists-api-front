import { Component, effect, inject} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NormalUserMenuComponent } from './components/menu/normal-user-menu/normal-user-menu.component';
import { NutritionistMenuComponent } from './components/menu/nutritionist-menu/nutritionist-menu.component';
import { StaffMenuComponent } from './components/menu/staff-menu/staff-menu.component';
import { UserService } from './shared/services/user.service';
import { GeneralMenuComponent } from './components/general-menu/general-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    NavbarComponent, 
    NormalUserMenuComponent, 
    NutritionistMenuComponent, 
    StaffMenuComponent,
    GeneralMenuComponent,
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userService = inject(UserService);
  user: any;
  userRole: string;

  constructor() {
    effect(() => {
      const user = this.userService.user();
      if (user) {
        this.userRole = this.userService.user().role;
      }
    });
  }
}
