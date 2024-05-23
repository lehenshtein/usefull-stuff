import { FormControl } from '@angular/forms';
import { UserRolesEnum } from '../enums/user-roles.enum';

export interface IEditForm {
  roles: FormControl<UserRolesEnum[]>;
}
