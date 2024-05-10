import { ModalService } from '@app/shared/services/modal.service';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { IUser } from '@app/shared/models/user.interface';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { UserEditModalComponent } from '@app/shared/components/user-edit-modal/user-edit-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-role-manager',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
  ],
  templateUrl: './user-role-manager.component.html',
  styleUrl: './user-role-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoleManagerComponent implements OnInit {
  private fs = inject(Firestore);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);

  private usersSignal = signal<IUser[]>([]);
  users = computed(this.usersSignal);

  loading: boolean = false;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    const usersCollection = collection(this.fs, 'users');
    this.usersSignal.set([]);
    this.loading = true;

    collectionData(usersCollection)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        this.usersSignal.set(users as IUser[]);
        this.loading = false;
      });
  }

  onUserEdit(user: IUser): void {
    this.modalService.showModal(UserEditModalComponent, {
      header: 'Edit user',
      data: { user },
    });
  }
}
