import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
	selector: 'poke-app-pokedex',
	standalone: true,
	imports: [CommonModule, HeaderComponent],
	templateUrl: './pokedex.component.html',
	styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent {}
