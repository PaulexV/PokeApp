import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	imports: [CommonModule],
	standalone: true,
	selector: 'poke-app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
