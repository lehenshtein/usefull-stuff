import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { IAuthCredentials } from '../models/auth-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {}

  // Subscribe in app component to listen to user changes
  isAuthenticated(): Observable<User | null> {
    return authState(this.auth).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  register({ email, password }: IAuthCredentials): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(map((credentials) => credentials.user));
  }

  login({ email, password }: IAuthCredentials): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credentials) => credentials.user)
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
