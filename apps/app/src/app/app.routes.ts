import { Route } from '@angular/router';
import { HomePageComponent } from './pages/login-pages/homepage/homepage.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const appRoutes: Route[] = [
	{ path: '', component: HomePageComponent },
	{ path: 'home', component: HomePageComponent },
	{ path: 'pokedex', component: PokedexComponent },
	{ path: 'play', component: HuntComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: '**', redirectTo: '' },
];
