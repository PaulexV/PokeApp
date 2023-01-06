import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
	selector: 'poke-app-home',
	standalone: true,
	imports: [HeaderComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
