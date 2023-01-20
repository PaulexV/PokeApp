import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { from, Observable, take } from 'rxjs';
import { ballsStats } from './models/pokeball';
import { HuntService } from './hunt.service';
import { PokeUser } from '../../models/user';
import { cooldownTexts } from './models/cooldownTexts';
import { formatCooldown, getCooldownSeconds, getTimestampWithAddedSeconds } from '../../utils/timeUtils';
import { Timestamp } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';

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



	selectedBall: "pokeball" | "superball" | "ultraball" | "masterball" = "pokeball"

	profile$: Observable<PokeUser | null>;

	constructor(private readonly huntService: HuntService) {
		this.profile$ = this.huntService.getProfile();
		this.updateCooldown()
	}

	selectBall(selection: "pokeball" | "superball" | "ultraball" | "masterball" ) {
		this.selectedBall = selection
	}

	startHunt() {
		this.profile$.pipe(take(1)).subscribe(user => {
			if (!user) return
			if (user.energy >= 1) {
				this.huntStarted = true
				if (user.energy === 10) { user.cooldown.energy = getTimestampWithAddedSeconds(5 * 60) }
				user.energy -= 1
				this.huntService.updateEnergy(user)
			}
		})
		
	}

	toggleHunt() {
		this.huntStarted = !this.huntStarted
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
						this.huntService.updateEnergy(user)
					}
					this.cooldownTexts.energy = formatCooldown(interval)
					
				}
			})
		}, 1000)
	}
}
