import { Component, Input, OnInit, ViewChild, Output } from '@angular/core';
import { PaginatePokemon } from 'src/app/models/paginate_pokemon';
import { map, Observable, tap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  @Input() set pokemons(pokemons: PaginatePokemon) {
    this.dataPokemon$.next(pokemons);
  }
  @Input() set allPokemons(allPokemons: Pokemon[]) {
    this.allPokemons$.next(allPokemons);
  }
  @Input() isLoadingResults: boolean;
  @Input() count;
  @Output() url: EventEmitter<string> = new EventEmitter();
  @Output() pokemonName: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  disabledPaginator: boolean = false;
  pokemonSearchControl = new FormControl('');
  pageIndex: number = 0;
  countPaginator: number = 20;
  displayedColumns: string[] = ['name'];
  clickedRow: string = '';
  dataPokemon$ = new BehaviorSubject<PaginatePokemon>(null);
  allPokemons$ = new BehaviorSubject<Pokemon[]>([]);
  getOnePokemon$ = new BehaviorSubject<Pokemon>(null);

  filteredOptions$ = combineLatest([
    this.pokemonSearchControl.valueChanges,
    this.allPokemons$,
  ]).pipe(
    map(([search, allPokemons]) =>
      this.filterPokemon(search ?? '', allPokemons)
    )
  );

  dataSource$: Observable<MatTableDataSource<Pokemon>> = combineLatest([
    this.dataPokemon$,
    this.getOnePokemon$,
  ]).pipe(
    filter(([dataPokemon]) => !!dataPokemon),
    map(([paginatePokemon, searchPokemon]) => {
      if (!!searchPokemon) {
        return new MatTableDataSource([searchPokemon]);
      }

      return new MatTableDataSource(paginatePokemon.results);
    })
  );

  closedAutoComplete() {
    if (!this.pokemonSearchControl.value) {
      this.getOnePokemon$.next(null);
      this.disabledPaginator = false;
    }
  }

  getPokemonName(name: string) {
    this.clickedRow = name;

    this.pokemonName.next(name);
  }

  selectedPokemon(event: string) {
    this.disabledPaginator = true;

    this.pokemonService
      .searchPokemon(event)
      .pipe(tap((pokemon) => this.getOnePokemon$.next(pokemon)))
      .subscribe();
  }

  pagination(paginatePokemon: PaginatePokemon) {
    if (this.paginator.pageIndex === 0) {
      this.pageIndex = 0;
      this.url.next(environment.firstPagePokemon);

      return;
    }

    if (this.paginator.pageIndex + 1 === this.paginator.getNumberOfPages()) {
      this.pageIndex = this.paginator.getNumberOfPages();
      this.url.next(environment.lastPagePokemon);

      return;
    }

    if (this.paginator.pageIndex > this.pageIndex) {
      this.pageIndex = this.paginator.pageIndex;

      this.url.next(paginatePokemon.next);
    }

    if (this.paginator.pageIndex < this.pageIndex) {
      this.pageIndex = this.paginator.pageIndex;

      this.url.next(paginatePokemon.previous);
    }
  }

  private filterPokemon(value: string, allPokemons: Pokemon[]): string[] {
    const filterValue = value.toLowerCase();

    const findPokemons = allPokemons
      .filter((pokemon) => pokemon.name.toLowerCase().includes(filterValue))
      .map((pokemons) => {
        return pokemons.name;
      });

    return findPokemons;
  }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}
}
