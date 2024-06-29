import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BiochemicalMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-nutritionist-client-biochemical-measurement-edit',
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
  templateUrl: './nutritionist-client-biochemical-measurement-edit.component.html',
  styleUrl: './nutritionist-client-biochemical-measurement-edit.component.css'
})
export class NutritionistClientBiochemicalMeasurementEditComponent {
  @Input() biochemicalMeasurement: any;
  @Input() isEditMode: any;
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);

  form = this.fb.group({
    date: [, Validators.required],
    glucose: [, [Validators.min(0)]],
    chlosterol: [, [Validators.min(0)]],
    triglycerides: [, [Validators.min(0)]],
    hdl: [, [Validators.min(0)]],
    ldl: [, [Validators.min(0)]],
    creatinine: [, [Validators.min(0)]],
    urea: [, [Validators.min(0)]],
    uric_acid: [, [Validators.min(0)]],
    hemoglobin: [, [Validators.min(0)]],
    hematocrit: [, [Validators.min(0)]],
    white_blood_cell_count: [, [Validators.min(0)]],
    red_blood_cell_count: [, [Validators.min(0)]],
    platelet_count: [, [Validators.min(0)]],
    calcium: [, [Validators.min(0)]],
    sodium: [, [Validators.min(0)]],
    potassium: [, [Validators.min(0)]],
    chloride: [, [Validators.min(0)]],
    iron: [, [Validators.min(0)]],
    ferritin: [, [Validators.min(0)]],
    alanine_aminotransferase: [, [Validators.min(0)]],
    aspartate_aminotransferase: [, [Validators.min(0)]],
    alkaline_phosphatase: [, [Validators.min(0)]],
    bilirubin: [, [Validators.min(0)]],
    albumin: [, [Validators.min(0)]],
    total_protein: [, [Validators.min(0)]],
    thyroid_stimulating_hormone: [, [Validators.min(0)]],
    thyroxine: [, [Validators.min(0)]],
    triiodothyronine: [, [Validators.min(0)]],
    c_reactive_protein: [, [Validators.min(0)]],
    lactate_dehydrogenase: [, [Validators.min(0)]],
    vitamin_a: [, [Validators.min(0)]],
    vitamin_b12: [, [Validators.min(0)]],
    vitamin_c: [, [Validators.min(0)]],
    vitamin_d: [, [Validators.min(0)]],
    vitamin_e: [, [Validators.min(0)]],
    vitamin_k: [, [Validators.min(0)]],
  });

  ngOnInit() {
    this.form.patchValue(this.biochemicalMeasurement);
  }

  submit(formValue: any) {
    const updatedBiochemicalMeasurement = formValue as BiochemicalMeasurement;
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    const biochemicalMeasurementId = this.biochemicalMeasurement.id;
    updatedBiochemicalMeasurement.id = biochemicalMeasurementId;
    this.measurementService.crudClientMeasurementRequest('patch', nutritionistId, clientId, 'biochemical', biochemicalMeasurementId, updatedBiochemicalMeasurement).subscribe(() => {
      this.measurementService.biochemicalMeasurements.update(biochemicalMeasurements => {
        const index = biochemicalMeasurements.findIndex(measurement => measurement.id === biochemicalMeasurementId);
        biochemicalMeasurements[index] = updatedBiochemicalMeasurement;
        return biochemicalMeasurements;
      });
    });
  }

  cancelEditMode() {
    this.isEditMode.set(false);
  }
}
