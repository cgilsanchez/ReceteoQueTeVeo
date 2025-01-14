import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChefService, Chef } from '../../service/chefs.service';
import { RecipesService } from '../../service/recipes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() recipe: any = {
    name: '',
    ingredients: '',
    descriptions: '',
    chef: null,
    image: null, // Para almacenar la imagen seleccionada
  };

  chefs: Chef[] = [];
  selectedFile: File | null = null; // Archivo seleccionado

  constructor(
    private modalController: ModalController,
    private chefService: ChefService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
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

  // Manejar la selección de archivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  saveRecipe() {
    if (this.recipe.name && this.recipe.ingredients && this.recipe.descriptions && this.recipe.chef) {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          name: this.recipe.name,
          ingredients: this.recipe.ingredients,
          descriptions: this.recipe.descriptions,
          chef: this.recipe.chef,
        })
      );

      if (this.selectedFile) {
        formData.append('files.image', this.selectedFile); // Adjuntar imagen
      }

      this.recipesService.saveRecipeWithImage(formData).subscribe({
        next: (res) => {
          console.log('Receta guardada:', res);
          this.modalController.dismiss(true); // Indicar que hay cambios
        },
        error: (err) => {
          console.error('Error al guardar la receta:', err);
        },
      });
    } else {
      alert('Por favor, completa todos los campos antes de guardar.');
    }
  }
}
