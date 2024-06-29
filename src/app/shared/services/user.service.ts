import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, Credentials, LoggedInUser, RegisterUser } from '../interfaces/user';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  user = signal<LoggedInUser | null>(null);



  // Enables auto-login if the user has a valid access token
  constructor() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.getLoggedInUserInfo().subscribe({
        next: (response) => {
          this.user.set(response as LoggedInUser);
        },
        error: (error) => {
          console.error('Error getting user info', error);
        }
      });
    }
  }

  registerUser(user: RegisterUser) {
    return this.http.post<{access: string, refresh: string, user: LoggedInUser}>(`${API_URL}/auth/registration/`, user)
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{access: string, refresh: string, user: LoggedInUser}>(`${API_URL}/auth/login/`, credentials)
  }

  getAccessTokens(credentials: Credentials) {
    return this.http.post<{access: string, refresh: string}>(`${API_URL}/token/`, credentials)
  }

  refreshToken() {
    return this.http.post<{access: string, refresh: string}>(`${API_URL}/token/refresh/`, {refresh: localStorage.getItem('refreshToken')})
  }

  getLoggedInUserInfo() {
    return this.http.get<LoggedInUser>(`${API_URL}/auth/user/`)
  }

  getAllUsers() {
    return this.http.get<User[]>(`${API_URL}/users/`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }
}