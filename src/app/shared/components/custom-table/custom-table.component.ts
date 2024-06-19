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
import {
  TableEditCancelEvent,
  TableEditCompleteEvent,
  TableEditInitEvent,
  TableModule,
} from 'primeng/table';
import { ITableColumn } from '@app/shared/models/table-column.interface';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownItemsPipe } from '@app/shared/pipes/dropdown-items.pipe';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    FormsModule,
    DropdownModule,
    DropdownItemsPipe,
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent {
  editComplete = output<TableEditCompleteEvent>();
  editCancel = output<TableEditCancelEvent>();
  editInit = output<TableEditInitEvent>();

  data = input.required<ITableData[]>();
  columns = input.required<ITableColumn[]>();

  get DataTypesEnum() {
    return DataTypesEnum;
  }
}
