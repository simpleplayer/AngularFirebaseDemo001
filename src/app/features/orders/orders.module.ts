import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderContainerComponent } from './order-container/order-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrderListComponent, 
    OrderContainerComponent, OrderDetailComponent]
})
export class OrdersModule { }
