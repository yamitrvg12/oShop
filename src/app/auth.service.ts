import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>; // Make an observable from firebase.User

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.user$ = afAuth.authState; // Unwrap this Observable in our template using async pipe, this pipe automatically unsubscribe from this observable when the component is destroy
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(auth => {
        if (auth.user) {
          const returnUrl = localStorage.getItem('returnUrl');

          this.router.navigateByUrl(returnUrl);
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
