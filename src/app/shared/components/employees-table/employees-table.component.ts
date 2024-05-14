import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IEmployeeData } from '@app/shared/models/employee-data.interface';
import { IEmployeeHeader } from '@app/shared/models/employee-header-interface';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent {
  data = input.required<IEmployeeData[]>();
  headers = input.required<IEmployeeHeader[]>();
}
