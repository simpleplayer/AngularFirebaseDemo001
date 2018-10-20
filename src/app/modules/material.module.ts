import { NgModule } from '@angular/core';
// material
import { MatAutocompleteModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatRippleModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatSliderModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';

// cdk

import { CdkTableModule } from '@angular/cdk/table'
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
 
  exports: [
    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    // Cdk
    CdkTableModule,
    DragDropModule,
  ]
})
export class MaterialModule { }
