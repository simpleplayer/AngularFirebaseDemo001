import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../features/security/services/authentication.service';
import * as fromSecurity from '../../features/security/state/security.reducer';
import { User } from '../../features/security//model/user';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {


  user: User = <User>{};
  subscription1: Subscription;
  subscription2: Subscription;
  isAuthenticated: boolean = false;
  isTestFont: boolean = false;
  theme: string;
  themes: string[] = ['Default', 'Light', 'Dark'];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private securityStore: Store<fromSecurity.State>,
    private overlayContainer: OverlayContainer) {

  }

  ngOnInit() {
    // State field
    this.subscription1 = this.securityStore.pipe(select(fromSecurity.getUser)).subscribe(
      user => this.user = user
    );
    this.subscription2 = this.securityStore.pipe(select(fromSecurity.isAuthenticated)).subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );

    // Set theme
    this.changeTheme('Light');
  }

  ngOnDestroy() {
    // Clean up all subscriptions
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }


  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  register() {
    this.router.navigate(['/register']);
  }


  changeTheme(theme: string) {
    this.theme=theme;
    this.changeOverlayTheme(theme);
  }

  changeOverlayTheme(theme: string) {
    switch (theme) {
      case 'Dark':
        this.overlayContainer.getContainerElement().classList.remove('light-theme');
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
        return;
      case 'Light':
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.overlayContainer.getContainerElement().classList.add('light-theme');
        return;
      default:
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.overlayContainer.getContainerElement().classList.remove('light-theme');
        return;
    }

  }








  /*
  private loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.auth.signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log('Successfull login : ', result);
        //this.authenticated = true;

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('Error during login : ', error)
      });

  }
  */
}
