import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  // The service is nowhere used at this moment.
  // In order to use it, it should be instantiated in a constructor somewhere
  // Then the config properties can be used e.g.
  // this.config.property1, this.config.property2, 
  constructor(@Inject('config') private config: Config) {
    console.log('SampleService ', this.config);
  }
}
