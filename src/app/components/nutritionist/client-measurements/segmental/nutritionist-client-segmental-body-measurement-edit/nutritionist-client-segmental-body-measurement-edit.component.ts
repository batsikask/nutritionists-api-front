import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SegmentalBodyMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-nutritionist-client-segmental-body-measurement-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './nutritionist-client-segmental-body-measurement-edit.component.html',
  styleUrl: './nutritionist-client-segmental-body-measurement-edit.component.css'
})
export class NutritionistClientSegmentalBodyMeasurementEditComponent {
  @Input() segmentalBodyMeasurement: any;
  @Input() isEditMode: any;
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);

  form = this.fb.group({
    date: [, Validators.required],
    trunk_muscle: [, [Validators.min(0)]],
    left_arm_muscle: [, [Validators.min(0)]],
    right_arm_muscle: [, [Validators.min(0)]],
    left_leg_muscle: [, [Validators.min(0)]],
    right_leg_muscle: [, [Validators.min(0)]],
    trunk_fat: [, [Validators.min(0)]],
    left_arm_fat: [, [Validators.min(0)]],
    right_arm_fat: [, [Validators.min(0)]],
    left_leg_fat: [,Validators.min(0)],
    right_leg_fat: [, [Validators.min(0)]],
  });

  ngOnInit() {
    this.form.patchValue(this.segmentalBodyMeasurement);
  }

  submit(formValue: any) {
    const updatedSegmentalBodyMeasurement = formValue as SegmentalBodyMeasurement;
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    const segmentalBodyMeasurementId = this.segmentalBodyMeasurement.id;
    updatedSegmentalBodyMeasurement.id = segmentalBodyMeasurementId;
    this.measurementService.crudClientMeasurementRequest('patch', nutritionistId, clientId, 'segmental', segmentalBodyMeasurementId, updatedSegmentalBodyMeasurement).subscribe(() => {
      this.measurementService.segmentalBodyMeasurements.update(segmentalBodyMeasurements => {
        const index = segmentalBodyMeasurements.findIndex(measurement => measurement.id === segmentalBodyMeasurementId);
        segmentalBodyMeasurements[index] = updatedSegmentalBodyMeasurement;
        return segmentalBodyMeasurements;
      });
    });
  }

  cancelEditMode() {
    this.isEditMode.set(false);
  }
}
