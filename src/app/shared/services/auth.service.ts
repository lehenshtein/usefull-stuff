import { ErrorMessageService } from './error-message.service';
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Observable,
  catchError,
  from,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IAuthCredentials } from '../models/auth-credentials.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageEnum } from '../enums/local-storage.enum';
import { Router } from '@angular/router';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { IUser } from '../models/user.interface';
import { UserRolesEnum } from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private fs = inject(Firestore);
  private errorMessageService = inject(ErrorMessageService);
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();

  user$ = authState(this.auth).pipe(
    tap((user) => {
      if (user && !this.token) {
        this.setAuthToken(user);
      }

      if (!user && this.token) {
        this.clearLocalStorage();
      }
    }),
    shareReplay(1)
  );

  get token(): string | null {
    return localStorage.getItem(LocalStorageEnum.AuthToken);
  }

  get savedUser(): IUser | null {
    const user = localStorage.getItem(LocalStorageEnum.User);

    return user ? <IUser>JSON.parse(user) : null;
  }

  setToken(token: string | null): void {
    if (!token) return;
    localStorage.setItem(LocalStorageEnum.AuthToken, token);
  }

  private async setAuthToken(user: User): Promise<void> {
    const token = await user.getIdToken(true);
    this.setToken(token);
  }

  setUser(user: IUser | undefined): void {
    if (!user) return;
    localStorage.setItem(LocalStorageEnum.User, JSON.stringify(user));
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  checkIfTokenIsExpired(): void {
    if (this.token && this.isTokenExpired()) {
      this.logout()
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['/timezones']);
        });
    }
  }

  register({ email, password }: IAuthCredentials): Observable<IUser> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      catchError((error) => {
        return this.errorMessageService.handleError(error);
      }),
      tap(async ({ user }) => this.setAuthToken(user)),
      switchMap(({ user }) => {
        const userDoc = doc(this.fs, 'users', user.uid);
        const userData: IUser = {
          email: user.email!,
          roles: [],
          uid: user.uid,
        };

        return from(
          setDoc(userDoc, {
            email: user.email,
            roles: [],
            uid: user.uid,
          })
        ).pipe(
          take(1),
          map(() => userData)
        );
      }),
      tap((userData) => this.setUser(userData))
    );
  }

  login({ email, password }: IAuthCredentials): Observable<IUser | undefined> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(async ({ user }) => this.setAuthToken(user)),
      switchMap(({ user }) => {
        return this.getUserData(user.uid).pipe(take(1));
      }),
      tap((userData) => this.setUser(userData)),
      catchError((error) => {
        return this.errorMessageService.handleError(error);
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(tap(() => this.clearLocalStorage()));
  }

  getUserData(uid: string): Observable<IUser | undefined> {
    const userDoc = doc(this.fs, 'users', uid);
    return docData(userDoc) as Observable<IUser | undefined>;
  }

  setUserRoles(uid: string, roles: UserRolesEnum[]): Observable<void> {
    const userDoc = doc(this.fs, 'users', uid);
    return from(setDoc(userDoc, { roles }, { merge: true })).pipe(
      catchError((error) => {
        return this.errorMessageService.handleError(error);
      })
    );
  }

  private clearLocalStorage(): void {
    localStorage.removeItem(LocalStorageEnum.AuthToken);
    localStorage.removeItem(LocalStorageEnum.User);
  }
}
