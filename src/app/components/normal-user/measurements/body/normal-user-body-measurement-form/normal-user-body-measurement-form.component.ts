import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BodyMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-normal-user-body-measurement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './normal-user-body-measurement-form.component.html',
  styleUrl: './normal-user-body-measurement-form.component.css'
})
export class NormalUserBodyMeasurementFormComponent {
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);
  bodyMeasurements = this.measurementService.bodyMeasurements;

  form = this.fb.group({
    date: [, Validators.required],
    weight: [, [Validators.min(0)]],
    height: [, [Validators.min(0)]],
    age: [, [Validators.min(0)]],
    bmr: [, [Validators.min(0)]],
    bmi: [, [Validators.min(0)]],
    body_fat_percentage: [, [Validators.min(0)]],
    body_fat_mass: [, [Validators.min(0)]],
    fat_free_mass: [, [Validators.min(0)]],
    muscle_mass: [, [Validators.min(0)]],
    bone_mass: [, [Validators.min(0)]],
    body_water_percentage: [, [Validators.min(0)]],
    body_water_weight: [, [Validators.min(0)]],
    visceral_fat_level: [, [Validators.min(0)]],
    metabolic_age: [, [Validators.min(0)]],
    physical_activity_level: [, [Validators.min(0)]],
    physique_rating: [, [Validators.min(0)]],

  });

  submit(formValue: any) {
    const bodyMeasurement = formValue as BodyMeasurement;
    const userId = this.measurementService.normalUser.id;
    this.measurementService.crudUserMeasurementRequest('post', userId, 'body', null, bodyMeasurement).subscribe(() => {
      this.measurementService.getAllUserMeasurementDetails();
      this.form.reset();
    });
  }
}
