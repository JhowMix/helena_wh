import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideMenuModule} from './side-menu/side-menu.module';
import {ItemModule} from './item/item.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { SupplierModule } from './supplier/supplier.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SideMenuModule,
    ItemModule,
    SupplierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
