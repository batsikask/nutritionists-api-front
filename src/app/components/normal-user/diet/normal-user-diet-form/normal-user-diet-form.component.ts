import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Diet } from 'src/app/shared/interfaces/measurement';
import { MeasurementService } from 'src/app/shared/services/measurement.service';

@Component({
  selector: 'app-normal-user-diet-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './normal-user-diet-form.component.html',
  styleUrl: './normal-user-diet-form.component.css'
})
export class NormalUserDietFormComponent {
  fb = inject(FormBuilder);
  measurementService = inject(MeasurementService);
  diets = this.measurementService.diets;

  form = this.fb.group({
      date: [, Validators.required],
      preffered_foods: [''],
      disliked_foods: [''],
      activity_level: [],
      weight_goal: [],
      fat: [, [Validators.min(0)]],
      protein: [, [Validators.min(0)]],
      carbohydrates: [, [Validators.min(0)]],
      diet: [''],
      comments: [''],
  });

  submit(formValue: any) {
    const diet = formValue as Diet;
    const userId = this.measurementService.normalUser.id;
    this.measurementService.crudUserMeasurementRequest('post', userId, 'diet', null, diet).subscribe(() => {
      this.measurementService.getAllUserMeasurementDetails();
      this.form.reset();
    });
  }

}
