import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonPageModel, TypePageModel } from './model/pokedex-page-model';
import { Observable } from 'rxjs';
import { PokemonsService } from './pokedex.service';
import { Pokemon } from '../model/pokemon';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokedexSearchComponent, SearchCriteria } from './pokedex-search/pokedex-search.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
	selector: 'poke-app-pokedex-page',
	standalone: true,
	templateUrl: './pokedex-page.component.html',
	styleUrls: ['./pokedex-page.component.css'],
	imports: [CommonModule, PokemonsListComponent, PokedexSearchComponent, HeaderComponent],
})
export class PokemonsPageComponent {
	model$: Observable<PokemonPageModel>;
	types_model$: Observable<TypePageModel>;
	favoritePokemon = '';
	searchCriteria: SearchCriteria = { search: '', selectedTypes: [], hideNotOwned: false, hideUnkown: false };

	constructor(private readonly pokemonsServices: PokemonsService) {
		this.model$ = pokemonsServices.getPokemonsList(this.buildUrlByFilters([]), this.searchCriteria.search);
		this.types_model$ = pokemonsServices.getTypeList();
	}

	setFavoritePokemon(pokemon: Pokemon) {
		this.favoritePokemon = pokemon.name;
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
			this.searchCriteria.search
		);
	}
}
