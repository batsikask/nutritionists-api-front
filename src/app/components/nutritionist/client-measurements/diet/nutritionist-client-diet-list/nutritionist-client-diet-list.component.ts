import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NutritionistClientDietDetailsComponent } from '../nutritionist-client-diet-details/nutritionist-client-diet-details.component';
import { NutritionistClientDietFormComponent } from '../nutritionist-client-diet-form/nutritionist-client-diet-form.component';

@Component({
  selector: 'app-nutritionist-client-diet-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NutritionistClientDietDetailsComponent, 
    NutritionistClientDietFormComponent,
  ],
  templateUrl: './nutritionist-client-diet-list.component.html',
  styleUrl: './nutritionist-client-diet-list.component.css'
})
export class NutritionistClientDietListComponent {
  measurementService = inject(MeasurementService);
  diets = this.measurementService.diets;

  dietsExist = signal(false);

  constructor() {
    this.measurementService.getAllClientMeasurementDetails();
    effect(() => {
      this.dietsExist.set(this.diets().length > 0);
    }, { allowSignalWrites: true });
  }
}
