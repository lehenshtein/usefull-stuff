import { DataTypesEnum } from '../enums/data-types.enum';

export interface ITableColumn {
  headerName: string;
  key: string;
  width: string;
  type: {
    name: DataTypesEnum;
  };
}
