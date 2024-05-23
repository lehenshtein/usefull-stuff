import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@app/shared/services/modal.service';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '@app/shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { IAuthCredentials } from '@app/shared/models/auth-credentials.interface';
import { compareValidator } from '@app/shared/validators/compare.validator';
import { messages } from '@app/shared/messages/messages';

@Component({
  selector: 'app-sign-in-modal',
  standalone: true,
  imports: [
    DialogModule,
    TabViewModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    DividerModule,
    ButtonModule,
    RippleModule,
    RouterLink,
  ],
  templateUrl: './sign-in-modal.component.html',
  styleUrl: './sign-in-modal.component.scss',
})
export class SignInModalComponent implements OnInit {
  private modalService = inject(ModalService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  visible: boolean = false;
  validationErrors = messages.validationErrors;
  emailPattern = /^(?=.*[a-zA-Z]).+$/;
  passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

  userLoginGroup!: FormGroup;
  userRegisterGroup!: FormGroup;

  ngOnInit(): void {
    this.initLoginRegisterForms();
  }

  initLoginRegisterForms() {
    this.userLoginGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.email,
          Validators.pattern(this.emailPattern),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.passwordPattern),
        ],
      ],
    });

    this.userRegisterGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.email,
          Validators.pattern(this.emailPattern),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.passwordPattern),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
    });

    this.userRegisterGroup
      .get('repeatPassword')
      ?.setValidators([
        Validators.required,
        compareValidator(this.userRegisterGroup.get('password')),
      ]);

    this.userRegisterGroup.updateValueAndValidity();
  }

  userLoginCred(): IAuthCredentials {
    return {
      email: this.userLoginGroup.get('email')?.value,
      password: this.userLoginGroup.get('password')?.value,
    };
  }

  userRegisterCred(): IAuthCredentials {
    return {
      email: this.userRegisterGroup.get('email')?.value,
      password: this.userRegisterGroup.get('password')?.value,
    };
  }

  loginUser() {
    if (this.userLoginGroup.invalid) {
      return;
    }

    try {
      this.authService.login(this.userLoginCred()).subscribe((user) => {
        console.log('User logged in: ', user); // for debug
        this.modalService.setLogged();
      });

      this.modalService.closeModal();
    } catch (error) {
      console.error(
        'Following error occured while trying to login user: ',
        error
      );
    }
  }

  registerUser() {
    if (this.userRegisterGroup.invalid) {
      return;
    }

    try {
      this.authService.register(this.userRegisterCred()).subscribe((user) => {
        console.log('User successfully registered: ', user);
        this.modalService.setLogged();
      });

      this.modalService.closeModal();
    } catch (error) {
      console.error(
        'Following error occured while trying to register user: ',
        error
      );
    }
  }
}
