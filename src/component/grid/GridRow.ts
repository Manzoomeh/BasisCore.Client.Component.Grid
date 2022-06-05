import { ColumnType } from "../../enum";
import { ISortInfo } from "../../type-alias";
import Grid from "./Grid";
import Item from "./Item"

export default class GridRow extends Item {

  public get uiElement(): HTMLElement {
   
    if (!this._uiElement) {
      this._uiElement = document.createElement("tr");
      
      this._owner.columns.forEach((column) => {
        const td = document.createElement("td");
        
        if (column.cssClass) {
          Array.isArray(column.cssClass)
            ? td.classList.add(...column.cssClass)
            : td.classList.add(column.cssClass);
        }
        
        switch (column.type) {
          case ColumnType.data: {
            td.setAttribute("data-bc-data", "");      
            const tmpValue = Reflect.get(this._dataProxy, column.name);
            if (column.cellMaker) {
              td.innerHTML = column.cellMaker(this.data, tmpValue, td) ?? tmpValue;
            } else {
              td.appendChild(document.createTextNode(tmpValue?.toString()));
            }
            break;
            
          }
          case ColumnType.sort: {
            td.setAttribute("data-bc-order", "");
            td.appendChild(document.createTextNode(this.order.toString()));
            this._orderChanged = false;
            break;
          }
          case ColumnType.select: {
            td.setAttribute("data-bc-select", "");

            this._checkBox = document.createElement("input");
            this._checkBox.type =
              this._owner.options.selectable === "single" ? "radio" : "checkbox";
            this._checkBox.name = this._owner.id;
            this._checkBox.addEventListener("change", (e) => {
              e.preventDefault();
              this._owner.onSelectionChange();
            });
            td.appendChild(this._checkBox);
            this._orderChanged = false;
            break;
          }
          default:
            break;
        }
        this._uiElement.appendChild(td);

      });
      if (this._owner.options.rowMaker) {
        this._owner.options.rowMaker(this.data, this._uiElement);
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
    super(owner, data, order)
  }

  
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
