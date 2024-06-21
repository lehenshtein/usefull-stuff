import { MessageService } from 'primeng/api';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserRolesEnum } from '@app/shared/enums/user-roles.enum';
import { IUser } from '@app/shared/models/user.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { IEditForm } from '@app/shared/models/edit-form.interface';
import { AuthService } from '@app/shared/services/auth.service';
import { take } from 'rxjs';
import { IRoleSelectItem } from '@app/shared/models/role-select-item.interface';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, MultiSelectModule],
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditModalComponent implements OnInit {
  private authService = inject(AuthService);
  private dialogConfig = inject(DynamicDialogConfig);
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private messageService = inject(MessageService);

  private savedUser = this.authService.savedUser;
  roles: IRoleSelectItem[] = [];
  loading: boolean = false;
  editForm!: FormGroup<IEditForm>;

  private userSignal = signal<IUser | null>(null);
  user = computed(this.userSignal);

  get rolesControl(): FormControl<UserRolesEnum[]> {
    return this.editForm.controls['roles'];
  }

  ngOnInit(): void {
    this.initUser();
    this.initEditForm();
  }

  private initUser(): void {
    this.userSignal.set(this.dialogConfig.data.user);

    this.roles = [
      { name: 'Admin', role: UserRolesEnum.Admin, disabled: false },
      {
        name: 'Super Admin',
        role: UserRolesEnum.SuperAdmin,
        disabled: this.user()?.uid === this.savedUser?.uid,
      },
    ];
  }

  private initEditForm(): void {
    this.editForm = this.fb.group<IEditForm>({
      roles: this.fb.control<UserRolesEnum[]>(this.user()?.roles || [], {
        nonNullable: true,
      }),
    });
  }

  onSubmit(): void {
    const roles = this.editForm.getRawValue().roles;

    if (
      !this.editForm.valid ||
      this.areArraysEqual(roles, this.user()!.roles)
    ) {
      return;
    }

    this.loading = true;
    this.editForm.disable();

    this.setUserRoles(roles);
  }

  private setUserRoles(roles: UserRolesEnum[]): void {
    this.authService
      .setUserRoles(this.user()!.uid, roles)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.modalService.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User roles were changed successfully.',
          });

          this.loading = false;
          this.editForm.enable();
          this.editForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.editForm.enable();

          this.rolesControl.setValue(this.user()?.roles ?? []);
        },
      });
  }

  private areArraysEqual(arr1: unknown[], arr2: unknown[]): boolean {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
