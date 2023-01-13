import { TestBed } from '@angular/core/testing';

import { PokemonsService } from './pokedex.service';

describe('PokedexService', () => {
  let service: PokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
