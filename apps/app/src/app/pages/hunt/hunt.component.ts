import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable, take } from 'rxjs';
import { ballsStats } from './models/pokeball';
import { HuntService } from './hunt.service';
import { PokeUser } from '../../models/user';
import { EncounteredPokemon } from './models/encounteredPkmn';
import { cooldownTexts } from './models/cooldownTexts';
import { formatCooldown, getCooldownSeconds, getTimestampWithAddedSeconds } from '../../utils/timeUtils';

@Component({
	selector: 'poke-app-hunt',
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	templateUrl: './hunt.component.html',
	styleUrls: ['./hunt.component.css'],
})
export class HuntComponent {
	huntStarted = false
	ballsStats = ballsStats
	cooldownTexts: cooldownTexts = {
		pokeball: "",
		superball: "",
		ultraball: "",
		masterball: "",
		energy: ""
	}

	selectedBall: 'pokeball' | 'superball' | 'ultraball' | 'masterball' = 'pokeball';

	pokemonLog = ''

	profile$: Observable<PokeUser | null>;
	currentPkmn: EncounteredPokemon | undefined;

	capturing = false
	captured = false

	constructor(private readonly huntService: HuntService) {
		this.profile$ = this.huntService.getProfile();
		this.updateCooldown()
	}

	selectBall(selection: 'pokeball' | 'superball' | 'ultraball' | 'masterball') {
		this.selectedBall = selection;
	}

	startHunt() {
		this.profile$.pipe(take(1)).subscribe(user => {
			if (!user) return
			if (user.energy >= 1) {
				const randomPkmn = this.huntService.getRandomPokemon();
				randomPkmn.subscribe((val) => {
					this.huntStarted = true
					this.currentPkmn = val;
					this.pokemonLog = `A wild ${this.currentPkmn.name} appeared !`
					!user.encountered.includes(this.currentPkmn.pokedexId) && user.encountered.push(this.currentPkmn.pokedexId)

					if (user.energy === 10) { user.cooldown.energy = getTimestampWithAddedSeconds(5 * 60) }
					user.energy -= 1
					this.huntService.updateHuntStart(user)
				});
			}
		})		
	}

	stopHunt() {
		this.huntStarted = !this.huntStarted;
		this.currentPkmn = undefined;
		this.capturing = false
		this.captured = false
	}

	capture() {
		this.capturing = true

		const pokemonCaptured = Math.random() <= this.ballsStats[this.selectedBall].catchrate/100
		const pokemonRan = Math.random() <= 0.25
		this.profile$.pipe(take(1)).subscribe(user => {
			if (!user) return
			user.inventory[this.selectedBall] -= 1
			if (pokemonCaptured) {
				user.captured.push(this.currentPkmn?.pokedexId as number)
			}
			this.huntService.updateCapture(user)
		})

		setTimeout(() => {
			if (pokemonCaptured) {
				this.pokemonLog = `${this.currentPkmn?.name} has been captured !`
				this.captured = true
				setTimeout(() => this.stopHunt(), 2000)

			} else {
				this.pokemonLog = `${this.currentPkmn?.name} broke free !`
				if(pokemonRan) {
					setTimeout(() => {
						this.pokemonLog = `${this.currentPkmn?.name} escaped !`
						setTimeout(() => this.stopHunt(), 2000)
					}, 2000)
				} else {
					this.capturing = false
				}
			}
		}, Math.random() * 3000 + 1000)
	}

	updateCooldown() {
		setInterval(()=> {
			this.profile$.subscribe(user => {
				if (user) {
					(["pokeball", "superball", "ultraball", "masterball"] as ("pokeball" | "superball" | "ultraball" | "masterball")[])
					.forEach(b => {
						let interval = getCooldownSeconds(user.cooldown[b])
						if (interval < 0) {
							while (interval < 0) {
								interval += this.ballsStats[b].cooldown * 60
								user.inventory[b] += 1
							}
							user.cooldown[b] = getTimestampWithAddedSeconds(interval)
							this.huntService.updatePokeballsAndCooldowns(user)
						}
						this.cooldownTexts[b] = formatCooldown(interval)
					})

					let interval = getCooldownSeconds(user.cooldown.energy)
					if (interval < 0) {
						while(interval < 0) {
							interval += 5*60
							if (user.energy < 10) user.energy += 1
						}
						user.cooldown.energy = getTimestampWithAddedSeconds(interval)
						this.huntService.updateHuntStart(user)
					}
					this.cooldownTexts.energy = formatCooldown(interval)
					
				}
			})
		}, 1000)
	}
}
