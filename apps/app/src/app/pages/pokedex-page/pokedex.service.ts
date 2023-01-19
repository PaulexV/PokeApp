import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonPageModel, TypePageModel } from './model/pokedex-page-model';

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
	constructor(private readonly httpService: HttpClient) {}

	getPokemonsList(querry: string, searchQuerry: string): Observable<PokemonPageModel> {
		return this.httpService
			.get<ApiPokemon[]>(querry, {
				headers: { Accept: 'application/json' },
			})
			.pipe(
				map((response) => ({
					pokemons: response.map((p) => ({
						id: p.id,
						name: p.name,
						image_url: p.image,
						types: p.apiTypes.map((t) => t.image),
					})).filter((p) => p.name.toLowerCase().includes(searchQuerry.toLowerCase())),
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
