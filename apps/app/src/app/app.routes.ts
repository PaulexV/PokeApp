import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const appRoutes: Route[] = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'pokedex', component: PokedexComponent },
	{ path: 'play', component: HuntComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: '**', redirectTo: '' },
];
