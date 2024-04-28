import { Injectable, inject } from '@angular/core';
import { AuthErrorCodes } from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  messageService = inject(MessageService);

  handleError(error: Error): Observable<never> {
    const errorMessage = this.getErrorMessage(error);

    this.messageService.add({
      severity: 'error',
      detail: errorMessage,
      summary: 'Error',
    });

    // Use errorMessage variable to display in console only errors that can be shown to the user
    return throwError(() => new Error(error.message));
  }

  private getErrorMessage(error: Error): string {
    let result: string = '';

    const message = error.message;
    const index = message.indexOf('(');

    if (index !== -1) {
      const code = message.substring(index + 1, message.indexOf(')')); // Res example: auth/invalid-email

      switch (code) {
        case AuthErrorCodes.EMAIL_EXISTS: {
          result = 'Email already in use.';
          break;
        }

        case AuthErrorCodes.INVALID_EMAIL: {
          result = 'Invalid email.';
          break;
        }

        case AuthErrorCodes.INVALID_PASSWORD: {
          result = 'Wrong password.';
          break;
        }

        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS: {
          result = 'Invalid username or password.';
          break;
        }

        case AuthErrorCodes.WEAK_PASSWORD: {
          result = 'Password should be at least 6 characters.';
          break;
        }

        // You can add more errors

        default: {
          result = 'Unexpected error occured.';
          break;
        }
      }
    }

    return result;
  }
}
