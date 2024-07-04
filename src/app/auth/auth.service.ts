import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080';
  // baseUrl = 'https://shelterhub-api.koyeb.app';

  constructor(private router: Router) { }

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result: any) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        localStorage.setItem('access_token', JSON.stringify(result.token));
        localStorage.setItem('role', JSON.stringify(result.role));
      }));
  }

  loginVolunteer(data: any) {
    return this.httpClient.post(`${this.baseUrl}/volunteer-login`, data)
      .pipe(tap((result: any) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        localStorage.setItem('access_token', JSON.stringify(result.token));
        localStorage.setItem('role', JSON.stringify(result.role));
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  isAdmin() {
    const user = JSON.parse(<string>localStorage.getItem('authUser'));
    return user && user.role === 'ADMIN';
  }

  isUser() {
    const user = JSON.parse(<string>localStorage.getItem('authUser'));
    return user && user.role === 'FUNCTIONARY';
  }

  isVolunteer() {
    const user = JSON.parse(<string>localStorage.getItem('authUser'));
    return user && user.role === 'VOLUNTEER';
  }
}
