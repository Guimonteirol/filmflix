import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'; // Ativar guard

// Ativar guard
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login'])

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'perfil',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin) // Ativar guard
  },
  {
    path: 'movie/:id', // :id informa que a rota é dinâmica
    component: MovieDetailComponent,
  },
  {
    path: 'tv/:id', // :id informa que a rota é dinâmica
    component: TvDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
