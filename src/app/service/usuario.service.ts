import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:1337/users'; // URL de la API de usuarios en Strapi

  constructor(private http: HttpClient) {}

  // Obtener el usuario autenticado
  obtenerUsuarioAutenticado(): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperamos el token JWT almacenado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:1337/users/me', { headers });
  }

  // Actualizar los datos del usuario
  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }
}
