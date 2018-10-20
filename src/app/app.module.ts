import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Firebase 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// angular 2 material
import { MaterialModule } from './modules/material.module';
// ngrx
import { StoreModule } from '@ngrx/store';
// Reducer, Effects
import { reducer } from './state/app.reducer';

// Layout components
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ContentComponent } from './components/content/content.component';
import { NavigationComponent } from './components/navigation/navigation.component';

// Security
import { SecurityModule } from './features/security/module/security.module';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';








// Itemsmodule (not needed here if lazy loading is used)
//import { ItemModule } from './features/items/module/item.module';


@NgModule({
  declarations: [
    // App components
    AppComponent,
    LayoutComponent,
    ContentComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // flex layout
    FlexLayoutModule,
    // angular 2 material
    MaterialModule,

    // ItemsModule (Lazy Loading is done : put in comment)
    //ItemModule, 
    //CustomersModule,
    //OrdersModule,

    // initialize with firebase config in environment.ts 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // routing
    AppRoutingModule,
    // ngrx
    StoreModule.forRoot({}),
    // ngrx
    StoreModule.forFeature('app', reducer),
    EffectsModule.forRoot([]),
    
   
    // Security
    SecurityModule,
    
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
