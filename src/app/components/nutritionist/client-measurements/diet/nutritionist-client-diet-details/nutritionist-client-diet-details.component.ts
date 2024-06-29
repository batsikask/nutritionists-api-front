import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NutritionistClientDietEditComponent } from '../nutritionist-client-diet-edit/nutritionist-client-diet-edit.component';

@Component({
  selector: 'app-nutritionist-client-diet-details',
  standalone: true,
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    DeleteConfirmationDialogComponent, 
    NutritionistClientDietEditComponent,
  ],
  templateUrl: './nutritionist-client-diet-details.component.html',
  styleUrl: './nutritionist-client-diet-details.component.css'
})
export class NutritionistClientDietDetailsComponent {
  @Input() diet: any;
  dialog = inject(MatDialog);
  measurementService = inject(MeasurementService);
  isEditMode = signal(false);

  openConfirmationDialog(dietId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to permanently delete this diet?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDiet(dietId);
      }
    });
  }

  enableEditMode(){ 
    this.isEditMode.set(true);
  }

  deleteDiet(dietId: number) {
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    this.measurementService.crudClientMeasurementRequest('delete', nutritionistId, clientId, 'diet', dietId).subscribe(() => {
    this.measurementService.diets.update(diets => diets.filter(diet => diet.id !== dietId));
    });
  }
}
