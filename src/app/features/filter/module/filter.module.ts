import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular 2 material
import { MaterialModule } from '../../../modules/material.module';
// angular flex
import { FlexLayoutModule } from '@angular/flex-layout';

import { FilterComponent } from '../components/filter/filter.component';
import { FilterService } from '../services/filter.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    FilterComponent,
  ],
  declarations: [
    FilterComponent
  ],
  providers: [
    FilterService,
  ],
})
export class FilterModule { }
