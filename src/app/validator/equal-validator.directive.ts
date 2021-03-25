import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: `[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]`,
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true}
  ]
})
export class EqualValidator implements  Validator {

  constructor(
    @Attribute('validateEqual') public validateEqual: string
  ) { }

  validate(control: AbstractControl): { [key: string]: any} {
    const v = control.value;
    const e = control.root.get(this.validateEqual);

    if (e && v !== e.value) { return { validateEqual: false }; }

    return null;
  }
}
