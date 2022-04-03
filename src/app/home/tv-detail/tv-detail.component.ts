import { MovieTvBase } from './../../core/models/movie-tv-base';
import { Observable } from 'rxjs';
import { TmdbApiService } from 'src/app/core/services/tmdb-api/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss']
})
export class TvDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tmdbApi: TmdbApiService) { }

    detail$!: Observable<MovieTvBase>;

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];
    this.detail$ = this.tmdbApi.getDetailById(id, 'tv');
  }

}
