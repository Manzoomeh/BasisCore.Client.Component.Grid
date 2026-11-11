import { HttpMethod, IFixValue } from "basiscore";
import { IDictionary, IGridType, ISortType } from "../../type-alias";
import { GridGuideOptions, GuideTargets, ColumnGuideConfig } from "./GuideConfig";

export type FilterType = "none" | "simple" | "row" | "advanced";

export type HtmlDirection = "ltr" | "rtl";

export type ProcessType = "server" | "client" | "mix";

export type ProcessActionType = "server" | "client";

export type SelectType = "none" | "single" | "multi";

export type ITemplate = "template1" | "template2" | "template3" | "template4";

export type IGridPresentation = {
  filterMode?: "panel" | "header" | "columns";
  showHeaderFilters?: boolean;
  quickFilter?: string;
  view?: "table" | "list" | "grid" | "mobile";
  density?: "compact" | "comfortable";
  search?: boolean;
  rowActions?: boolean;
  titleKey?: string;
  subtitleKey?: string;
  imageKey?: string;
  badgeKey?: string;
  onRowAction?: (row: any) => void;
  onPageSizeChange?: (size: number) => void;
  onSettings?: () => void;
};

export type ExportType = "excel";

export type FilterDataType = "text" | "select" | "autocomplete";

export type IGridOptions = {
  guide?: GridGuideOptions;
  guideTargets?: GuideTargets;
  presentation?: IGridPresentation;
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
  headerMaker?: IHeaderMakerCallback;
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
  export?: Array<IExportInfo>;
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
  compare?: (left: any, right: any) => number;
  source?: string | IFieldMakerCallback;
  title?: string;
  sort?: boolean;
  width?: string;
  filter?: boolean;
  filterData?: IFilterData;
  cellMaker?: ICellMakerCallback;
  cssClass?: string | Array<string>;
  headerCssClass?: string | Array<string>;
  guide?: ColumnGuideConfig;
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

export type IHeaderMakerCallback = (element: HTMLElement) => RawHtml | void;

export type IFieldMakerCallback = (row: any) => any;

export type INoDataCallback = (td: HTMLTableCellElement) => void;

export type ILoaderMaker = () => RawHtml;

export type RawHtml = string;

export type IPagingActionCallback = (element: HTMLElement, pageNumber: Number) => any;

export type IExportInfo = {
  type: ExportType;
  tooltip: string;
  fileName?: string;
  url: string;
  method: HttpMethod;
  contentType?: string;
  data?: string;
};

export type IFilterData = {
  type: FilterDataType;
  inputType?: "search" | "number" | "date";
  link?: string;
  fixValues?: Array<IFixValue>;
};
