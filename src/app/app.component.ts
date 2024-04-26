import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { items } from '@shared/helpers/menu-items.helper';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  items: MenuItem[] = items;

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkIfUserIsAuthenticated();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form.value);

    this.authService
      .register(this.form.getRawValue())
      .pipe(take(1))
      .subscribe((user) => {
        console.log(user);
      });
  }
}
