import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NormalUserBodyMeasurementListComponent } from '../measurements/body/normal-user-body-measurement-list/normal-user-body-measurement-list.component';
import { NormalUserBiochemicalMeasurementListComponent } from '../measurements/biochemical/normal-user-biochemical-measurement-list/normal-user-biochemical-measurement-list.component';
import { NormalUserSegmentalBodyMeasurementListComponent } from '../measurements/segmental/normal-user-segmental-body-measurement-list/normal-user-segmental-body-measurement-list.component';

@Component({
  selector: 'app-user-measurements',
  standalone: true,
  imports: [
    MatTabsModule,
    NormalUserBodyMeasurementListComponent,
    NormalUserSegmentalBodyMeasurementListComponent,
    NormalUserBiochemicalMeasurementListComponent,
  ],
  templateUrl: './user-measurements.component.html',
  styleUrl: './user-measurements.component.css'
})
export class UserMeasurementsComponent {

}
