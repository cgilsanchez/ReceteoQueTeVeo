import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/service/translation.service';

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.scss'],
})
export class RecipeDetailModalComponent {
  @Input() recipe: any; // Recibe la receta seleccionada

  constructor(private modalController: ModalController, public translationService: TranslationService) {}

  close() {
    this.modalController.dismiss();
  }
}
