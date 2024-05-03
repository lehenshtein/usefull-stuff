import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "@shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  //   const requiredRole = route.data['requiredRole'];
  //
  //   return this.authService.getUser().pipe(
  //     take(1),
  //     map(user => {
  //       if(user && user.role === requiredRole){
  //         return true;
  //       } else {
  //         return this.router.createUrlTree(['/no-access']);
  //       }
  //     })
  //   );
  // }
}
