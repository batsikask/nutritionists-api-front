import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NutritionistClientBiochemicalMeasurementDetailsComponent } from '../nutritionist-client-biochemical-measurement-details/nutritionist-client-biochemical-measurement-details.component';
import { NutritionistClientBiochemicalMeasurementFormComponent } from '../nutritionist-client-biochemical-measurement-form/nutritionist-client-biochemical-measurement-form.component';

@Component({
  selector: 'app-nutritionist-client-biochemical-measurement-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NutritionistClientBiochemicalMeasurementDetailsComponent, 
    NutritionistClientBiochemicalMeasurementFormComponent,
  ],
  templateUrl: './nutritionist-client-biochemical-measurement-list.component.html',
  styleUrl: './nutritionist-client-biochemical-measurement-list.component.css'
})
export class NutritionistClientBiochemicalMeasurementListComponent {
  measurementService = inject(MeasurementService);
  biochemicalMeasurements = this.measurementService.biochemicalMeasurements;

  biochemicalMeasurementsExist = signal(false);

  constructor() {
    this.measurementService.getAllClientMeasurementDetails();
    effect(() => {
      this.biochemicalMeasurementsExist.set(this.biochemicalMeasurements().length > 0);
    }, { allowSignalWrites: true });
  }

}
