import { FormControl } from '@angular/forms';

export interface ILoginGroup {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  repeatPassword?: FormControl<string | null>;
}
