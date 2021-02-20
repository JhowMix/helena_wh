import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { AngularMaterialModule } from '../module/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { CNPJPipe } from '../pipe/cnpj.pipe';
import { UtilModule } from '../module/util.module';

@NgModule({
  declarations: [
    SupplierFormComponent,
    SupplierListComponent,
    CNPJPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMaskModule.forRoot(),
    UtilModule
  ]
})
export class SupplierModule { }
