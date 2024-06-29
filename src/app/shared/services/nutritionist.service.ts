import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { UserService } from './user.service';
import { Nutritionist } from '../interfaces/nutritionist';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiURL}/nutritionists`;

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {
  http: HttpClient = inject(HttpClient);
  userService = inject(UserService);
  nutritionistUserDetails = signal<Nutritionist | null>(null);


  getAllNutritionists() {
    return this.http.get<Nutritionist[]>(API_URL);
  }

  getNutritionist(id: number) {
    return this.http.get<Nutritionist>(`${API_URL}/${id}`);
  }

  updateNutritionist(id: number, nutritionist: Partial<Nutritionist>) {
    return this.http.patch<Nutritionist>(`${API_URL}/${id}`, nutritionist);
  }

  getNutritionistDetailsEffect = effect(() => {
    const user = this.userService.user();
    if (user && (user.role == "Nutritionist")) {
      this.getNutritionistDetails(user.role_id);
    }
  }, { allowSignalWrites: true });

  getNutritionistDetails(id: number) {
    this.getNutritionist(id).subscribe({
      next: (response) => {
        this.nutritionistUserDetails.set(response);
      },
      error: (error) => {
        console.error('Error getting nutritionist', error);
      },
    });
  }

  updateNutritionistUserDetails(updatedNutritionist: Partial<Nutritionist>) {
    this.updateNutritionist(this.userService.user().role_id, updatedNutritionist).subscribe({
      next: (response) => {
        this.nutritionistUserDetails.set({ ...this.nutritionistUserDetails(), ...updatedNutritionist });
      },
      error: (error) => {
        console.error('Error updating nutritionist', error);
      },
    });
  }

}
