import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BiochemicalMeasurement, BodyMeasurement, Diet, Diseases, SegmentalBodyMeasurement } from '../interfaces/measurement';
import { NutritionistService } from './nutritionist.service';
import { ClientService } from './client.service';
import { NormaluserService } from './normaluser.service';

const API_URL_USERS = `${environment.apiURL}/users`;
const API_URL_NUTR = `${environment.apiURL}/nutritionists`;

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  http: HttpClient = inject(HttpClient);
  normalUserService = inject(NormaluserService);
  nutritionistService = inject(NutritionistService);
  clientService = inject(ClientService);
  normalUser = this.normalUserService.normalUserDetails();
  nutritionist = this.nutritionistService.nutritionistUserDetails();
  currentClient = this.clientService.currentClient();
  bodyMeasurements = signal<BodyMeasurement[]>([]);
  segmentalBodyMeasurements = signal<SegmentalBodyMeasurement[]>([]);
  biochemicalMeasurements = signal<BiochemicalMeasurement[]>([]);
  diseases = signal<Diseases[]>([]);
  diets = signal<Diet[]>([]);

  constructor() {
    if (this.normalUser) {
      this.getAllUserMeasurementDetails();
    }
    if (this.currentClient) {
      this.getAllClientMeasurementDetails();
    }
  }

  getAllUserMeasurements(userId: number) {
    return this.http.get<any>(`${API_URL_USERS}/${userId}/measurements/`);
  }

  crudUserMeasurementRequest(method: string, userId: number, measurementType: string, measurementId?: number,  measurementObj?: any) {
    switch (method) {
      case 'post':
        return this.http.post<any>(`${API_URL_USERS}/${userId}/measurements/${measurementType}/`, measurementObj);
      case 'get':
        return this.http.get<any>(`${API_URL_USERS}/${userId}/measurements/${measurementType}/${measurementId}`);
      case 'patch':
        return this.http.patch<any>(`${API_URL_USERS}/${userId}/measurements/${measurementType}/${measurementId}`, measurementObj);
      case 'delete':
        return this.http.delete<any>(`${API_URL_USERS}/${userId}/measurements/${measurementType}/${measurementId}`);
      default:
        throw new Error(`Invalid method: ${method}`);
      }
  }

  getAllClientMeasurements(nutritionistId: number, clientId: number) {
    return this.http.get<any>(`${API_URL_NUTR}/${nutritionistId}/clients/${clientId}/measurements/`);
  }

  crudClientMeasurementRequest(method: string, nutritionistId: number, clientId: number, measurementType: string, measurementId?: number,  measurementObj?: any) {
    switch (method) {
      case 'post':
        return this.http.post<any>(`${API_URL_NUTR}/${nutritionistId}/clients/${clientId}/measurements/${measurementType}/`, measurementObj);
      case 'get':
        return this.http.get<any>(`${API_URL_NUTR}/${nutritionistId}/clients/${clientId}/measurements/${measurementType}/${measurementId}`);
      case 'patch':
        return this.http.patch<any>(`${API_URL_NUTR}/${nutritionistId}/clients/${clientId}/measurements/${measurementType}/${measurementId}`, measurementObj);
      case 'delete':
        return this.http.delete<any>(`${API_URL_NUTR}/${nutritionistId}/clients/${clientId}/measurements/${measurementType}/${measurementId}`);
      default:
        throw new Error(`Invalid method: ${method}`);
      }
  }

  getAllUserMeasurementDetails(){
    this.getAllUserMeasurements(this.normalUser.id).subscribe({
      next: (response) => {
        this.bodyMeasurements.set(response.body_measurements);
        this.segmentalBodyMeasurements.set(response.segmental_body_measurements);
        this.biochemicalMeasurements.set(response.biochemical_measurements);
        this.diseases.set(response.diseases);
        this.diets.set(response.diet);
      },
      error: (error) => {
        console.error('Error getting user measurements', error);
      },
    });
  }

  getAllClientMeasurementDetails(){
    this.getAllClientMeasurements(this.nutritionist.id, this.currentClient.id).subscribe({
      next: (response) => {
        this.bodyMeasurements.set(response.body_measurements);
        this.segmentalBodyMeasurements.set(response.segmental_body_measurements);
        this.biochemicalMeasurements.set(response.biochemical_measurements);
        this.diseases.set(response.diseases);
        this.diets.set(response.diet);
      },
      error: (error) => {
        console.error('Error getting client measurements', error);
      },
    });
  }
}