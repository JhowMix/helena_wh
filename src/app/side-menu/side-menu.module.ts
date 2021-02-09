import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from './side-menu.component';
import {AngularMaterialModule} from '../module/angular-material.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SideMenuComponent
  ],
  exports: [
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class SideMenuModule { }
