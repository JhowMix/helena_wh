import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideMenuModule} from './side-menu/side-menu.module';
import {ItemModule} from './item/item.module';
import {HttpClientModule} from '@angular/common/http';
import { SupplierModule } from './supplier/supplier.module';
import { LoadingBlockViewComponent } from './loading-block-view/loading-block-view.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SideMenuModule,
    ItemModule,
    SupplierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
