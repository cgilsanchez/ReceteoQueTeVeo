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
    return this.http.get<any>(`${this.apiUrl}?populate=chef`);
  }

  // Guardar o actualizar una receta
  saveRecipe(recipe: any): Observable<any> {
    const payload = {
      data: {
        name: recipe.name,
        ingredients: recipe.ingredients,
        descriptions: recipe.descriptions,
        chef: recipe.chef, // ID del chef
      },
    };

    if (recipe.id) {
      // Actualizar receta existente
      return this.http.put(`${this.apiUrl}/${recipe.id}`, payload);
    } else {
      // Crear nueva receta
      return this.http.post(this.apiUrl, payload);
    }
  }

  // Eliminar una receta
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
