import { DataTypesEnum } from '../enums/data-types.enum';

export interface ITableHeader {
  headerName: string;
  key: string;
  width: string;
  type: DataTypesEnum;
}
