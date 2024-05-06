import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function compareValidator(
  compareControl: AbstractControl | null
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value !== compareControl?.value ? { notEqual: true } : null;
  };
}
