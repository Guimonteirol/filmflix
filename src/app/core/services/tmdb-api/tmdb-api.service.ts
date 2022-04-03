import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieTvBase } from '../../models/movie-tv-base';

type ApiResponse = { page: number; results: MovieTvBase[] };

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  baseUrl = 'https://api.themoviedb.org/3';

  options = {
    api_key: 'db4b550c51fad725bb61d7cf4bf70cd2',
    language: 'pt-BR',
  };

  constructor(private http: HttpClient) {}

  trending(): Observable<MovieTvBase[]> {
    return this.http
      .get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
        params: this.options,
      })
      .pipe(map((data) => data.results));
  }

  search(query: string): Observable<MovieTvBase[]> {
    return this.http
      .get<ApiResponse>(`${this.baseUrl}/search/multi`, {
        params: {
          ...this.options,
          include_adult: false,
          query: query,
        },
      })
      .pipe(map((data) => data.results));
  }

  getDetailById(id: number, type: 'movie' | 'tv'): Observable<MovieTvBase> {
    return this.http.get<MovieTvBase>(`${this.baseUrl}/${type}/${id}`, {
      params: this.options,
    });
  }


}


  // requisito no endpoint
  // o objeto params é para pegar as informações que vem depois da ?
  // desestrutura o valor que já tem (api_key e language) para incluir informações novas.
  // Quando já tiver os dados, ele mapeia, retorna apenas o que foi solicitado.


