import { UserRolesEnum } from './user-roles.enum';

export interface IUser {
  email: string;
  roles: UserRolesEnum[];
  uid: string;
}
