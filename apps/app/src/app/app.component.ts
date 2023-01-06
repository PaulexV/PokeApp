import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HuntComponent } from './pages/hunt/hunt.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/login-pages/homepage/homepage.component';

@Component({
	standalone: true,
	selector: 'poke-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	imports: [RouterModule, NavbarComponent, HuntComponent, PokedexComponent, ProfileComponent, HomePageComponent],
})
export class AppComponent {
	title = 'app';
}
