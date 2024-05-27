import { Routes } from '@angular/router';
import { TimezonesComponent } from '@app/pages/timezones/timezones.component';
import { AuthGuardService } from '@shared/services/auth-guard.service';
import { RoleGuardService } from '@shared/services/role-guard.service';
import { DropdownGeneratorComponent } from '@shared/components/dropdown-generator/dropdown-generator.component';

export const routes: Routes = [
  {
    path: 'timezones',
    component: TimezonesComponent,
  },
  {
    path: 'role-manager',
    loadComponent: () =>
      import('./pages/user-role-manager/user-role-manager.component').then(
        (m) => m.UserRoleManagerComponent
      ),
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      requiredRole: 'super-admin',
    },
  },
  {
    path: 'tables',
    loadComponent: () =>
      import('./pages/table-generator/table-generator.component').then(
        (m) => m.TableGeneratorComponent
      ),
  },
  {
    path: 'dropdown',
    component: DropdownGeneratorComponent
  }
  // {
  //   path: 'admin',
  //   canActivate: [AuthGuardService, RoleGuardService],
  //   data: {requiredRole: 'Admin'}
  // },
  // {
  //   path: 'super-admin',
  //   canActivate: [AuthGuardService, RoleGuardService],
  //   data: {requiredRole: 'SuperAdmin'}
  // }
];
