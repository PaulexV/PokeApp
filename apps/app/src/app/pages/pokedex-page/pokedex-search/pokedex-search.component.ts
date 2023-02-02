import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faS, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Type } from '../../../models/pokemon';

export interface SearchCriteria {
	search: string;
	selectedTypes: string[];
	hideNotOwned: boolean;
	hideUnknown: boolean;
}

@Component({
	selector: 'poke-app-pokedex-search',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './pokedex-search.component.html',
	styleUrls: ['./pokedex-search.component.css'],
})
export class PokedexSearchComponent {
	@Input() types: Type[] | null = null;
	@Output() search = new EventEmitter<SearchCriteria>();
	type_selected = 0;
	selected_types: string[] = [];
	isShown = false;
	hideNotOwned = false;
	hideUnknown = false;
	faSearch=faSearch;

	refreshSearch(searchQuerry: string) {
		this.search.emit({
			search: searchQuerry,
			selectedTypes: this.selected_types,
			hideNotOwned: this.hideNotOwned,
			hideUnknown: this.hideUnknown,
		});
	}

	toggleButton(type_name: string) {
		const button = document.getElementById(`type${type_name}`) as HTMLElement;
		if (button.className == 'type-unselected') {
			if (this.type_selected < 2) {
				button.className = 'type-selected';
				this.type_selected += 1;
				this.selected_types.push(type_name);
			}
		} else {
			button.className = 'type-unselected';
			this.type_selected -= 1;
			const index = this.selected_types.indexOf(type_name, 0);
			if (index > -1) {
				this.selected_types.splice(index, 1);
			}
		}
		console.log(this.selected_types)
	}

	toggleShow() {
		this.type_selected = 0;
		this.selected_types = [];
		this.isShown = !this.isShown;
		this.hideNotOwned = false;
		this.hideUnknown = false;
	}

	toggleNotOwned() {
		this.hideNotOwned = !this.hideNotOwned
	}

	toggleUnknown() {
		this.hideUnknown = !this.hideUnknown
	}
}
