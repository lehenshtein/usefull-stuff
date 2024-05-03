import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { items } from '@shared/helpers/menu-items.helper';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { ModalService } from './shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    DialogModule,
    SignInModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private modalService = inject(ModalService);
  private authService = inject(AuthService);
  isLogged = this.modalService.logged;
  // user = this.authService.user$;

  items: MenuItem[] = items;

  ngOnInit(): void {
    this.authService.checkIfTokenIsExpired();
  }

  showModal() {
    this.modalService.toggleModal();
  }

  signOut() {
    try {
      this.authService.logout().subscribe((user) => {
        console.log('User logged out: ', user);
        this.modalService.setLoggedOut();
      });
    } catch (error) {
      console.error(
        'Following error occured while trying to logout user: ',
        error
      );
    }
    this.modalService.setLoggedOut();
  }
}
