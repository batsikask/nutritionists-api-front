import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NormalUserBiochemicalMeasurementDetailsComponent } from '../normal-user-biochemical-measurement-details/normal-user-biochemical-measurement-details.component';
import { NormalUserBiochemicalMeasurementFormComponent } from '../normal-user-biochemical-measurement-form/normal-user-biochemical-measurement-form.component';

@Component({
  selector: 'app-normal-user-biochemical-measurement-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NormalUserBiochemicalMeasurementDetailsComponent,
    NormalUserBiochemicalMeasurementFormComponent,
  ],
  templateUrl: './normal-user-biochemical-measurement-list.component.html',
  styleUrl: './normal-user-biochemical-measurement-list.component.css'
})
export class NormalUserBiochemicalMeasurementListComponent {
  measurementService = inject(MeasurementService);
  biochemicalMeasurements = this.measurementService.biochemicalMeasurements;

  biochemicalMeasurementsExist = signal(false);

  constructor() {
    this.measurementService.getAllUserMeasurementDetails();
    effect(() => {
      this.biochemicalMeasurementsExist.set(this.biochemicalMeasurements().length > 0);
    }, { allowSignalWrites: true });
  }

}
