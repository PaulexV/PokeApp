import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-pages/homepage/homepage.component';

@Component({
	standalone: true,
	imports: [NavbarComponent, LoginPageComponent],
	selector: 'poke-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'app';
}
