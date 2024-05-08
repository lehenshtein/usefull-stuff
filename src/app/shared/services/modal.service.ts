import { Injectable, computed, inject, signal } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
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

  showModal(component: any, config: DynamicDialogConfig) {
    const defaultConfig: DynamicDialogConfig = {
      header: 'Dialog',
      modal: true,
      width: '40vw',
      breakpoints: config.breakpoints || {
        '1280px': '50vw',
        '960px': '65vw',
        '768px': '80vw',
        '640px': '90vw',
      },
      ...config,
    };

    this.dialogRef = this.dialogService.open(component, defaultConfig);
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
