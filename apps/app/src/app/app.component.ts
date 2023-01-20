import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/login-pages/homepage/homepage.component';
import { PokemonsPageComponent } from './pages/pokedex-page/pokedex-page.component'
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
	standalone: true,
	selector: 'poke-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	imports: [
		CommonModule,
		RouterModule,
		NavbarComponent,
		HuntComponent,
		PokemonsPageComponent,
		ProfileComponent,
		HomePageComponent,
		AsyncPipe,
	],
})
export class AppComponent {
	title = 'app';

	isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
	constructor(private readonly auth: AuthService) {}

	logout() {
		this.auth.signOut()
	}
}
