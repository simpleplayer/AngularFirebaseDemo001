import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromSecurity from '../../../features/security/state/security.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  subscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private store: Store<fromSecurity.State>) {
      // TO DO : is not called at startup -> check if this can be done with new feature of Angular 7
    console.log('AuthenticationGuard constructor');
    this.authenticationState();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthenticationGuard canActivate this.isAuthenticated = ', this.isAuthenticated);
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  private authenticationState() {
    console.log('AuthenticationGuard authenticationState this.isAuthenticated = ', this.isAuthenticated);
    this.subscription = this.store.pipe(select(fromSecurity.isAuthenticated)).subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );
  }


}
