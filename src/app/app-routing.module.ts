import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemFormComponent} from './item/item-form/item-form.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SupplierFormComponent } from './supplier/supplier-form/supplier-form.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import {UserFormComponent} from './user/user-form/user-form.component';

const routes: Routes = [
  {path: 'fornecedores', children: [
    {path: '', component: SupplierListComponent},
    {path: 'novo', component: SupplierFormComponent}
  ]},
  {path: 'itens', children: [
    {path: '', component: ItemListComponent},
    {path: 'novo', component: ItemFormComponent}
  ]},
  {path: 'usuarios', children: [
      {path: 'novo', component: UserFormComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
