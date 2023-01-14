import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Observable } from 'rxjs';
import { PaginatePokemon } from 'src/app/models/paginate_pokemon';
import { tap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { DetailPokemon } from 'src/app/models/detail_pokemon';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss'],
})
export class PrincipalPageComponent implements OnInit {
  isLoadingResults: boolean = true;
  isLoadingPokemonData: boolean = false;
  count: number = 0;

  detailPokemon$: Observable<DetailPokemon>;

  pokemons$: Observable<PaginatePokemon> = this.pokemonService
    .paginatePokemons()
    .pipe(
      tap((value) => {
        this.isLoadingResults = false;
      })
    );

  allPokemons$: Observable<Pokemon[]> = this.pokemons$.pipe(
    switchMap((value) => {
      return this.pokemonService
        .paginatePokemons(`${environment.api}?limit=${value.count}&offset=0`)
        .pipe(
          map((value) => {
            this.count = value.count;
            return value.results;
          })
        );
    })
  );

  nextOrPreviousPagePokemon(url: string) {
    this.isLoadingResults = true;
    this.pokemons$ = this.pokemonService.paginatePokemons(url).pipe(
      tap(() => {
        this.isLoadingResults = false;
      })
    );
  }

  pokemonName(name: string) {
    this.isLoadingPokemonData = true;
    this.detailPokemon$ = this.pokemonService
      .getPokemon(name.toLowerCase())
      .pipe(
        tap(() => {
          this.isLoadingPokemonData = false;
        })
      );
  }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}
}
