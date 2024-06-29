import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { NutritionistService } from './nutritionist.service';

const API_URL = `${environment.apiURL}/nutritionists`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http: HttpClient = inject(HttpClient);
  nutritionistService = inject(NutritionistService);
  nutritionist = this.nutritionistService.nutritionistUserDetails();
  clients = signal<Client[]>([]);
  currentClient = signal<Client | null>(null);

  constructor() {
    if (this.nutritionist) {
      this.getNutritionistClientsDetails(this.nutritionist.id);
    }
  }

  getClients(nutritionistId: number) {
    return this.http.get<Client[]>(`${API_URL}/${nutritionistId}/clients/`);
  }

  getClient(nutritionistId: number, clientId: number) {
    return this.http.get<Client>(`${API_URL}/${nutritionistId}/clients/${clientId}`);
  }

  createClient(nutritionistId: number, client: Partial<Client>) {
    console.log('Creating client', client);
    return this.http.post<Client>(`${API_URL}/${nutritionistId}/clients/`, client);
  }

  updateClient(nutritionistId: number, clientId: number, client: Partial<Client>) {
    return this.http.patch<Client>(`${API_URL}/${nutritionistId}/clients/${clientId}`, client);
  }

  deleteClient(nutritionistId: number, clientId: number) {
    return this.http.delete<Client>(`${API_URL}/${nutritionistId}/clients/${clientId}`);
  }

  linkClientToNormalUser(nutritionistId: number, clientId: number, normal_user_id: number) {
    return this.http.post<Client>(`${API_URL}/${nutritionistId}/clients/${clientId}/linkto/users/${normal_user_id}`, {});
  }

  getNutritionistClientsDetails(nutritionistId: number) {
    this.getClients(nutritionistId).subscribe({
      next: (response) => {
        this.clients.set(response);
      },
      error: (error) => {
        console.error('Error getting clients', error);
      },
    });
  }

  getCurrentClientDetails(clientId: number) {
    this.getClient(this.nutritionist.id, clientId).subscribe({
      next: (response) => {
        this.currentClient.set(response);
      },
      error: (error) => {
        console.error('Error getting client', error);
      },
    });
  }

  updateCurrentClientDetails(updatedClient: Partial<Client>) {
    this.updateClient(this.nutritionist.id, this.currentClient().id, updatedClient).subscribe({
      next: (response) => {
        this.currentClient.set({ ...this.currentClient(), ...updatedClient });
      },
      error: (error) => {
        console.error('Error updating client', error);
      },
    });
  }
}
