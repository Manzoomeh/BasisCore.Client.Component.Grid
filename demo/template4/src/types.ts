import type Grid from '../../../src/component/grid/Grid';
import type {IGridOptions,IColumnInfo,IFilterData} from '../../../src/component/grid/IOptions';
import type MaterialTemplate from '../../../src/component/grid/MaterialTemplate';

export type {Grid};
export type Row = Record<string, any>;
export type GridState = ReturnType<MaterialTemplate['captureState']>;
// The demo also exercises the legacy runtime's paging:false convention.
type DemoColumn = Omit<IColumnInfo,'filterData'> & {
  filterData?: Omit<IFilterData,'fixValues'> & {fixValues?: {id:string|number;value:string}[]};
};
export type Options = Omit<Partial<IGridOptions>, 'culture' | 'paging' | 'columns'> & {
  culture?: Partial<IGridOptions['culture']>;
  paging?: IGridOptions['paging'] | false;
  columns: Record<string,DemoColumn>;
};
