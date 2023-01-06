import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@Component({
	standalone: true,
	imports: [
		RouterModule,
		NavbarComponent,
		HomeComponent,
		HuntComponent,
		PokedexComponent,
		ProfileComponent,
		LoginPageComponent,
	],
	selector: 'poke-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'app';
}
