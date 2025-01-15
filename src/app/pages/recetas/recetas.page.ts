import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesService } from '../../service/recipes.service';
import { ModalComponent } from '../../comoponents/modal/modal.component';
import { FavoritesService } from 'src/app/service/favorites.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage {
  recipes: any[] = []; // Lista de recetas

  constructor(
    private recipesService: RecipesService,
    private modalCtrl: ModalController, // Usar modalCtrl como nombre coherente
    private favoritesService: FavoritesService
  ) {}

  // Cargar las recetas al entrar a la página
  ionViewWillEnter(): void {
    this.loadRecipes();
  }

  // Cargar todas las recetas
  loadRecipes(): void {
    this.recipesService.getRecipes().subscribe({
      next: (res) => {
        this.recipes = res.data
          .map((item: any) => ({
            id: item.id,
            ...item.attributes,
            chef: item.attributes.chef?.data
              ? {
                  id: item.attributes.chef.data.id,
                  name: item.attributes.chef.data.attributes.name,
                }
              : null,
            image: item.attributes.image?.data
              ? item.attributes.image.data.attributes.url
              : null,
          }))
          .filter(
            (recipe: any) =>
              recipe.name && recipe.ingredients && recipe.descriptions
          );
      },
      error: (err) => console.error('Error al cargar recetas:', err),
    });
  }
  

  // Abrir el modal para crear o editar recetas
  async openModal(recipe: any = null): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { recipe: { ...recipe } }, // Pasar la receta actual
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.role === 'saved' && result.data) {
        const updatedRecipe = result.data;
    
        // Encuentra la receta en la lista y actualiza sus datos
        const index = this.recipes.findIndex((r) => r.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes[index] = updatedRecipe; // Actualiza la receta existente
        } else {
          // Si es una nueva receta, añádela a la lista
          this.recipes.push(updatedRecipe);
        }
      }
    });
    
    
    await modal.present();
  }
  
  


  // Eliminar una receta
  deleteRecipe(id: number): void {
    this.recipesService.deleteRecipe(id).subscribe({
      next: () => {
        console.log('Receta eliminada con éxito');
        this.recipes = this.recipes.filter((recipe) => recipe.id !== id); // Eliminar de la lista sin recargar
      },
      error: (err) => console.error('Error al eliminar receta:', err),
    });
  }

  // Verificar si una receta es favorita
  isFavorite(recipeId: number): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  // Alternar el estado de favorito de una receta
  toggleFavorite(recipeId: number): void {
    if (this.isFavorite(recipeId)) {
      this.favoritesService.removeFavorite(recipeId);
    } else {
      this.favoritesService.addFavorite(recipeId);
    }
  }
}
