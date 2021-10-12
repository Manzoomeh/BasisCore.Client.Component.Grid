import { IGridOptions, IOffsetOptions } from "./IOptions";
import {
  IGridColumnInfo,
  ISortType,
  IGridSource,
  SignalSourceCallback,
} from "../../type-alias";
import "./../../asset/style.css";
import GridRow from "./GridRow";
import IGrid from "./IGrid";
import ClientProcess from "../paginate/ClientPaginate";
import { ColumnType } from "../../enum";
import IGridProcessManager from "../paginate/IGridProcessManager";
import ServerProcess from "../paginate/ServerProcess";
import NoPaginate from "../paginate/NoPaginate";
import MixedProcess from "../paginate/MixedProcess";

export default class Grid implements IGrid {
  readonly container: HTMLElement;
  readonly table: HTMLTableElement;
  readonly options: IGridOptions;
  readonly head: HTMLTableSectionElement;
  readonly body: HTMLTableSectionElement;
  private readonly _tableContainer: HTMLElement;
  private readonly _loaderContainer: HTMLElement;
  private readonly _informationContainer: HTMLElement;

  static _defaults: Partial<IGridOptions>;
  private rows: GridRow[] = new Array<GridRow>();
  private source: IGridSource;
  private columnsInitialized = false;
  pageSize: number;
  pageNumber: number = 1;
  private processManager: IGridProcessManager;
  public readonly columns: IGridColumnInfo[] = new Array<IGridColumnInfo>();
  private readonly _informationFormatter: (from: number, to: number, total: number) => string;

  static getDefaults(): Partial<IGridOptions> {
    if (!Grid._defaults) {
      Grid._defaults = {
        filter: "simple",
        process: "client",
        paging: [10, 30, 50],
        defaultPagingIndex: 0,
        pageCount: 10,
        sorting: true,
        pageNumber: 1,
        direction: "rtl",
        noData: true,
        firstAndLastBtn: true,
        information: true,
        rowNumber: "#",
        loader: true,
        culture: {
          labels: {
            search: "Search :",
            pageSize: "Page Size :",
            next: "Next",
            previous: "Previous",
            first: "First",
            last: "last",
            noData: "No Data Find",
            information: "Showing ${from} to ${to} from Total ${total}"
          },
        },
      };
    }
    return Grid._defaults;
  }

  constructor(
    container: HTMLElement,
    options?: IGridOptions,
    signalSourceCallback?: SignalSourceCallback
  ) {
    if (!container) {
      throw "table element in null or undefined";
    }
    this.options = {
      ...Grid.getDefaults(),
      ...(options ?? ({} as any)),
    };
    this.options.culture.labels = {
      ...Grid.getDefaults().culture.labels,
      ...(options?.culture?.labels ?? {}),
    };
    this.container = container;
    this.container.setAttribute("data-bc-grid", "");
    if (this.options.direction) {
      this.container.style["direction"] = this.options.direction;
    }

    this.table = document.createElement("table");
    this.table.setAttribute("data-bc-table", "");
    this.head = document.createElement("thead");
    this.table.appendChild(this.head);
    this.body = document.createElement("tbody");
    this.table.appendChild(this.body);

    this._tableContainer = document.createElement("div");
    this._tableContainer.setAttribute("data-bc-table-container", "");
    if (typeof this.options.loader === "function") {
      this._loaderContainer = document.createElement("div");
      this._loaderContainer.setAttribute("data-bc-loader-container", "");
      this._tableContainer.appendChild(this._loaderContainer);
    }
    this._tableContainer.appendChild(this.table);

    if (this.options.information) {
      this._informationContainer = document.createElement("div");
      this._informationContainer.setAttribute(
        "data-bc-information-container",
        ""
      );
    }
    this.createUI(signalSourceCallback);

    this._informationFormatter = Function("from", "to", "total", `return \`${this.options.culture.labels.information}\``) as any;
  }

  private createUI(signalSourceCallback?: SignalSourceCallback): void {
    if (this.options.filter == "simple") {
      const filter = document.createElement("div");
      filter.setAttribute("data-bc-filter-container", "");
      this.container.appendChild(filter);
      const label = document.createElement("label");
      label.appendChild(
        document.createTextNode(this.options.culture.labels.search)
      );
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      label.appendChild(input);
      input.addEventListener("keyup", (_) => {
        const newFilter = input.value.toLowerCase();
        if (this.processManager.filter != newFilter) {
          this.processManager.filter = newFilter;
          this.processManager.applyUserAction();
        }
      });
      filter.appendChild(label);
    }
    this.container.appendChild(this._tableContainer);
    if (this.options.paging) {
      const pageSizeContainer = document.createElement("div");
      pageSizeContainer.setAttribute("data-bc-pagesize-container", "");
      this.container.insertBefore(pageSizeContainer, this._tableContainer);
      const pagingContainer = document.createElement("div");
      pagingContainer.setAttribute("data-bc-paging-container", "");
      pagingContainer.setAttribute("data-bc-no-selection", "");
      this.container.appendChild(pagingContainer);
      switch (this.options.process) {
        case "server": {
          this.processManager = new ServerProcess(
            this,
            pageSizeContainer,
            pagingContainer,
            signalSourceCallback
          );
          break;
        }
        case "client": {
          this.processManager = new ClientProcess(
            this,
            pageSizeContainer,
            pagingContainer,
            signalSourceCallback
          );
          break;
        }
        case "mix": {
          this.processManager = new MixedProcess(
            this,
            pageSizeContainer,
            pagingContainer,
            signalSourceCallback
          );
          break;
        }
        default: {
          throw Error(`Type '${this.options.process}' not support in grid`);
        }
      }
    } else {
      this.processManager = new NoPaginate(this, signalSourceCallback);
    }
    if (this._informationContainer) {
      this.container.appendChild(this._informationContainer);
    }
    this.createTable();
  }

  private addTableRowFilterPart() {
    if (this.options.filter === "row") {
      const tr = document.createElement("tr");
      tr.setAttribute("data-bc-no-selection", "");
      tr.setAttribute("data-bc-filter", "");
      this.head.appendChild(tr);
      this.columns.forEach((columnInfo) => {
        if (columnInfo.filter) {
          const td = document.createElement("td");
          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("placeholder", columnInfo.title);
          input.addEventListener("keyup", (_) => {
            const newFilter = input.value.toLowerCase();
            let mustUpdate = false;
            if (newFilter.length > 0) {
              if (!this.processManager.filter) {
                this.processManager.filter = {};
              }
              if (newFilter != this.processManager.filter[columnInfo.name]) {
                this.processManager.filter[columnInfo.name] = newFilter;
                mustUpdate = true;
              }
            } else {
              if (
                typeof this.processManager.filter[columnInfo.name] !==
                "undefined"
              ) {
                delete this.processManager.filter[columnInfo.name];
                mustUpdate = true;
              }
            }
            if (mustUpdate) {
              this.processManager.applyUserAction();
            }
          });
          td.appendChild(input);
          tr.appendChild(td);
        } else {
          tr.appendChild(document.createElement("td"));
        }
      });
    }
  }

  private createTable(): void {
    const colgroup = document.createElement("colgroup");
    this.table.prepend(colgroup);
    const tr = document.createElement("tr");
    tr.setAttribute("data-bc-no-selection", "");
    tr.setAttribute("data-bc-column-title", "");
    this.head.appendChild(tr);
    if (this.options.rowNumber) {
      const col = document.createElement("col");
      col.setAttribute("width", "5%");
      colgroup.appendChild(col);

      const columnInfo: IGridColumnInfo = {
        title: this.options.rowNumber,
        source: null,
        name: null,
        type: ColumnType.Sort,
      };
      tr.appendChild(this.createColumn(columnInfo));
    }
    if (this.options.columns) {
      Object.getOwnPropertyNames(this.options.columns).forEach((property) => {
        var value = this.options.columns[property];
        const col = document.createElement("col");
        let columnInfo: IGridColumnInfo;
        if (typeof value === "string") {
          columnInfo = {
            title: value,
            source: property,
            name: property,
            sort: this.options.sorting,
            type: ColumnType.Data,
            filter: true,
          };
        } else {
          columnInfo = {
            ...{
              title: property,
              source: property,
              name: property,
              sort: this.options.sorting,
              type: ColumnType.Data,
              filter: true,
            },
            ...value,
          };
          if (value.width) {
            col.setAttribute("width", value.width);
          }
        }
        colgroup.appendChild(col);
        tr.appendChild(this.createColumn(columnInfo));
      });
      this.columnsInitialized = true;
      this.addTableRowFilterPart();
    }
  }

  private createColumn(columnInfo: IGridColumnInfo): HTMLTableCellElement {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(columnInfo.title));
    if (columnInfo.type === ColumnType.Data && (columnInfo.sort ?? true)) {
      td.setAttribute("data-bc-sorting", "");
      td.addEventListener("click", (_) => {
        if (this.processManager.sortInfo?.column !== columnInfo) {
          this.head
            .querySelectorAll("[data-bc-sorting]")
            .forEach((element) => element.setAttribute("data-bc-sorting", ""));
        }
        let sortType = td.getAttribute("data-bc-sorting") as ISortType;
        if (sortType) {
          sortType = sortType === "asc" ? "desc" : "asc";
        } else {
          sortType = "asc";
        }
        this.processManager.sortInfo = {
          column: columnInfo,
          sort: sortType,
        };
        td.setAttribute("data-bc-sorting", sortType);
        this.processManager.applyUserAction();
      });
      if (this.options.defaultSort) {
        let sortType: ISortType = null;
        let find = false;
        if (typeof this.options.defaultSort === "string") {
          if (this.options.defaultSort === columnInfo.source) {
            find = true;
          }
        } else if (this.options.defaultSort.name === columnInfo.source) {
          find = true;
          sortType = this.options.defaultSort.sort;
        }
        if (find) {
          this.processManager.sortInfo = {
            column: columnInfo,
            sort: sortType ?? "asc",
          };
          td.setAttribute("data-bc-sorting", this.processManager.sortInfo.sort);
        }
      }
    }
    this.columns.push(columnInfo);
    return td;
  }

  public setSource(source: IGridSource, offsetOptions?: IOffsetOptions): void {
    if (!this.columnsInitialized) {
      const tr = this.head.querySelector("tr");
      if (source && source.length > 0 && source[0]) {
        Object.getOwnPropertyNames(source[0]).forEach((property) => {
          const columnInfo: IGridColumnInfo = {
            title: property,
            source: property,
            name: property,
            sort: this.options.sorting,
            type: ColumnType.Data,
            filter: true,
          };
          tr.appendChild(this.createColumn(columnInfo));
        });
      }
      this.columnsInitialized = true;
      this.addTableRowFilterPart();
    }
    this.hideUIProgress();
    //TODO:add repository for store generated ui element data
    this.rows = [];
    this.source = source;
    this.source?.forEach((row, index) => {
      const rowObj = new GridRow(this, row, index);
      this.rows.push(rowObj);
    });

    this.processManager.setSource(this.rows, offsetOptions);
  }

  public displayRows(rows: GridRow[], from: number, to: number, total: number): void {
    this.body.innerHTML = "";
    if (rows?.length > 0) {
      rows?.forEach((row) => this.body.appendChild(row.uiElement));
    } else if (
      typeof this.options.noData !== "undefined" &&
      this.options.noData
    ) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      tr.appendChild(td);
      td.colSpan = this.columns.length;
      switch (typeof this.options.noData) {
        case "boolean": {
          td.appendChild(
            document.createTextNode(this.options.culture.labels.noData)
          );
          break;
        }
        case "string": {
          td.appendChild(document.createTextNode(this.options.noData));
          break;
        }
        case "function": {
          this.options.noData(td);
          break;
        }
      }
      this.body.appendChild(tr);
    }

    this._informationContainer.innerText = this._informationFormatter(from, to, total);
  }

  public showUIProgress(): void {
    if (this.options.loader) {
      switch (typeof this.options.loader) {
        case "function":
          {
            this._loaderContainer.innerHTML = this.options.loader();
            break;
          }
        case "string":
          {
            this._tableContainer.style["background-image"] = `url("${this.options.loader}")`;
          }
        case "boolean":
          {
            this._tableContainer.setAttribute("data-process", "");
            break;
          }
      }
      this.table.style["opacity"] = ".4";
    }
  }

  public hideUIProgress(): void {
    if (this.options.loader) {
      switch (typeof this.options.loader) {
        case "function":
          {
            this._loaderContainer.innerHTML = "";
            break;
          }
        case "string":
          {
            this._tableContainer.style["background-image"] = "";
          }
        case "boolean":
          {
            this._tableContainer.removeAttribute("data-process");
            break;
          }
      }
      this.table.style["opacity"] = "1";
    }
  }
}