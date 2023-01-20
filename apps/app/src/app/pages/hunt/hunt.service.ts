import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { PokeUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { EncounteredPokemon } from './models/encounteredPkmn';

@Injectable({
    providedIn: 'root',
  })
  export class HuntService {
    constructor(
      private readonly authService: AuthService,
      private readonly firestore: Firestore,
	  private readonly httpService: HttpClient,
    ) {}
  
    getProfile(): Observable<PokeUser | null> {
      return this.authService.user$.pipe(
        switchMap((user) => {
          if (user) {
            const id = user?.uid;
            return this.getProfileData(id);
          }
          return of(null);
        })
      );
    }
  
    private getProfileData(userId: string): Observable<PokeUser> {
      const profile = doc(this.firestore, `users/${userId}`);
      return docData(profile) as Observable<PokeUser>;
    }

	getRandomNumberId() {
		return Math.floor(Math.random() * 898);
	}

	getRandomPokemon() {
		const random = this.getRandomNumberId();

		return this.httpService
			.get<EncounteredPokemon>(`https://pokebuildapi.fr/api/v1/pokemon/${random}`, {
				headers: { Accept: 'application/json' },
			})
			.pipe(
				map((Response) => ({
					id: Response.id,
					pokedexId: Response.pokedexId,
					name: Response.name,
					image: Response.image,
				}))
			);
	}

    updatePokeballsAndCooldowns(user: PokeUser) {
      updateDoc(doc(this.firestore, 'users', user.id), {
        cooldown: user.cooldown, inventory: user.inventory
      })
    }

    updateEnergy({energy, id, cooldown}: PokeUser) {
      updateDoc(doc(this.firestore, 'users', id), {
        energy, cooldown
      })
    }
  }
