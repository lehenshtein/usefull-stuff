import { UserRolesEnum } from '../enums/user-roles.enum';

export interface IRoleSelectItem {
  role: UserRolesEnum;
  name: string;
  disabled: boolean;
}
