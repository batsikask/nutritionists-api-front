import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NutritionistClientDiseaseEditComponent } from '../nutritionist-client-disease-edit/nutritionist-client-disease-edit.component';

@Component({
  selector: 'app-nutritionist-client-disease-details',
  standalone: true,
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    DeleteConfirmationDialogComponent, 
    NutritionistClientDiseaseEditComponent,
  ],
  templateUrl: './nutritionist-client-disease-details.component.html',
  styleUrl: './nutritionist-client-disease-details.component.css'
})
export class NutritionistClientDiseaseDetailsComponent {
  @Input() disease: any;
  dialog = inject(MatDialog)
  measurementService = inject(MeasurementService);
  isEditMode = signal(false);

  openConfirmationDialog(measurementId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to permanently delete this disease record?' }
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
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    this.measurementService.crudClientMeasurementRequest('delete', nutritionistId, clientId, 'disease', measurementId).subscribe(() => {
    this.measurementService.diseases.update(diseases => diseases.filter(measurement => measurement.id !== measurementId));
    });
  }
}
