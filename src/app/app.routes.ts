import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { LoginComponent } from './pages/login/login';
import { MatchComponent } from './pages/match/match';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'cadastro', component: CadastroComponent},
  {path: 'login', component: LoginComponent },
  {path: 'match', component: MatchComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'home' }
];
