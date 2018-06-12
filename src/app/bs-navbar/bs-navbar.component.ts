import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<firebase.User>; // Make an observable from firebase.User

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState; // Unwrap this Observable in our template using async pipe, this pipe automatically unsubscribe from this observable when the component is destroy
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
