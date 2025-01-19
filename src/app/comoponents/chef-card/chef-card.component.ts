import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'src/app/service/translation.service';

@Component({
  selector: 'app-chef-card',
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.scss'],
})
export class ChefCardComponent {
  @Input() chef: any; // Datos del chef
  @Output() edit = new EventEmitter<void>(); // Evento para editar
  @Output() delete = new EventEmitter<void>(); // Evento para borrar

  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  onEdit() {
    this.edit.emit(); // Emite evento de edición
  }

  onDelete() {
    this.delete.emit(); // Emite evento de eliminación
  }
}
