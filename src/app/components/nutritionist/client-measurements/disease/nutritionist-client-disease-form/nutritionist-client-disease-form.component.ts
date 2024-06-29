import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Diseases } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-nutritionist-client-disease-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './nutritionist-client-disease-form.component.html',
  styleUrl: './nutritionist-client-disease-form.component.css'
})
export class NutritionistClientDiseaseFormComponent {
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);
  diseases = this.measurementService.diseases;

  form = this.fb.group({
    date: [, Validators.required],
    past_diseases: [''],
    past_medications: [''],
    current_diseases: [''],
    current_medications: [''],
    family_history: [''],
    allergies: [''],
    dysanexias: [''],
    food_restrictions: [''],
    comments: [''],
  });

  submit(formValue: any) {
    const disease = formValue as Diseases;
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    this.measurementService.crudClientMeasurementRequest('post', nutritionistId, clientId, 'disease', null, disease).subscribe(() => {
      this.measurementService.getAllClientMeasurementDetails();
      this.form.reset();
    });
  }
}
