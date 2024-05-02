import { ErrorMessageService } from './error-message.service';
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, catchError, from, map, tap } from 'rxjs';
import { IAuthCredentials } from '../models/auth-credentials.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageEnum } from '../models/local-storage.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private errorMessageService = inject(ErrorMessageService);
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();

  user$ = user(this.auth);

  get token(): string | null {
    return localStorage.getItem(LocalStorageEnum.AuthToken);
  }

  setToken(token: string | null): void {
    if (!token) {
      return;
    }

    localStorage.setItem(LocalStorageEnum.AuthToken, token);
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  checkIfTokenIsExpired(): void {
    if (this.token && this.isTokenExpired()) {
      this.logout().subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  register({ email, password }: IAuthCredentials): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map((credentials) => credentials.user),
      tap(async (user) => {
        const token = await user.getIdToken(true);
        this.setToken(token);
      }),
      catchError((error) => {
        return this.errorMessageService.handleError(error);
      })
    );
  }

  login({ email, password }: IAuthCredentials): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credentials) => credentials.user),
      tap(async (user) => {
        const token = await user.getIdToken(true);
        this.setToken(token);
      }),
      catchError((error) => {
        return this.errorMessageService.handleError(error);
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        localStorage.removeItem(LocalStorageEnum.AuthToken);
      })
    );
  }
}
