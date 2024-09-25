import { FilterDataType, IExportInfo, IGridOptions, IOffsetOptions } from "./IOptions";
import {
  IGridColumnInfo,
  ISortType,
  IGridSource,
  SignalSourceCallback,
  IGridCardInfo,
} from "../../type-alias";
import showFilterLayout from "./../../asset/layout-showFilter.html";
import "./../../asset/style.css";
import "./../../asset/style-desktop.css";
import "./../../asset/style-mobile.css";
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
import { IBCUtil, IDictionary, IFixValue } from "basiscore";

declare const $bc: IBCUtil;
export default class Grid implements IGrid {
  private readonly _container: HTMLElement;
  private _table: HTMLElement;
  readonly options: IGridOptions;
  readonly deviceId: number | string;
  private _head: HTMLElement;
  private _body: HTMLElement;
  private _tableContainer: HTMLElement;
  private _loaderContainer: HTMLElement;
  private _informationContainer: HTMLElement;
  private timerId: NodeJS.Timeout;
  private readonly _onSignalSourceCallback: SignalSourceCallback;
  private readonly _selectionChangeCallback: SignalSourceCallback;
  static _defaults: Partial<IGridOptions>;
  private columnsInitialized = false;
  private processManager: IGridProcessManager;
  public columns: IGridColumnInfo[] = new Array<IGridColumnInfo>();
  public cards: IGridCardInfo[] = new Array<IGridCardInfo>();
  public newRow: boolean;
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
        ProcessActionType: {
          search: "server",
          paging: "client",
          sort: "server",
        },
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
        selectAll: false,
        mode: "grid",
        modeButtons: false,
        cardCount: 5,
        culture: {
          deviceId: 1,
          template: "template1",
          labels: {
            search: "Search :",
            searchPlaceholder: "",
            pageSize: "Page Size :",
            next: "Next",
            previous: "Previous",
            first: "First",
            last: "last",
            noData: "No Data Find",
            information: "Showing ${from} to ${to} from Total ${total}",
            refresh: "Refresh",
            chooseItem: "Choose",
          },
        },
      };
    }
    return Grid._defaults;
  }

  static formatString(
    pattern: string,
    params: IDictionary<string> | any
  ): string {
    const paraNameList = [...Object.getOwnPropertyNames(params)];
    const formatter = new Function(...paraNameList, `return \`${pattern}\``);
    return formatter(...paraNameList.map((x) => Reflect.get(params, x)));
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

    // initialize deviceId
    const optionDeviceId = this.options.culture?.deviceId;
    if (optionDeviceId) {
      if (typeof optionDeviceId == "string") {
        const devicesList = require("../../devicesList.json");
        const deviceId = devicesList.find(
          (ex) =>
            ex.title.toLowerCase() === optionDeviceId.toString().toLowerCase()
        );
        this.deviceId =
          deviceId?.deviceId ?? Grid.getDefaults().culture.deviceId;
      } else if (typeof optionDeviceId == "number") {
        const devicesList = require("../../devicesList.json");
        const deviceId = devicesList.find(
          (ex) => ex.deviceId === optionDeviceId
        );
        this.deviceId =
          deviceId?.deviceId ?? Grid.getDefaults().culture.deviceId;
      }
    } else {
      this.deviceId = Grid.getDefaults().culture.deviceId;
    }

    this._container = container;
    this._container.setAttribute("data-bc-grid", `d${this.deviceId}`);
    if (this.options.direction) {
      this._container.style["direction"] = this.options.direction;
      this._container.setAttribute("data-bc-grid-direction", this.options.direction);
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
      if (this.deviceId == 1) {
        this.createUI();
      } else if (this.deviceId == 2) {
        this.createTemplateUI();
      }
    } else if (this.options.mode == "widthCard") {
      this.createUIWidthCard();
      this._container.setAttribute("data-bc-widthcard-mode", "");
    }
  }
  private handleInput(input: HTMLInputElement, event: KeyboardEvent) {
    clearTimeout(this.timerId);
    if (
      this.options.process === "server" &&
      !(event.key === "Enter" || event.keyCode === 13)
    ) {
      this.timerId = setTimeout(() => {
        this.performAction(input);
      }, 1000);
    } else {
      this.performAction(input);
    }
  }

  private handleRowInput(
    el: HTMLInputElement | HTMLSelectElement,
    type: FilterDataType,
    columnInfo: IGridColumnInfo,
    event?: KeyboardEvent
  ) {
    clearTimeout(this.timerId);
    if (
      (this.options.process === "server" || (this.options.process === "mix" && this.options.ProcessActionType.search == "server")) &&
      !(event?.key === "Enter" || event?.keyCode === 13)
    ) {
      this.timerId = setTimeout(() => {
        const newFilter = el.value.toLowerCase();

        let mustUpdate = false;
        if (newFilter.length > 0) {
          if (!this.processManager.filter) {
            this.processManager.filter = {};
          }
          if (newFilter != this.processManager.filter[columnInfo.name]) {
            if (type == "select") {
              this.processManager.filter[columnInfo.name] = {
                id: parseInt(newFilter),
                value: (el as HTMLSelectElement).selectedOptions[0].text
              }
            } else if (type == "autocomplete") {
              this.processManager.filter[columnInfo.name] = {
                id: parseInt(el.getAttribute("data-bc-value")),
                value: newFilter
              }
            } else {
              this.processManager.filter[columnInfo.name] = newFilter;
            }
            mustUpdate = true;
          }
        } else {
          if (
            typeof this.processManager.filter[columnInfo.name] !== "undefined"
          ) {
            delete this.processManager.filter[columnInfo.name];
            mustUpdate = true;
          }
        }
        if (mustUpdate) {
          this.processManager.pageNumber = 0;
          this.processManager.applyUserAction();
        }
      }, 1000);
    } else {
      this.timerId = setTimeout(() => {
        const newFilter = el.value.toLowerCase();
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
            typeof this.processManager.filter[columnInfo.name] !== "undefined"
          ) {
            delete this.processManager.filter[columnInfo.name];
            mustUpdate = true;
          }
        }
        if (mustUpdate) {
          this.processManager.pageNumber = 0;
          this.processManager.applyUserAction(type);
        }
      }, 5);
    }
  }

  private performAction(input: HTMLInputElement) {
    const newFilter = input.value.toLowerCase();
    if (this.processManager.filter != newFilter) {
      this.processManager.filter = newFilter;
      this.processManager.pageNumber = 0;
      this.processManager.applyUserAction();
    }
  }
  private createTemplateUI(): void {
    this.columns = [];
    this._table = document.createElement("div");
    this._table.setAttribute("data-bc-table", "");
    // this._head = document.createElement("div");
    // this._table.appendChild(this._head);
    this._body = document.createElement("div");
    this._table.appendChild(this._body);
    this._body.setAttribute("data-bc-table-body", "");
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
      this._informationContainer.setAttribute(
        "data-bc-information-container",
        ""
      );
      this._informationContainer.setAttribute("data-sys-text-colorful", "");
    }

    const gridHeaderContainer = document.createElement("div");
    gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
    gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");

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
      if (this.options.culture.labels.searchPlaceholder != "") {
        input.setAttribute(
          "placeholder",
          this.options.culture.labels.searchPlaceholder
        );
      }
      label.appendChild(input);

      input.addEventListener("keyup", (event) =>
        this.handleInput(input, event)
      );
      filter.appendChild(label);
    } else if (this.options.filter == "row") {
      const copyShowFilterLayout = showFilterLayout;
      const showFilter = $bc.util.toHTMLElement(
        copyShowFilterLayout
      ) as HTMLDivElement;
      gridHeaderContainer.appendChild(showFilter);
      const showFilterBtn = showFilter.querySelector("[data-bc-filter-btn]");
      showFilterBtn.addEventListener("click", (_) => {
        showFilterBtn.classList.toggle("active");
        showFilter.classList.toggle("active");
      });
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

      if (this.options.export?.length > 0) {
        const exportContainer = document.createElement("div");
        exportContainer.setAttribute("data-bc-export-container", "");
        gridHeaderContainer.appendChild(exportContainer);

        this.options.export.forEach((exp) => {
          const exportItemContainer = document.createElement("div");
          exportItemContainer.setAttribute("data-bc-export-item", "");

          if (exp.type == "excel") {
            exportItemContainer.setAttribute("data-bc-export-item-excel", "");
            if (exp.tooltip) {
              exportItemContainer.setAttribute("data-sys-tooltip", "");
              exportItemContainer.setAttribute(
                "data-bc-export-tooltip",
                exp.tooltip
              );
            }
            exportItemContainer.innerHTML = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="34" height="34" rx="4.5" stroke="#0D783C"/><g style="mix-blend-mode:multiply" opacity="0.2"><g style="mix-blend-mode:multiply" opacity="0.2"><path d="M27.2026 7.99805H13.1519C12.6678 7.99805 12.2754 8.39049 12.2754 8.87459V25.8536C12.2754 26.3377 12.6678 26.7301 13.1519 26.7301H27.2026C27.6867 26.7301 28.0792 26.3377 28.0792 25.8536V8.87459C28.0792 8.39049 27.6867 7.99805 27.2026 7.99805Z" fill="white"/></g></g><g style="mix-blend-mode:multiply" opacity="0.12"><g style="mix-blend-mode:multiply" opacity="0.12"><path d="M27.2007 7.99707H13.15C12.6659 7.99707 12.2734 8.38951 12.2734 8.87361V25.8526C12.2734 26.3367 12.6659 26.7291 13.15 26.7291H27.2007C27.6848 26.7291 28.0772 26.3367 28.0772 25.8526V8.87361C28.0772 8.38951 27.6848 7.99707 27.2007 7.99707Z" fill="white"/></g></g><path d="M20.4649 7.99805H13.1474C13.0326 7.99805 12.9189 8.02076 12.813 8.06489C12.707 8.10902 12.6108 8.17369 12.5299 8.25517C12.449 8.33665 12.3851 8.43333 12.3417 8.53964C12.2984 8.64596 12.2765 8.75979 12.2774 8.87459V12.6794H20.4649V7.99805Z" fill="#21A366"/><path d="M27.2129 7.99805H20.4668V12.6794H28.07V8.87459C28.0717 8.64495 27.9826 8.42394 27.8221 8.25974C27.6615 8.09554 27.4426 8.00147 27.2129 7.99805Z" fill="#33C481"/><path d="M28.0765 17.3604H20.4668V22.0417H28.0765V17.3604Z" fill="#107C41"/><path d="M20.4649 22.0417V17.3604H12.2774V25.8466C12.2765 25.962 12.2986 26.0763 12.3423 26.1831C12.3861 26.2898 12.4506 26.3868 12.5322 26.4683C12.6137 26.5499 12.7107 26.6144 12.8174 26.6582C12.9242 26.7019 13.0386 26.724 13.1539 26.7231H27.2111C27.3264 26.724 27.4408 26.7019 27.5476 26.6582C27.6543 26.6144 27.7513 26.5499 27.8328 26.4683C27.9144 26.3868 27.9789 26.2898 28.0227 26.1831C28.0664 26.0763 28.0885 25.962 28.0876 25.8466V22.0417H20.4649Z" fill="#185C37"/><path d="M20.4656 12.6787H12.2715V17.3602H20.4656V12.6787Z" fill="#107C41"/><path d="M28.0765 12.6787H20.4668V17.3602H28.0765V12.6787Z" fill="#21A366"/><g style="mix-blend-mode:multiply" opacity="0.48"><g style="mix-blend-mode:multiply" opacity="0.48"><path d="M17.2455 12.0938H8.46053C7.97643 12.0938 7.58398 12.4862 7.58398 12.9703V21.7553C7.58398 22.2394 7.97643 22.6318 8.46053 22.6318H17.2455C17.7296 22.6318 18.122 22.2394 18.122 21.7553V12.9703C18.122 12.4862 17.7296 12.0938 17.2455 12.0938Z" fill="white"/></g></g><g style="mix-blend-mode:multiply" opacity="0.24"><g style="mix-blend-mode:multiply" opacity="0.24"><path d="M17.2474 12.0938H8.46248C7.97838 12.0938 7.58594 12.4862 7.58594 12.9703V21.7553C7.58594 22.2394 7.97838 22.6318 8.46248 22.6318H17.2474C17.7315 22.6318 18.124 22.2394 18.124 21.7553V12.9703C18.124 12.4862 17.7315 12.0938 17.2474 12.0938Z" fill="white"/></g></g><path d="M17.2455 12.0947H8.46053C7.97643 12.0947 7.58398 12.4872 7.58398 12.9713V21.7562C7.58398 22.2403 7.97643 22.6327 8.46053 22.6327H17.2455C17.7296 22.6327 18.122 22.2403 18.122 21.7562V12.9713C18.122 12.4872 17.7296 12.0947 17.2455 12.0947Z" fill="#107C41"/><path d="M10.3301 20.2106L12.1546 17.3602L10.4599 14.5098H11.8234L12.7454 16.3278C12.8298 16.4966 12.8883 16.6265 12.9207 16.7109C12.9792 16.5745 13.0441 16.4382 13.109 16.3083L14.096 14.5098H15.3491L13.622 17.3602L15.401 20.2365H14.1025L13.0311 18.2432C12.9824 18.1582 12.9412 18.0691 12.9078 17.977C12.8767 18.068 12.8353 18.1551 12.7844 18.2367L11.6287 20.2106H10.3301Z" fill="white"/><g style="mix-blend-mode:soft-light" opacity="0.5"><path style="mix-blend-mode:soft-light" opacity="0.5" d="M17.2474 12.0947H8.46248C7.97838 12.0947 7.58594 12.4872 7.58594 12.9713V21.7562C7.58594 22.2403 7.97838 22.6327 8.46248 22.6327H17.2474C17.7315 22.6327 18.124 22.2403 18.124 21.7562V12.9713C18.124 12.4872 17.7315 12.0947 17.2474 12.0947Z" fill="url(#paint0_linear_10847_113542)"/></g><defs><linearGradient id="paint0_linear_10847_113542" x1="9.41694" y1="11.4065" x2="16.2929" y2="23.3145" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0.5"/><stop offset="1" stop-opacity="0.7"/></linearGradient></defs></svg>`;

            exportItemContainer.addEventListener("click", (e) => {
              this.downloadFile(exp);
            });

            exportContainer.appendChild(exportItemContainer);
          } else {
            throw Error(
              "Export type '".concat(exp.type, "' not support in grid")
            );
          }
        });
      }

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

    this.createTemplate();
  }

  private createTemplate(): void {
    if (this.options.columns) {
      Object.getOwnPropertyNames(this.options.columns).forEach((property) => {
        var value = this.options.columns[property];
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
        }
        this.columns.push(columnInfo);
        // const item = this.createTemplate1Item(columnInfo);
        // this._body.appendChild(item);
      });
      const clr = document.createElement("div");
      clr.setAttribute("class", "clr");
      this._body.appendChild(clr);

      this.columnsInitialized = true;
      this.addTemplateRowFilterPart();
    }
  }

  private addTemplateRowFilterPart() {
    if (this.options.filter === "row") {
      const filterItemsWrapper = this._container
        .querySelector("[data-bc-grid-header-container]")
        .querySelector("[data-bc-filter-items]");
      filterItemsWrapper.innerHTML = "";
      this.columns.forEach((columnInfo) => {
        if (columnInfo.filter) {
          const li = document.createElement("li");
          li.setAttribute("data-bc-no-selection", "");
          li.setAttribute("data-bc-filter-item", "");
          li.setAttribute("data-sys-tr", "");
          li.innerHTML = "";
          this.fillTemplateRowFilterElement(li, columnInfo);
          // this._head.appendChild(tr);
          filterItemsWrapper.appendChild(li);
        }
      });
      if (filterItemsWrapper.innerHTML == "") {
        filterItemsWrapper.remove();
      }
      const gridHeaderContainer = this._container.querySelector(
        "[data-bc-grid-header-container]"
      );
      if (gridHeaderContainer.innerHTML == "") {
        gridHeaderContainer.remove();
      }
    }
  }

  private async fillTemplateRowFilterElement(li: HTMLLIElement, columnInfo: IGridColumnInfo): Promise<void> {
    const el = await this.createRowFilterElement(columnInfo);
    li.appendChild(el);
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
      this._informationContainer.setAttribute(
        "data-bc-information-container",
        ""
      );
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
      this._container.setAttribute("data-bc-widthcard-mode", "");
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
      if (this.options.culture.labels.searchPlaceholder != "") {
        input.setAttribute(
          "placeholder",
          this.options.culture.labels.searchPlaceholder
        );
      }
      label.appendChild(input);
      input.addEventListener("keyup", (event) =>
        this.handleInput(input, event)
      );
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

      if (this.options.export?.length > 0) {
        const exportContainer = document.createElement("div");
        exportContainer.setAttribute("data-bc-export-container", "");
        gridHeaderContainer.appendChild(exportContainer);

        this.options.export.forEach((exp) => {
          const exportItemContainer = document.createElement("div");
          exportItemContainer.setAttribute("data-bc-export-item", "");

          if (exp.type == "excel") {
            exportItemContainer.setAttribute("data-bc-export-item-excel", "");
            if (exp.tooltip) {
              exportItemContainer.setAttribute("data-sys-tooltip", "");
              exportItemContainer.setAttribute(
                "data-bc-export-tooltip",
                exp.tooltip
              );
            }
            exportItemContainer.innerHTML = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="34" height="34" rx="4.5" stroke="#0D783C"/><g style="mix-blend-mode:multiply" opacity="0.2"><g style="mix-blend-mode:multiply" opacity="0.2"><path d="M27.2026 7.99805H13.1519C12.6678 7.99805 12.2754 8.39049 12.2754 8.87459V25.8536C12.2754 26.3377 12.6678 26.7301 13.1519 26.7301H27.2026C27.6867 26.7301 28.0792 26.3377 28.0792 25.8536V8.87459C28.0792 8.39049 27.6867 7.99805 27.2026 7.99805Z" fill="white"/></g></g><g style="mix-blend-mode:multiply" opacity="0.12"><g style="mix-blend-mode:multiply" opacity="0.12"><path d="M27.2007 7.99707H13.15C12.6659 7.99707 12.2734 8.38951 12.2734 8.87361V25.8526C12.2734 26.3367 12.6659 26.7291 13.15 26.7291H27.2007C27.6848 26.7291 28.0772 26.3367 28.0772 25.8526V8.87361C28.0772 8.38951 27.6848 7.99707 27.2007 7.99707Z" fill="white"/></g></g><path d="M20.4649 7.99805H13.1474C13.0326 7.99805 12.9189 8.02076 12.813 8.06489C12.707 8.10902 12.6108 8.17369 12.5299 8.25517C12.449 8.33665 12.3851 8.43333 12.3417 8.53964C12.2984 8.64596 12.2765 8.75979 12.2774 8.87459V12.6794H20.4649V7.99805Z" fill="#21A366"/><path d="M27.2129 7.99805H20.4668V12.6794H28.07V8.87459C28.0717 8.64495 27.9826 8.42394 27.8221 8.25974C27.6615 8.09554 27.4426 8.00147 27.2129 7.99805Z" fill="#33C481"/><path d="M28.0765 17.3604H20.4668V22.0417H28.0765V17.3604Z" fill="#107C41"/><path d="M20.4649 22.0417V17.3604H12.2774V25.8466C12.2765 25.962 12.2986 26.0763 12.3423 26.1831C12.3861 26.2898 12.4506 26.3868 12.5322 26.4683C12.6137 26.5499 12.7107 26.6144 12.8174 26.6582C12.9242 26.7019 13.0386 26.724 13.1539 26.7231H27.2111C27.3264 26.724 27.4408 26.7019 27.5476 26.6582C27.6543 26.6144 27.7513 26.5499 27.8328 26.4683C27.9144 26.3868 27.9789 26.2898 28.0227 26.1831C28.0664 26.0763 28.0885 25.962 28.0876 25.8466V22.0417H20.4649Z" fill="#185C37"/><path d="M20.4656 12.6787H12.2715V17.3602H20.4656V12.6787Z" fill="#107C41"/><path d="M28.0765 12.6787H20.4668V17.3602H28.0765V12.6787Z" fill="#21A366"/><g style="mix-blend-mode:multiply" opacity="0.48"><g style="mix-blend-mode:multiply" opacity="0.48"><path d="M17.2455 12.0938H8.46053C7.97643 12.0938 7.58398 12.4862 7.58398 12.9703V21.7553C7.58398 22.2394 7.97643 22.6318 8.46053 22.6318H17.2455C17.7296 22.6318 18.122 22.2394 18.122 21.7553V12.9703C18.122 12.4862 17.7296 12.0938 17.2455 12.0938Z" fill="white"/></g></g><g style="mix-blend-mode:multiply" opacity="0.24"><g style="mix-blend-mode:multiply" opacity="0.24"><path d="M17.2474 12.0938H8.46248C7.97838 12.0938 7.58594 12.4862 7.58594 12.9703V21.7553C7.58594 22.2394 7.97838 22.6318 8.46248 22.6318H17.2474C17.7315 22.6318 18.124 22.2394 18.124 21.7553V12.9703C18.124 12.4862 17.7315 12.0938 17.2474 12.0938Z" fill="white"/></g></g><path d="M17.2455 12.0947H8.46053C7.97643 12.0947 7.58398 12.4872 7.58398 12.9713V21.7562C7.58398 22.2403 7.97643 22.6327 8.46053 22.6327H17.2455C17.7296 22.6327 18.122 22.2403 18.122 21.7562V12.9713C18.122 12.4872 17.7296 12.0947 17.2455 12.0947Z" fill="#107C41"/><path d="M10.3301 20.2106L12.1546 17.3602L10.4599 14.5098H11.8234L12.7454 16.3278C12.8298 16.4966 12.8883 16.6265 12.9207 16.7109C12.9792 16.5745 13.0441 16.4382 13.109 16.3083L14.096 14.5098H15.3491L13.622 17.3602L15.401 20.2365H14.1025L13.0311 18.2432C12.9824 18.1582 12.9412 18.0691 12.9078 17.977C12.8767 18.068 12.8353 18.1551 12.7844 18.2367L11.6287 20.2106H10.3301Z" fill="white"/><g style="mix-blend-mode:soft-light" opacity="0.5"><path style="mix-blend-mode:soft-light" opacity="0.5" d="M17.2474 12.0947H8.46248C7.97838 12.0947 7.58594 12.4872 7.58594 12.9713V21.7562C7.58594 22.2403 7.97838 22.6327 8.46248 22.6327H17.2474C17.7315 22.6327 18.124 22.2403 18.124 21.7562V12.9713C18.124 12.4872 17.7315 12.0947 17.2474 12.0947Z" fill="url(#paint0_linear_10847_113542)"/></g><defs><linearGradient id="paint0_linear_10847_113542" x1="9.41694" y1="11.4065" x2="16.2929" y2="23.3145" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0.5"/><stop offset="1" stop-opacity="0.7"/></linearGradient></defs></svg>`;

            exportItemContainer.addEventListener("click", (e) => {
              this.downloadFile(exp);
            });

            exportContainer.appendChild(exportItemContainer);
          } else {
            throw Error(
              "Export type '".concat(exp.type, "' not support in grid")
            );
          }
        });
      }

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
          this.fillTableRowFilterElement(td, columnInfo);
          tr.appendChild(td);
        } else {
          const td = document.createElement("td");
          td.setAttribute("data-sys-th", "");
          tr.appendChild(td);
        }
      });
    }
  }

  private async fillTableRowFilterElement(td: HTMLTableCellElement, columnInfo: IGridColumnInfo): Promise<void> {
    const el = await this.createRowFilterElement(columnInfo);
    td.appendChild(el);
  }

  private async createRowFilterElement(columnInfo: IGridColumnInfo): Promise<HTMLElement> {
    const filterType = columnInfo.filterData?.type ? columnInfo.filterData.type : "text";
    let el;
    if (filterType == "select") {
      const select = document.createElement("select");
      select.setAttribute("data-sys-select-option", "");

      let fixValues;
      if (columnInfo.filterData?.fixValues) {
        fixValues = columnInfo.filterData?.fixValues;
      } else if (columnInfo.filterData?.link) {
        fixValues = await this.requestJsonAsync(`${columnInfo.filterData?.link}`);
      }

      const option = document.createElement("option");
      option.setAttribute("value", "");
      const firstItem = this.findValueById(fixValues, 0);
      if (firstItem) {
        option.textContent = firstItem;
      } else {
        option.textContent = this.options.culture.labels.chooseItem;
      }
      select.appendChild(option);

      fixValues.forEach(fix => {
        if (fix.id != 0) {
          const option = document.createElement("option");
          option.setAttribute("value", `${fix.id}`);
          option.textContent = fix.value;
          select.appendChild(option);
        }
      });

      select.addEventListener("change", () => {
        this.handleRowInput(select, filterType, columnInfo);
      });

      el = select;
    } else if (filterType == "autocomplete") {
      const div = document.createElement("div");
      div.setAttribute("data-bc-select-value", "");

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("data-sys-input-text", "");
      input.setAttribute("placeholder", columnInfo.title);

      const ul = document.createElement("ul");
      ul.setAttribute("data-bc-result", "");
      ul.setAttribute("data-sys-search-result", "");
      
      input.addEventListener("keyup", (e) => {
        this.onKeyUpAsync(<KeyboardEvent>e, ul, columnInfo.filterData?.link, columnInfo);
      });
      input.addEventListener("focus", (e) => {
        ul.style.display = "block";
        window.addEventListener("click", clickListener);
      });
      const clickListener = (e) => {
        if (!(ul.contains(e.target) || ul == e.target || e.target == input)) {
          ul.style.display = "none";
  
          window.removeEventListener("click", clickListener);
        }
      };

      div.appendChild(input);
      div.appendChild(ul);
      el = div;
    } else {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("data-sys-input-text", "");
      input.setAttribute("placeholder", columnInfo.title);
      input.addEventListener("paste", () => {
        this.handleRowInput(input, filterType, columnInfo);
      });
      input.addEventListener("keyup", (event) => {
        this.handleRowInput(input, filterType, columnInfo, event);
      });

      el = input;
    }
    return el;
  }

  private findValueById(list: Array<IFixValue>, id: number) {
    return list.find((obj) => obj.id === id)?.value;
  }

  private async onKeyUpAsync(e: KeyboardEvent, ul: HTMLUListElement, link: string, columnInfo: IGridColumnInfo) {
    e.preventDefault();
    const input = ul.closest("[data-bc-select-value]").querySelector<HTMLInputElement>('input[type="text"]');
    const term = (e.target as HTMLFormElement).value;
    const url = Grid.formatString(link, {term});
    ul.innerHTML = "";
    if (term.length > 0) {
      const result = await this.requestJsonAsync(url);
      if (result.length > 0) {
        result.forEach((item) => {
          const li = document.createElement("li");
          li.setAttribute("data-bc-value", item.id);
          li.setAttribute("data-sys-hover", "");
          li.setAttribute("data-sys-text", "");
          li.innerHTML = item.value;
          li.addEventListener("click", (e) => {
            e.preventDefault();
            input.value = li.textContent;
            input.setAttribute("data-bc-value", li.getAttribute("data-bc-value"));
            ul.style.display = "none";
            this.handleRowInput(input, columnInfo.filterData?.type, columnInfo);
          });
          ul.appendChild(li);
        });
      }
    } else {
      input.setAttribute("data-bc-value", "");
      this.handleRowInput(input, columnInfo.filterData?.type, columnInfo);
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
    if (this.options.selectable) {
      const col = document.createElement("col");
      col.setAttribute("width", "5%");
      colgroup.appendChild(col);

      let title = "";
      if (this.options.selectable == "multi" && this.options.selectAll) {
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        title = checkBox.outerHTML;
      }

      const columnInfo: IGridColumnInfo = {
        title: title,
        selectable: this.options.selectAll === true ? true : false,
        source: null,
        name: null,
        type: ColumnType.select,
      };
      tr.appendChild(this.createColumn(columnInfo));
    }
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
      this._informationContainer.setAttribute(
        "data-bc-information-container",
        ""
      );
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
      if (this.options.culture.labels.searchPlaceholder != "") {
        input.setAttribute(
          "placeholder",
          this.options.culture.labels.searchPlaceholder
        );
      }
      label.appendChild(input);
      input.addEventListener("keyup", (event) =>
        this.handleInput(input, event)
      );
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

      if (this.options.export?.length > 0) {
        const exportContainer = document.createElement("div");
        exportContainer.setAttribute("data-bc-export-container", "");
        gridHeaderContainer.appendChild(exportContainer);

        this.options.export.forEach((exp) => {
          const exportItemContainer = document.createElement("div");
          exportItemContainer.setAttribute("data-bc-export-item", "");

          if (exp.type == "excel") {
            exportItemContainer.setAttribute("data-bc-export-item-excel", "");
            if (exp.tooltip) {
              exportItemContainer.setAttribute("data-sys-tooltip", "");
              exportItemContainer.setAttribute(
                "data-bc-export-tooltip",
                exp.tooltip
              );
            }
            exportItemContainer.innerHTML = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="34" height="34" rx="4.5" stroke="#0D783C"/><g style="mix-blend-mode:multiply" opacity="0.2"><g style="mix-blend-mode:multiply" opacity="0.2"><path d="M27.2026 7.99805H13.1519C12.6678 7.99805 12.2754 8.39049 12.2754 8.87459V25.8536C12.2754 26.3377 12.6678 26.7301 13.1519 26.7301H27.2026C27.6867 26.7301 28.0792 26.3377 28.0792 25.8536V8.87459C28.0792 8.39049 27.6867 7.99805 27.2026 7.99805Z" fill="white"/></g></g><g style="mix-blend-mode:multiply" opacity="0.12"><g style="mix-blend-mode:multiply" opacity="0.12"><path d="M27.2007 7.99707H13.15C12.6659 7.99707 12.2734 8.38951 12.2734 8.87361V25.8526C12.2734 26.3367 12.6659 26.7291 13.15 26.7291H27.2007C27.6848 26.7291 28.0772 26.3367 28.0772 25.8526V8.87361C28.0772 8.38951 27.6848 7.99707 27.2007 7.99707Z" fill="white"/></g></g><path d="M20.4649 7.99805H13.1474C13.0326 7.99805 12.9189 8.02076 12.813 8.06489C12.707 8.10902 12.6108 8.17369 12.5299 8.25517C12.449 8.33665 12.3851 8.43333 12.3417 8.53964C12.2984 8.64596 12.2765 8.75979 12.2774 8.87459V12.6794H20.4649V7.99805Z" fill="#21A366"/><path d="M27.2129 7.99805H20.4668V12.6794H28.07V8.87459C28.0717 8.64495 27.9826 8.42394 27.8221 8.25974C27.6615 8.09554 27.4426 8.00147 27.2129 7.99805Z" fill="#33C481"/><path d="M28.0765 17.3604H20.4668V22.0417H28.0765V17.3604Z" fill="#107C41"/><path d="M20.4649 22.0417V17.3604H12.2774V25.8466C12.2765 25.962 12.2986 26.0763 12.3423 26.1831C12.3861 26.2898 12.4506 26.3868 12.5322 26.4683C12.6137 26.5499 12.7107 26.6144 12.8174 26.6582C12.9242 26.7019 13.0386 26.724 13.1539 26.7231H27.2111C27.3264 26.724 27.4408 26.7019 27.5476 26.6582C27.6543 26.6144 27.7513 26.5499 27.8328 26.4683C27.9144 26.3868 27.9789 26.2898 28.0227 26.1831C28.0664 26.0763 28.0885 25.962 28.0876 25.8466V22.0417H20.4649Z" fill="#185C37"/><path d="M20.4656 12.6787H12.2715V17.3602H20.4656V12.6787Z" fill="#107C41"/><path d="M28.0765 12.6787H20.4668V17.3602H28.0765V12.6787Z" fill="#21A366"/><g style="mix-blend-mode:multiply" opacity="0.48"><g style="mix-blend-mode:multiply" opacity="0.48"><path d="M17.2455 12.0938H8.46053C7.97643 12.0938 7.58398 12.4862 7.58398 12.9703V21.7553C7.58398 22.2394 7.97643 22.6318 8.46053 22.6318H17.2455C17.7296 22.6318 18.122 22.2394 18.122 21.7553V12.9703C18.122 12.4862 17.7296 12.0938 17.2455 12.0938Z" fill="white"/></g></g><g style="mix-blend-mode:multiply" opacity="0.24"><g style="mix-blend-mode:multiply" opacity="0.24"><path d="M17.2474 12.0938H8.46248C7.97838 12.0938 7.58594 12.4862 7.58594 12.9703V21.7553C7.58594 22.2394 7.97838 22.6318 8.46248 22.6318H17.2474C17.7315 22.6318 18.124 22.2394 18.124 21.7553V12.9703C18.124 12.4862 17.7315 12.0938 17.2474 12.0938Z" fill="white"/></g></g><path d="M17.2455 12.0947H8.46053C7.97643 12.0947 7.58398 12.4872 7.58398 12.9713V21.7562C7.58398 22.2403 7.97643 22.6327 8.46053 22.6327H17.2455C17.7296 22.6327 18.122 22.2403 18.122 21.7562V12.9713C18.122 12.4872 17.7296 12.0947 17.2455 12.0947Z" fill="#107C41"/><path d="M10.3301 20.2106L12.1546 17.3602L10.4599 14.5098H11.8234L12.7454 16.3278C12.8298 16.4966 12.8883 16.6265 12.9207 16.7109C12.9792 16.5745 13.0441 16.4382 13.109 16.3083L14.096 14.5098H15.3491L13.622 17.3602L15.401 20.2365H14.1025L13.0311 18.2432C12.9824 18.1582 12.9412 18.0691 12.9078 17.977C12.8767 18.068 12.8353 18.1551 12.7844 18.2367L11.6287 20.2106H10.3301Z" fill="white"/><g style="mix-blend-mode:soft-light" opacity="0.5"><path style="mix-blend-mode:soft-light" opacity="0.5" d="M17.2474 12.0947H8.46248C7.97838 12.0947 7.58594 12.4872 7.58594 12.9713V21.7562C7.58594 22.2403 7.97838 22.6327 8.46248 22.6327H17.2474C17.7315 22.6327 18.124 22.2403 18.124 21.7562V12.9713C18.124 12.4872 17.7315 12.0947 17.2474 12.0947Z" fill="url(#paint0_linear_10847_113542)"/></g><defs><linearGradient id="paint0_linear_10847_113542" x1="9.41694" y1="11.4065" x2="16.2929" y2="23.3145" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0.5"/><stop offset="1" stop-opacity="0.7"/></linearGradient></defs></svg>`;

            exportItemContainer.addEventListener("click", (e) => {
              this.downloadFile(exp);
            });

            exportContainer.appendChild(exportItemContainer);
          } else {
            throw Error(
              "Export type '".concat(exp.type, "' not support in grid")
            );
          }
        });
      }

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
          input.addEventListener("paste", () => {
            this.handleRowInput(input, columnInfo.filterData?.type, columnInfo);
          });
          input.addEventListener("keyup", (event) => {
            this.handleRowInput(input, columnInfo.filterData?.type, columnInfo, event);
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
    if (this.options.selectable == "multi" && columnInfo.selectable) {
      td.setAttribute("data-bc-select-all", "");
      const checkbox = td.querySelector('input[type="checkbox"]');

      checkbox.addEventListener("change", (e) => {
        e.preventDefault();
        const tdSelects = this._container
          .querySelector("[data-bc-table-container] tbody")
          .querySelectorAll("[data-bc-select]");
        if ((checkbox as HTMLInputElement).checked) {
          tdSelects.forEach((td) => {
            td.querySelector('input[type="checkbox"]').setAttribute(
              "checked",
              ""
            );
            (
              td.querySelector('input[type="checkbox"]') as HTMLInputElement
            ).checked = true;
          });
        } else {
          tdSelects.forEach((td) => {
            td.querySelector('input[type="checkbox"]').removeAttribute(
              "checked"
            );
            (
              td.querySelector('input[type="checkbox"]') as HTMLInputElement
            ).checked = false;
          });
        }

        this.onSelectionChange();
      });
    }
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
      if (this.options.editMode) {
        if (this.deviceId == 1) {
          const newRowElement = document.createElement("tr");
          let addedColumns = 0;
          this.columns.map((col) => {
            const td = document.createElement("td");
            const found = this.options.editMode.columns.find(
              (i) => i.key === col.source
            );
            if (found) {
              const input = document.createElement("input");
              input.setAttribute(
                "required",
                found.type === "1" ? "true" : "false"
              );
              input.setAttribute("key", found.key);
              input.setAttribute("data-bc-grid-input", "");
              input.addEventListener("input", (e) => {
                if ((e.target as HTMLInputElement).value) {
                  input.removeAttribute("data-bc-grid-input-error");
                }
              });
              addedColumns++;
              if (addedColumns == this.options.editMode.columns.length) {
                input.addEventListener("keydown", (e) => {
                  let isValid = true;
                  if (e.keyCode == 9) {
                    e.preventDefault();
                    const elements = document.querySelectorAll(
                      "[data-bc-grid-input]"
                    );

                    const d = {};
                    elements?.forEach((el: HTMLInputElement) => {
                      const attrs = el.attributes;
                      const required = attrs.getNamedItem("required").value;
                      const key = attrs.getNamedItem("key").value;
                      if (required == "true" && !el.value) {
                        isValid = false;
                        el.setAttribute("data-bc-grid-input-error", "");
                      }

                      d[key] = el.value;
                    });
                    if (isValid) {
                      this.columns.map((c) => {
                        if (!Object.keys(d).includes(c.title)) {
                          d[c.title] = "";
                        }
                      });
                      //@ts-ignore
                      $bc.setSource(this.options.editMode.newRowsSourceId, {
                        run: true,
                        body: JSON.stringify(d),
                      });
                      this.source.splice(rows[rows.length - 1].order - 1, 0, d);
                      const temp = this.source;
                      this.setSource(temp, { from: from, total: total + 1 });
                    }
                  }
                });
              }
              td.appendChild(input);
            }
            newRowElement.appendChild(td);
          });
          this._body.appendChild(newRowElement);
        }
        if (this.deviceId == 2) {
          const container = document.createElement("div");
          container.setAttribute("data-bc-inputs-container", "");
          let addedColumns = 0;

          this.options.editMode.columns.map((i) => {
            addedColumns++;

            const inputRow = document.createElement("div");
            inputRow.setAttribute("data-bc-input-row", "");
            const title = document.createElement("div");
            title.setAttribute("data-bc-input-title", "");

            title.innerText = i.key;
            const input = document.createElement("input");
            input.setAttribute("required", i.type === "1" ? "true" : "false");
            input.setAttribute("key", i.key);
            input.setAttribute("data-bc-grid-input", "");
            input.addEventListener("input", (e) => {
              if ((e.target as HTMLInputElement).value) {
                input.removeAttribute("data-bc-grid-input-error");
              }
            });
            if (this.options.editMode.columns.length === addedColumns) {
              input.addEventListener("keydown", (e) => {
                let isValid = true;
                if (e.keyCode == 9) {
                  e.preventDefault();
                  const elements = document.querySelectorAll(
                    "[data-bc-grid-input]"
                  );

                  const d = {};
                  elements?.forEach((el: HTMLInputElement) => {
                    const attrs = el.attributes;
                    const required = attrs.getNamedItem("required").value;
                    const key = attrs.getNamedItem("key").value;
                    if (required == "true" && !el.value) {
                      isValid = false;
                      el.setAttribute("data-bc-grid-input-error", "");
                    }

                    d[key] = el.value;
                  });
                  if (isValid) {
                    this.columns.map((c) => {
                      if (!Object.keys(d).includes(c.name)) {
                        d[c.name] = "";
                      }
                    });
                    //@ts-ignore
                    $bc.setSource(this.options.editMode.newRowsSourceId, {
                      run: true,
                      body: JSON.stringify(d),
                    });
                    this.source.splice(rows[rows.length - 1].order - 1, 0, d);
                    const temp = this.source;
                    this.setSource(temp, { from: from, total: total + 1 });
                  }
                }
              });
            }
            inputRow.appendChild(input);
            inputRow.appendChild(title);
            container.appendChild(inputRow);
          });
          this._body.appendChild(container);
        }
      }
      if (this.deviceId == 2) {
        const clr = document.createElement("div");
        clr.setAttribute("class", "clr");
        this._body.appendChild(clr);
      }
    } else if (
      typeof this.options.noData !== "undefined" &&
      this.options.noData
    ) {
      let tr;
      let td;

      if (this.options.mode == "grid") {
        tr = document.createElement("tr");
        tr.setAttribute("data-sys-tr", "");
        tr.setAttribute("data-sys-tr-no-data", "");
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
      filter: this.processManager.filter,
      pageSize: this.processManager.pageSize,
      sortInfo: {
        col: this.processManager.sortInfo?.column.name,
        type: this.processManager.sortInfo?.sort,
      },
    };
    if (
      typeof this.processManager.filter != "string" &&
      Object.keys(this.processManager.filter).length == 0
    ) {
      delete data.filter;
    }
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

  public resetSelectAll() {
    const selectAllInput = this._container
      .querySelector("[data-bc-table-container] thead")
      ?.querySelector('[data-bc-select-all] input[type="checkbox"]');
    if (selectAllInput) {
      selectAllInput.removeAttribute("checked");
      (selectAllInput as HTMLInputElement).checked = false;
    }
  }

  private async downloadFile(exp: IExportInfo): Promise<void> {
    const init: RequestInit = {
      method: exp.method ?? "GET",
      // body: exp.data ?? "",
    };

    if (exp.method.toUpperCase() == "POST") {
      init.body = exp.data ?? "";
    }

    const contentType = exp.contentType ?? "application/json; charset=utf-8";
    if (contentType && contentType.length > 0) {
      init.headers = new Headers();
      init.headers.append("Content-Type", contentType);
      // init.headers.append("Content-disposition", "attachment; filename=tessst.xml");
    }
    const request = new Request(exp.url, init);

    await fetch(request)
      .then((response) => response.blob())
      .then((response) => {
        const blob = new Blob([response], { type: response.type });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = exp.fileName ?? "file.xlsx";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          a.remove();
        }, 2000);
      });
  }

  async requestJsonAsync(
    url: string,
    method: "POST" | "GET" = "GET",
    params?: any
  ): Promise<any> {
    const init: any = {
      method: method,
    };
    if (params) {
      const form = new FormData();

      for (const key in params) {
        form.append(key, Reflect.get(params, key));
      }
      init.body = form;
    }
    const response = await fetch(url, init);
    const result = await response.json();
    return result;
  }
}
