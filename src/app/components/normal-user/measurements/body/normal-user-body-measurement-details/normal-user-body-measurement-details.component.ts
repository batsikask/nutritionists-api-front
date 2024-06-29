import { Component, Input, inject, signal } from '@angular/core';
import { NormalUserBodyMeasurementEditComponent } from '../normal-user-body-measurement-edit/normal-user-body-measurement-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-normal-user-body-measurement-details',
  standalone: true,
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    DeleteConfirmationDialogComponent, 
    NormalUserBodyMeasurementEditComponent,
  ],
  templateUrl: './normal-user-body-measurement-details.component.html',
  styleUrl: './normal-user-body-measurement-details.component.css'
})
export class NormalUserBodyMeasurementDetailsComponent {
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
    const userId = this.measurementService.normalUser.id;
    this.measurementService.crudUserMeasurementRequest('delete', userId, 'body', measurementId).subscribe(() => {
    this.measurementService.bodyMeasurements.update(bodyMeasurements => bodyMeasurements.filter(measurement => measurement.id !== measurementId));
    });
  }
}
