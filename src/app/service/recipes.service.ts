import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private apiUrl = 'http://localhost:1337/api/recetas'; // URL del endpoint de recetas

  constructor(private http: HttpClient) {}

  // Obtener todas las recetas con la relación 'chef' poblada
  getRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?populate=chef,image`);
  }

  // Guardar o actualizar una receta
  saveRecipeWithImage(formData: FormData, id?: number): Observable<any> {
    if (id) {
      // Si hay un ID, realiza una actualización
      return this.http.put(`${this.apiUrl}/${id}`, formData);
    } else {
      // Si no hay ID, realiza una creación
      return this.http.post(this.apiUrl, formData);
    }
  }
  

  // Eliminar una receta
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
