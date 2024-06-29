import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NutritionistClientSegmentalBodyMeasurementDetailsComponent } from '../nutritionist-client-segmental-body-measurement-details/nutritionist-client-segmental-body-measurement-details.component';
import { NutritionistClientSegmentalBodyMeasurementFormComponent } from '../nutritionist-client-segmental-body-measurement-form/nutritionist-client-segmental-body-measurement-form.component';

@Component({
  selector: 'app-nutritionist-client-segmental-body-measurement-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NutritionistClientSegmentalBodyMeasurementDetailsComponent, 
    NutritionistClientSegmentalBodyMeasurementFormComponent,
  ],
  templateUrl: './nutritionist-client-segmental-body-measurement-list.component.html',
  styleUrl: './nutritionist-client-segmental-body-measurement-list.component.css'
})
export class NutritionistClientSegmentalBodyMeasurementListComponent {
  measurementService = inject(MeasurementService);
  segmentalBodyMeasurements = this.measurementService.segmentalBodyMeasurements;

  segmentalBodyMeasurementsExist = signal(false);

  constructor() {
    this.measurementService.getAllClientMeasurementDetails();
    effect(() => {
      this.segmentalBodyMeasurementsExist.set(this.segmentalBodyMeasurements().length > 0);
    }, { allowSignalWrites: true });
  }
}
