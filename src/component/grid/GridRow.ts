import { ColumnType } from "../../enum";
import { ISortInfo } from "../../type-alias";
import Grid from "./Grid";

export default class GridRow {
  public readonly data: any;
  readonly dataProxy: any;
  private readonly owner: Grid;
  public order: number;
  private _uiElement: HTMLTableRowElement = null;
  public get uiElement(): HTMLTableRowElement {
    if (!this._uiElement) {
      this._uiElement = document.createElement("tr");
      this.owner.columns.forEach((column) => {
        const td = document.createElement("td");
        if (column.cssClass) {
          Array.isArray(column.cssClass)
            ? td.classList.add(...column.cssClass)
            : td.classList.add(column.cssClass);
        }
        switch (column.type) {
          case ColumnType.Data: {
            td.setAttribute("data-bc-data", "");
            const tmpValue = Reflect.get(this.dataProxy, column.name);
            if (column.cellMaker) {
              td.innerHTML =
                column.cellMaker(this.data, tmpValue, td) ?? tmpValue;
            } else {
              td.appendChild(document.createTextNode(tmpValue?.toString()));
            }
            break;
          }
          case ColumnType.Sort: {
            td.setAttribute("data-bc-order", "");
            td.appendChild(document.createTextNode(this.order.toString()));
            this._orderChanged = false;
            break;
          }
          default:
            break;
        }
        this._uiElement.appendChild(td);
      });
      if (this.owner.options.rowMaker) {
        this.owner.options.rowMaker(this.data, this._uiElement);
      }
    } else if (this._orderChanged) {
      const cel = this._uiElement.querySelector("[data-bc-order]");
      if (cel) {
        cel.textContent = this.order.toString();
      }
      this._orderChanged = false;
    }
    return this._uiElement;
  }

  constructor(owner: Grid, data: any, order: number) {
    this.data = data;
    this.dataProxy = {};
    this.owner = owner;
    this.order = order + 1;
    this.owner.columns
      .filter((x) => x.type == ColumnType.Data)
      .forEach((column) =>
        Reflect.set(
          this.dataProxy,
          column.name,
          typeof column.source === "string"
            ? Reflect.get(this.data, column.source)
            : column.source(this.data)
        )
      );
  }

  private _orderChanged: boolean = true;
  public setOrder(order: number): void {
    this.order = order + 1;
    this._orderChanged = true;
  }

  public acceptableByRowFilter(filter: object): boolean {
    let retVal = true;
    for (const key of Reflect.ownKeys(filter)) {
      const element = Reflect.get(filter, key);
      const value = Reflect.get(this.dataProxy, key)?.toString().toLowerCase();
      retVal = retVal && value.indexOf(element) >= 0;
      if (!retVal) {
        break;
      }
    }
    return retVal;
  }
  public acceptableBySimpleFilter(filter: string): boolean {
    const colInfo = this.owner.columns
      .filter((col) => col.type === ColumnType.Data)
      .find((col) => {
        let retVal = false;
        if (col.filter) {
          const value = Reflect.get(this.dataProxy, col.name)
            ?.toString()
            .toLowerCase();
          retVal = value && value.indexOf(filter) >= 0;
        }
        return retVal;
      });
    return colInfo ? true : false;
  }

  public static compare(
    first: GridRow,
    second: GridRow,
    sortInfo: ISortInfo
  ): number {
    let valFirst = Reflect.get(
      sortInfo.column.title ? first.dataProxy : first,
      sortInfo.column.name
    );
    let valSecond = Reflect.get(
      sortInfo.column.title ? second.dataProxy : second,
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
}
