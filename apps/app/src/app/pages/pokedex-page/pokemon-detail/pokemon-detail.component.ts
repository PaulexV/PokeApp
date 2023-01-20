import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'poke-app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() pokemon: Pokemon | null = null;
  @Output() isFavorite = new EventEmitter<Pokemon>();

  setFavorite() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.isFavorite.emit(this.pokemon!);
  }
}
