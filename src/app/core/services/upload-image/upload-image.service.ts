import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { from, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: Storage) { }

  //metodo para criar nome do arquivo
  private createFileName(f: File){
    const ext = f.name.split('.').pop() // pop para pegar a extensão do arquivo. O ultimo elemento.
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`
  }

  //metodo para fazer o upload da imagem
  upload(image: File, folder: string = 'users/'){
    const fileName = this.createFileName(image); // gera p nome referente ao arquivo
    const profile = ref(this.storage, folder + fileName ) // cria referencia no storage, monta pasta e nome do arquivo

    //UploadBytesResumable daria para fazer a porcentagem do download

    // cria o observable a partir da promessa uploadBytes
    // o switchMap inicia um novo observable. Vai no storage, pega a url e devolve

    return from(uploadBytes(profile, image)).pipe(switchMap((_) => {
      // retornar um outro observable.
      return from(getDownloadURL(profile)) //a promessa from retorna o getDownloadURL
    }))
  }
}
