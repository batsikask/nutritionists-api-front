import { Component, effect, inject, signal } from '@angular/core';
import { NutritionistClientDiseaseFormComponent } from '../nutritionist-client-disease-form/nutritionist-client-disease-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NutritionistClientDiseaseDetailsComponent } from '../nutritionist-client-disease-details/nutritionist-client-disease-details.component';

@Component({
  selector: 'app-nutritionist-client-disease-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NutritionistClientDiseaseDetailsComponent, 
    NutritionistClientDiseaseFormComponent,
  ],
  templateUrl: './nutritionist-client-disease-list.component.html',
  styleUrl: './nutritionist-client-disease-list.component.css'
})
export class NutritionistClientDiseaseListComponent {
  measurementService = inject(MeasurementService);
  diseases = this.measurementService.diseases;

  diseasesExist = signal(false);

  constructor() {
    this.measurementService.getAllClientMeasurementDetails();
    
    effect(() => {
      this.diseasesExist.set(this.diseases().length > 0);
    }, { allowSignalWrites: true });
  }
}
