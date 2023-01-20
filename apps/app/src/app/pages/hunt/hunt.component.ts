import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ballsStats } from './models/pokeball';
import { ProfileService } from './hunt.service';
import { PokeUser } from '../../models/user';

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

	profile$: Observable<PokeUser | null>;

	constructor(private readonly profileService: ProfileService) {
		this.profile$ = this.profileService.getProfile();
	}

	selectBall(selection: "pokeball" | "superball" | "ultraball" | "masterball" ) {
		this.selectedBall = selection
	}

	toggleHunt() {
		this.huntStarted = !this.huntStarted
	}
}
