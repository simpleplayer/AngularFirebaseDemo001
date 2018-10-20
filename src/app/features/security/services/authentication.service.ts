import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';





// State
import { Authentication } from '../model/authentication';
import { User } from '../model/user';
import * as fromSecurity from '../state/security.reducer';
import * as fromSecurityAction from '../state/security.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {




  private user: User = <User>{};

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<fromSecurity.State>
  ) {
    console.log('AuthenticationService constructor');
    this.authenticationState();
  }


  // Listener on the authentication state
  private authenticationState() {
   
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        console.log('AuthenticationService authenticationState with user = ', user);
        this.user.email = user.email;
        this.store.dispatch(new fromSecurityAction.SetUser(this.user));
        this.store.dispatch(new fromSecurityAction.IsAuthenticated(true));

      } else {
        console.log('AuthenticationService authenticationState is false');
        this.store.dispatch(new fromSecurityAction.IsAuthenticated(false));

      }
    });
  }

  // Login
  login(authentication: Authentication) {
   
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(authentication.email, authentication.password)
      .then(result => {
        console.log('AuthenticationService Successfull login : ', result);
        this.user.email = authentication.email;
        this.store.dispatch(new fromSecurityAction.SetUser(this.user));
        this.store.dispatch(new fromSecurityAction.IsAuthenticated(true));
      }).catch(error => {
        console.log('AuthenticationService Error during login : ', error);
        this.store.dispatch(new fromSecurityAction.IsAuthenticated(false));
      });
  }

  // Logout
  logout() {
    this.angularFireAuth.auth.signOut()
      .then(result => {
        console.log('AuthenticationService Successfull logout : ', result);
        this.store.dispatch(new fromSecurityAction.ClearUser());
        this.store.dispatch(new fromSecurityAction.IsAuthenticated(false));
      }).catch(error => {
        console.log('AuthenticationService Error during logout : ', error);
      });
  }

  // Register
  register(authentication: Authentication): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(authentication.email, authentication.password)
      .then(result => {
        console.log('AuthenticationService Successfull register 2 : ', result);
        return result;
      })
      .catch(error => {
        console.log('AuthenticationService Error during register 2 : ', error)
        throw (error);
      })
      ;
  }





}
