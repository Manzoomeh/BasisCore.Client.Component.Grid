import { IDictionary, ISortType } from "../../type-alias";

export type FilterType = "none" | "simple" | "row";

export type HtmlDirection = "ltr" | "rtl";

export type ProcessType = "server" | "client" | "mix";

export type IGridOptions = {
  columns: IDictionary<IColumn>;
  filter?: FilterType;
  paging?: number[] | number;
  defaultPagingIndex?: number;
  rowNumber?: string;
  defaultSort: string | ISortInfo;
  pageCount?: number;
  pageNumber?: number;
  sorting?: boolean;
  culture: {
    labels: IDictionary<string>;
  };
  rowMaker?: IRowMakerCallback;
  direction: HtmlDirection;
  process: ProcessType;
  noData?: string | INoDataCallback | boolean;
  firstAndLastBtn?: boolean;
  information?: boolean;
  loader?: string | ILoaderMaker | boolean;
};

export type IOffsetOptions = {
  total: number;
  from: number;
};
export type IColumn = string | IColumnInfo;

export type ISortInfo = {
  name: string;
  sort?: ISortType;
};

export type IColumnInfo = {
  source?: string | IFieldMakerCallback;
  title?: string;
  sort?: boolean;
  width?: string;
  filter?: boolean;
  cellMaker?: ICellMakerCallback;
  cssClass?: string | Array<string>;
};

export type ICellMakerCallback = (
  row: any,
  data: any,
  element: HTMLTableCellElement
) => RawHtml;

export type IRowMakerCallback = (
  row: any,
  element: HTMLTableRowElement
) => void;

export type IFieldMakerCallback = (row: any) => any;

export type INoDataCallback = (td: HTMLTableCellElement) => void;

export type ILoaderMaker = () => RawHtml;

export type RawHtml = string;
