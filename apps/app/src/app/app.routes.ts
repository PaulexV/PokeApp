import { Route } from '@angular/router';
import { HomePageComponent } from './pages/login-pages/homepage/homepage.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { PokemonsPageComponent } from './pages/pokedex-page/pokedex-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninPageComponent } from './pages/login-pages/signin-page/signin-page.component';
import { LoginPageComponent } from './pages/login-pages/login-page/login-page.component';
import { UnloggedUsersGuard } from './services/unloggedUsersGuard.service';
import { LoggedUsersGuard } from './services/loggedUsersGuard.service';
import { EventsComponent } from './pages/events/events.component';

export const appRoutes: Route[] = [
	{ path: '', component: HomePageComponent, canActivate: [UnloggedUsersGuard] },
	{ path: 'home', component: HomePageComponent, canActivate: [UnloggedUsersGuard] },
	{ path: 'pokedex', component: PokemonsPageComponent, canActivate: [LoggedUsersGuard] },
	{ path: 'play', component: HuntComponent, canActivate: [LoggedUsersGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [LoggedUsersGuard] },
	{ path: 'register', component: SigninPageComponent, canActivate: [UnloggedUsersGuard] },
	{ path: 'login', component: LoginPageComponent, canActivate: [UnloggedUsersGuard] },
	{ path: 'events', component: EventsComponent, canActivate: [LoggedUsersGuard] },
	{ path: '**', redirectTo: '' },
];
