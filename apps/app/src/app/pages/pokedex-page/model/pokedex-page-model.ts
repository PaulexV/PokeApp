import { Pokemon, Type } from '../../model/pokemon';

export interface PokemonPageModel {
  pokemons: Pokemon[];
}

export interface TypePageModel {
  types: Type[];
}

export interface ApiTypes {
	name: string;
	image: string;
}

export interface ApiPokemon {
	id: string;
	name: string;
	image: string;
	apiTypes: ApiTypes[];
}

export interface ApiType {
	id: string;
	name: string;
	image: string;
	englishName: string;
}