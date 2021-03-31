import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Person } from 'src/app/model/person.model';
import { User } from 'src/app/model/user.model';
import { AddressService } from 'src/app/service/address.service';
import { CityService } from 'src/app/service/city.service';
import { UfService } from 'src/app/service/uf.service';
import { Address } from '../../model/address.model';
import { City } from '../../model/city.model';
import { UF } from '../../model/uf.model';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
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
export class UserFormComponent implements OnInit {
  @ViewChild('password2Field', {static: true}) password2Field: ElementRef<MatFormField>;

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form : FormGroup;

  usernameQuery: Subject<string> = new Subject<string>();
  isSearchingUsername = false;
  isFetchingLocation = false;
  hasFoundUsername;
  isFetchingLocationFailed;
  areEqualPasswords;

  debounceSub: Subject<string> = new Subject<string>();

  allCities = [] as City[];
  allUfs = [] as UF[];

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private ufSvc: UfService,
    private citySvc: CityService,
    private addressSvc: AddressService
  ) {}

  ngOnInit(): void {
    this.ufSvc.getAll().subscribe((res: any)  => this.allUfs = res);
    this.buildAllForms();
    this.buildUsernameSubject();

    this.debounceSub.pipe(debounceTime(300)).subscribe(query => this.fetchLocation(query))
  }

  checkUsername(query: string): void {
    if (this.step1Form.controls.username.valid) {
      this.usernameQuery.next(query);
    }
  }

  checkPasswords(): void {
    const password: string = this.step1Form.controls.password.value;
    const confirmPassword: string = this.step1Form.controls.confirmPassword.value;

    this.areEqualPasswords = password === confirmPassword;
    
    if(!this.areEqualPasswords) {
      this.step1Form.controls.confirmPassword.setErrors({incorrect: true});
    }
  }

  checkCEP(): void {
    if(this.step3Form.controls.cep.valid) {
      this.debounceSub.next(this.step3Form.controls.cep.value);
    }
  }

  fetchLocation(query): void {
    this.isFetchingLocation = true;
    this.isFetchingLocationFailed = false;

    this.addressSvc.fetchLocation(query).subscribe(res => {
      this.isFetchingLocation = false;

      this.citySvc.fetchByUf(res.city.uf).subscribe(
        res1 => this.allCities = res1,
        error => console.error(error),
        () => {
          this.step3Form.controls.uf.setValue(res.city.uf.id);
          this.step3Form.controls.city.setValue(res.city.id);
          this.step3Form.controls.district.setValue(res.district);
          this.step3Form.controls.location.setValue(res.placeDesc);
        });
    }, error => {
      this.isFetchingLocation = false;
      this.step3Form.controls.cep.setErrors({incorrect: true});
      this.isFetchingLocationFailed = true;
      console.error(error);
    });
  }

  get isFirstFormValid(): boolean {
    return  this.step1Form.valid && (this.step1Form.controls.password.value === this.step1Form.controls.confirmPassword.value);
  }

  private buildAllForms(): void {
    this.step1Form = this.formBuilder.group({
      username: [undefined, [
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.minLength(4)
      ]],
      confirmPassword: ['', []
      ]
    });

    this.step2Form = this.formBuilder.group({
      name: ['', []],
      rg: ['', []],
      cpf: ['', []],
      email: ['', [
        Validators.email
      ]]
    });

    this.step3Form = this.formBuilder.group({
      cep: [undefined, [
        Validators.minLength(8),
        Validators.maxLength(8)
      ]],
      uf: ['', []],
      city: ['', []],
      location: ['', []],
      district: ['', []]
    });
  }

  private buildUsernameSubject(): void {
    this.usernameQuery.pipe(
      tap( _ => {
        this.hasFoundUsername = true;
      }),
      debounceTime(1100)
    ).subscribe(query => {
      this.isSearchingUsername = true;

      this.userSvc.hasUserByUsername(query).subscribe(res => {
        this.hasFoundUsername = res

        if(this.hasFoundUsername)
          this.step1Form.controls.username.setErrors({incorrect: true});

        this.isSearchingUsername = false;
      }, error => {
        console.error(error);
        this.isSearchingUsername = false;
      });
    });
  }

  private buildSendableUser(): User {
    const person = {} as Person;
    const user = {} as User;
    const addresses = [] as Address[];

    person.name = this.step2Form.controls.name.value;
    person.rg = this.step2Form.controls.rg.value;
    person.cpf = this.step2Form.controls.cpf.value;
    person.email = this.step2Form.controls.email.value;

    user.username = this.step1Form.controls.username.value;
    user.password = this.step1Form.controls.confirmPassword.value;

    addresses.push({
      zipCode: this.step3Form.controls.cep.value,
      placeDesc: this.step3Form.controls.location.value,
      district: this.step3Form.controls.district.value,
      city: this.allCities.find(value => value.id === this.step3Form.controls.city.value)
    });


    person.addresses = addresses;
    user.person = person;
    user.role = 'admin'

    return user;
  }

  sendAll(): void {
    const data = this.buildSendableUser();

    this.userSvc.create(data).subscribe(res => console.log(res), err => console.error(err))
  }

  fetchCities(): void {
    this.citySvc.fetchByUf(this.step2Form.controls.uf.value).subscribe(res => {
      console.log(res);
    })
  }
}
