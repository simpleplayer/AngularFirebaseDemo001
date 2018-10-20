import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../../security/model/authentication';
import { AuthenticationService } from '../../../security/services/authentication.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  
  
 
  private authentication: Authentication = <Authentication>{};


  constructor(private angularFireAuth: AngularFireAuth, 
    private authenticationService: AuthenticationService,
  ) {

  }

  ngOnInit() {
 
  }

 
}
