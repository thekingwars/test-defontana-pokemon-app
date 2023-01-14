import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPokemonComponent } from './summary-pokemon.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [SummaryPokemonComponent],
  imports: [CommonModule, MatTableModule],
  exports: [SummaryPokemonComponent],
})
export class SummaryPokemonModule {}
