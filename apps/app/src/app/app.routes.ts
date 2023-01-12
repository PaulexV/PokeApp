import { Route } from '@angular/router';
import { HomePageComponent } from './pages/login-pages/homepage/homepage.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninPageComponent } from './pages/login-pages/signin-page/signin-page.component';
import { LoginPageComponent } from './pages/login-pages/login-page/login-page.component';

export const appRoutes: Route[] = [
	{ path: 'home', component: HomePageComponent },
	{ path: 'pokedex', component: PokedexComponent },
	{ path: 'play', component: HuntComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'register', component: SigninPageComponent },
	{ path: 'login', component: LoginPageComponent },
	{ path: '', component: HomePageComponent },
	{ path: '**', redirectTo: '' },
];
