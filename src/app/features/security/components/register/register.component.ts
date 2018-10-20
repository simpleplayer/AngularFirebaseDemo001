import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Authentication } from '../../model/authentication';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authentication:Authentication;

  constructor(private authenticationService: AuthenticationService) { }

  // the reactive form
  registerFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });
  get email() {
    return this.registerFormGroup.get('email');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  
  ngOnInit() {
    this.authentication={
      email:'',
      password:''
    }
    this.email.patchValue(this.authentication.email);
    this.password.patchValue(this.authentication.password);
  }


  register() {
    
    this.authentication.email=this.email.value as string;
    this.authentication.password=this.password.value as string;
    console.log('this.authentication=',this.authentication);

    this.authenticationService.register(this.authentication)
      .then(result => {
        console.log('LayoutComponent Successfull register 1 : ', result);
        return result;
      })
      .catch(error => {
        console.log('LayoutComponent Error during register 1 : ', error)
        throw (error);
      })
      ;
      
  }
}
