import { ColumnType } from "../../enum";
import { ISortInfo } from "../../type-alias";
import Grid from "./Grid";

export  default abstract class GridRow {
  public readonly data: any;
  public readonly _dataProxy: any;
  public readonly _owner: Grid;
  public order: number;
  public _uiElement: HTMLElement = null;
  public _checkBox: HTMLInputElement;
  abstract  get uiElement(): HTMLElement ;

  constructor(owner: Grid, data: any, order: number) {
    this.data = data;
    this._dataProxy = {};
    this._owner = owner;
    this.order = order + 1;
    
    this._owner.columns
      .filter((x) => x.type == ColumnType.data)
      .forEach((column) =>
        Reflect.set(
          this._dataProxy,
          column.name,
          typeof column.source === "string"
            ? Reflect.get(this.data, column.source)
            : column.source(this.data)
        )
      );
      this._owner.cards
      .filter((x) => x.type == ColumnType.data)
      .forEach((column) =>
        Reflect.set(
          this._dataProxy,
          column.title,
          typeof column.source === "string"
            ? Reflect.get(this.data, column.title)
            : column.source(this.data)
        )
      );
  }

  public _orderChanged: boolean = true;
  public setOrder(order: number): void {
    this.order = order + 1;
    this._orderChanged = true;
  }

  public acceptableByRowFilter(filter: object): boolean {
    let retVal = true;
    for (const key of Reflect.ownKeys(filter)) {
      const element = Reflect.get(filter, key);
      const value = Reflect.get(this._dataProxy, key)?.toString().toLowerCase();
      retVal = retVal && value.indexOf(element) >= 0;
      if (!retVal) {
        break;
      }
    }
    return retVal;
  }
  public acceptableBySimpleFilter(filter: string): boolean {
    const colInfo = this._owner.columns
      .filter((col) => col.type === ColumnType.data)
      .find((col) => {
        let retVal = false;
        if (col.filter) {
          const value = Reflect.get(this._dataProxy, col.name)?.toString().toLowerCase();
          retVal = value && value.indexOf(filter) >= 0;
        }
        return retVal;
      });
    return colInfo ? true : false;
  }

  public static compare(first: GridRow, second: GridRow, sortInfo: ISortInfo): number {
    let valFirst = Reflect.get(
      sortInfo.column.title ? first._dataProxy : first,
      sortInfo.column.name
    );
    let valSecond = Reflect.get(
      sortInfo.column.title ? second._dataProxy : second,
      sortInfo.column.name
    );
    if (typeof valFirst === "string") {
      valFirst = valFirst.toLowerCase();
    }
    if (typeof valSecond === "string") {
      valSecond = valSecond.toLowerCase();
    }
    return valFirst > valSecond
      ? sortInfo.sort === "asc"
        ? 1
        : -1
      : valFirst < valSecond
      ? sortInfo.sort === "asc"
        ? -1
        : 1
      : 0;
  }

  public get selected() {
    return this._checkBox?.checked ?? false;
  }
}
