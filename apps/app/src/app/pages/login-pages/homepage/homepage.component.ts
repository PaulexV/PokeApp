import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
	standalone: true,
	selector: 'poke-app-home-page',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.css'],
	imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, HeaderComponent],
})
export class HomePageComponent {}
