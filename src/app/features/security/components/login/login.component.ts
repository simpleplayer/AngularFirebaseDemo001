import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Authentication } from '../../model/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authentication:Authentication;

  constructor(private authenticationService: AuthenticationService) { }

  // the reactive form
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });
  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  
  ngOnInit() {
    this.authentication={
      email:'',
      password:''
    }
    this.authentication.email='a.a@d.de';
    this.authentication.password='1234567890';''
    this.email.patchValue(this.authentication.email);
    this.password.patchValue(this.authentication.password);
  }

  login(){
    this.authentication.email=this.email.value as string;
    this.authentication.password=this.password.value as string;
    console.log('LoginComponent- login : this.authentication=',this.authentication);
    this.authenticationService.login(this.authentication);
  }


}
