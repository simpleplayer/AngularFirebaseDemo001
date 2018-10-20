import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular 2 material
import { MaterialModule } from '../../../modules/material.module';
// angular flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortIconComponent } from '../components/sort/sort-icon.component';
import { SortService } from '../services/sort.service';
import { SortDirective } from '../directives/sort.directive';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    SortIconComponent,
    SortDirective,

  ],
  declarations: [
    SortIconComponent,
    SortDirective,

  ],
  // Entry Components like dynamic (modal) dialogs
  entryComponents: [
   
  ],
  providers: [
    SortService,
  ],
})
export class SortModule { }
