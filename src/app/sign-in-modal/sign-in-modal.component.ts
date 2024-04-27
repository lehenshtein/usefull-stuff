import { Component, effect, inject } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-sign-in-modal',
  standalone: true,
  imports: [DialogModule, TabViewModule],
  templateUrl: './sign-in-modal.component.html',
  styleUrl: './sign-in-modal.component.scss',
})
export class SignInModalComponent {
  private modalService = inject(ModalService);

  visible: boolean = false;

  constructor() {
    effect(() => {
      this.visible = this.modalService.isVisible();
    });
  }

  closeModal() {
    this.modalService.toggleModal();
  }
}
