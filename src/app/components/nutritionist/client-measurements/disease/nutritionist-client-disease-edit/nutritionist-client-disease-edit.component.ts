import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Diseases } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-nutritionist-client-disease-edit',
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
  templateUrl: './nutritionist-client-disease-edit.component.html',
  styleUrl: './nutritionist-client-disease-edit.component.css'
})
export class NutritionistClientDiseaseEditComponent {
  @Input() disease: any;
  @Input() isEditMode: any;
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);

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
  
  ngOnInit() {
    this.form.patchValue(this.disease);
  }

  submit(formValue: any) {
    const updatedDisease = formValue as Diseases;
    const nutritionistId = this.measurementService.nutritionist.id;
    const clientId = this.measurementService.currentClient.id;
    const diseaseId = this.disease.id;
    updatedDisease.id = diseaseId;
    this.measurementService.crudClientMeasurementRequest('post', nutritionistId, clientId, 'disease', diseaseId, updatedDisease).subscribe(() => {
      this.measurementService.diseases.update(diseases => {
        const index = diseases.findIndex(disease => disease.id === diseaseId);
        diseases[index] = updatedDisease;
        return diseases;
      });
    });
  }

  cancelEditMode() {
    this.isEditMode.set(false);
  }
}
