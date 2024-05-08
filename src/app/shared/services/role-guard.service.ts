import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { UserRolesEnum } from '../models/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const requiredRole: UserRolesEnum = route.data['requiredRole'];
    const user = this.authService.savedUser;

    if (!user) {
      return of(false);
    }

    return of(user.roles.includes(requiredRole));
  }
}
