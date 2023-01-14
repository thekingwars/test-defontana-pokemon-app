import { Pokemon } from '../models/pokemon';
import { Count, LetterInitial } from './letter_initial_pokemon';

export class SummaryPokemon {
  public pokemons: {
    name: string;
    count: number;
  }[] = [];

  validateInitialWordPokemon(pokemons: Pokemon[]) {
    for (let i = 0; i < pokemons.length; i++) {
      if (
        pokemons[i].name.charAt(0) === LetterInitial[pokemons[i].name.charAt(0)]
      ) {
        const count = ++Count[pokemons[i].name.charAt(0)];

        this.eachLetter(LetterInitial[pokemons[i].name.charAt(0)], count);
      }
    }
  }

  private eachLetter(letter: string, count: number) {
    if (this.pokemons.some((value) => value.name === letter)) {
      const index = this.pokemons.findIndex((value) => value.name === letter);
      this.pokemons[index] = {
        name: letter,
        count,
      };
    } else {
      this.pokemons.push({
        name: letter,
        count,
      });
    }
  }

  constructor() {}
}
