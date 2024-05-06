import { Injectable, computed, inject, signal } from '@angular/core';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialogService = inject(DialogService);
  private loggedSignal = signal<boolean>(false);
  logged = computed(this.loggedSignal);

  dialogRef: DynamicDialogRef | undefined;

  showModal(component: any, header: string) {
    this.dialogRef = this.dialogService.open(component, {
      header: header,
      modal: true,
      width: '40vw',
      breakpoints: {
        '1280px': '50vw',
        '960px': '65vw',
        '768px': '80vw',
        '640px': '90vw',
      },
    });
  }

  closeModal() {
    this.dialogRef?.close();
    this.dialogRef = undefined;
  }

  setLogged() {
    this.loggedSignal.set(true);
  }

  setLoggedOut() {
    this.loggedSignal.set(false);
  }

  isLogged() {
    return this.loggedSignal();
  }
}
