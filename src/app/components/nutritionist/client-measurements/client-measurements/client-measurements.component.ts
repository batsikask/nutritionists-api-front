import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NutritionistClientBiochemicalMeasurementListComponent } from '../biochemical/nutritionist-client-biochemical-measurement-list/nutritionist-client-biochemical-measurement-list.component';
import { NutritionistClientBodyMeasurementListComponent } from '../body/nutritionist-client-body-measurement-list/nutritionist-client-body-measurement-list.component';
import { NutritionistClientDietListComponent } from '../diet/nutritionist-client-diet-list/nutritionist-client-diet-list.component';
import { NutritionistClientDiseaseListComponent } from '../disease/nutritionist-client-disease-list/nutritionist-client-disease-list.component';
import { NutritionistClientSegmentalBodyMeasurementListComponent } from '../segmental/nutritionist-client-segmental-body-measurement-list/nutritionist-client-segmental-body-measurement-list.component';

@Component({
  selector: 'app-client-measurements',
  standalone: true,
  imports: [
    MatTabsModule,
    NutritionistClientBodyMeasurementListComponent, 
    NutritionistClientSegmentalBodyMeasurementListComponent, 
    NutritionistClientBiochemicalMeasurementListComponent,
    NutritionistClientDietListComponent, 
    NutritionistClientDiseaseListComponent,
  ],
  templateUrl: './client-measurements.component.html',
  styleUrl: './client-measurements.component.css'
})
export class ClientMeasurementsComponent {

}
