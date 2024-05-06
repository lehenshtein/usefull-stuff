import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const requiredRole = route.data['requiredRole'];
    const user = this.authService.savedUser;

    if (!user) {
      return of(false);
    }

    return of(user.roles.includes(requiredRole));
  }
}
