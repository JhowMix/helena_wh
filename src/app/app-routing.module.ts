import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemFormComponent} from './item/item-form/item-form.component';

const routes: Routes = [
  {path: 'fornecedores', children: [
      {path: 'novo', component: ItemFormComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
