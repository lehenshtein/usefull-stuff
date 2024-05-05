import { Component, OnInit, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ModalService } from '@app/shared/services/modal.service';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@app/shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { IAuthCredentials } from '@app/shared/models/auth-credentials.interface';
import { ILoginGroup } from '@app/shared/models/login-group.interface';
import { compareValidator } from '@app/shared/validators/compare.validator';

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

  userLoginGroup!: FormGroup;
  userRegisterGroup!: FormGroup;

  constructor() {
    effect(() => {
      this.visible = this.modalService.isVisible();
    });
  }

  ngOnInit(): void {
    this.userLoginGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.email,
          Validators.pattern(/^(?=.*[a-zA-Z]).+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
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
          Validators.pattern(/^(?=.*[a-zA-Z]).+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
    });

    this.userRegisterGroup
      .get('repeatPassword')
      ?.setValidators(compareValidator(this.userRegisterGroup.get('password')));

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
    try {
      this.authService.login(this.userLoginCred()).subscribe((user) => {
        console.log('User logged in: ', user);
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

  resetGroupValues(fg: FormGroup<ILoginGroup>) {
    fg.patchValue({
      email: '',
      password: '',
      repeatPassword: '',
    });
  }

  closeModal() {
    this.modalService.closeModal();
    this.resetGroupValues(this.userLoginGroup);
    this.resetGroupValues(this.userRegisterGroup);
  }
}
