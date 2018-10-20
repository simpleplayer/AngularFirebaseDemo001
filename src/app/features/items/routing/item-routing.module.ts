import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
// Guard
import { AuthenticationGuard } from '../../security/services/authentication.guard';
//import { AuthenticationService } from '../../security/services/authentication.service';
import { LoginComponent } from '../../security/components/login/login.component';
// Components of app
import { ItemTableComponent } from '../components/item-table/item-table.component';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { ItemPanelComponent } from '../components/item-panel/item-panel.component';
import { ItemTestComponent } from '../components/item-test/item-test.component';
import { LayoutComponent } from '../components/layout/layout.component';
import * as fromSecurity from '../../../features/security/state/security.reducer';




// Routes
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: ItemTestComponent, canActivate: [AuthenticationGuard] },
      { path: 'panel', component: ItemPanelComponent, canActivate: [AuthenticationGuard] },
      { path: 'table', component: ItemTableComponent, canActivate: [AuthenticationGuard] },
      { path: 'list', component: ItemListComponent, canActivate: [AuthenticationGuard] },
      { path: 'login', component: LoginComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
  subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromSecurity.State>
  ) {
    
    //console.log('ItemRoutingModule');
    /* TO DO  this loops !!!
    this.subscription = this.store.pipe(select(fromSecurity.isAuthenticated)).subscribe(
      isAuthenticated => this.checkIsAuthenticated(isAuthenticated)
    );
    */

  }

  
  checkIsAuthenticated(isAuthenticated: boolean) {
    if (isAuthenticated) {
      //console.log('checkIsAuthenticated ItemRoutingModule authenticationChange = ', isAuthenticated);
      this.router.navigate(['']);
    } else {
      //console.log('checkIsAuthenticated ItemRoutingModule authenticationChange', isAuthenticated);
      this.router.navigate(['/login']);
    }

  }
  

}