import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DetailPokemon } from 'src/app/models/detail_pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss'],
})
export class DetailPokemonComponent implements OnInit {
  @Input() detailPokemon: DetailPokemon;
  @Input() isLoadingData: boolean;

  constructor() {}

  ngOnInit(): void {}
}
