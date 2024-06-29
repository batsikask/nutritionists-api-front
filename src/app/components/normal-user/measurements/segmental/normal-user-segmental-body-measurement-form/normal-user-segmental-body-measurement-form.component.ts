import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SegmentalBodyMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-normal-user-segmental-body-measurement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './normal-user-segmental-body-measurement-form.component.html',
  styleUrl: './normal-user-segmental-body-measurement-form.component.css'
})
export class NormalUserSegmentalBodyMeasurementFormComponent {
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
    const userId = this.measurementService.normalUser.id;
    this.measurementService.crudUserMeasurementRequest('post', userId, 'segmental', null, segmentalBodyMeasurement).subscribe(() => {
      this.measurementService.getAllUserMeasurementDetails();
      this.form.reset();
    });
  }
}
