import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerContainerComponent } from './customer-container/customer-container.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerContainerComponent,
    children: [
      {path: 'customerlist', component:  CustomerListComponent},
      {path: 'customerdetail', component:  CustomerDetailComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
