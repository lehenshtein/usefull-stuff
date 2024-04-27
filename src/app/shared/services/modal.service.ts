import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSignal = signal<boolean>(false);

  toggleModal() {
    this.showModalSignal.set(!this.showModalSignal());
  }

  isVisible() {
    return this.showModalSignal();
  }
}
