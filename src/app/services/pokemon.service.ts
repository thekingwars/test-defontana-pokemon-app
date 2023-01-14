import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatePokemon } from '../models/paginate_pokemon';
import { Pokemon } from '../models/pokemon';
import { map } from 'rxjs';
import { DetailPokemon } from '../models/detail_pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  api: string = environment.api;
  count: number = 0;

  constructor(private http: HttpClient) {}

  paginatePokemons(url: string = this.api): Observable<PaginatePokemon> {
    return this.http.get<PaginatePokemon>(`${url}`);
  }

  searchPokemon(name: string): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`${this.api}${name}`)
      .pipe(map((pokemon) => ({ name: pokemon.name, url: '' })));
  }

  getPokemon(name: string): Observable<DetailPokemon> {
    return this.http.get<DetailPokemon>(`${this.api}${name}`);
  }
}
