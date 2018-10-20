import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerContainerComponent } from './customer-container/customer-container.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [
    CustomerListComponent, 
    CustomerContainerComponent, CustomerDetailComponent]
})
export class CustomersModule { }
