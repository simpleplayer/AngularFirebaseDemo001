import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular 2 material
import { MaterialModule } from '../../../modules/material.module';
// angular flex
import { FlexLayoutModule } from '@angular/flex-layout';

import { PaginationComponent } from '../components/pagination/pagination.component';
import { PaginationService } from '../services/pagination.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent,
  ],
  providers: [
    PaginationService,
  ],
})
export class PaginationModule { }
