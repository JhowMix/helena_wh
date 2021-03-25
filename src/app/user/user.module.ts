import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from './user-form/user-form.component';
import {AngularMaterialModule} from '../module/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {UtilModule} from '../module/util.module';
import {EqualValidator} from '../validator/equal-validator.directive';



@NgModule({
  declarations: [UserFormComponent, EqualValidator],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMaskModule.forRoot(),
    UtilModule
  ]
})
export class UserModule { }
