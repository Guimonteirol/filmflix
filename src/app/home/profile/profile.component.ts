import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImageService } from './../../core/services/upload-image/upload-image.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { User } from './../../core/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$!: Observable<User | undefined>

  profile?: File;

  @ViewChild('profileInput') profileInput!: ElementRef // faz referencia ao elemento da dom

  constructor(
    private authService: AuthService,
    private uploadService: UploadImageService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user$ = this.authService.user
  }

  setProfilePicture(){
    this.profile = this.profileInput.nativeElement.files[0]
    // o native é o proprio elemento. o input no caso. O arquivo é um array.
    // Então nesse caso, só queremos o primeiro elemento do array.
  }

  onSubmit(profileForm: NgForm){
    if(this.profile){
      this.uploadService.upload(this.profile).subscribe({
        next: (url) => {
          const user: User = {...profileForm.value, profile: url} // desestrutura o profile, e pega somente a url
          this.uploadProfile(user)
        }
      })
    } else {
      this.uploadProfile(profileForm.value as User)
    }
  }

  // caso dê algum problema de upload usando snackBar
  uploadProfile(user: User) {
    this.authService.update(user).subscribe({
      next: () => {
        this.snackBar.open('Atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Um error ocorreu!', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }
}
