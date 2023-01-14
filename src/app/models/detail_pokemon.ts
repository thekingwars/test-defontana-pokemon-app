import { Ability } from './ability';
import { Move } from './moves';
import { Sprite } from './sprite';
import { Stat } from './stat';
import { Type } from './type';

export interface DetailPokemon {
  abilities: Ability[];
  base_experience: number;
  form: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: Sprite;
  stats: Stat;
  types: Type[];
  weight: number;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndice {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}
