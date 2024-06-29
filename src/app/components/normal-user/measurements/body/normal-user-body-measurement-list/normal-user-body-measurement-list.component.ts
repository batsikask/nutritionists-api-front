import { Component, effect, inject, signal } from '@angular/core';
import { NormalUserBodyMeasurementDetailsComponent } from '../normal-user-body-measurement-details/normal-user-body-measurement-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NormalUserBodyMeasurementFormComponent } from '../normal-user-body-measurement-form/normal-user-body-measurement-form.component';

@Component({
  selector: 'app-normal-user-body-measurement-list',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    NormalUserBodyMeasurementDetailsComponent,
    NormalUserBodyMeasurementFormComponent,
  ],
  templateUrl: './normal-user-body-measurement-list.component.html',
  styleUrl: './normal-user-body-measurement-list.component.css'
})
export class NormalUserBodyMeasurementListComponent {
  measurementService = inject(MeasurementService);
  bodyMeasurements = this.measurementService.bodyMeasurements;

  bodyMeasurementsExist = signal(false);

  constructor() {
    this.measurementService.getAllUserMeasurementDetails();
    effect(() => {
      this.bodyMeasurementsExist.set(this.bodyMeasurements().length > 0);
    }, { allowSignalWrites: true });
  }
}
