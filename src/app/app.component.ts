import { AuthService } from './shared/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { items } from '@shared/helpers/menu-items.helper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  items: MenuItem[] = items;

  ngOnInit() {
    this.checkTokenValidity();
  }

  private checkTokenValidity() {
    const token = this.authService.token;

    if (token && this.authService.isTokenExpired()) {
      this.authService.logout().subscribe();
    }
  }
}
