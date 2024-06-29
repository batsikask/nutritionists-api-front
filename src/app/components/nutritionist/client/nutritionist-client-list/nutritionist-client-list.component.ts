import { Component, inject } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';
import { NutritionistService } from 'src/app/shared/services/nutritionist.service';
import { MatListItem, MatListItemIcon, MatListModule } from '@angular/material/list';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nutritionist-client-list',
  standalone: true,
  imports: [
    MatListModule, 
    MatListItem, 
    MatListItemIcon, 
    MatIconModule, 
    MatButtonModule, 
    MatIconButton, 
    RouterLink, 
    RouterOutlet,
  ],
  templateUrl: './nutritionist-client-list.component.html',
  styleUrl: './nutritionist-client-list.component.css'
})
export class NutritionistClientListComponent {
  nutritionistService = inject(NutritionistService);
  clientService = inject(ClientService);
  nutritionist = this.nutritionistService.nutritionistUserDetails;
  clients = this.clientService.clients;
}
