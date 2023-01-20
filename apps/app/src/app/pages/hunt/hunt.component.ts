import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ballsStats } from './models/pokeball';
import { HuntService, ProfileService } from './hunt.service';
import { PokeUser } from '../../models/user';
import { EncounteredPokemon } from './models/encounteredPkmn';

@Component({
	selector: 'poke-app-hunt',
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	templateUrl: './hunt.component.html',
	styleUrls: ['./hunt.component.css'],
})
export class HuntComponent {
	huntStarted = false;
	ballsStats = ballsStats;

	selectedBall: 'pokeball' | 'superball' | 'ultraball' | 'masterball' = 'pokeball';

	profile$: Observable<PokeUser | null>;
	currentPkmn: EncounteredPokemon | undefined;

	constructor(private readonly profileService: ProfileService, private readonly huntService: HuntService) {
		this.profile$ = this.profileService.getProfile();
	}

	selectBall(selection: 'pokeball' | 'superball' | 'ultraball' | 'masterball') {
		this.selectedBall = selection;
	}

	toggleHunt() {
		this.huntStarted = !this.huntStarted;

		if (this.huntStarted) {
			const randomPkmn = this.huntService.getRandomPokemon();
			randomPkmn.subscribe((val) => {
				this.currentPkmn = val;
			});
		} else {
			this.currentPkmn = undefined;
		}
	}
}
