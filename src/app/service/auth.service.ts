import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`; // Enlace base para la autenticación
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Método para login
  login(identifier: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/local`, { identifier, password });
  }

  // Método para registro
  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/local/register`, { username, email, password });
  }

  // Guardar el token
  async setToken(token: string): Promise<void> {
    console.log('Guardando token:', token);
    await this._storage?.set('token', token);
  }

  // Obtener el token
  async getToken(): Promise<string | null> {
    const token = await this._storage?.get('token');
    console.log('Token recuperado:', token);
    return token;
  }

  // Verificar si está autenticado
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    console.log('Token recuperado:', token);
    return !!token; // Retorna true si el token existe
  }
  

  // Eliminar el token (logout)
  async logout(): Promise<void> {
    console.log('Cerrando sesión');
    await this._storage?.remove('token'); // Eliminar token del almacenamiento
  }
}
