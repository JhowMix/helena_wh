import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/model/supplier.model';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'name', 'cnpj', 'stateSub'];
  suppliers: Supplier[] = [];
  isLoadingSuppliers = false;

  constructor(
    private supplierSvc: SupplierService
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

}
