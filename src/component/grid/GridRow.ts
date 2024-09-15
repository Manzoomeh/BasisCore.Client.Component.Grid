import { ColumnType } from "../../enum";
import { ISortInfo } from "../../type-alias";
import Grid from "./Grid";
import Item from "./Item";
import template1Layout from "./../../asset/layout-template1.html";
import template2Layout from "./../../asset/layout-template2.html";
import template3Layout from "./../../asset/layout-template3.html";
import { IBCUtil } from "basiscore";

declare const $bc:IBCUtil;

export default class GridRow extends Item {
  public get uiElement(): HTMLElement {
    if (!this._uiElement) {
      if (this._owner.deviceId == 1) {
        this._uiElement = document.createElement("tr");
        this._uiElement.setAttribute("data-sys-tr", "");
        
        this._owner.columns.forEach((column) => {
          const td = document.createElement("td");
          td.setAttribute("data-sys-td", "");
          
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
                if ((this._checkBox as HTMLInputElement).checked) {
                  this._checkBox.setAttribute("checked", "");
                  (this._checkBox as HTMLInputElement).checked = true;
                } else {
                  this._checkBox.removeAttribute("checked");
                  (this._checkBox as HTMLInputElement).checked = false;
                }
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
      } 
      else if (this._owner.deviceId == 2) {
        let copyTemplateLayout;
  
        switch (this._owner.options.culture?.template) {
          case "template1": {
            copyTemplateLayout = template1Layout;
            break;
          }
          case "template2": {
            copyTemplateLayout = template2Layout;
            break;
          }
          case "template3": {
            copyTemplateLayout = template3Layout;
            break;
          }
          default:
            break;
        }
        const itemContainer = $bc.util.toHTMLElement(copyTemplateLayout) as HTMLDivElement;
        const main_itemContainer = document.createElement('div')
        main_itemContainer.setAttribute("data-bc-grid-temp3-items","items")
        if (this._owner.options.culture?.template === "template3" && this._owner.options.selectable) {
          const checkBoxWrapper = document.createElement("div")
          this._checkBox = document.createElement("input");
          checkBoxWrapper.appendChild(this._checkBox)
          checkBoxWrapper.setAttribute("data-bc-grid-selectable","")
          this._checkBox.type = this._owner.options.selectable === "single" ? "radio" : "checkbox";
          this._checkBox.name = this._owner.id;
          this._checkBox.addEventListener("change", (e) => {
              e.preventDefault();
              this._owner.onSelectionChange();
          });

          main_itemContainer.appendChild(checkBoxWrapper)
        }
        
        this._owner.columns.forEach((column) => {
        
          const position: string = (this._owner?.options?.culture?.template === "template3") ? "#2" : column.position;
          if (position) {
            if (this._owner.options.culture?.template === "template3") {
              
              const section3 = itemContainer.querySelector('[data-position="#3"]').cloneNode(true) as HTMLDivElement;
             
              const section1 = section3.querySelector('[data-position="#1"]') as HTMLDivElement;
              const section2 = section3.querySelector('[data-position="#2"]') as HTMLDivElement;

              if (section1) {
                if (column.cssClass) {
                  Array.isArray(column.cssClass)
                      ? main_itemContainer.classList.add(...column.cssClass)
                      : main_itemContainer.classList.add(column.cssClass);
                }

                switch (column.type) {
                  case ColumnType.data: {
                      if (section1 && section2) {
                         
                          
                          section1.innerHTML = column.title;
                          
                          const tmpValue = Reflect.get(this._dataProxy, column.name);
                          
                        

                          if (column.cellMaker) {
                            section2.innerHTML = column.cellMaker(this.data, tmpValue, section2) ?? tmpValue;
                          } else {
                            section2.appendChild(document.createTextNode(tmpValue?.toString()));
                          }

                   
                      }
                      break;
                  }
                  case ColumnType.sort: {
                    main_itemContainer.setAttribute("data-bc-order", "");
                    main_itemContainer.appendChild(document.createTextNode(this.order.toString()));
                      this._orderChanged = false;
                      break;
                  }
                  case ColumnType.select: {
                    main_itemContainer.setAttribute("data-bc-select", "");
                    
                      this._checkBox = document.createElement("input");
                      this._checkBox.type = this._owner.options.selectable === "single" ? "radio" : "checkbox";
                      this._checkBox.name = this._owner.id;
                      this._checkBox.addEventListener("change", (e) => {
                          e.preventDefault();
                          this._owner.onSelectionChange();
                      });
                      main_itemContainer.appendChild(this._checkBox);
                      this._orderChanged = false;
                      break;
                  }
                  default:
                      break;
              }
           
              main_itemContainer.appendChild(section3)
              // main_itemContainer.appendChild(section2)
  
              
              }
            }
            else {
              const container = (itemContainer.querySelector(`[data-position="${column.position}"]`) as HTMLElement);
              
              if (container) {
                container.innerHTML = "";
                
                if (column.cssClass) {
                  Array.isArray(column.cssClass)
                    ? container.classList.add(...column.cssClass)
                    : container.classList.add(column.cssClass);
                }
                

                switch (column.type) {
                  
                  case ColumnType.data: {
                    container.setAttribute("data-bc-data", "");                  
                    const tmpValue = Reflect.get(this._dataProxy, column.name);
                    if (column.cellMaker) {
                      container.innerHTML = column.cellMaker(this.data, tmpValue, container) ?? tmpValue;
                    } else {
                      container.appendChild(document.createTextNode(tmpValue?.toString()));
                    }
                    break;
                  }
                  case ColumnType.sort: {
                    container.setAttribute("data-bc-order", "");
                    container.appendChild(document.createTextNode(this.order.toString()));
                    this._orderChanged = false;
                    break;
                  }
                  case ColumnType.select: {
                    container.setAttribute("data-bc-select", "");
                    this._checkBox = document.createElement("input");
                    this._checkBox.type =
                      this._owner.options.selectable === "single" ? "radio" : "checkbox";
                    this._checkBox.name = this._owner.id;
                    this._checkBox.addEventListener("change", (e) => {
                      e.preventDefault();
                      this._owner.onSelectionChange();
                    });
                    container.appendChild(this._checkBox);
                    this._orderChanged = false;
                    break;
                  }
                  default:
                    break;
                }
              }
          }
            
          }
          // }
          
   
          
          
        });
       
        if (this._owner.options.culture?.template === "template3") {
        
          const divElementclr = document.createElement('div');
          divElementclr.className = 'clr'; 
          main_itemContainer.appendChild(divElementclr);
          this._uiElement = main_itemContainer;
        }
        else{
          this._uiElement = itemContainer;
        }
      
        
    
        if (this._owner.options.rowMaker) {
          this._owner.options.rowMaker(this.data, this._uiElement);
        }
      }

    } 
    else if (this._orderChanged) {
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