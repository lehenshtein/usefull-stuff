import { UserRolesEnum } from './user-roles.enum';

export interface IRoleSelectItem {
  role: UserRolesEnum;
  name: string;
  disabled: boolean;
}
