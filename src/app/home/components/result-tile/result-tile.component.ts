import { MovieTvBase } from './../../../core/models/movie-tv-base';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-tile',
  templateUrl: './result-tile.component.html',
  styleUrls: ['./result-tile.component.scss']
})
export class ResultTileComponent implements OnInit {

  // passa propriedades para outros componentes
  @Input() result!: MovieTvBase;

  constructor() { }

  ngOnInit(): void {
  }

}
