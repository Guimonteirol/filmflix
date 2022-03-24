import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('login') login!:NgForm //referência ao template

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.login.value)
  }
}
