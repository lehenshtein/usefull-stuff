import { Component, effect, inject } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [],
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.scss',
})
export class UserEditModalComponent {
  private modalService = inject(ModalService);
}
