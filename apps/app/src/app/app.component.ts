import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HuntComponent } from './components/hunt/hunt.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@Component({
  standalone: true,
  imports: [RouterModule, 
    NavbarComponent, 
    HomeComponent, 
    HuntComponent, 
    PokedexComponent, 
    ProfileComponent, 
    LoginPageComponent],
  selector: 'poke-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'app';
}
