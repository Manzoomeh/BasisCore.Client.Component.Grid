import { IGridOptions, IOffsetOptions } from "./IOptions";
import {
  IGridColumnInfo,
  ISortType,
  IGridSource,
  SignalSourceCallback,
  IGridCardInfo,
} from "../../type-alias";
import "./../../asset/style.css";
import GridRow from "./GridRow";
import IGrid from "./IGrid";
import ClientProcess from "../paginate/ClientPaginate";
import { ColumnType } from "../../enum";
import IGridProcessManager from "../paginate/IGridProcessManager";
import ServerProcess from "../paginate/ServerProcess";
import NoPaginate from "../paginate/NoPaginateProcessManager";
import MixedProcess from "../paginate/MixedProcess";
import Item from "./Item";
import Card from "./Card";
export default class Grid implements IGrid {
  private readonly _container: HTMLElement;
  private _table: HTMLElement;
  readonly options: IGridOptions;
  private _head: HTMLElement;
  private _body: HTMLElement;
  private _tableContainer: HTMLElement;
  private _loaderContainer: HTMLElement;
  private _informationContainer: HTMLElement;
  private readonly _onSignalSourceCallback: SignalSourceCallback;
  private readonly _selectionChangeCallback: SignalSourceCallback;
  static _defaults: Partial<IGridOptions>;
  private columnsInitialized = false;
  private processManager: IGridProcessManager;
  public columns: IGridColumnInfo[] = new Array<IGridColumnInfo>();
  public cards: IGridCardInfo[] = new Array<IGridCardInfo>();
  private readonly _informationFormatter: (
    from: number,
    to: number,
    total: number
  ) => string;
  public readonly id: string;
  private source: any;
  private _rows: Array<Item>;
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
        refresh: false,
        selectable: false,
        mode: "grid",
        modeButtons: false,
        cardCount: 5,
        culture: {
          labels: {
            search: "Search :",
            pageSize: "Page Size :",
            next: "Next",
            previous: "Previous",
            first: "First",
            last: "last",
            noData: "No Data Find",
            information: "Showing ${from} to ${to} from Total ${total}",
            refresh: "Refresh",
          },
        },
      };
    }
    return Grid._defaults;
  }

  constructor(
    container: HTMLElement,
    options?: IGridOptions,
    signalSourceCallback?: SignalSourceCallback,
    selectionChangeCallback?: SignalSourceCallback
  ) {
    if (!container) {
      throw "table element is null or undefined";
    }
    this.options = {
      ...Grid.getDefaults(),
      ...(options ?? ({} as any)),
    };
    this.options.culture.labels = {
      ...Grid.getDefaults().culture.labels,
      ...(options?.culture?.labels ?? {}),
    };
    this._container = container;
    this._container.setAttribute("data-bc-grid", "");
    if (this.options.direction) {
      this._container.style["direction"] = this.options.direction;
    }
    this._informationFormatter = Function(
      "from",
      "to",
      "total",
      `return \`${this.options.culture.labels.information}\``
    ) as any;
    this._onSignalSourceCallback = signalSourceCallback;
    this._selectionChangeCallback = selectionChangeCallback;
    this.id = Math.random().toString(36).substring(2);
    if (this.options.mode == "grid") {
      this.createUI();
    } else if (this.options.mode == "widthCard") {
      this.createUIWidthCard();
      this._container.setAttribute("data-bc-widthcard-mode","")
    }
  }

  private createUI(): void {
    this.columns = [];
    this._table = document.createElement("table");
    this._table.setAttribute("data-bc-table", "");
    this._head = document.createElement("thead");
    this._head.setAttribute("data-sys-thead", "");
    this._table.appendChild(this._head);
    this._body = document.createElement("tbody");
    this._table.appendChild(this._body);
    this._tableContainer = document.createElement("div");
    this._tableContainer.setAttribute("data-bc-table-container", "");
    if (typeof this.options.loader === "function") {
      this._loaderContainer = document.createElement("div");
      this._loaderContainer.setAttribute("data-bc-loader-container", "");
      this._tableContainer.appendChild(this._loaderContainer);
    }
    this._tableContainer.appendChild(this._table);
    if (this.options.information) {
      this._informationContainer = document.createElement("div");
      this._informationContainer.setAttribute("data-bc-information-container", "");
      this._informationContainer.setAttribute("data-sys-text-colorful", "");
    }
    const modes = document.createElement("div");
    const gridMode = document.createElement("div");
    const widthCardMode = document.createElement("div");
    gridMode.setAttribute("data-bc-grid-active-mode", "");
    gridMode.innerHTML = `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.714844 12.8571H21.2863V10.2857H0.714844V12.8571ZM0.714844 18H21.2863V15.4286H0.714844V18ZM0.714844 7.71429H21.2863V5.14286H0.714844V7.71429ZM0.714844 0V2.57143H21.2863V0H0.714844Z" />
    </svg>
    `;
    widthCardMode.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z" />
    </svg>
    `;
    modes.appendChild(gridMode);
    modes.appendChild(widthCardMode);
    widthCardMode.addEventListener("click", (e) => {
      this.options.mode = "widthCard";
      this._container.innerHTML = "";
      this._head.innerHTML = "";
      this._body.innerHTML = "";
      this._container.setAttribute("data-bc-widthcard-mode","")
      this.createUIWidthCard();
      this.setSource(this._rows);
    });
    modes.setAttribute("data-bc-grid-modes", "");
    const gridHeaderContainer = document.createElement("div");
    gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
    gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
    if (this.options.modeButtons == true) {
      gridHeaderContainer.appendChild(modes);
    }

    if (this.options.filter == "simple") {
      const filter = document.createElement("div");
      filter.setAttribute("data-bc-filter-container", "");
      gridHeaderContainer.appendChild(filter);
      const label = document.createElement("label");
      label.setAttribute("data-sys-text-colorful", "");
      label.appendChild(
        document.createTextNode(this.options.culture.labels.search)
      );
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("data-sys-input-text", "");
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
    this._container.appendChild(gridHeaderContainer);
    if (this.options.refresh) {
      const div = document.createElement("div");
      div.setAttribute("data-bc-refresh-container", "");
      this._container.appendChild(div);
      var btn = document.createElement("span");
      btn.innerHTML = this.options.culture.labels.refresh;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.tryLoadData();
      });
      div.appendChild(btn);
    }

    this._container.appendChild(this._tableContainer);
    if (this.options.paging) {
      let gridHeaderContainer = this._container.querySelector(
        "[data-bc-grid-header-container]"
      );
      if (!gridHeaderContainer) {
        gridHeaderContainer = document.createElement("div");
        gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
        gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
        this._container.insertBefore(gridHeaderContainer, this._tableContainer);
      }

      const pageSizeContainer = document.createElement("div");
      pageSizeContainer.setAttribute("data-bc-pagesize-container", "");
      gridHeaderContainer.appendChild(pageSizeContainer);

      const gridFooterContainer = document.createElement("div");
      gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
      gridFooterContainer.setAttribute("data-sys-paging-container", "");

      const pagingContainer = document.createElement("div");
      pagingContainer.setAttribute("data-bc-paging-container", "");
      pagingContainer.setAttribute("data-bc-no-selection", "");
      gridFooterContainer.appendChild(pagingContainer);

      this._container.appendChild(gridFooterContainer);

      switch (this.options.process) {
        case "server": {
          this.processManager = new ServerProcess(
            this,
            pageSizeContainer,
            pagingContainer
          );
          break;
        }
        case "client": {
          this.processManager = new ClientProcess(
            this,
            pageSizeContainer,
            pagingContainer
          );
          break;
        }
        case "mix": {
          this.processManager = new MixedProcess(
            this,
            pageSizeContainer,
            pagingContainer
          );
          break;
        }
        default: {
          throw Error(`Type '${this.options.process}' not support in grid`);
        }
      }
      if (typeof this.options.paging == "number") {
        // pageSizeContainer.style.display = "none";
        pageSizeContainer.remove();
        if (gridHeaderContainer.innerHTML == "") {
          gridHeaderContainer.remove();
        }
      }
    } else {
      this.processManager = new NoPaginate(this);
      if (gridHeaderContainer.innerHTML == "") {
        gridHeaderContainer.remove();
      }
    }
    if (this._informationContainer) {
      let gridFooterContainer = this._container.querySelector(
        "[data-bc-grid-footer-container]"
      );
      if (!gridFooterContainer) {
        gridFooterContainer = document.createElement("div");
        gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
        gridFooterContainer.setAttribute("data-sys-paging-container", "");
        this._container.appendChild(gridFooterContainer);
      }
      gridFooterContainer.appendChild(this._informationContainer);
    }
    this.createTable();
  }
  private addTableRowFilterPart() {
    if (this.options.filter === "row") {
      const tr = document.createElement("tr");
      tr.setAttribute("data-bc-no-selection", "");
      tr.setAttribute("data-bc-filter", "");
      tr.setAttribute("data-sys-tr", "");
      tr.innerHTML = "";
      this._head.appendChild(tr);
      this.columns.forEach((columnInfo) => {
        if (columnInfo.filter) {
          const td = document.createElement("td");
          td.setAttribute("data-sys-th", "");
          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("data-sys-input-text", "");
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
          const td = document.createElement("td");
          td.setAttribute("data-sys-th", "");
          tr.appendChild(td);
        }
      });
    }
  }
  private createTable(): void {
    const colgroup = document.createElement("colgroup");
    this._table.prepend(colgroup);
    const tr = document.createElement("tr");
    tr.setAttribute("data-bc-no-selection", "");
    tr.setAttribute("data-bc-column-title", "");
    tr.setAttribute("data-sys-tr", "");
    tr.innerHTML = "";
    this._head.appendChild(tr);
    if (this.options.rowNumber) {
      const col = document.createElement("col");
      col.setAttribute("width", "5%");
      colgroup.appendChild(col);

      const columnInfo: IGridColumnInfo = {
        title: this.options.rowNumber,
        source: null,
        name: null,
        type: ColumnType.sort,
      };
      tr.appendChild(this.createColumn(columnInfo));
    }
    if (this.options.selectable) {
      const col = document.createElement("col");
      col.setAttribute("width", "5%");
      colgroup.appendChild(col);

      const columnInfo: IGridColumnInfo = {
        title: "",
        source: null,
        name: null,
        type: ColumnType.select,
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
            type: ColumnType.data,
            filter: true,
          };
        } else {
          columnInfo = {
            ...{
              title: property,
              source: property,
              name: property,
              sort: this.options.sorting,
              type: ColumnType.data,
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
  private createUIWidthCard(): void {
    this.cards = [];
    this._table = document.createElement("div");
    this._table.setAttribute("data-bc-table", "");
    // this._head = document.createElement("div");
    // this._table.appendChild(this._head);
    this._body = document.createElement("div");
    this._table.appendChild(this._body);
    this._body.setAttribute("data-bc-card-wrapper", "");
    this._body.setAttribute("data-sys-grid-border-color", "");
    this._tableContainer = document.createElement("div");
    this._tableContainer.setAttribute("data-bc-table-container", "");
    if (typeof this.options.loader === "function") {
      this._loaderContainer = document.createElement("div");
      this._loaderContainer.setAttribute("data-bc-loader-container", "");
      this._tableContainer.appendChild(this._loaderContainer);
    }
    this._tableContainer.appendChild(this._table);
    if (this.options.information) {
      this._informationContainer = document.createElement("div");
      this._informationContainer.setAttribute("data-bc-information-container", "");
      this._informationContainer.setAttribute("data-sys-text-colorful", "");
    }
    const modes = document.createElement("div");
    modes.setAttribute("data-bc-grid-modes", "");
    const gridMode = document.createElement("div");
    const widthCardMode = document.createElement("div");

    gridMode.innerHTML = `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.714844 12.8571H21.2863V10.2857H0.714844V12.8571ZM0.714844 18H21.2863V15.4286H0.714844V18ZM0.714844 7.71429H21.2863V5.14286H0.714844V7.71429ZM0.714844 0V2.57143H21.2863V0H0.714844Z" />
    </svg>
    `;
    widthCardMode.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z" />
    </svg>
    `;
    const gridHeaderContainer = document.createElement("div");
    gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
    gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
    widthCardMode.setAttribute("data-bc-grid-active-mode", "");
    modes.appendChild(gridMode);
    modes.appendChild(widthCardMode);
    if (this.options.modeButtons == true) {
      gridHeaderContainer.appendChild(modes);
    }

    gridMode.addEventListener("click", (e) => {
      this.options.mode = "grid";
      this._container.innerHTML = "";
      // this._head.innerHTML = "";
      this._body.innerHTML = "";
      // this._container.removeAttribute("data-bc-widthcard-mode")
      this.createUI();
      this.setSource(this._rows);
    });
    if (this.options.filter == "simple") {
      const filter = document.createElement("div");
      filter.setAttribute("data-bc-filter-container", "");

      gridHeaderContainer.appendChild(filter);

      const label = document.createElement("label");
      label.setAttribute("data-sys-text-colorful", "");
      label.appendChild(
        document.createTextNode(this.options.culture.labels.search)
      );
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("data-sys-input-text", "");
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
    this._container.appendChild(gridHeaderContainer);
    if (this.options.refresh) {
      const div = document.createElement("div");
      div.setAttribute("data-bc-refresh-container", "");
      this._container.appendChild(div);
      var btn = document.createElement("span");
      btn.innerHTML = this.options.culture.labels.refresh;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.tryLoadData();
      });
      div.appendChild(btn);
    }

    this._container.appendChild(this._tableContainer);
    if (this.options.paging) {
      let gridHeaderContainer = this._container.querySelector(
        "[data-bc-grid-header-container]"
      );
      if (!gridHeaderContainer) {
        gridHeaderContainer = document.createElement("div");
        gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
        gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
        this._container.insertBefore(gridHeaderContainer, this._tableContainer);
      }
      const pageSizeContainer = document.createElement("div");
      pageSizeContainer.setAttribute("data-bc-pagesize-container", "");
      gridHeaderContainer.appendChild(pageSizeContainer);
      const gridFooterContainer = document.createElement("div");
      gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
      gridFooterContainer.setAttribute("data-sys-paging-container", "");

      const pagingContainer = document.createElement("div");
      pagingContainer.setAttribute("data-bc-paging-container", "");
      pagingContainer.setAttribute("data-bc-no-selection", "");
      gridFooterContainer.appendChild(pagingContainer);

      this._container.appendChild(gridFooterContainer);

      switch (this.options.process) {
        case "server": {
          this.processManager = new ServerProcess(
            this,
            pageSizeContainer,
            pagingContainer
          );
          break;
        }
        case "client": {
          this.processManager = new ClientProcess(
            this,
            pageSizeContainer,
            pagingContainer
          );
          break;
        }
        case "mix": {
          this.processManager = new MixedProcess(
            this,
            pageSizeContainer,
            pagingContainer
          );
          break;
        }
        default: {
          throw Error(`Type '${this.options.process}' not support in grid`);
        }
      }
      if (typeof this.options.paging == "number") {
        // pageSizeContainer.style.display = "none";
        pageSizeContainer.remove();
        if (gridHeaderContainer.innerHTML == "") {
          gridHeaderContainer.remove();
        }
      }
    } else {
      this.processManager = new NoPaginate(this);
      if (gridHeaderContainer.innerHTML == "") {
        gridHeaderContainer.remove();
      }
    }
    if (this._informationContainer) {
      let gridFooterContainer = this._container.querySelector(
        "[data-bc-grid-footer-container]"
      );
      if (!gridFooterContainer) {
        gridFooterContainer = document.createElement("div");
        gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
        gridFooterContainer.setAttribute("data-sys-paging-container", "");
        this._container.appendChild(gridFooterContainer);
      }
      gridFooterContainer.appendChild(this._informationContainer);
    }
    this.createWrapper();
  }
  private createWrapper(): void {
    // this._head.innerHTML = "";
    // const colgroup = document.createElement("div");
    // this._table.prepend(colgroup);
    // const tr = document.createElement("div");
    // tr.setAttribute("data-bc-no-selection", "");
    // tr.setAttribute("data-bc-column-title", "");
    // this._head.appendChild(tr);
    if (this.options.columns) {
      Object.getOwnPropertyNames(this.options.widthCard).forEach((property) => {
        var value = this.options.widthCard[property];
        // const col = document.createElement("col");
        let columnInfo: IGridCardInfo;
        if (typeof value === "string") {
          columnInfo = {
            title: value,
            source: property,
            name: property,
            sort: this.options.sorting,
            type: ColumnType.data,
            filter: true,
          };
   
        } else {
          columnInfo = {
            ...{
              title: property,
              source: property,
              name: property,
              sort: this.options.sorting,
              type: ColumnType.data,
              filter: true,
            },
            ...value,
          };
          // if (value.width) {
          //   col.setAttribute("width", value.width);
          // }
        }
        // colgroup.appendChild(col);
        // tr.appendChild(this.createItems(columnInfo));
        this.createItems(columnInfo);
      });
      this.columnsInitialized = true;
      // this.addWidthCArdFilterPart();
    }
  }
  private addWidthCArdFilterPart() {
    if (this.options.filter === "row") {
      const tr = document.createElement("div");
      tr.setAttribute("data-bc-no-selection", "");
      tr.setAttribute("data-bc-filter", "");
      this._head.appendChild(tr);
      this.columns.forEach((columnInfo) => {
        if (columnInfo.filter) {
          const td = document.createElement("div");
          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("data-sys-input-text", "");
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
  private createColumn(columnInfo: IGridColumnInfo): HTMLTableCellElement {
    const td = document.createElement("td");
    td.setAttribute("data-sys-th", "");
    // td.appendChild(document.createTextNode(columnInfo.title));
    td.innerHTML = columnInfo.title;
    if (columnInfo.type === ColumnType.data && (columnInfo.sort ?? true)) {
      td.setAttribute("data-bc-sorting", "");
      td.addEventListener("click", (_) => {
        if (this.processManager.sortInfo?.column !== columnInfo) {
          this._head
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
  private createItems(columnInfo: IGridCardInfo): HTMLElement {
    const td = document.createElement("div");

    if (columnInfo.type === ColumnType.data && (columnInfo.sort ?? true)) {
      td.setAttribute("data-bc-sorting", "");
      td.addEventListener("click", (_) => {
        if (this.processManager.sortInfo?.column !== columnInfo) {
          this._head
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

    this.cards.push(columnInfo);
    return td;
  }

  public setSource(source: IGridSource, offsetOptions?: IOffsetOptions): void {
    if (!this.columnsInitialized) {
      const tr = this._head.querySelector("tr");
      if (source && source.length > 0 && source[0]) {
        Object.getOwnPropertyNames(source[0]).forEach((property) => {
          const columnInfo: IGridColumnInfo = {
            title: property,
            source: property,
            name: property,
            sort: this.options.sorting,
            type: ColumnType.data,
            filter: true,
          };

          tr.appendChild(this.createColumn(columnInfo));
        });
      }
      this.columnsInitialized = true;
      this.addTableRowFilterPart();
    }
    this.hideUIProgress();
    if (this.source) {
      source = [];
      source = this.source;
      this.source = [];
    }
    if (this.options.mode == "grid") {
      this._rows = source.map((row, index) => new GridRow(this, row, index));
    } else if (this.options.mode == "widthCard") {
      this._rows = source.map((row, index) => new Card(this, row, index));
    }
    this.processManager.setSource(this._rows, offsetOptions);
    this.source = source;
  }

  public displayRows(
    rows: GridRow[],
    from: number,
    to: number,
    total: number
  ): void {
    this._body.innerHTML = "";
    if (rows?.length > 0) {
      rows?.forEach((row) => this._body.appendChild(row.uiElement));
    } else if (
      typeof this.options.noData !== "undefined" &&
      this.options.noData
    ) {
      let tr;
      let td;

      if (this.options.mode == "grid") {
        tr = document.createElement("tr");
        tr.setAttribute("data-sys-tr", "");
        td = document.createElement("td");
        td.setAttribute("data-sys-td", "");
        tr.appendChild(td);
        td.colSpan = this.columns.length;
      } else if (this.options.mode == "widthCard") {
        tr = document.createElement("div");
        td = document.createElement("div");
        tr.appendChild(td);
      }

      td.setAttribute("data-bc-no-data", "");
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
      this._body.appendChild(tr);
    }
    if (this.options.information) {
      this._informationContainer.innerText = this._informationFormatter(
        from,
        to,
        total
      );
    }
  }

  private showUIProgress(): void {
    if (this.options.loader) {
      switch (typeof this.options.loader) {
        case "function": {
          this._loaderContainer.innerHTML = this.options.loader();
          break;
        }
        case "string": {
          this._tableContainer.style[
            "background-image"
          ] = `url("${this.options.loader}")`;
        }
        case "boolean": {
          this._tableContainer.setAttribute("data-process", "");
          break;
        }
      }
      this._table.style["opacity"] = ".4";
    }
  }

  private hideUIProgress(): void {
    if (this.options.loader) {
      switch (typeof this.options.loader) {
        case "function": {
          this._loaderContainer.innerHTML = "";
          break;
        }
        case "string": {
          this._tableContainer.style["background-image"] = "";
        }
        case "boolean": {
          this._tableContainer.removeAttribute("data-process");
          break;
        }
      }
      this._table.style["opacity"] = "1";
    }
  }

  public tryLoadData() {
    const data = {
      pageNumber: this.processManager.pageNumber + 1,
      pageSize: this.processManager.pageSize,
      filter: this.processManager.filter,
      sortInfo: {
        col: this.processManager.sortInfo?.column.name,
        type: this.processManager.sortInfo?.sort,
      },
    };
    this.showUIProgress();
    this._onSignalSourceCallback({
      ...data,
      ...{ urlencoded: encodeURIComponent(JSON.stringify(data)) },
    });
  }

  public onSelectionChange() {
    const selectedRows = this._rows
      .filter((x) => x.selected)
      .map((x) => x.data);
    this._selectionChangeCallback(selectedRows);
  }
}
