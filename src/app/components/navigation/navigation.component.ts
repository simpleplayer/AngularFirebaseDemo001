import { Component, OnInit } from '@angular/core';

export interface View {
  name: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  views: View[] = [
    {
      name: "Items",
      description: "Items",
      icon: "home",
      route: "/items"
    },
    {
      name: "Customers",
      description: "Customers",
      icon: "dashboard",
      route: "/customers"
    },
    {
      name: "Orders ",
      description: "Orders",
      icon: "apps",
      route: "/orders"
    }
  ];


  constructor() {
  }

  ngOnInit() {
  }


}