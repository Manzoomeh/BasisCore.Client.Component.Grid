import { ColumnType } from "../../enum";
import { ISortInfo } from "../../type-alias";
import Grid from "./Grid";
import Item from "./Item";

export default class Card extends Item {
  public get uiElement(): HTMLElement {
    if (!this._uiElement) {
      this._uiElement = document.createElement("div");
      this._uiElement.setAttribute("data-bc-card", "");
      const div = document.createElement("div");
      div.setAttribute("data-bc-card-data", "");
      const cardDiv = document.createElement("div");
      const titleDescDiv = document.createElement("div")
      titleDescDiv.setAttribute("data-bc-card-title","")
      this._owner.cards.forEach((column) => {
        if (column.name == "title") {
          const tmpValue = Reflect.get(this._dataProxy, column.title);    
          const cardSpan = document.createElement("span") 
          cardSpan.setAttribute("data-bc-card-titleText","")         
          cardSpan.textContent = tmpValue?.toString();
          titleDescDiv.appendChild(cardSpan)
        } 
        else if (column.name == "image") {
          const tmpValue = Reflect.get(this._dataProxy, column.title);
          if (column.cellMaker) {
            cardDiv.innerHTML =  column.cellMaker(this.data, tmpValue, cardDiv) ?? tmpValue;
          }
          else{
           
            const cardImage = document.createElement("img");
            cardImage.setAttribute("src", tmpValue?.toString());
            cardDiv.appendChild(cardImage);
          }
         
        }
        else if(column.name == "info"){   
          const tmpValue = Reflect.get(this._dataProxy, column.title);          
          const cardSpan = document.createElement("span")
          cardSpan.setAttribute("data-bc-card-info","")       
          cardSpan.textContent = tmpValue?.toString();
          titleDescDiv.appendChild(cardSpan)
        }
        else if(column.name == "action"){   
          const tmpValue = Reflect.get(this._dataProxy, column.title);
          const cardAction = document.createElement("div")
          cardAction.innerHTML =column.cellMaker(this.data, tmpValue, div) ?? tmpValue;
          div.appendChild(cardDiv)
          div.appendChild(titleDescDiv)
          div.appendChild(cardAction) ;
        }
  
      });

      
      this._uiElement.appendChild(div);

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
    super(owner, data, order);
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
          const value = Reflect.get(this._dataProxy, col.name)
            ?.toString()
            .toLowerCase();
          retVal = value && value.indexOf(filter) >= 0;
        }
        return retVal;
      });
    return colInfo ? true : false;
  }

  public static compare(
    first: Card,
    second: Card,
    sortInfo: ISortInfo
  ): number {
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
