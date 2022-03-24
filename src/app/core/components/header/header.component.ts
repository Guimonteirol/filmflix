import { User } from './../../models/user';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$?: Observable<User | undefined>; // ou é user ou é undefined

  constructor(private authService: AuthService) { }

  ngOnInit(): void { // Esse método é o que inicializa o component
    this.user$ = this.authService.user
  }

  logout(){
    this.authService.logout()
  }

}
