import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ballsStats } from './models/pokeball';

@Component({
	selector: 'poke-app-hunt',
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	templateUrl: './hunt.component.html',
	styleUrls: ['./hunt.component.css'],
})
export class HuntComponent {
	huntStarted = true
	ballsStats = ballsStats

	selectedBall: "pokeball" | "superball" | "ultraball" | "masterball" = "pokeball"

	constructor(private readonly auth: AuthService) {}

	selectBall(selection: "pokeball" | "superball" | "ultraball" | "masterball" ) {
		this.selectedBall = selection
	}

	toggleHunt() {
		this.huntStarted = !this.huntStarted
	}
}
