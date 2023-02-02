import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonPageModel, TypePageModel } from './model/pokedex-page-model';
import { Observable } from 'rxjs';
import { PokemonsService } from './pokedex.service';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokedexSearchComponent, SearchCriteria } from './pokedex-search/pokedex-search.component';

@Component({
	selector: 'poke-app-pokedex-page',
	standalone: true,
	imports: [CommonModule, PokemonsListComponent, PokedexSearchComponent],
	templateUrl: './pokedex-page.component.html',
	styleUrls: ['./pokedex-page.component.css'],
})
export class PokemonsPageComponent {
	model$: Observable<PokemonPageModel>;
	types_model$: Observable<TypePageModel>;
	searchCriteria: SearchCriteria = { search: '', selectedTypes: [], hideNotOwned: false, hideUnknown: false };

	constructor(private readonly pokemonsServices: PokemonsService) {
		this.model$ = pokemonsServices.getPokemonsList(
			this.buildUrlByFilters([]),
			this.searchCriteria.search,
			this.searchCriteria.hideNotOwned,
			this.searchCriteria.hideUnknown
		);
		this.types_model$ = pokemonsServices.getTypeList();
	}

	buildUrlByFilters(filters: string[]): string {
		let query: string;
		if (filters.length == 0) {
			return `https://pokebuildapi.fr/api/v1/pokemon`;
		} else if (filters.length > 1) {
			query = `s/${filters[0]}/${filters[1]}`;
		} else {
			query = `/${filters[0]}`;
		}
		return `https://pokebuildapi.fr/api/v1/pokemon/type${query}`;
	}

	newSearch(criteria: SearchCriteria) {
		this.searchCriteria = criteria;
		this.model$ = this.pokemonsServices.getPokemonsList(
			this.buildUrlByFilters(this.searchCriteria.selectedTypes),
			this.searchCriteria.search,
			this.searchCriteria.hideNotOwned,
			this.searchCriteria.hideUnknown
		);
	}
}
