import { MovieTvBase } from './../core/models/movie-tv-base';
import { TmdbApiService } from './../core/services/tmdb-api/tmdb-api.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {

  // Observables
  trending$!: Observable<MovieTvBase[]>
  results$?: Observable<MovieTvBase[]>

  // para usar quando  o poster path estiver vazio
  readonly PLACEHOLDER = 'http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png'

  createImageLink(poster: string){
    if(poster){
      return `https://image.tmdb.org/t/p/w300/${poster}`;
    }
    return this.PLACEHOLDER;
  }

  // Referencia para o template de busca
  @ViewChild('searchInput') searchInput!: ElementRef

  constructor(private tmdbApi: TmdbApiService) { }

  // Para que a busca já seja feita na medida que é digitado no input
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      filter(Boolean), // para tirar o que for falsy value = 0, null, undefined, vazios
      debounceTime(400), // para ele não emitir um evento para cada valor digitado, mas apenas quand parar
      distinctUntilChanged(), //evita que valores repetidos sejam emitidos. Se o anterior for igual, ele não será emitido.
      tap(() => {
        const query = this.searchInput.nativeElement.value //jogando o valor do input na variável query

        //se tiver algum valor, faço a busca
        if(query){
          this.results$ = this.tmdbApi.search(query); //montando um observable
        } else {
          this.results$  = undefined;
        }
      })
    )
    .subscribe(console.log);
  }

  ngOnInit(): void {
    this.trending$ = this.tmdbApi.trending()
  }

}


 // inicializa, montando o observable.
