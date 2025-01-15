import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: any[] = []; // Lista de recetas favoritas

  // Obtener todas las recetas favoritas
  getFavorites() {
    return this.favorites;
  }

  // Agregar receta a favoritos
  addFavorite(recipe: any) {
    const exists = this.favorites.find((fav) => fav.id === recipe.id);
    if (!exists) {
      this.favorites.push(recipe);
    }
  }

  // Eliminar receta de favoritos
  removeFavorite(recipeId: number) {
    this.favorites = this.favorites.filter((fav) => fav.id !== recipeId);
  }

  // Comprobar si una receta está en favoritos
  isFavorite(recipeId: number): boolean {
    return this.favorites.some((fav) => fav.id === recipeId);
  }
}
