import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChefService, Chef } from '../../service/chefs.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() recipe: any = {
    name: '',
    ingredients: '',
    description: '',
    chef: null, // ID del chef asignado
  };
  chefs: Chef[] = []; // Lista de chefs disponibles

  constructor(
    private modalController: ModalController,
    private chefService: ChefService
  ) {}

  ngOnInit() {
    // Cargar la lista de chefs al abrir el modal
    this.chefService.getChefs().subscribe((data) => {
      this.chefs = data;
    });
  }

  close() {
    this.modalController.dismiss();
  }

  saveRecipe() {
    // Aquí envías los datos de la receta, incluyendo el chef seleccionado
    console.log(this.recipe);
    this.modalController.dismiss(this.recipe);
  }
}
