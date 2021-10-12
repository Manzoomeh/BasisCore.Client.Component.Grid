import { IColumnInfo, IFieldMakerCallback } from "./component/grid/IOptions";
import { ColumnType } from "./enum";

export type IGridSource = any[];

export type IDictionary<T> = { [key: string]: T };

export type ISortType = "asc" | "desc";

export type IGridColumnInfo = IColumnInfo & {
  title: string;
  type: ColumnType;
  name?: string;
  source: string | IFieldMakerCallback;
};

export type ISortInfo = {
  column: IGridColumnInfo;
  sort: ISortType;
};

export type SignalSourceCallback = (source: any) => void;
