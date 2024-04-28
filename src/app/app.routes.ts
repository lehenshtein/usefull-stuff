import { Routes } from '@angular/router';
import {RoleGuardService} from "@shared/services/role-guard.service";
import {AuthGuardService} from "@shared/services/auth-guard.service";

export const routes: Routes = [
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
