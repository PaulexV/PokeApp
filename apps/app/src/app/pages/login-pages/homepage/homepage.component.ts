import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	standalone: true,
	imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule],
	selector: 'poke-app-home-page',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.css'],
})
export class LoginPageComponent {}
