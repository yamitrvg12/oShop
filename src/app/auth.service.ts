import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>; // Make an observable from firebase.User

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState; // Unwrap this Observable in our template using async pipe, this pipe automatically unsubscribe from this observable when the component is destroy
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
