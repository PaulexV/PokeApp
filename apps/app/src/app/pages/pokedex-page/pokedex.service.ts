import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonPageModel, TypePageModel } from './model/pokedex-page-model';
import { HuntService } from '../hunt/hunt.service';

interface ApiTypes {
	name: string;
	image: string;
}

interface ApiPokemon {
	id: string;
	name: string;
	image: string;
	apiTypes: ApiTypes[];
}

interface ApiType {
	id: string;
	name: string;
	image: string;
	englishName: string;
}

@Injectable({
	providedIn: 'root',
})
export class PokemonsService {
	constructor(private readonly httpService: HttpClient, private readonly huntService: HuntService) {}
	captured: number[] | undefined;
	encountered: number[] | undefined;

	getPokemonsList(
		query: string,
		searchQuery: string,
		hideNotOwned: boolean,
		hideUnknown: boolean
	): Observable<PokemonPageModel> {
		this.huntService.getProfile().subscribe((profile) => {
			this.encountered = profile?.encountered;
			this.captured = profile?.captured;
		});
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
						.filter((p) => this.captured?.includes(parseInt(p.id)) || !hideNotOwned)
						.filter((p) => this.encountered?.includes(parseInt(p.id)) || !hideUnknown),
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
