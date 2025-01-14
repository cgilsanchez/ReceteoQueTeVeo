import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: any; // Recibe una receta desde el padre
  @Output() edit = new EventEmitter<any>(); // Emite un evento para editar
  @Output() delete = new EventEmitter<number>(); // Emite un evento para eliminar

  // Método para emitir el evento de edición
  editRecipe() {
    this.edit.emit(this.recipe);
  }

  // Método para emitir el evento de eliminación
  deleteRecipe() {
    this.delete.emit(this.recipe.id);
  }
}
