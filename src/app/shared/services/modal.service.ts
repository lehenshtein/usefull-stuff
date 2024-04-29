import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSignal = signal<boolean>(false);
  private loggedSignal = signal<boolean>(false);

  toggleModal() {
    this.showModalSignal.set(!this.showModalSignal());
  }

  closeModal() {
    this.showModalSignal.set(false);
  }

  setLogged() {
    this.loggedSignal.set(true);
  }

  setLoggedOut() {
    this.loggedSignal.set(false);
  }

  isVisible() {
    return this.showModalSignal();
  }

  isLogged() {
    return this.loggedSignal();
  }
}
