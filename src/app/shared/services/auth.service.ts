import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { IAuthCredentials } from '../models/auth-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {}

  checkIfUserIsAuthenticated() {
    authState(this.auth).subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  register({ email, password }: IAuthCredentials): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(map((credentials) => credentials.user));
  }
}
