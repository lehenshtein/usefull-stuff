import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IEmployeeData } from '@app/shared/models/employee-data.interface';
import { IEmployeeHeader } from '@app/shared/models/employee-header-interface';
import {
  TableEditCancelEvent,
  TableEditCompleteEvent,
  TableEditInitEvent,
  TableModule,
} from 'primeng/table';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [TableModule, DatePipe, FormsModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent {
  editComplete = output<TableEditCompleteEvent>();
  editCancel = output<TableEditCancelEvent>();
  editInit = output<TableEditInitEvent>();

  data = input.required<IEmployeeData[]>();
  headers = input.required<IEmployeeHeader[]>();
}
