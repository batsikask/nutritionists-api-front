import { Component, Input, inject, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { DeleteConfirmationDialogComponent } from '../../../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NutritionistClientBodyMeasurementEditComponent } from '../nutritionist-client-body-measurement-edit/nutritionist-client-body-measurement-edit.component';


@Component({
  selector: 'app-nutritionist-client-body-measurement-details',
  standalone: true,
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    DeleteConfirmationDialogComponent, 
    NutritionistClientBodyMeasurementEditComponent,
  ],
  templateUrl: './nutritionist-client-body-measurement-details.component.html',
  styleUrl: './nutritionist-client-body-measurement-details.component.css'
})
export class NutritionistClientBodyMeasurementDetailsComponent {
  @Input() bodyMeasurement: any;
  router = inject(Router);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  measurementService = inject(MeasurementService);
  isEditMode = signal(false);

  openConfirmationDialog(measurementId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to permanently delete this measurement?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMeasurement(measurementId);
      }
    });
  }

  enableEditMode(measurementId: number){ 
    this.isEditMode.set(true);
  }

  deleteMeasurement(measurementId: number) {
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    this.measurementService.crudClientMeasurementRequest('delete', nutritionistId, clientId, 'body', measurementId).subscribe(() => {
    this.measurementService.bodyMeasurements.update(bodyMeasurements => bodyMeasurements.filter(measurement => measurement.id !== measurementId));
    });
  }
}
