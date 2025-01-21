import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChefService, Chef } from '../../service/chefs.service';
import { RecipesService } from '../../service/recipes.service';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() recipe: any = {
    id: null,
    name: '',
    ingredients: '',
    descriptions: '',
    chef: null,
    image: null,
  };

  chefs: Chef[] = [];
  selectedFile: File | null = null;

  constructor(
    private modalController: ModalController,
    private chefService: ChefService,
    private recipesService: RecipesService,
    public translationService: TranslationService
  ) {}

  ngOnInit() {
    this.chefService.getChefs().subscribe((res) => {
      this.chefs = res.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
    });

    if (this.recipe.chef && typeof this.recipe.chef === 'object') {
      this.recipe.chef = this.recipe.chef.id;
    }
  }

  close() {
    this.modalController.dismiss();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  saveRecipe() {
    if (this.recipe.name && this.recipe.ingredients && this.recipe.descriptions) {
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
        formData.append('files.image', this.selectedFile);
      }

      const saveObservable = this.recipe.id
        ? this.recipesService.updateRecipe(this.recipe.id, formData)
        : this.recipesService.saveRecipeWithImage(formData);

      saveObservable.subscribe({
        next: (res) => {
          const updatedRecipe = {
            id: res.data.id,
            ...res.data.attributes,
            chef: res.data.attributes.chef?.data
              ? {
                  id: res.data.attributes.chef.data.id,
                  name: res.data.attributes.chef.data.attributes.name,
                }
              : null,
            image: res.data.attributes.image?.data
              ? res.data.attributes.image.data.attributes.url
              : null,
          };

          this.modalController.dismiss(updatedRecipe, 'saved');
        },
        error: (err) => {
          console.error('Error al guardar la receta:', err);
        },
      });
    } else {
      alert(this.translationService.getTranslation('MODAL.COMPLETE_FIELDS'));
    }
  }
}
