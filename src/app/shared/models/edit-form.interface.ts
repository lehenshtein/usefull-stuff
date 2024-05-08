import { FormControl } from '@angular/forms';
import { UserRolesEnum } from './user-roles.enum';

export interface IEditForm {
  roles: FormControl<UserRolesEnum[]>;
}
