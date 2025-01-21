import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../service/favorites.service';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(recipeId: number) {
    if (confirm(this.translationService.getTranslation('FAVORITES.CONFIRM_DELETE'))) {
      this.favoritesService.removeFavorite(recipeId);
      this.loadFavorites();
    }
  }
}
