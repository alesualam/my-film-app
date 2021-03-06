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
import { FilmsComponent } from './shared/films/films.component';
import { FilmService } from './shared/films/films.service';
import { FilmEditorComponent } from './shared/films/film-editor/film-editor.component';

import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll';
import { FilterPipe } from './shared/filter.pipe';
import { DataStorageService } from './shared/data-storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AuthInterceptor } from "./shared/auth.interceptor";
import { NotificationsComponent } from './core/notifications/notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from './shared/images.service';
import { UserComponent } from './auth/user/user.component';
import { UserService } from './auth/user/user.service';
import { StatsComponent } from './auth/user/stats/stats.component';
import { StatsService } from './auth/user/stats/stats.service';
import { GamesComponent } from './shared/games/games.component';
import { GameService } from './shared/games/games.service';


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
    NotificationsComponent,
    UserComponent,
    StatsComponent,
    GamesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleSmoothScrollModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ChartsModule,
  ],
  providers: [AuthService, FilmService, DataStorageService, 
    ImagesService, UserService, StatsService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
