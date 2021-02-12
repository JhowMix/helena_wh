import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { AngularMaterialModule } from '../module/angular-material.module';



@NgModule({
  declarations: [SupplierFormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class SupplierModule { }
