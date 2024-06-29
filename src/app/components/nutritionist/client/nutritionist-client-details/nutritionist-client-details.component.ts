import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { DeleteConfirmationDialogComponent } from '../../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ClientMeasurementsComponent } from '../../client-measurements/client-measurements/client-measurements.component';

@Component({
  selector: 'app-nutritionist-client-details',
  standalone: true,
  imports: [
    MatCardModule, 
    MatDividerModule, 
    MatButtonModule, 
    MatIconModule, 
    DeleteConfirmationDialogComponent, 
    RouterLink, 
    RouterOutlet, 
    MatTabsModule,
    ClientMeasurementsComponent,
  ],
  templateUrl: './nutritionist-client-details.component.html',
  styleUrl: './nutritionist-client-details.component.css'
})
export class NutritionistClientDetailsComponent {
  dialog = inject(MatDialog)
  router = inject(Router);
  route = inject(ActivatedRoute);
  clientService = inject(ClientService);
  currentClient = this.clientService.currentClient;

  constructor() {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    this.clientService.getCurrentClientDetails(parseInt(clientId));
  }


  openConfirmationDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to permanently delete this client?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient();
      }
    });
  }

  deleteClient() {
    this.clientService.deleteClient(this.clientService.nutritionist.id, this.currentClient().id).subscribe(() => {
      this.clientService.clients.update(clients => clients.filter(client => client.id !== this.currentClient().id));
      this.router.navigate(['/nutritionist/clients']);
    });
  }
}
