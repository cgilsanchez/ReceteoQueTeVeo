import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chef {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private baseUrl = 'http://localhost:1337/api/chefs'; // Endpoint del API de Strapi

  constructor(private http: HttpClient) {}

  // Obtener todos los chefs
  getChefs(): Observable<{ data: Chef[] }> {
    return this.http.get<{ data: Chef[] }>(this.baseUrl);
  }

  // Crear un chef
  createChef(data: { name: string }): Observable<any> {
    return this.http.post(this.baseUrl, { data });
  }

  // Actualizar un chef
  updateChef(id: number, data: { name: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { data });
  }

  // Eliminar un chef
  deleteChef(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
