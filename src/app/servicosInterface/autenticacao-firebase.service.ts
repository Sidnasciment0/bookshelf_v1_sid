import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoFirebaseService {

  usuarioLogado$ = authState(this.usuarioFB);

  constructor(private usuarioFB: Auth
    ) { }

    loginUsuario(usuarioEmail: string, usuarioSenha: string) {
      return from(signInWithEmailAndPassword(this.usuarioFB, usuarioEmail, usuarioSenha));
    }

    sairLogin() {
      return from(this.usuarioFB.signOut());
    }

    cadastrarUsuario(nome: string, email: string, senha: string) {
      return from(createUserWithEmailAndPassword(this.usuarioFB, email, senha))
      .pipe(
        switchMap(({user}) => updateProfile(user, {displayName: nome}))
      )
    }
}
