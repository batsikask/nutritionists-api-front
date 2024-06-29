import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BodyMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-normal-user-body-measurement-edit',
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
  templateUrl: './normal-user-body-measurement-edit.component.html',
  styleUrl: './normal-user-body-measurement-edit.component.css'
})
export class NormalUserBodyMeasurementEditComponent {
  @Input() bodyMeasurement: any;
  @Input() isEditMode: any;
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);

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

  ngOnInit() {
    this.form.patchValue(this.bodyMeasurement);
  }

  submit(formValue: any) {
    const updatedBodyMeasurement = formValue as BodyMeasurement;
    const userId = this.measurementService.normalUser.id;
    const bodyMeasurementId = this.bodyMeasurement.id;
    updatedBodyMeasurement.id = bodyMeasurementId;
    this.measurementService.crudUserMeasurementRequest('patch', userId, 'body', bodyMeasurementId, updatedBodyMeasurement).subscribe(() => {
      this.measurementService.bodyMeasurements.update(bodyMeasurements => {
        const index = bodyMeasurements.findIndex(measurement => measurement.id === bodyMeasurementId);
        bodyMeasurements[index] = updatedBodyMeasurement;
        return bodyMeasurements;
      });
    });
  }

  cancelEditMode() {
    this.isEditMode.set(false);
  }
}
