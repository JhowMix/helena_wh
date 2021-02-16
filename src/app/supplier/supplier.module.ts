import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { AngularMaterialModule } from '../module/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { LoadingBlockViewComponent } from '../loading-block-view/loading-block-view.component';

@NgModule({
  declarations: [
    SupplierFormComponent,
    LoadingBlockViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class SupplierModule { }
