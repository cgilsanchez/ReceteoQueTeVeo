import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'src/app/service/translation.service';

@Component({
  selector: 'app-chef-card',
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.scss'],
})
export class ChefCardComponent {
  @Input() chef: any; 
  @Output() edit = new EventEmitter<void>(); 
  @Output() delete = new EventEmitter<void>(); 

  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  onEdit() {
    this.edit.emit(); 
  }

  onDelete() {
    this.delete.emit(); 
  }
}
