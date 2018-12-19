import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilmsComponent } from "./films.component";
import { FilmEditorComponent } from "./film-editor/film-editor.component";
// import { AuthGuard } from "../auth/auth-guard.service";

const filmsRoutes: Routes = [
    { path: '', component: FilmsComponent, children: [
        { path: 'new', component: FilmEditorComponent },
        { path: ':id/edit', component: FilmEditorComponent },
    ] },
]

@NgModule({
    imports: [
        RouterModule.forChild(filmsRoutes)
    ],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}