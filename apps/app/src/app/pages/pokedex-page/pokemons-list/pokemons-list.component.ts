import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../models/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { SearchCriteria } from '../pokedex-search/pokedex-search.component';

@Component({
  selector: 'poke-app-pokemons-list',
  standalone: true,
  imports: [CommonModule, PokemonDetailComponent],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  @Input() pokemons: Pokemon[] = [];
  @Input() criteria!: SearchCriteria;

}
