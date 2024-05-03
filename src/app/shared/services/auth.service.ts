import { ErrorMessageService } from './error-message.service';
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IAuthCredentials } from '../models/auth-credentials.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageEnum } from '../models/local-storage.enum';
import { Router } from '@angular/router';
import { getIdTokenResult } from 'firebase/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private fs = inject(Firestore);
  private errorMessageService = inject(ErrorMessageService);
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();

  user$ = user(this.auth);

  private userSignal = signal<User | null>(null);
  user = computed(this.userSignal);

  get token(): string | null {
    return localStorage.getItem(LocalStorageEnum.AuthToken);
  }

  get savedUser(): IUser | null {
    const user = localStorage.getItem(LocalStorageEnum.User);

    return user ? <IUser>JSON.parse(user) : null;
  }

  userChanges() {
    this.user$
      .pipe(
        tap(async (user) => {
          if (user && !this.token) {
            const token = await user.getIdToken(true);
            this.setToken(token);
          }
        })
      )
      .subscribe((user) => {
        console.log('User changes: ', user);
        this.userSignal.set(user);
      });
  }

  setToken(token: string | null): void {
    if (!token) {
      return;
    }

    localStorage.setItem(LocalStorageEnum.AuthToken, token);
  }

  setUser(user: IUser): void {
    if (!user) {
      return;
    }

    localStorage.setItem(LocalStorageEnum.User, JSON.stringify(user));
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

  register({ email, password }: IAuthCredentials): Observable<IUser> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap(async ({ user }) => {
        const token = await user.getIdToken(true);
        this.setToken(token);
      }),
      catchError((error) => {
        return this.errorMessageService.handleError(error);
      }),
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
        ).pipe(map(() => userData));
      }),
      tap((userData) => {
        console.log('user data', userData);
        this.setUser(userData);
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
        this.clearLocalStorage();
      })
    );
  }

  private clearLocalStorage(): void {
    localStorage.removeItem(LocalStorageEnum.AuthToken);
    localStorage.removeItem(LocalStorageEnum.User);
  }
}
