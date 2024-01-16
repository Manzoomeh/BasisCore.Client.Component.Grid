import { IDictionary, IGridType, ISortType } from "../../type-alias";

export type FilterType = "none" | "simple" | "row";

export type HtmlDirection = "ltr" | "rtl";

export type ProcessType = "server" | "client" | "mix";

export type ProcessActionType = "server" | "client";

export type SelectType = "none" | "single" | "multi";

export type ITemplate = "template1" | "template2";

export type IGridOptions = {
  columns: IDictionary<IColumn>;
  filter?: FilterType;
  editMode?: IEditModeInfo;
  paging?: number[] | number;
  defaultPagingIndex?: number;
  rowNumber?: string;
  defaultSort: string | ISortInfo;
  pageCount?: number;
  pageNumber?: number;
  sorting?: boolean;
  culture: {
    deviceId?: number | string;
    template?: ITemplate;
    labels: IDictionary<string>;
  };
  rowMaker?: IRowMakerCallback;
  direction: HtmlDirection;
  process: ProcessType;
  ProcessActionType?: {
    search: ProcessActionType;
    paging: ProcessActionType;
    sort: ProcessActionType;
  };
  noData?: string | INoDataCallback | boolean;
  firstAndLastBtn?: boolean;
  information?: boolean;
  loader?: string | ILoaderMaker | boolean;
  refresh?: boolean;
  selectable?: boolean | SelectType;
  selectAll?: boolean;
  selectedSourceId?: string;
  refreshSourceId?: string;
  mode?: IGridType;
  widthCard?: IWidthCArd;
  modeButtons?: boolean;
  cardCount?: number;
  pagingAction?: IPagingActionCallback;
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
export type IEditModeInfo = {
  newRowsSourceId: string;
  columns: IEditModeColumnInfo[];
};
export type IEditModeColumnInfo = {
  key: string;
  type: string;
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

export type IWidthCArd = {
  title: string;
  image?: string;
  action?: object;
};

export type ICellMakerCallback = (
  row: any,
  data: any,
  element: HTMLElement
) => RawHtml;

export type IRowMakerCallback = (row: any, element: HTMLElement) => void;

export type IFieldMakerCallback = (row: any) => any;

export type INoDataCallback = (td: HTMLTableCellElement) => void;

export type ILoaderMaker = () => RawHtml;

export type RawHtml = string;

export type IPagingActionCallback = (element: HTMLElement, pageNumber: Number) => any;
