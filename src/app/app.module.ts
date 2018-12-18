import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmsComponent } from './shared/films/films.component';
import { FilmService } from './shared/films/films.service';
import { FilmEditorComponent } from './shared/films/film-editor/film-editor.component';
import { FilterPipe } from './shared/films/filter.pipe';
import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    FilmsComponent,
    FilmEditorComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleSmoothScrollModule,
  ],
  providers: [AuthService, FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
