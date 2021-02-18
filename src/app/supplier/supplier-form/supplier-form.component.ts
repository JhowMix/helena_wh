import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address.model';
import { City } from 'src/app/model/city.model';
import { Phone } from 'src/app/model/phone.model';
import { Supplier } from 'src/app/model/supplier.model';
import { UF } from 'src/app/model/uf.model';
import { AddressService } from 'src/app/service/address.service';
import { CityService } from 'src/app/service/city.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { UfService } from 'src/app/service/uf.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss'],
  animations: [
    trigger('cardTrigger', [
      transition(':enter', [
        style({ height: 0 }),
        animate('150ms ease-out', style({ height: '90%' }))
      ]),
      transition(':leave', [
        style({ height: '90%' }),
        animate('200ms 100ms ease-out', style({ height: 0 }))
      ]),
    ]),
    trigger('cardContentTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('170ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SupplierFormComponent implements OnInit {

  isContentVisible = false;
  isFetchingAddress = false;
  isFetchingCities = false;
  isSendingSupplier = false;

  supplierForm: FormGroup;

  addressQuery: string;

  allUfs: UF[];
  allCities: City[];

  constructor(
    private supplierSvc: SupplierService,
    private addressSvc: AddressService,
    private ufSvc: UfService,
    private citySvc: CityService,
    private _route: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildSupplierForm();
    this.ufSvc.getAll().subscribe(res => this.allUfs = res);
    setTimeout(() => {
      this.isContentVisible = true;
    }, 200);
  }

  fetchLocation(): void {
    this.isFetchingAddress = true;
    
    if(this.addressQuery) {
      this.addressSvc.fetchLocation(this.addressQuery).subscribe(res => {
        this.isFetchingAddress = false;
        const city = res.city;
        const district = res.district; 
        const placeDesc = res.placeDesc;
        
        this.citySvc.fetchByUf(res.city.uf).subscribe(res => {
          this.allCities = res;
          this.supplierForm.controls.city.setValue(city.id);
          this.supplierForm.controls.uf.setValue(city.uf.id);
          this.supplierForm.controls.district.setValue(district);
          this.supplierForm.controls.location.setValue(placeDesc);
        });
      });
    }
  }

  fetchCities(): void {
    const value = this.allUfs.find(uf => uf.id === this.supplierForm.controls.uf.value);
    this.isFetchingCities = true;

    this.citySvc.fetchByUf(value).subscribe(res => {
      this.allCities = res
      this.isFetchingCities = false;
    }, error => {
      console.error(error)
      this.isFetchingCities = false;
    });
  }

  send() {
    this.isSendingSupplier = true;
    const supplier = this.buildSendableSupplier();

    if(supplier !== null) {
      this.supplierSvc.create(supplier).subscribe(async _ => {
        this._snackBar.open('Fornecedor criado com sucesso!', null, { duration: 2000 })
        await this._route.navigateByUrl('');
      }, error => {
        console.error(error);
        this._snackBar.open('Falha ao criar fornecedor', null, { duration: 2000 })
        this.isSendingSupplier = false;
      });
    } else {
      this.isSendingSupplier = false;
      this._snackBar.open('Preencha o formulário corretamente', null, { duration: 2000 })
    }
  }

  private buildSupplierForm(): void {
    this.supplierForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cnpj: ['', [
        Validators.required,
        Validators.minLength(14)
      ]],
      ie: ['', [
        Validators.required,
        Validators.maxLength(14)
      ]],
      fone1: ['', [Validators.required]],
      fone2: ['', []],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      uf: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      location: ['', [Validators.required]]
    })
  }

  private buildSendableSupplier(): Supplier {
    if(this.supplierForm.valid) {
      const supplier = {} as Supplier;
      const address = {} as Address;
      
      address.city = this.allCities.find(city => city.id === this.supplierForm.controls.city.value);
      address.district = this.supplierForm.controls.district.value
      address.placeDesc = this.supplierForm.controls.location.value;
      address.zipCode = this.addressQuery;

      supplier.name = this.supplierForm.controls.name.value;
      supplier.cnpj = this.supplierForm.controls.cnpj.value;
      supplier.stateSub = this.supplierForm.controls.ie.value;
      supplier.email = this.supplierForm.controls.email.value;
      supplier.phones = [];
      
      supplier.addresses = [address];

      if(this.supplierForm.controls.fone1.value) {
        supplier.phones.push({
          category: 'LANDLINE',
          number: this.supplierForm.controls.fone1.value
        } as Phone);
      } else if(this.supplierForm.controls.fone2.value) {
        supplier.phones.push({
          category: 'LANDLINE',
          number: this.supplierForm.controls.fone2.value
        } as Phone);
      }
      
      return supplier;
    }

    return null;
  }
}
