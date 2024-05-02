import { Routes } from '@angular/router';
import { TimezonesComponent } from '@app/pages/timezones/timezones.component';

export const routes: Routes = [
  {
    path: 'timezones',
    component: TimezonesComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService, RoleGuardService],
    data: {requiredRole: 'Admin'}
  },
  {
    path: 'super-admin',
    canActivate: [AuthGuardService, RoleGuardService],
    data: {requiredRole: 'SuperAdmin'}
  }
];
