import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, from, map, tap } from 'rxjs';
import { IAuthCredentials } from '../models/auth-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  private userSignal = signal<User | null>(null);
  user = computed(this.userSignal);

  getUser(): Observable<User | null> {
    return authState(this.auth).pipe(
      tap((user) => {
        this.userSignal.set(user);
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
