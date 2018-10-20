

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular Firebase 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// angular 2 material
import { MaterialModule } from '../../../modules/material.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Reducer, Effects
import { reducer } from '../state/item.reducer';
import { ItemEffects } from '../state/item.effects';
// Routing
import { ItemRoutingModule } from '../routing/item-routing.module';

// Security
import { SecurityModule } from '../../security/module/security.module';

// Item Service
import { ItemService } from '../services/item/item.service';
// Item Components

import { ItemDetailComponent } from '../components/item-detail/item-detail.component';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { ItemTableComponent } from '../components/item-table/item-table.component';

import { ItemPanelComponent } from '../components/item-panel/item-panel.component';
import { ItemPanelDashboardComponent } from '../components/item-panel-dashboard/item-panel-dashboard.component';
import { ItemPanelListComponent } from '../components/item-panel-list/item-panel-list.component';
import { ItemPanelDetailComponent } from '../components/item-panel-detail/item-panel-detail.component';
import { ItemTestComponent } from '../components/item-test/item-test.component';
import { ItemTestCdkTableComponent } from '../components/item-test-cdk-table/item-test-cdk-table.component';
import { ItemTestCdkDragDropComponent } from '../components/item-test-cdk-drag-drop/item-test-cdk-drag-drop.component';


// Confirm Dialog
import { ConfirmComponent } from '../components/confirm/confirm.component';

// Loader
import { LoaderComponent } from '../components/loader/loader.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { ContentComponent } from '../components/content/content.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';


// Pagination
import { PaginationModule } from '../../pagination/module/pagination.module';
// Filter
import { FilterModule } from '../../filter/module/filter.module';
// Sort
import { SortModule } from '../../sort/module/sort.module';
// Draggable directive
import { DraggableModule } from '../../../shared/draggable/module/draggable.module';













@NgModule({
  declarations: [
    // Item omponents
    ItemDetailComponent,
    ItemListComponent,
    ItemTableComponent,
    ItemPanelComponent,
    ItemPanelDashboardComponent,
    ItemPanelDetailComponent,
    ItemPanelListComponent,
    ItemTestComponent,
    ItemTestCdkTableComponent,
    ItemTestCdkDragDropComponent,

   
    // Confirm Dialog
    ConfirmComponent,
    LoaderComponent,
    // Layout
    LayoutComponent,
    // Navigation
    NavigationComponent,
    // Content
    ContentComponent,
    
    
    
   
  

  ],
  imports: [
    CommonModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // flex layout
    FlexLayoutModule,
    // angular 2 material
    MaterialModule,
    // initialize with firebase config in environment.ts 
    //AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // routing
    ItemRoutingModule,
    // ngrx
    StoreModule.forFeature('items', reducer),
    EffectsModule.forFeature([ItemEffects]),
    // Security
    SecurityModule,
    LayoutModule,
    PaginationModule,
    SortModule,
    FilterModule,
    DraggableModule,


  ],
  exports: [
    ItemDetailComponent,
    ItemListComponent,
    ItemTableComponent,
  ],
  // Entry Components like dynamic (modal) dialogs
  entryComponents: [
    ConfirmComponent,
    ItemDetailComponent,
  ],
  providers: [
    ItemService,
    ItemRoutingModule,
  ],

})
export class ItemModule { }

