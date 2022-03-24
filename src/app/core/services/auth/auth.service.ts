import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { collection, Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private db: Firestore) { }

  login(email:string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password)); //cria observables a partir da promessa
  }

  signup(email:string, password: string, payload: User){
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
      ).pipe(tap((creds) =>{//id do usuário
       payload.uid = creds.user.uid

       const users = collection(this.db, 'users');
       const userDoc = doc(users, payload.uid);

       setDoc(userDoc, payload)
      }))
  }

  get user(){
    return user(this.auth).pipe(switchMap((user)=>{ //se tiver logado, retora ele, caso nn null//switchMap faz uma tipagem correta (tira o encadeamento)
      if(user){
        return this.getUserData(user.uid)
      }
      return of(undefined) //o of cria o observabel de undefined
    })) //retorna um novo observable
  }

  private getUserData(uid:string){
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid);

    return docData(userDoc).pipe(map((data)=> data as User)); //garantindo que está trabalhando dentro da interface
  }

  logout(){
    this.auth.signOut()
  }
}
