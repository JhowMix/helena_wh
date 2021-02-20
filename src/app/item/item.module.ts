import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../module/angular-material.module';
import {ItemFormComponent} from './item-form/item-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UtilModule } from '../module/util.module';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [
    ItemFormComponent,
    ItemListComponent
  ],
  imports: [
    UtilModule,
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class ItemModule { }
