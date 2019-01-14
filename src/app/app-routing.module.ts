import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FilmsComponent } from './shared/films/films.component';
import { AuthGuard } from './auth/auth-guard.service';
import { UserComponent } from './auth/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'films', component: FilmsComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard]},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
