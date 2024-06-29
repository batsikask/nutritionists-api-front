import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Staff } from '../interfaces/staff';
import { UserService } from './user.service';

const API_URL = `${environment.apiURL}/users`;

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  http: HttpClient = inject(HttpClient);
  userService = inject(UserService);
  staffUserDetails = signal<Staff | null>(null);

  getStaff(id: number) {
    return this.http.get<Staff>(`${API_URL}/${id}`);
  }

  updateStaff(id: number, user: Staff) {
    return this.http.patch<Staff>(`${API_URL}/${id}`, user);
  }

  getStaffDetailsEffect = effect(() => {
    const user = this.userService.user();
    if (user && (user.role == "Staff")) {
      this.getStaffDetails(user.id);
    }
  }, { allowSignalWrites: true });

  getStaffDetails(id: number) {
        this.getStaff(id).subscribe({
      next: (response) => {
        this.staffUserDetails.set(response);
      },
      error: (error) => {
        console.error('Error getting staff', error);
      }
    });
  }

  updateStaffUserDetails(updatedStaff: Staff) {
    this.updateStaff(this.userService.user().id, updatedStaff).subscribe({
      next: (response) => {
        this.staffUserDetails.set(updatedStaff);
      },
      error: (error) => {
        console.error('Error updating staff', error);
      },
    });
  }
}

