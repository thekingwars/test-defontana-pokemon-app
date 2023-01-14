import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalPageRoutingModule } from './principal-page-routing.module';
import { PrincipalPageComponent } from './principal-page.component';
import { PokemonsModule } from './pokemons/pokemons.module';
import { DetailPokemonModule } from './detail-pokemon/detail-pokemon.module';
import { SummaryPokemonModule } from './summary-pokemon/summary-pokemon.module';

@NgModule({
  declarations: [PrincipalPageComponent],
  imports: [
    CommonModule,
    PrincipalPageRoutingModule,
    PokemonsModule,
    DetailPokemonModule,
    SummaryPokemonModule,
  ],
})
export class PrincipalPageModule {}
