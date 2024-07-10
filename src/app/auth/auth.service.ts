import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  httpClient = inject(HttpClient);

  constructor(private router: Router) {
  }

  signup(data: any) {
    return this.httpClient.post(`${this.url}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.url}/login`, data)
      .pipe(tap((result: any) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('role', result.role);
      }));
  }

  loginVolunteer(data: any) {
    return this.httpClient.post(`${this.url}/volunteer-login`, data)
      .pipe(tap((result: any) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('role', result.role);
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('shelterId');
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
