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
  recipes: any[] = [];

  constructor(
    private recipesService: RecipesService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipesService.getRecipes().subscribe({
      next: (res) => {
        this.recipes = res.data.map((item: any) => ({
          id: item.id,
          ...item.attributes,
        }));
      },
      error: (err) => console.error('Error al cargar recetas:', err),
    });
  }

  async openModal(recipe: any = null) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        recipe: recipe ? { ...recipe } : { name: '', ingredients: '', descriptions: '' },
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadRecipes();
      }
    });

    return await modal.present();
  }

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
