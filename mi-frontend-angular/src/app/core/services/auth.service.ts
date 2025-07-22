import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  //login
 login(email: string, password: string) {
  return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
    tap(response => {
      console.log('Login response:', response);
      localStorage.setItem('token', response.token);
    })
  );
}
  
  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserActive() {
  return this.http.get(`${this.apiUrl}/user`);
}
}

