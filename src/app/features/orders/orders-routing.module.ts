import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderContainerComponent } from './order-container/order-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
  {
    path: '',
    component: OrderContainerComponent,
    children: [
      {path: 'orderlist', component: OrderListComponent},
      {path: 'orderdetail', component: OrderDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
