import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SegmentalBodyMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-nutritionist-client-segmental-body-measurement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './nutritionist-client-segmental-body-measurement-form.component.html',
  styleUrl: './nutritionist-client-segmental-body-measurement-form.component.css'
})
export class NutritionistClientSegmentalBodyMeasurementFormComponent {
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);
  segmentalMeasurements = this.measurementService.segmentalBodyMeasurements;

  form = this.fb.group({
    trunk_muscle: [],
    left_arm_muscle: [],
    right_arm_muscle: [],
    left_leg_muscle: [],
    right_leg_muscle: [],
    trunk_fat: [],
    left_arm_fat: [],
    right_arm_fat: [],
    left_leg_fat: [],
    right_leg_fat: [],
    date: [, Validators.required],
  });

  submit(formValue: any) {
    const segmentalBodyMeasurement = formValue as SegmentalBodyMeasurement;
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    this.measurementService.crudClientMeasurementRequest('post', nutritionistId, clientId, 'segmental', null, segmentalBodyMeasurement).subscribe(() => {
      this.measurementService.getAllClientMeasurementDetails();
      this.form.reset();
    });
  }
}
