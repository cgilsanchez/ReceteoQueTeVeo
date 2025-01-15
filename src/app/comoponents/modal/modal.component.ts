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
    id: null, // Asegúrate de incluir el ID
    name: '',
    ingredients: '',
    descriptions: '',
    chef: null,
    image: null, // Asegúrate de que este campo se pase correctamente
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
  
      // Llamar al servicio con el ID si es una edición
      this.recipesService.saveRecipeWithImage(formData, this.recipe.id).subscribe({
        next: (res) => {
          console.log('Receta guardada:', res);
          this.modalController.dismiss(true); // Cierra el modal y recarga las recetas
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
