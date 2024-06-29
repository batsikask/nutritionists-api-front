import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NormalUser } from '../interfaces/normal-user';
import { UserService } from './user.service';

const API_URL = `${environment.apiURL}/normal-users`;

@Injectable({
  providedIn: 'root'
})
export class NormaluserService {
  http: HttpClient = inject(HttpClient);
  userService = inject(UserService);
  normalUserDetails = signal<NormalUser | null>(null);

  gelAllNormalUsers() {
    return this.http.get<NormalUser[]>(API_URL);
  }

  getNormalUser(id: number) {
    return this.http.get<NormalUser>(`${API_URL}/${id}`);
  }

  updateNormalUser(id: number, user: Partial<NormalUser>) {
    return this.http.patch<NormalUser>(`${API_URL}/${id}`, user);
  }

  getNormalUserDetailsEffect = effect(() => {
    const user = this.userService.user();
    if (user && user.role === 'NormalUser') {
      this.getNormalUserDetails(user.role_id);
    }
  }, { allowSignalWrites: true });

  getNormalUserDetails(id: number) {
    this.getNormalUser(id).subscribe({
      next: (response) => {
        this.normalUserDetails.set(response);
      },
      error: (error) => {
        console.error('Error getting normal user', error);
      },
    });
  }


  updateNormalUserDetails(updatedNormalUser: Partial<NormalUser>) {
    this.updateNormalUser(this.userService.user().role_id, updatedNormalUser).subscribe({
      next: (response) => {
        this.normalUserDetails.set({ ...this.normalUserDetails(), ...updatedNormalUser });
      },
      error: (error) => {
        console.error('Error updating normal user', error);
      },
    });
  }
}
