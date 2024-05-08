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
import { ListboxModule } from 'primeng/listbox';
import { UserRolesEnum } from '@app/shared/models/user-roles.enum';
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

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [ButtonModule, ListboxModule, ReactiveFormsModule],
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

  roles: UserRolesEnum[] = [UserRolesEnum.Admin, UserRolesEnum.SuperAdmin];
  selectedRoles: UserRolesEnum[] = [];

  private userSignal = signal<IUser | null>(null);
  user = computed(this.userSignal);

  loading: boolean = false;
  editForm!: FormGroup<IEditForm>;

  get rolesControl(): FormControl<UserRolesEnum[]> {
    return this.editForm.controls['roles'];
  }

  ngOnInit(): void {
    this.userSignal.set(this.dialogConfig.data.user);
    this.initEditForm();

    this.editForm.valueChanges.subscribe((value) => {
      console.log('form value: ', value);
    });
  }

  private initEditForm(): void {
    this.editForm = this.fb.group({
      roles: this.fb.control<UserRolesEnum[]>(this.user()?.roles || [], {
        nonNullable: true,
      }),
    });
  }

  onSubmit(): void {
    if (!this.editForm.valid) {
      return;
    }

    const roles = this.editForm.getRawValue().roles;
    this.loading = true;
    this.editForm.disable();

    this.authService
      .setUserRoles(this.user()!.uid, roles)
      .pipe(take(1))
      .subscribe(() => {
        this.modalService.closeModal();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User roles were changed successfully.',
        });

        this.loading = false;
        this.editForm.enable();
      });
  }
}
