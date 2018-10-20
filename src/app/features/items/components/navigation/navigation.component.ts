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
      name: "Home",
      description: "Home",
      icon: "home",
      route: "home"
    },
    {
      name: "Panel",
      description: "Panel",
      icon: "view_list",
      route: "panel"
    },
    {
      name: "Table",
      description: "Table",
      icon: "view_list",
      route: "table"
    },
    {
      name: "List",
      description: "List",
      icon: "list",
      route: "list"
    }
  ];


  constructor() {
  }

  ngOnInit() {
  }

  
}