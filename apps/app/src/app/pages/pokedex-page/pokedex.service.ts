import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiPokemon, ApiType, PokemonPageModel, TypePageModel } from './model/pokedex-page-model';
import { HuntService } from '../hunt/hunt.service';


@Injectable({
	providedIn: 'root',
})
export class PokemonsService {
	pokedex: ApiPokemon[] = []

	constructor(private readonly httpService: HttpClient, private readonly huntService: HuntService) {
		this.huntService.getProfile().subscribe((profile) => {
			if (profile) {
				this.encountered = profile.encountered;
				this.captured = profile?.captured;
			}
		});
	}
	captured: number[] = [];
	encountered: number[] = [];

	getPokemonsList(
		query: string,
		searchQuery: string,
		hideNotOwned: boolean,
		hideUnknown: boolean
	): Observable<PokemonPageModel> {
		return this.httpService
			.get<ApiPokemon[]>(query, {
				headers: { Accept: 'application/json' },
			})
			.pipe(
				map((response) => ({
					pokemons: response
						.map((p) => ({
							id: p.id,
							name: p.name,
							image_url: p.image,
							types: p.apiTypes.map((t) => t.image),
							captured: this.captured?.includes(parseInt(p.id)),
							encountered: this.encountered?.includes(parseInt(p.id)),
						}))
						.filter((p) =>
							p.name
								.normalize('NFD')
								.replace(' ', '')
								.replace(/[\u0300-\u036f]/g, '')
								.toLowerCase()
								.includes(
									searchQuery
										.normalize('NFD')
										.replace(' ', '')
										.replace(/[\u0300-\u036f]/g, '')
										.toLowerCase()
								)
						)
						.filter((p) => p.captured || !hideNotOwned)
						.filter((p) => p.encountered || !hideUnknown),
				}))
			);
	}

	getTypeList(): Observable<TypePageModel> {
		return this.httpService
			.get<ApiType[]>('https://pokebuildapi.fr/api/v1/types', {
				headers: { Accept: 'application/json' },
			})
			.pipe(
				map((response) => ({
					types: response.map((t) => ({
						id: t.id,
						name: t.name,
						image: t.image,
						englishName: t.englishName,
					})),
				}))
			);
	}
}
