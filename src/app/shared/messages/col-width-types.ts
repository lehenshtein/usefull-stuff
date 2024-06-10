import { IColumnWidth } from '../models/column-width.interface';

export const widthTypes: IColumnWidth[] = [
  {
    suffix: 'px',
    minValue: 50,
    maxValue: 500,
    placeholder: '50...500px',
  },
  {
    suffix: '%',
    minValue: 5,
    maxValue: 100,
    placeholder: '5...100%',
  },
];
