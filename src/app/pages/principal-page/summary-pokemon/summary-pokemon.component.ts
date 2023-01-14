import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { SummaryPokemon } from 'src/app/utils/summary_pokemon';

@Component({
  selector: 'app-summary-pokemon',
  templateUrl: './summary-pokemon.component.html',
  styleUrls: ['./summary-pokemon.component.scss'],
})
export class SummaryPokemonComponent extends SummaryPokemon implements OnInit {
  @Input() set allPokemons(allPokemons: Pokemon[]) {
    if (!!allPokemons) {
      this.validateInitialWordPokemon(allPokemons);

      const pokemonsSort = this.pokemons.sort((x, y) => {
        if (x.name < y.name) {
          return -1;
        }

        if (x.name > y.name) {
          return 1;
        }

        return 0;
      });

      this.pokemons$.next(pokemonsSort);
    }
  }

  displayedColumns: string[] = ['name', 'count'];

  pokemons$ = new BehaviorSubject<any[]>([]);

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
