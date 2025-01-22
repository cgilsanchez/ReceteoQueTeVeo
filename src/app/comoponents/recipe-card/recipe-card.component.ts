import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavoritesService } from '../../service/favorites.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: any; 
  @Output() openDetail = new EventEmitter<any>(); 
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>(); 

  constructor(private favoritesService: FavoritesService) {}

  // Método para alternar favoritos
  toggleFavorite(event: Event) {
    event.stopPropagation();
    if (this.isFavorite(this.recipe.id)) {
      this.favoritesService.removeFavorite(this.recipe.id);
    } else {
      this.favoritesService.addFavorite(this.recipe);
    }
  }

  // Verificar si es favorito
  isFavorite(recipeId: number): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  // Emitir el evento para abrir detalle
  openRecipeDetail() {
    this.openDetail.emit(this.recipe);
  }

  // Editar receta
  editRecipe(event: Event) {
    event.stopPropagation(); 
    this.edit.emit(this.recipe);
  }

  // Eliminar receta
  deleteRecipe(event: Event) {
    event.stopPropagation(); 
    this.delete.emit(this.recipe.id);
  }
}
