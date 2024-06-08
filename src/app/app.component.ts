import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { items } from '@shared/helpers/menu-items.helper';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { ModalService } from './shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'firebase/auth';
import { initializeStorage } from '@shared/helpers/localstorage.helper';
import { CustomTableComponent } from './shared/components/custom-table/custom-table.component';
import { DataTypesEnum } from './shared/enums/data-types.enum';
import { ITableData } from './shared/models/table-data.interface';
import { ITableColumn } from './shared/models/table-column.interface';

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
    CustomTableComponent,
  ],
  providers: [ModalService, DialogService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig);
  private modalService = inject(ModalService);
  private authService = inject(AuthService);
  private router = inject(Router);
  user = this.authService.user$;
  isLogged?: User | null;

  items: MenuItem[] = items;

  tableColumns: ITableColumn[] = [
    {
      key: 'myEmployee',
      headerName: 'Employees',
      width: {
        value: 200,
        type: 'px',
      },
      type: DataTypesEnum.Text,
    },
    {
      key: 'date',
      headerName: 'Start Date',
      width: {
        value: 200,
        type: 'px',
      },
      type: DataTypesEnum.Date,
    },
    {
      key: 'dropdownName',
      headerName: 'Dropdowns',
      width: {
        value: 100,
        type: 'px',
      },
      type: DataTypesEnum.Dropdown,
    },
  ];

  tableData: ITableData[] = [
    {
      myEmployee: 'John',
      date: Date.now().toString(),
    },
    {
      myEmployee: 'Sarah',
      date: (Date.now() + 1000000000).toString(),
      dropdownName: 'quantity',
    },
    {
      myEmployee: 'Shrek',
      date: (Date.now() + 1000000000).toString(),
      dropdownName: 'names',
    },
  ];

  ngOnInit(): void {
    this.authService.userChanges();
    this.authService.checkIfTokenIsExpired();
    this.primengConfig.ripple = true;
    initializeStorage();
    this.user.subscribe((user) => {
      this.isLogged = user;
    });
  }

  showModal() {
    this.modalService.showModal(SignInModalComponent, {
      header: 'Choose Sign In Option',
    });
  }

  signOut() {
    try {
      this.authService.logout().subscribe((user) => {
        console.log('User logged out: ', user); // for debug
        this.modalService.setLoggedOut();
        this.router.navigate(['/timezones']);
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
