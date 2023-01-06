import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { HuntComponent } from "./components/hunt/hunt.component";
import { PokedexComponent } from "./components/pokedex/pokedex.component";
import { ProfileComponent } from "./components/profile/profile.component";

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'pokedex', component: PokedexComponent},
    { path: 'play', component: HuntComponent},
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: ''}
  ];