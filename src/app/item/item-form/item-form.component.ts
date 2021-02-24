import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {SupplierService} from '../../service/supplier.service';
import {Supplier} from '../../model/supplier.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MeasurementUnitService } from 'src/app/service/measurement-unit.service';
import { MeasurementUnit } from 'src/app/model/measurement-unit.model';
import { Item } from 'src/app/model/item.model';
import { Measurement } from 'src/app/model/measurement.model';
import { ItemService } from 'src/app/service/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
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
export class ItemFormComponent implements OnInit {
  @ViewChild('inputImage', {static: false}) inputImage: ElementRef<HTMLInputElement>;
  @ViewChild('supplierInput') supplierInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  supplierCtrl = new FormControl();
  allSuppliers: Supplier[] = [];
  suppliers: Supplier[] = [];
  itemForm: FormGroup;
  filteredSuppliers: Observable<Supplier[]>;

  measurementUnits: MeasurementUnit[] = [];
  isContentVisible = false;
  isSendingItem = false;

  images: File[] = [];

  constructor(
    private supplierSvc: SupplierService,
    private itemSvc: ItemService,
    private measurementUnitSvc: MeasurementUnitService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.buildItemForm();

    setTimeout(() => {
      this.isContentVisible = true;
    }, 200);

    this.supplierSvc.all().subscribe(res => {
      this.allSuppliers = res;

      this.filteredSuppliers = this.supplierCtrl.valueChanges.pipe(
        startWith(null as boolean),
        map((supplier: Supplier | null) => supplier ? this._filter(supplier) : this.allSuppliers.slice() )
      );
    });

    this.measurementUnitSvc.all().subscribe(res => this.measurementUnits = res, error => console.error(error));
  }

  remove(supplier: Supplier): void {
    const index = this.suppliers.indexOf(supplier);

    if (index >= 0) {
      this.suppliers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.suppliers.find(s => s.id === event.option.value.id)) {
      this.suppliers.push(event.option.value as Supplier);
    }
    
    this.supplierInput.nativeElement.value = '';
    this.supplierCtrl.setValue(null);
  }

  send(): void {
    this.isSendingItem = true;
    const item = this.buildSendableItem();
    const formData = new FormData()

    formData.append('item', JSON.stringify(item));

    for(const image of this.images) {
      formData.append('files', image);
    }
    
    if(item) {
      this.itemSvc.createOne(formData).subscribe( async _ => {
        this._snackBar.open('Item criado com sucesso!', null, { duration: 2000 })
        this.isSendingItem = false;
        await this._route.navigateByUrl('');
      }, error => {
        console.error(error);
        this.isSendingItem = false;
      });
    } else {
      this.isSendingItem = false;
    }
  }
  
  onFileSelect(event): void {
    if(event.target.files.length > 0) {
      this.images.push(event.target.files[0]);
    }
  }

  openInputImage(): void {
    this.inputImage.nativeElement.click();
  }

  deleteFile(index: number): void {
    this.images.splice(index, 1);
  }

  private buildSendableItem(): Item {
    if(this.itemForm.valid) {
      const item = {} as Item;
      const measurement = {} as Measurement;

      measurement.width = this.itemForm.controls.width.value;
      measurement.height = this.itemForm.controls.height.value;
      measurement.length = this.itemForm.controls.length.value;
      measurement.unit = this.itemForm.controls.unit.value;
  
      item.name = this.itemForm.controls.name.value;
      item.details = this.itemForm.controls.details.value;
      item.suppliers = this.suppliers;
      item.measurement = measurement;
      
      return item;
    }

    return null;
  }

  private buildItemForm(): void {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      length: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    });
  }

  private _filter(value: Supplier): Supplier[] {
    let filterValue;

    if(typeof value === 'string') {
      filterValue = (value as string).toLocaleLowerCase();
    } else {
      filterValue = value.name.toLocaleLowerCase();
    }

    return this.allSuppliers.filter(supplier => supplier.name.toLocaleLowerCase().indexOf(filterValue) === 0);
  }
}
