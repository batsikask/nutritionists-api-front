import { Component, effect, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NutritionistClientBodyMeasurementFormComponent } from '../nutritionist-client-body-measurement-form/nutritionist-client-body-measurement-form.component';
import { NutritionistClientBodyMeasurementDetailsComponent } from '../nutritionist-client-body-measurement-details/nutritionist-client-body-measurement-details.component';

@Component({
  selector: 'app-nutritionist-client-body-measurement-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NutritionistClientBodyMeasurementDetailsComponent, 
    NutritionistClientBodyMeasurementFormComponent,
  ],
  templateUrl: './nutritionist-client-body-measurement-list.component.html',
  styleUrl: './nutritionist-client-body-measurement-list.component.css'
})
export class NutritionistClientBodyMeasurementListComponent {
  measurementService = inject(MeasurementService);
  bodyMeasurements = this.measurementService.bodyMeasurements;

  bodyMeasurementsExist = signal(false);

  constructor() {
    this.measurementService.getAllClientMeasurementDetails();
    effect(() => {
      this.bodyMeasurementsExist.set(this.bodyMeasurements().length > 0);
    }, { allowSignalWrites: true });
  }
}
