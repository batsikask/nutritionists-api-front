import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { DeleteConfirmationDialogComponent } from '../../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NormalUserDietEditComponent } from '../normal-user-diet-edit/normal-user-diet-edit.component';

@Component({
  selector: 'app-normal-user-diet-details',
  standalone: true,
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    DeleteConfirmationDialogComponent,
    NormalUserDietEditComponent,
  ],
  templateUrl: './normal-user-diet-details.component.html',
  styleUrl: './normal-user-diet-details.component.css'
})
export class NormalUserDietDetailsComponent {
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
    const userId = this.measurementService.normalUser.id;
    this.measurementService.crudUserMeasurementRequest('delete', userId, 'diet', dietId).subscribe(() => {
    this.measurementService.diets.update(diets => diets.filter(diet => diet.id !== dietId));
    });
  }
}
