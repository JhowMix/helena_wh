import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatRippleModule
  ]
})
export class AngularMaterialModule { }
