import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPokemonComponent } from './detail-pokemon.component';

@NgModule({
  declarations: [DetailPokemonComponent],
  imports: [CommonModule],
  exports: [DetailPokemonComponent],
})
export class DetailPokemonModule {}
