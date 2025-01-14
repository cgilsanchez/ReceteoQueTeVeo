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
    this.chefService.getChefs().subscribe((res) => {
      this.chefs = res.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
    });
  }
  
  close() {
    this.modalController.dismiss();
  }

  saveRecipe() {
    // Emitir los datos de la receta al cerrarse
    if (this.recipe.name && this.recipe.ingredients && this.recipe.chef) {
      console.log('Guardando receta:', this.recipe);
      this.modalController.dismiss(this.recipe); // Devuelve la receta al llamador
    } else {
      alert('Por favor, completa todos los campos antes de guardar.');
    }
  }
  
}
