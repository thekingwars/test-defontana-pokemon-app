import { Pokemon } from './pokemon';

export interface PaginatePokemon {
  count: number;
  next: 'string';
  previous: 'string';
  results: Pokemon[];
}
