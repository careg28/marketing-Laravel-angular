import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  //login
  login(email: string, password: string) {
    return this.http.post<{ token: string; user: { role: string, name:string } }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.user.role); 
        localStorage.setItem('name', response.user.name);
      })
    );
  }
  
  
  
logout(): Observable<any> {
  return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
    tap(() => localStorage.removeItem('token'))
  );
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

register(data: { name: string; email: string; password: string; password_confirmation: string }) {
  return this.http.post<{ token: string }>(`${this.apiUrl}/registro`, data).pipe(
    tap(response => {
      console.log('Registro exitoso:', response);
      localStorage.setItem('token', response.token);
    })
  );
}

}

