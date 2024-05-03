import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "@shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkTokenValidity();
  }

  checkTokenValidity(): Observable<boolean> {
    const token = this.authService.token;
    if (!token) {
      return of(false);
    }
    const isExpired = this.authService.isTokenExpired();
    return of(!isExpired);
  }
}
