import { DataTypesEnum } from '../enums/data-types.enum';

export interface ITableHeader {
  value: string;
  headerName: string;
  width: string;
  type: DataTypesEnum;
}
