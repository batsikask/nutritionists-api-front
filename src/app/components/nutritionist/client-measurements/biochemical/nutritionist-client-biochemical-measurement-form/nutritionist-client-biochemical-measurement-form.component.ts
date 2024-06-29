import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BiochemicalMeasurement } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-nutritionist-client-biochemical-measurement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './nutritionist-client-biochemical-measurement-form.component.html',
  styleUrl: './nutritionist-client-biochemical-measurement-form.component.css'
})
export class NutritionistClientBiochemicalMeasurementFormComponent {
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);
  biochemicalMeasurements = this.measurementService.biochemicalMeasurements;

  form = this.fb.group({
    glucose: [],
    chlosterol: [],
    triglycerides: [],
    hdl: [],
    ldl: [],
    creatinine: [],
    urea: [],
    uric_acid: [],
    hemoglobin: [],
    hematocrit: [],
    white_blood_cell_count: [],
    red_blood_cell_count: [],
    platelet_count: [],
    calcium: [],
    sodium: [],
    potassium: [],
    chloride: [],
    iron: [],
    ferritin: [],
    alanine_aminotransferase: [],
    aspartate_aminotransferase: [],
    alkaline_phosphatase: [],
    bilirubin: [],
    albumin: [],
    total_protein: [],
    thyroid_stimulating_hormone: [],
    thyroxine: [],
    triiodothyronine: [],
    c_reactive_protein: [],
    lactate_dehydrogenase: [],
    vitamin_a: [],
    vitamin_b12: [],
    vitamin_c: [],
    vitamin_d: [],
    vitamin_e: [],
    vitamin_k: [],
    date: [, Validators.required]
  });

  submit(formValue: any) {
    const biochemicalMeasurement = formValue as BiochemicalMeasurement;
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    this.measurementService.crudClientMeasurementRequest('post', nutritionistId, clientId, 'biochemical', null, biochemicalMeasurement).subscribe(() => {
      this.measurementService.getAllClientMeasurementDetails();
      this.form.reset();
    });
  }
}
