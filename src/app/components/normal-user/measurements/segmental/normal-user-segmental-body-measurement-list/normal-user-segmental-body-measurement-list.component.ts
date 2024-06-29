import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NormalUserSegmentalBodyMeasurementDetailsComponent } from '../normal-user-segmental-body-measurement-details/normal-user-segmental-body-measurement-details.component';
import { NormalUserSegmentalBodyMeasurementFormComponent } from '../normal-user-segmental-body-measurement-form/normal-user-segmental-body-measurement-form.component';

@Component({
  selector: 'app-normal-user-segmental-body-measurement-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NormalUserSegmentalBodyMeasurementDetailsComponent,
    NormalUserSegmentalBodyMeasurementFormComponent,
  ],
  templateUrl: './normal-user-segmental-body-measurement-list.component.html',
  styleUrl: './normal-user-segmental-body-measurement-list.component.css'
})
export class NormalUserSegmentalBodyMeasurementListComponent {
  measurementService = inject(MeasurementService);
  segmentalBodyMeasurements = this.measurementService.segmentalBodyMeasurements;

  segmentalBodyMeasurementsExist = signal(false);

  constructor() {
    this.measurementService.getAllUserMeasurementDetails();
    effect(() => {
      this.segmentalBodyMeasurementsExist.set(this.segmentalBodyMeasurements().length > 0);
    }, { allowSignalWrites: true });
  }
}
