import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: any; // Recibe la receta como entrada
  @Output() edit = new EventEmitter<void>(); // Emite un evento al editar
  @Output() delete = new EventEmitter<void>(); // Emite un evento al borrar

  editRecipe() {
    this.edit.emit(); // Emite el evento para que el componente padre maneje la edición
  }

  deleteRecipe() {
    this.delete.emit(); // Emite el evento para que el componente padre maneje el borrado
  }
}
