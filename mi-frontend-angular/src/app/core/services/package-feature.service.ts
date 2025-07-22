import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PackageFeature } from '../models/package-feature.model';
import { environment } from '../../environments/enviroment';


@Injectable({ providedIn: 'root' })
export class PackageFeatureService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/package-features`;

  getAll(): Observable<PackageFeature[]> {
    return this.http.get<PackageFeature[]>(this.apiUrl);
  }

  getById(id: number): Observable<PackageFeature> {
    return this.http.get<PackageFeature>(`${this.apiUrl}/${id}`);
  }

  create(payload: Partial<PackageFeature>): Observable<PackageFeature> {
    return this.http.post<PackageFeature>(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<PackageFeature>): Observable<PackageFeature> {
    return this.http.put<PackageFeature>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

