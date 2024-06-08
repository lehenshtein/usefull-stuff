import { DataTypesEnum } from '@app/shared/enums/data-types.enum';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITableData } from '@app/shared/models/table-data.interface';
import { ITableHeader } from '@app/shared/models/table-header-interface';
import {
  TableEditCancelEvent,
  TableEditCompleteEvent,
  TableEditInitEvent,
  TableModule,
} from 'primeng/table';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [TableModule, DatePipe, FormsModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent {
  editComplete = output<TableEditCompleteEvent>();
  editCancel = output<TableEditCancelEvent>();
  editInit = output<TableEditInitEvent>();

  data = input.required<ITableData[]>();
  headers = input.required<ITableHeader[]>();

  get DataTypesEnum() {
    return DataTypesEnum;
  }

  getDropdownItems(name: string) {
    return localStorage.getItem(name)
  }
}
