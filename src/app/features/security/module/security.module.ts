import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/material.module';

import { LoginComponent } from '../components/login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationGuard } from '../services/authentication.guard';
import { SampleService } from '../services/sample.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/security.reducer';
import { RegisterComponent } from '../components/register/register.component';
import { LogoutComponent } from '../components/logout/logout.component';



@NgModule({
  imports: [
    CommonModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // angular 2 material
    MaterialModule,
    // flex layout
    FlexLayoutModule,
    // ngrx
    StoreModule.forFeature('security', reducer),
  ],
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    SampleService,
  ],
})
export class SecurityModule {

  // initializeApp()
  // Can be used in e.g. app.module.ts where the SecurityModule is in the ngModule "imports-list"
  // SecurityModule.initializeApp({property1: 'value1',property2: 'value2'}),
  // The names and the values of the properties have to be adapted to the usecase ...
  /*
  static initializeApp(config: Config): ModuleWithProviders {

    //console.log('SecurityModule Config' , config);

    return {
      ngModule: SecurityModule,
      providers: [SampleService, { provide: 'config', useValue: config }]
    };
   
  }
 */


}
