import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';


// Components of app
import { LoginComponent } from './features/security/components/login/login.component';
import { LogoutComponent } from './features/security/components/logout/logout.component';
import { RegisterComponent } from './features/security/components/register/register.component';
import { State, isAuthenticated, isLoading, getUser } from './features/security/state/security.reducer';





// Routes
const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', loadChildren: './features/items/module/item.module#ItemModule' },
  { path: 'customers', loadChildren: './features/customers/customers.module#CustomersModule' },
  { path: 'orders', loadChildren: './features/orders/orders.module#OrdersModule' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<State>
  ) {
    this.subscription = this.store.pipe(select(isAuthenticated)).subscribe(
      isAuthenticated => this.checkIsAuthenticated(isAuthenticated)
    );

  }

  checkIsAuthenticated(isAuthenticated: boolean) {
    if (isAuthenticated) {
      //console.log('checkIsAuthenticated AppRoutingModule authenticationChange = ', isAuthenticated);
      this.router.navigate(['']);
    } else {
      //console.log('checkIsAuthenticated AppRoutingModule authenticationChange', isAuthenticated);
      this.router.navigate(['/login']);
    }
  }

}