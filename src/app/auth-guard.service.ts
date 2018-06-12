import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    // This method can return 3 values: Obervable<boolean> | Promise<boolean> | boolean
    // Instead of subscribe we are going to call map operator that return an observable.
    // Angular internally subscribe into this new boolean observable and then remove this subscription later.
    return this.auth.user$.map(user => {
      if (user) return true;

      this.router.navigate(
        ['/login'], 
        {
          queryParams: { 
            returnUrl: state.url 
          }
        });
        
      return false;
    });
  }

}
