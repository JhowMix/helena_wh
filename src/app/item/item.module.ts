import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../module/angular-material.module';
import {ItemFormComponent} from './item-form/item-form.component';

@NgModule({
  declarations: [
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ItemModule { }
