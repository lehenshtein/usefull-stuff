import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function compareValidator(
  compareControl: AbstractControl | null
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEqual = control.value === compareControl?.value;

    return !isEqual ? { notEqual: true } : null;
  };
}
