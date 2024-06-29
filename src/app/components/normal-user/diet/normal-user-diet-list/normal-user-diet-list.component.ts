import { Component, effect, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MeasurementService } from 'src/app/shared/services/measurement.service';
import { NormalUserDietDetailsComponent } from '../normal-user-diet-details/normal-user-diet-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NormalUserDietFormComponent } from '../normal-user-diet-form/normal-user-diet-form.component';

@Component({
  selector: 'app-normal-user-diet-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTabsModule, 
    MatListModule, 
    NormalUserDietDetailsComponent,
    NormalUserDietFormComponent
  ],
  templateUrl: './normal-user-diet-list.component.html',
  styleUrl: './normal-user-diet-list.component.css'
})
export class NormalUserDietListComponent {
  measurementService = inject(MeasurementService);
  diets = this.measurementService.diets;

  dietsExist = signal(false);

  constructor() {
    this.measurementService.getAllUserMeasurementDetails();
    effect(() => {
      this.dietsExist.set(this.diets().length > 0);
    }, { allowSignalWrites: true });
  }  
}
