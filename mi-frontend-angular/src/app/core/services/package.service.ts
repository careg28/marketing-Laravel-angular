import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/packages`;

  getAll(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }
  getById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }
  create(payload: Partial<Package>): Observable<Package> {
    return this.http.post<Package>(this.apiUrl, payload);
  }
  update(id: number, payload: Partial<Package>): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/${id}`, payload);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
