import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/model/supplier.model';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
  animations: [
    trigger('suppliersTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SupplierListComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'name', 'cnpj', 'stateSub'];
  suppliers: Supplier[] = [];
  isLoadingSuppliers = false;

  constructor(
    private supplierSvc: SupplierService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingSuppliers = true
    this.supplierSvc.all().subscribe(res => {
      this.suppliers = res
      this.isLoadingSuppliers = false;
    }, error => {
      console.error(error)
      this.isLoadingSuppliers = false;
    });
  }

  async forward(): Promise<any> {
    await this._route.navigate(['fornecedores', 'novo']);
  }
}
