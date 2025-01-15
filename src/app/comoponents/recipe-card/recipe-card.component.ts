import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavoritesService } from '../../service/favorites.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: any; // Recibe una receta desde el padre
  @Output() edit = new EventEmitter<any>(); // Emite un evento para editar
  @Output() delete = new EventEmitter<number>(); // Emite un evento para eliminar

  constructor(private favoritesService: FavoritesService) {}

  // Método para emitir el evento de edición
  editRecipe() {
    this.edit.emit(this.recipe);
  }

  // Método para emitir el evento de eliminación
  deleteRecipe() {
    this.delete.emit(this.recipe.id);
  }

  // Método para alternar favoritos
  toggleFavorite() {
    if (this.isFavorite(this.recipe.id)) {
      this.favoritesService.removeFavorite(this.recipe.id);
    } else {
      this.favoritesService.addFavorite(this.recipe);
    }
  }

  // Método para verificar si es favorito
  isFavorite(recipeId: number): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }
}
