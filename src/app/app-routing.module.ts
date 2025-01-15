import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'recetas',
    loadChildren: () =>
      import('./pages/recetas/recetas.module').then((m) => m.RecetasPageModule),
    canActivate: [AuthGuard], // Protegido por el guard
  },
  {
    path: 'chefs',
    loadChildren: () =>
      import('./pages/chef/chef.module').then((m) => m.ChefPageModule),
    canActivate: [AuthGuard], // Protegido por el guard
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioPageModule),
    canActivate: [AuthGuard], // Protegido por el guard
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites/favorites.module').then((m) => m.FavoritesPageModule),
    canActivate: [AuthGuard], // Protegido por el guard
  },
  {
    path: '',
    redirectTo: 'recetas',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
