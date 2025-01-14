import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chef-card',
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.scss'],
})
export class ChefCardComponent {
  @Input() chef: any; // Datos del chef que se mostrarán
  @Output() edit = new EventEmitter<void>(); // Emite un evento para editar el chef
  @Output() delete = new EventEmitter<void>(); // Emite un evento para eliminar el chef

  onEdit() {
    this.edit.emit(); // Emite el evento de edición
  }

  onDelete() {
    this.delete.emit(); // Emite el evento de eliminación
  }
}
