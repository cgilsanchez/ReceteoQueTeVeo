import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesService } from '../../service/recipes.service';
import { ModalComponent } from '../../comoponents/modal/modal.component';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage {
  recipes: any[] = []; // Lista de recetas

  constructor(
    private recipesService: RecipesService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.loadRecipes();
  }

  // Cargar todas las recetas
  loadRecipes() {
    this.recipesService.getRecipes().subscribe({
      next: (res) => {
        this.recipes = res.data.map((item: any) => ({
          id: item.id,
          ...item.attributes,
          chef: item.attributes.chef?.data
            ? {
                id: item.attributes.chef.data.id,
                ...item.attributes.chef.data.attributes,
              }
            : null, // Si no hay chef asignado, será null
        }));
      },
      error: (err) => console.error('Error al cargar recetas:', err),
    });
  }
  

  // Abrir el modal para crear o editar recetas
  async openModal(recipe: any = null) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        recipe: recipe
          ? { ...recipe }
          : { name: '', ingredients: '', descriptions: '', chef: null },
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.saveRecipe(result.data); // Guardar la receta
      }
    });

    return await modal.present();
  }

  // Guardar o actualizar receta
  saveRecipe(recipe: any) {
    this.recipesService.saveRecipe(recipe).subscribe({
      next: () => {
        console.log('Receta guardada con éxito');
        this.loadRecipes(); // Recargar la lista de recetas
      },
      error: (err) => console.error('Error al guardar receta:', err),
    });
  }

  // Eliminar una receta
  deleteRecipe(id: number) {
    this.recipesService.deleteRecipe(id).subscribe({
      next: () => {
        console.log('Receta eliminada con éxito');
        this.loadRecipes();
      },
      error: (err) => console.error('Error al eliminar receta:', err),
    });
  }
}
