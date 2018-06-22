import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>; // Make an observable from firebase.User

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    // Unwrap this Observable in our template using async pipe,
    // this pipe automatically unsubscribe from this observable when
    // the component is destroy
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(auth => {
        if (auth.user) {
          const getUrl = localStorage.getItem('returnUrl');

          this.userService.save(auth.user);
          this.router.navigateByUrl(getUrl);
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
