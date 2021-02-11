import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {SupplierService} from '../../service/supplier.service';
import {Supplier} from '../../model/supplier.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  animations: [
    trigger('formTrigger', [
      transition(':enter', [
        style({ height: 0 }),
        animate('200ms 100ms ease-out', style({ height: '90%' }))
      ]),
      transition(':leave', [
        style({ height: '90%' }),
        animate('200ms 100ms ease-out', style({ height: 0 }))
      ]),
    ])
  ]
})
export class ItemFormComponent implements OnInit {
  @ViewChild('supplierInput') supplierInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  supplierCtrl = new FormControl();
  allSuppliers: Supplier[] = [];
  suppliers: Supplier[] = [];
  filteredSuppliers: Observable<Supplier[]>;

  constructor(
    private supplierSvc: SupplierService
  ) {

  }

  ngOnInit(): void {
    this.supplierSvc.all().subscribe(res => {
      this.allSuppliers = res;

      this.filteredSuppliers = this.supplierCtrl.valueChanges.pipe(
        startWith(null as boolean),
        map((supplier: Supplier | null) => supplier ? this._filter(supplier) : this.allSuppliers.slice() )
      );
    });
  }

  add(event: MatChipInputEvent): void {
    // const input = event.input;
    // const value = event.value;
    //
    // if((value || '').trim()) {
    //   this.suppliers.push(value.trim());
    // }
    //
    // if(input) {
    //   input.value = '';
    // }
    //
    // this.supplierCtrl.setValue(null);
  }

  remove(supplier: Supplier): void {
    const index = this.suppliers.indexOf(supplier);

    if (index >= 0) {
      this.suppliers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.suppliers.push(event.option.value as Supplier);
    this.supplierInput.nativeElement.value = '';
    this.supplierCtrl.setValue(null);
  }

  private _filter(value: Supplier): Supplier[] {
    const filterValue = value.name.toLocaleLowerCase();

    return this.allSuppliers.filter(supplier => supplier.name.toLocaleLowerCase().indexOf(filterValue) === 0);
  }
}
