import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Diet } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-normal-user-diet-edit',
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
  templateUrl: './normal-user-diet-edit.component.html',
  styleUrl: './normal-user-diet-edit.component.css'
})
export class NormalUserDietEditComponent {
  @Input() diet: any;
  @Input() isEditMode: any;
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);

  form = this.fb.group({
    date: [, Validators.required],
    preffered_foods: [''],
    disliked_foods: [''],
    activity_level: [, [Validators.min(0)]],
    weight_goal: [, [Validators.min(0)]],
    fat: [, [Validators.min(0)]],
    protein: [, [Validators.min(0)]],
    carbohydrates: [, [Validators.min(0)]],
    diet: [''],
    comments: [''],
  });

  ngOnInit() {
    this.form.patchValue(this.diet);
  }

  submit(formValue: any) {
    const updatedDiet = formValue as Diet;
    const userId = this.measurementService.normalUser.id;
    const dietId = this.diet.id;
    updatedDiet.id = dietId;
    this.measurementService.crudUserMeasurementRequest('post', userId, 'diet', dietId, updatedDiet).subscribe(() => {
      this.measurementService.diets.update(diets => {
        const index = diets.findIndex(diet => diet.id === dietId);
        diets[index] = updatedDiet;
        return diets;
      });
    });
  }

  cancelEditMode() {
    this.isEditMode.set(false);
  }
}
