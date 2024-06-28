import { ITableColumn } from './table-column.interface';
import { ITableData } from './table-data.interface';

export interface ITable {
  columns: ITableColumn[];
  data?: ITableData[];
  name: string;
  id: string;
}
