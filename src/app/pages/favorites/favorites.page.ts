import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites(); // Recargar al entrar a la página
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(recipeId: number) {
    this.favoritesService.removeFavorite(recipeId);
    this.loadFavorites();
  }
}
