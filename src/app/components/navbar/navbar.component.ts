import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { NormaluserService } from 'src/app/shared/services/normaluser.service';
import { NutritionistService } from 'src/app/shared/services/nutritionist.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive, 
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router: Router = inject(Router);
  userService = inject(UserService);
  normalUserService = inject(NormaluserService);
  nutritionistUserService = inject(NutritionistService);
  staffService = inject(StaffService);

  user = this.userService.user;
  normalUser = this.normalUserService.normalUserDetails;
  nutritionistUser = this.nutritionistUserService.nutritionistUserDetails;
  staffUser = this.staffService.staffUserDetails;
  
  logout() {
    localStorage.removeItem('accessToken');
    this.user.set(null);
    this.normalUser.set(null);
    this.nutritionistUser.set(null);
    this.staffUser.set(null);
    this.router.navigate(['/login']);
  }
}
