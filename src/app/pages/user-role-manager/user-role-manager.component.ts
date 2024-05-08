import { ModalService } from '@app/shared/services/modal.service';
import {
  Component,
  OnInit,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { IUser } from '@app/shared/models/user.interface';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@app/shared/services/auth.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { debounceTime, delay, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UserEditModalComponent } from '@app/shared/components/user-edit-modal/user-edit-modal.component';

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
})
export class UserRoleManagerComponent implements OnInit {
  private authService = inject(AuthService);
  private fs = inject(Firestore);
  private modalService = inject(ModalService);

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
      .pipe(take(1))
      .subscribe((users) => {
        this.usersSignal.set(users as IUser[]);
        this.loading = false;
      });
  }

  editUser(user: IUser): void {
    this.modalService.showModal(UserEditModalComponent, {
      header: 'Edit user',
      data: { user },
    });
  }
}
