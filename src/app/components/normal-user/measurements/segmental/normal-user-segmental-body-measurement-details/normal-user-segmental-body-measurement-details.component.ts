import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NormalUserSegmentalBodyMeasurementEditComponent } from '../normal-user-segmental-body-measurement-edit/normal-user-segmental-body-measurement-edit.component';

@Component({
  selector: 'app-normal-user-segmental-body-measurement-details',
  standalone: true,
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    DeleteConfirmationDialogComponent, 
    NormalUserSegmentalBodyMeasurementEditComponent,
  ],
  templateUrl: './normal-user-segmental-body-measurement-details.component.html',
  styleUrl: './normal-user-segmental-body-measurement-details.component.css'
})
export class NormalUserSegmentalBodyMeasurementDetailsComponent {
  @Input() segmentalBodyMeasurement: any;
  dialog = inject(MatDialog)
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

  enableEditMode(){ 
    this.isEditMode.set(true);
  }

  deleteMeasurement(measurementId: number) {
    const userId = this.measurementService.normalUser.id;
    this.measurementService.crudUserMeasurementRequest('delete', userId, 'segmental', measurementId).subscribe(() => {
    this.measurementService.segmentalBodyMeasurements.update(sbms => sbms.filter(measurement => measurement.id !== measurementId));
    });
  }
}
