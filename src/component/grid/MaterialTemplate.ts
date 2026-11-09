import type Grid from "./Grid";
import GridRow from "./GridRow";
import { IExportInfo, IGridPresentation } from "./IOptions";
import { IGridColumnInfo } from "../../type-alias";
import { ColumnType } from "../../enum";
import lineIcon from "./LineIcon";
import ClientProcess from "../paginate/ClientPaginate";
import ServerProcess from "../paginate/ServerProcess";
import MixedProcess from "../paginate/MixedProcess";
import NoPaginateProcessManager from "../paginate/NoPaginateProcessManager";
import ProcessManager from "../paginate/ProcessManager";
import PaginateProcessManager from "../paginate/PaginateProcessManager";
import "../../asset/template4.css";
import GridGuide from "./GridGuide";
import { GridGuideConfig, GridGuideStep, GuideTargets, isColumnGuideConfig, isGuideConfig, isGuideOptions } from "./GuideConfig";

type PopoverElement = HTMLElement & { showPopover?: () => void; hidePopover?: () => void };

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = "", text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Owns the template DOM; all filtering, sorting and paging stays in the existing process managers.
export default class MaterialTemplate {
  guide?: GridGuide;
  readonly columns: IGridColumnInfo[];
  readonly process: ProcessManager;
  private rows: GridRow[] = [];
  private source: any[] = [];
  private body = element("div");
  private sectionHeader = element("div", "grid-section-header");
  private headerContent = element("div", "grid-header-content");
  private toolbar = element("div", "preview-toolbar");
  private filterBar = element("div", "list-filter-bar");
  private quickFilters = element("div", "quick-filters");
  private filters = element("div", "filter-panel");
  private search = element("div", "search-field");
  private selectedCount = element("span", "selection-count");
  private selectionSummary = element("div", "selection-summary");
  private mobileBulkActions = element("div", "mobile-bulk-actions");
  private filterButton: HTMLButtonElement;
  private settingsButton: HTMLButtonElement;
  private guideButton?: HTMLButtonElement;
  private menuObserver?: MutationObserver;
  private footer = element("div", "pagination");
  private resultCount = element("span");
  private pageLabel = element("span");
  private pageNumbers = element("span", "page-numbers");
  private pageSize = element("select");
  private pagingControls = element("div");
  private pagingSizes = element("div");
  private currentPage = 1;
  private total = 0;
  private from = 0;
  private to = 0;
  private showFilters = false;
  private queryInput = element("input");
  private clearSelection: HTMLButtonElement;
  private mobileTools = element("div", "mobile-tools");
  private mobileSelectAll = element("input");
  private mobileSort = element("select");
  private columnLabels = new Map<IGridColumnInfo, string>();

  constructor(private owner: Grid, private container: HTMLElement, private defaultLabels: Record<string, string>) {
    const options = owner.options;
    this.columns = Object.entries(options.columns || {}).map(([name, definition]) => ({
      name, title: name, source: name, sort: options.sorting, filter: true, type: ColumnType.data,
      ...(typeof definition === "string" ? {title: definition} : definition),
    }));
    if (options.rowNumber) this.columns.unshift({type: ColumnType.sort, title: options.rowNumber, source: null, width: "52px"});
    if (options.selectable && options.selectable !== "none") this.columns.unshift({type: ColumnType.select, title: "", source: null});
    this.columns.forEach(column => {
      const label = element("template");
      label.innerHTML = column.title || "";
      this.columnLabels.set(column, label.content.textContent || column.name || "");
    });

    const managers = {client: ClientProcess, server: ServerProcess, mix: MixedProcess};
    this.process = options.paging
      ? new managers[options.process](owner, this.pagingSizes, this.pagingControls, element("div"))
      : new NoPaginateProcessManager(owner);
    this.process.query = "";
    if (options.defaultSort) {
      const name = typeof options.defaultSort === "string" ? options.defaultSort : options.defaultSort.name;
      const column = this.columns.find(column => column.name === name || column.source === name);
      if (column?.sort) this.process.sortInfo = {column, sort: typeof options.defaultSort === "string" ? "asc" : options.defaultSort.sort || "asc"};
    }
    container.classList.add("preview-content");
    if (typeof options.headerMaker === "function") {
      const html = options.headerMaker(this.headerContent);
      if (typeof html === "string") this.headerContent.innerHTML = html;
      if (this.headerContent.hasChildNodes()) {
        this.sectionHeader.append(this.headerContent);
        container.append(this.sectionHeader);
      }
    }
    const toolbar = this.toolbar;
    this.quickFilters.setAttribute("role", "group");
    this.quickFilters.setAttribute("aria-label", this.label("quickFilters", "فیلتر سریع؛ تعدادها از کل داده‌های لیست"));
    this.filterBar.append(this.quickFilters);
    const input = this.queryInput;
    input.placeholder = this.label("searchPlaceholder", "") || "جستجو در داده‌ها";
    input.setAttribute("aria-label", input.placeholder);
    input.addEventListener("input", () => {
      this.process.query = input.value.toLowerCase();
      if (this.remoteSearch && options.filter === "simple") this.process.filter = this.process.query;
      this.process.pageNumber = 0;
      this.process.applyUserAction(this.headerFilters ? "text" : "select");
    });
    this.search.append(this.icon("searchIcon"), input, element("kbd", "", "⌘ K"));
    this.filterButton = element("button", "button button-outlined advanced-filter-button");
    this.filterButton.type = "button";
    this.filterButton.addEventListener("click", () => {
      this.showFilters = !this.showFilters;
      this.filters.style.display = this.showFilters ? "" : "none";
      this.filterButton.setAttribute("aria-expanded", String(this.showFilters));
    });
    this.updateFilterButton();
    this.filters.style.display = "none";
    this.selectedCount.style.display = "none";
    this.selectedCount.setAttribute("role", "status");
    this.clearSelection = this.iconButton("closeIcon", this.label("clearSelection", "لغو انتخاب"), () => this.owner.setSelectedRows([]));
    this.clearSelection.classList.add("clear-selection");
    this.clearSelection.style.display = "none";
    this.selectionSummary.style.display = "none";
    const operation = this.dataColumns.find(column => column.name === "operation");
    if (operation) {
      this.mobileBulkActions.innerHTML = operation.title || "";
      if (!this.mobileBulkActions.querySelector("button, a[href], input, select, [onclick], [role=button]")) this.mobileBulkActions.replaceChildren();
    }
    this.mobileBulkActions.setAttribute("role", "group");
    this.mobileBulkActions.setAttribute("aria-label", this.label("actions", "عملیات"));
    this.mobileBulkActions.hidden = true;
    this.selectionSummary.append(this.selectedCount, this.mobileBulkActions, this.clearSelection);
    this.settingsButton = this.iconButton("settingsIcon", this.label("tableSettings", "تنظیمات جدول"), () => this.presentation.onSettings?.());
    toolbar.append(this.search, element("div", "toolbar-spacer"), this.selectionSummary, this.settingsButton);
    if (options.refresh) {
      const refreshContainer = element("div");
      refreshContainer.setAttribute("data-bc-refresh-container", "");
      const refresh = element("button", "button button-outlined refresh-button");
      refresh.type = "button";
      // Existing widgets click the legacy container's span; let it bubble to the native button.
      refresh.append(this.icon("refreshIcon"), element("span", "", this.label("refresh", "") || "تازه‌سازی"));
      refresh.addEventListener("click", event => {
        event.preventDefault();
        owner.tryLoadData();
      });
      refreshContainer.append(refresh);
      toolbar.append(refreshContainer);
    }
    toolbar.append(this.filterButton);
    const exports = element("div", "grid-exports");
    exports.setAttribute("data-bc-export-container", "");
    if (options.export?.length) toolbar.append(exports);
    options.export?.forEach(info => {
      const item = element("div", "grid-export");
      item.setAttribute("data-bc-export-item", "");
      const button = element("button", "button button-outlined export-button", info.tooltip || "Excel");
      button.type = "button";
      if (info.type === "excel") {
        item.setAttribute("data-bc-export-item-excel", "");
        button.prepend(this.icon("downloadIcon"));
      }
      button.disabled = !info.url;
      const status = element("span", "export-status");
      status.setAttribute("role", "status");
      status.hidden = true;
      button.addEventListener("click", async () => {
        button.disabled = true;
        button.setAttribute("aria-busy", "true");
        status.hidden = true;
        try { await this.downloadFile(info); }
        catch (_) {
          status.textContent = this.label("exportFailed", "دریافت فایل انجام نشد. دوباره تلاش کنید.");
          status.hidden = false;
        } finally {
          button.disabled = false;
          button.removeAttribute("aria-busy");
        }
      });
      item.append(button, status);
      exports.append(item);
    });
    const guidedColumns = this.dataColumns.flatMap((column, index) => {
      const guide = column.guide;
      return isColumnGuideConfig(guide) && guide.status === "active" ? [{column, index, guide}] : [];
    });
    const makeGuideConfig = (): GridGuideConfig | null => {
      if (!options.guide || !isGuideOptions(options.guide)) return null;
      // The boolean switch uses column content without inventing database identity/language metadata.
      const settings = options.guide === true ? {} : options.guide;
      const columnSteps: GridGuideStep[] = guidedColumns.flatMap(({column, index, guide}) => {
        const target = `column.${index}`;
        const title = this.columnTitle(column);
        const overview = guide.description === undefined ? [] : [{
          id: guide.id, target, title, priority: guide.priority, optional: guide.optional,
          description: this.columnGuideDescription(column, guide.description),
        }];
        const steps = (guide.steps || []).map(step => ({
          ...step, target: step.target ?? target, title: step.title ?? title,
          optional: step.optional ?? guide.optional, priority: step.priority ?? guide.priority,
          description: step.target === undefined ? this.columnGuideDescription(column, step.description) : step.description,
        }));
        return [...overview, ...steps];
      });
      // Stable ties preserve column/array order; explicit targets coexist with column guides.
      const steps = [...columnSteps, ...(settings.steps || [])]
        .sort((left, right) => (left.priority ?? 1000) - (right.priority ?? 1000));
      const config = {...settings, title: settings.title ?? this.label("guide", "راهنما"), steps};
      return isGuideConfig(config) ? config : null;
    };
    const initialGuideConfig = makeGuideConfig();
    if (initialGuideConfig) {
      const firstVisible = (selector: string) => Array.from(container.querySelectorAll<HTMLElement>(selector)).find(node => GridGuide.visible(node)) || null;
      const targets: GuideTargets = {
        "list.header": () => this.headerContent.parentElement ? this.headerContent : toolbar,
        "list.search": () => this.queryInput,
        "list.filters": () => this.headerFilters ? firstVisible(".header-filter") : this.filterButton,
        "list.row": () => firstVisible("tbody tr[data-sys-tr], .mobile-row, .list-item, .data-card"),
        "list.row.checkbox": () => firstVisible('tbody input[type="checkbox"], .mobile-row input[type="checkbox"], .list-item input[type="checkbox"], .data-card input[type="checkbox"]'),
        "list.bulk.actions": () => this.clearSelection,
        "list.bulk.menu": () => firstVisible('[data-grid-actions="bulk"] [data-grid-action-trigger="bulk"], thead .iconsOperations > .icon, .mobile-bulk-actions .iconsOperations > .icon, .mobile-bulk-actions button'),
        "list.row.actions": () => firstVisible('[data-grid-actions="row"] [data-grid-action-trigger="row"], tbody .iconsOperations > .icon, .action-cell button, .mobile-row-actions .iconsOperations > .icon, .mobile-row-actions button, .mobile-row-actions a[href], .list-item .iconsOperations > .icon, .list-trailing button, .data-card .iconsOperations > .icon, .card-heading button'),
        "list.pagination": () => options.paging ? this.footer : null,
        ...options.guideTargets,
      };
      guidedColumns.forEach(({column, index}) => { targets[`column.${index}`] = () => this.guideColumnTarget(column); });
      this.guide = new GridGuide(container, initialGuideConfig, targets, options.culture.labels);
      const help = element("button", "button button-outlined guide-start-button");
      help.type = "button";
      help.title = this.label("guide", "راهنما");
      help.setAttribute("aria-label", help.title);
      help.append(this.icon("helpIcon"), element("span", "guide-start-copy", ` ${help.title}`));
      help.addEventListener("click", () => {
        const config = makeGuideConfig();
        if (config) this.guide?.start(help, config);
      });
      help.dataset.guideStart = "";
      this.guideButton = help;
      toolbar.append(help);
    }
    this.createFooter();
    this.mobileSelectAll.type = "checkbox";
    const selectLabel = element("label", "mobile-select-all");
    selectLabel.append(this.mobileSelectAll, element("span", "", this.label("selectAll", "انتخاب همه")));
    this.mobileSelectAll.addEventListener("change", () => {
      this.rows.forEach(row => {if (row._checkBox) row._checkBox.checked = this.mobileSelectAll.checked;});
      this.owner.onSelectionChange();
    });
    this.mobileSort.setAttribute("aria-label", this.label("sort", "مرتب‌سازی"));
    this.mobileSort.add(new Option(this.label("sourceOrder", "ترتیب اولیه"), ""));
    this.dataColumns.filter(column => column.sort && column.name !== "operation").forEach(column => {
      this.mobileSort.add(new Option(`${this.columnTitle(column)} ↑`, `${column.name}:asc`));
      this.mobileSort.add(new Option(`${this.columnTitle(column)} ↓`, `${column.name}:desc`));
    });
    this.mobileSort.addEventListener("change", () => {
      const column = this.dataColumns.find(column => this.mobileSort.value === `${column.name}:asc` || this.mobileSort.value === `${column.name}:desc`);
      this.process.sortInfo = column ? {column, sort: this.mobileSort.value.endsWith(":desc") ? "desc" : "asc"} : null;
      this.process.pageNumber = 0;
      this.process.applyUserAction();
    });
    const sortLabel = element("label", "mobile-sort-label");
    sortLabel.append(element("span", "", `${this.label("sort", "مرتب‌سازی")}:`), this.mobileSort);
    this.mobileTools.append(selectLabel, sortLabel);
    container.append(this.filterBar, toolbar, this.filters, this.mobileTools, this.body);
    if (typeof (HTMLElement.prototype as PopoverElement).showPopover === "function") {
      this.menuObserver = new MutationObserver(changes => {
        for (const {target} of changes) {
          if (!(target instanceof HTMLElement) || !target.matches(".iconsOperations") || !target.isConnected) continue;
          const menu = target.querySelector<PopoverElement>(".iconsDetail");
          if (!menu) continue;
          if (!target.classList.contains("show")) {
            if (menu.matches(":popover-open")) menu.hidePopover();
            continue;
          }
          if (!menu.hasAttribute("popover")) {
            menu.setAttribute("popover", "auto");
            menu.addEventListener("toggle", () => {
              if (!menu.matches(":popover-open")) target.classList.remove("show");
            });
          }
          if (!menu.matches(":popover-open")) menu.showPopover();
          const anchor = (target.querySelector(".icon") || target).getBoundingClientRect();
          const bounds = menu.getBoundingClientRect();
          menu.style.left = `${Math.max(8, Math.min(anchor.left + (anchor.width - bounds.width) / 2, innerWidth - bounds.width - 8))}px`;
          menu.style.top = `${Math.max(8, Math.min(anchor.bottom + 4, innerHeight - bounds.height - 8))}px`;
        }
      });
      this.menuObserver.observe(container, {subtree: true, attributes: true, attributeFilter: ["class"]});
      container.addEventListener("scroll", this.closeMenus, true);
    }
    if (options.paging) container.append(this.footer);
    container.classList.toggle("has-pagination", Boolean(options.paging));
    this.updatePresentation(options.presentation || {});
  }

  private get presentation() { return this.owner.options.presentation || {}; }
  // shortcut: remote row filters use plain values; add legacy id/value mapping before migrating remote select/autocomplete widgets.
  private get remoteSearch() { return this.owner.options.process === "server" || this.owner.options.process === "mix" && this.owner.options.ProcessActionType?.search === "server"; }
  private get filterMode() { return this.presentation.view === "mobile" ? "columns" : this.owner.options.filter === "advanced" ? "advanced" : this.presentation.filterMode === "header" ? "header" : "columns"; }
  private get headerFilters() { return this.owner.options.filter === "row" && (this.presentation.view || "table") === "table"; }
  private get independentHeaderFilters() { return this.headerFilters && (this.presentation.showHeaderFilters !== undefined || this.filterMode !== "header"); }
  private get columnFilters() { return this.owner.options.filter === "row" || this.owner.options.filter === "advanced"; }
  private get dataColumns() { return this.columns.filter(column => column.type === ColumnType.data); }
  private get filterColumns() { return this.columnFilters ? this.dataColumns.filter(column => column.filter &&
    (this.presentation.view !== "mobile" || column.name !== "operation")) : []; }
  private columnTitle(column: IGridColumnInfo) { return this.columnLabels.get(column) ?? column.name ?? ""; }
  private guideColumnTarget(column: IGridColumnInfo) {
    const headings = Array.from(this.container.querySelectorAll<HTMLElement>("[data-guide-column]"));
    const heading = headings.find(node => node.dataset.guideColumn === column.name && GridGuide.visible(node)) ||
      Array.from(this.container.querySelectorAll<HTMLElement>("[data-guide-column-header]"))
        .find(node => node.dataset.guideColumnHeader === column.name && GridGuide.visible(node)) || null;
    const start = this.presentation.view === "mobile"
      ? heading?.closest<HTMLElement>("[data-mobile-field], [data-mobile-primary]") || heading
      : heading?.closest<HTMLElement>("th") || heading;
    const cell = this.guideColumnCell(column);
    return start && cell ? [start, cell] : start;
  }
  private guideColumnCell(column: IGridColumnInfo) {
    const firstRow = this.body.querySelector<HTMLElement>("tbody tr, .mobile-row, .list-item, .data-card");
    return Array.from(firstRow?.querySelectorAll<HTMLElement>("[data-guide-column-value]") || [])
      .find(node => node.dataset.guideColumnValue === column.name) || null;
  }
  private columnGuideDescription(column: IGridColumnInfo, description: string) {
    const example = this.guideColumnCell(column)?.textContent?.replace(/\s+/g, " ").trim().slice(0, 160);
    if (!example) return description;
    const suffix = `\n${this.label("firstRowExample", "نمونه از ردیف اول")}: ${example}`;
    return description.slice(0, Math.max(0, 2000 - suffix.length)) + suffix;
  }
  private closeMenus = (event?: Event) => {
    if (event?.target instanceof HTMLElement && event.target.closest(".iconsDetail[popover]")) return;
    this.container.querySelectorAll<PopoverElement>(".iconsOperations.show .iconsDetail").forEach(menu => {
      if (typeof menu.hidePopover === "function" && menu.matches(":popover-open")) menu.hidePopover();
      menu.closest(".iconsOperations")?.classList.remove("show");
    });
  };

  dispose() {
    this.guide?.close();
    this.closeMenus();
    this.menuObserver?.disconnect();
    this.container.removeEventListener("scroll", this.closeMenus, true);
    this.container.classList.remove("preview-content", "has-pagination");
    this.container.removeAttribute("data-bc-grid-template");
    this.container.removeAttribute("data-bc-filter-mode");
    this.container.removeAttribute("data-view");
  }

  private async downloadFile(info: IExportInfo): Promise<void> {
    const method = info.method ?? "GET";
    const headers = new Headers();
    const contentType = info.contentType ?? "application/json; charset=utf-8";
    if (contentType) headers.append("Content-Type", contentType);
    const response = await fetch(new Request(info.url, {
      method, headers, ...(method.toUpperCase() === "POST" ? {body: info.data ?? ""} : {}),
    }));
    if (!response.ok) throw new Error(`Grid export failed: HTTP ${response.status}`);
    const url = URL.createObjectURL(await response.blob());
    const link = element("a");
    link.href = url;
    link.download = info.fileName ?? "file.xlsx";
    document.body.appendChild(link);
    try { link.click(); }
    finally { setTimeout(() => { link.remove(); URL.revokeObjectURL(url); }, 2000); }
  }
  private label(key: string, fallback: string) { return this.owner.options.culture.labels[key] ?? fallback; }
  private icon(key: string) {
    const node = element("span");
    const label = this.owner.options.culture.labels[key];
    if (label && label !== this.defaultLabels[key]) node.innerHTML = label;
    else return lineIcon(key);
    node.setAttribute("aria-hidden", "true");
    // Keep host-provided icon markup from affecting button layout.
    node.style.display = "contents";
    return node;
  }
  private iconButton(icon: string, label: string, action?: () => void) {
    const button = element("button", "icon-button");
    button.type = "button";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.append(this.icon(icon));
    if (action) button.addEventListener("click", action);
    return button;
  }

  setSource(source: any[]) {
    this.source = source;
    this.createFilters();
    this.createQuickFilters();
  }

  private createQuickFilters() {
    this.quickFilters.replaceChildren();
    const column = this.filterColumns.find(column => column.name === this.presentation.quickFilter);
    if (!this.columnFilters || !column || this.owner.options.process !== "client") return;
    const groups = new Map<string, {count: number; row: any}>();
    this.source.forEach(row => {
      const value = String((typeof column.source === "function" ? column.source(row) : row[column.source]) ?? "");
      if (!value) return;
      const group = groups.get(value) || {count: 0, row};
      group.count++;
      groups.set(value, group);
    });
    const add = (value: string, count: number, row?: any) => {
      const button = element("button", "quick-filter");
      button.type = "button";
      button.dataset.quickFilter = value.toLowerCase();
      const label = element("span", "quick-filter-label");
      if (row && column.cellMaker) {
        const markup = column.cellMaker(row, value, label);
        if (markup != null) label.innerHTML = markup;
        else label.textContent = value;
      }
      else label.textContent = row ? String(column.filterData?.fixValues?.find(item => String(item.id) === value)?.value ?? value) : this.label("all", "همه");
      button.append(label, element("span", "quick-filter-count", count.toLocaleString(this.owner.options.direction === "rtl" ? "fa-IR" : "en-US")));
      button.title = `${label.textContent}: ${count} ${this.label("allData", "در کل داده‌های لیست")}`;
      button.addEventListener("click", () => {
        if (typeof this.process.filter !== "object") this.process.filter = {};
        if (value) this.process.filter[column.name] = value.toLowerCase();
        else delete this.process.filter[column.name];
        this.process.pageNumber = 0;
        this.createFilters();
        this.updateFilterButton();
        this.process.applyUserAction(this.headerFilters ? "text" : "select");
      });
      this.quickFilters.append(button);
    };
    add("", this.source.length);
    groups.forEach((group, value) => add(value, group.count, group.row));
  }

  captureState() {
    return {query: this.process.query, filters: typeof this.process.filter === "object" ? {...this.process.filter} : {}, page: this.process.pageNumber,
      sort: this.process.sortInfo && {name: this.process.sortInfo.column.name, direction: this.process.sortInfo.sort},
      selected: this.owner.getSelectedRows(), showFilters: this.showFilters};
  }

  restoreState(state: ReturnType<MaterialTemplate["captureState"]>) {
    this.queryInput.value = this.process.query = state.query;
    this.process.filter = this.remoteSearch && this.owner.options.filter === "simple" ? state.query
      : this.columnFilters ? Object.fromEntries(Object.entries(state.filters).filter(([key]) => this.columns.some(column => column.name === key))) : {};
    this.process.pageNumber = state.page;
    const column = this.columns.find(column => column.name === state.sort?.name);
    if (column && state.sort) this.process.sortInfo = {column, sort: state.sort.direction};
    this.showFilters = state.showFilters;
    this.filters.style.display = this.showFilters ? "" : "none";
    this.createFilters();
    this.updateFilterButton();
    this.owner.setSelectedRows(state.selected);
    this.process.applyUserAction(this.headerFilters ? "text" : "select");
  }

  setPageSize(size: number) {
    if (!this.owner.options.paging || this.process.pageSize === size) return;
    if (!Array.from(this.pageSize.options).some(option => option.value === String(size))) this.pageSize.add(new Option(String(size), String(size)));
    this.pageSize.value = String(size);
    this.process.pageSize = size;
    this.process.pageNumber = 0;
    this.process.applyUserAction(this.headerFilters ? "text" : "select");
  }

  updatePresentation(presentation: IGridPresentation) {
    this.owner.options.presentation = {...this.presentation, ...presentation};
    this.search.style.display = this.presentation.search === false ? "none" : "";
    this.settingsButton.style.display = this.presentation.onSettings ? "" : "none";
    this.createFilters();
    this.updateFilterButton();
    this.createQuickFilters();
    if (this.rows.length || this.total === 0) this.displayRows(this.rows, this.from, this.to, this.total);
  }

  private updateToolbarVisibility() {
    const hasTools = Array.from(this.toolbar.children).some(child => child instanceof HTMLElement &&
      !child.classList.contains("toolbar-spacer") && !child.hidden && child.style.display !== "none");
    this.toolbar.style.display = hasTools ? "" : "none";
  }

  private filterValues(column: IGridColumnInfo) {
    return column.filterData?.fixValues || Array.from(new Set(this.source.map(row =>
      String((typeof column.source === "function" ? column.source(row) : row[column.source]) ?? "")))).filter(Boolean).map(value => ({id: value, value}));
  }

  private restoreFilterValue(control: HTMLInputElement | HTMLSelectElement, name: string) {
    const value = String(this.process.filter?.[name] ?? "");
    control.value = control instanceof HTMLSelectElement
      ? Array.from(control.options).find(option => option.value.toLowerCase() === value.toLowerCase())?.value || ""
      : value;
  }

  private createFilters() {
    this.filters.replaceChildren();
    this.filterColumns.forEach(column => {
      const label = element("label");
      if (this.filterMode !== "header") {
        label.append(element("span", "", this.columnTitle(column)), this.createColumnFilter(column, true));
        this.filters.append(label);
        return;
      }
      const select = element("select");
      select.setAttribute("aria-label", this.columnTitle(column));
      select.append(new Option(this.label("allItems", "همه موارد"), ""));
      const values = this.filterValues(column);
      values.forEach(value => select.append(new Option(String(value.value), String(value.id))));
      this.restoreFilterValue(select, column.name);
      select.addEventListener("change", () => {
        if (typeof this.process.filter !== "object") this.process.filter = {};
        if (select.value) this.process.filter[column.name] = select.value.toLowerCase();
        else delete this.process.filter[column.name];
        this.process.pageNumber = 0;
        this.updateFilterButton();
        this.process.applyUserAction(this.headerFilters ? "text" : "select");
      });
      label.append(element("span", "", this.columnTitle(column)), select);
      this.filters.append(label);
    });
    const clear = element("button", "clear-filters", this.label("clearFilters", "پاک کردن فیلترها"));
    clear.type = "button";
    clear.addEventListener("click", () => {
      this.process.filter = {};
      this.process.pageNumber = 0;
      this.createFilters();
      this.updateFilterButton();
      this.process.applyUserAction();
    });
    if (this.presentation.view === "mobile") {
      const tools = element("div", "filter-panel-tools");
      tools.append(clear);
      this.filters.append(tools);
    } else this.filters.append(clear);
  }

  private updateFilterButton() {
    this.filterButton.setAttribute("aria-expanded", String(this.showFilters));
    const label = this.presentation.view === "mobile" ? this.label("mobileFilters", "فیلتر")
      : this.owner.options.filter === "advanced" ? this.label("advancedFilters", "فیلتر پیشرفته") : this.label("filters", "فیلترها");
    this.filterButton.replaceChildren(this.icon("filterIcon"), document.createTextNode(` ${label}`));
    const count = typeof this.process.filter === "object" ? Object.keys(this.process.filter).length : 0;
    if (count) this.filterButton.append(element("b", "", String(count)));
  }

  private createFooter() {
    const sizes = element("div", "page-size");
    const available = Array.isArray(this.owner.options.paging) ? this.owner.options.paging : [this.owner.options.paging];
    const locale = this.owner.options.direction === "rtl" ? "fa-IR" : "en-US";
    available.forEach(size => this.pageSize.append(new Option(new Intl.NumberFormat(locale).format(size), String(size))));
    this.pageSize.value = String(this.process.pageSize);
    this.pageSize.setAttribute("aria-label", this.label("pageSize", "نمایش"));
    this.pageSize.addEventListener("change", () => {
      const original = this.pagingSizes.querySelector("select");
      this.process.pageNumber = 0;
      if (original) {
        original.value = this.pageSize.value;
        original.dispatchEvent(new Event("change"));
      } else {
        this.process.pageSize = Number(this.pageSize.value);
        this.process.applyUserAction(this.headerFilters ? "text" : "select");
      }
      this.presentation.onPageSizeChange?.(Number(this.pageSize.value));
    });
    sizes.append(element("span", "", this.label("pageSize", "نمایش")), this.pageSize);
    const controls = element("div", "page-controls");
    const changePage = (selector: string) => (this.pagingControls.querySelector(selector) as HTMLElement)?.click();
    const pageButton = (action: string, icon: string, label: string, selector: string) => {
      const button = this.iconButton(icon, label, () => changePage(selector));
      button.dataset.pageAction = action;
      return button;
    };
    if (this.owner.options.firstAndLastBtn) controls.append(pageButton("first", "firstPageIcon", this.label("firstPage", "صفحه اول"), "[data-bc-start]"));
    controls.append(pageButton("previous", "pagePreviousIcon", this.label("previousPage", "صفحه قبل"), "[data-bc-previous]"),
      this.pageNumbers, pageButton("next", "pageNextIcon", this.label("nextPage", "صفحه بعد"), "[data-bc-next]"));
    if (this.owner.options.firstAndLastBtn) controls.append(pageButton("last", "lastPageIcon", this.label("lastPage", "صفحه آخر"), "[data-bc-end]"));
    const navigation = element("nav", "page-navigation");
    navigation.setAttribute("aria-label", this.label("pagination", "صفحه‌بندی"));
    this.pageLabel.setAttribute("aria-live", "polite");
    navigation.append(this.pageLabel, controls);
    this.footer.append(this.resultCount, sizes, navigation);
  }

  displayRows(rows: GridRow[], from: number, to: number, total: number) {
    const focused = this.body.contains(document.activeElement) && (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLSelectElement)
      ? document.activeElement : null;
    const focusKey = focused?.dataset.columnFilter;
    const selection = focused instanceof HTMLInputElement && ["text", "search"].includes(focused.type) ? [focused.selectionStart, focused.selectionEnd] : null;
    const scrollLeft = this.body.querySelector(".table-wrap")?.scrollLeft || 0;
    this.closeMenus();
    this.rows = rows;
    this.from = from;
    this.to = to;
    this.total = total;
    this.currentPage = Math.max(1, (this.process.pageNumber || 0) + 1);
    const pages = Math.max(1, (this.process as PaginateProcessManager).totalPage || 1);
    const number = (value: number) => new Intl.NumberFormat(this.owner.options.direction === "rtl" ? "fa-IR" : "en-US").format(value);
    this.resultCount.className = "result-count";
    this.resultCount.replaceChildren(this.icon("resultsIcon"), element("b", "", `${number(total)} ${this.label("results", "نتیجه")}`));
    this.pageLabel.textContent = `${this.label("page", "صفحه")} ${number(this.currentPage)} ${this.label("of", "از")} ${number(pages)}`;
    this.pageNumbers.replaceChildren();
    this.pagingControls.querySelectorAll<HTMLElement>("[data-bc-page]").forEach(page => {
      const index = Number(page.dataset.bcPage);
      const button = element("button", "page-number", number(index + 1));
      button.type = "button";
      button.setAttribute("aria-label", `${this.label("page", "صفحه")} ${number(index + 1)}`);
      if (index + 1 === this.currentPage) button.setAttribute("aria-current", "page");
      button.addEventListener("click", () => page.click());
      this.pageNumbers.append(button);
    });
    this.footer.querySelectorAll<HTMLButtonElement>("[data-page-action]").forEach(button => {
      button.disabled = ["first", "previous"].includes(button.dataset.pageAction) ? this.currentPage <= 1 : this.currentPage >= pages;
    });
    const filtering = this.filterColumns.length > 0;
    const view = this.presentation.view || "table";
    this.container.dataset.bcFilterMode = this.filterMode;
    const hasHeader = this.headerContent.parentElement === this.sectionHeader;
    const showBand = this.filterMode !== "header" && filtering && this.quickFilters.childElementCount > 0;
    this.filterBar.hidden = !showBand;
    const filterTools = hasHeader && this.owner.options.filter === "advanced" && view !== "mobile" ? this.sectionHeader : this.toolbar;
    if (this.filterButton.parentElement !== filterTools) filterTools.append(this.filterButton);
    const panelFilters = filtering && !this.headerFilters;
    this.filterButton.style.display = panelFilters ? "" : "none";
    this.filterButton.setAttribute("aria-expanded", String(panelFilters && this.showFilters));
    this.filters.style.display = panelFilters && this.showFilters ? "" : "none";
    if (view === "mobile") {
      if (this.selectionSummary.parentElement !== this.container) this.container.insertBefore(this.selectionSummary, this.body);
      const settingsParent = panelFilters ? this.filters.querySelector(".filter-panel-tools") : this.toolbar;
      if (settingsParent && this.settingsButton.parentElement !== settingsParent) settingsParent.append(this.settingsButton);
    } else {
      if (this.selectionSummary.parentElement !== this.toolbar) this.toolbar.querySelector(".toolbar-spacer")?.after(this.selectionSummary);
      if (this.settingsButton.parentElement !== this.toolbar) this.selectionSummary.after(this.settingsButton);
    }
    const guideParent = view === "mobile" && hasHeader ? this.sectionHeader : this.toolbar;
    if (this.guideButton && this.guideButton.parentElement !== guideParent) guideParent.append(this.guideButton);
    this.quickFilters.querySelectorAll<HTMLButtonElement>("[data-quick-filter]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.quickFilter === (this.process.filter?.[this.presentation.quickFilter] || "")));
    });
    this.container.dataset.view = view;
    this.mobileTools.hidden = view !== "mobile";
    this.mobileSelectAll.parentElement.hidden = !this.owner.options.selectAll || !this.owner.options.selectable || this.owner.options.selectable === "none" || this.owner.options.selectable === "single";
    this.mobileSort.parentElement?.toggleAttribute("hidden", !this.dataColumns.some(column => column.sort && column.name !== "operation"));
    this.mobileSort.value = this.process.sortInfo ? `${this.process.sortInfo.column.name}:${this.process.sortInfo.sort}` : "";
    const density = this.presentation.density || "comfortable";
    const wrapper = element("div", view === "table" ? "table-wrap" : `${view === "mobile" ? "mobile-rows" : view === "grid" ? "card-grid" : "structured-list"} ${density}`);
    let body: HTMLElement = wrapper;
    if (view === "table") {
      wrapper.setAttribute("data-bc-table-container", "");
      const table = element("table", `data-table ${density}`);
      table.setAttribute("data-bc-table", "");
      const independent = this.independentHeaderFilters;
      if (independent) table.classList.add("independent-header");
      const head = element("thead");
      const headings = element("tr");
      this.columns.forEach(column => {
        const th = element("th", column.type === ColumnType.select ? "check-cell" : column.name === "operation" ? "action-cell" : "");
        th.scope = "col";
        if (column.name && column.type === ColumnType.data) th.dataset.guideColumnHeader = column.name;
        if (column.width) th.style.width = column.width;
        if (column.headerCssClass) th.classList.add(...(Array.isArray(column.headerCssClass) ? column.headerCssClass : [column.headerCssClass]));
        if (column.type === ColumnType.select) {
          if (this.owner.options.selectAll && this.owner.options.selectable !== "single") {
            const checkbox = element("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("aria-label", this.label("selectAll", "انتخاب همه"));
            checkbox.addEventListener("change", () => {
              this.rows.forEach(row => { if (row._checkBox) row._checkBox.checked = checkbox.checked; });
              this.owner.onSelectionChange();
            });
            th.append(checkbox);
          }
        } else {
          const content = element("div", "th-content");
          const title = element("span");
          if (column.name && column.type === ColumnType.data) title.dataset.guideColumn = column.name;
          title.innerHTML = column.title;
          const hasFilter = this.headerFilters && filtering && column.type === ColumnType.data && column.filter;
          const control = hasFilter && !independent ? this.createColumnFilter(column) : null;
          if (control) content.append(control);
          else content.append(title);
          if (column.type === ColumnType.data && column.sort) {
            const current = this.process.sortInfo?.column === column ? this.process.sortInfo.sort : null;
            const ascending = current === "asc";
            th.setAttribute("aria-sort", current === "asc" ? "ascending" : current === "desc" ? "descending" : "none");
            const sort = this.iconButton(!current ? "sortIcon" : ascending ? "arrowUpIcon" : "arrowDownIcon", `${this.label("sort", "مرتب‌سازی")} ${this.columnTitle(column)}`, () => {
              this.process.sortInfo = current === "desc" ? null : {column, sort: ascending ? "desc" : "asc"};
              this.process.applyUserAction(this.headerFilters ? "text" : "select");
            });
            sort.className = "sort-button";
            content.append(sort);
          }
          th.append(content);
        }
        headings.append(th);
      });
      if (this.presentation.rowActions) headings.append(element("th", "action-cell", this.label("actions", "عملیات")));
      head.append(headings);
      if (independent && filtering) {
        const filters = element("tr", "header-filters-row");
        filters.hidden = this.presentation.showHeaderFilters === false;
        this.columns.forEach(column => {
          const cell = element("td");
          if (column.name) cell.dataset.filterColumn = column.name;
          if (column.type === ColumnType.data && column.filter) cell.append(this.createHeaderFilterField(column));
          filters.append(cell);
        });
        if (this.presentation.rowActions) filters.append(element("td"));
        head.append(filters);
      }
      body = element("tbody");
      table.append(head, body);
      wrapper.append(table);
    }
    rows.forEach(row => {
      row._uiElement = null;
      body.append(row.uiElement);
    });
    this.body.replaceChildren(wrapper);
    if (view === "table") wrapper.scrollLeft = scrollLeft;
    if (focusKey) {
      const input = Array.from(this.body.querySelectorAll<HTMLInputElement | HTMLSelectElement>(".header-filter"))
        .find(input => input.dataset.columnFilter === focusKey);
      input?.focus({preventScroll: true});
      if (input instanceof HTMLInputElement && selection) input.setSelectionRange(selection[0], selection[1]);
    }
    if (!rows.length && this.owner.options.noData) {
      const empty = element("div", "empty-state");
      empty.append(this.icon("emptyIcon"), element("strong", "", this.label("emptyTitle", "نتیجه‌ای پیدا نشد")),
        element("span", "", this.label("emptyMessage", "جستجو یا فیلترهای خود را تغییر دهید.")));
      if (typeof this.owner.options.noData === "string") empty.textContent = this.owner.options.noData;
      if (typeof this.owner.options.noData === "function") {
        const cell = element("td");
        this.owner.options.noData(cell);
        empty.replaceChildren(...Array.from(cell.childNodes));
      }
      wrapper.append(empty);
    }
    this.syncSelection();
  }

  private createHeaderFilterField(column: IGridColumnInfo) {
    const field = element("div", "header-filter-field");
    const control = this.createColumnFilter(column);
    const clear = this.iconButton("closeIcon", `${this.label("clearFilter", "پاک کردن فیلتر")} ${this.columnTitle(column)}`, () => {
      control.value = "";
      control.dispatchEvent(new Event(control instanceof HTMLSelectElement ? "change" : "input", {bubbles: true}));
      Array.from(this.body.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-column-filter]"))
        .find(input => input.dataset.columnFilter === column.name)?.focus({preventScroll: true});
    });
    clear.classList.add("clear-header-filter");
    const sync = () => {clear.style.display = control.value ? "" : "none";};
    control.addEventListener("input", sync);
    control.addEventListener("change", sync);
    sync();
    field.append(control, clear);
    return field;
  }

  private createColumnFilter(column: IGridColumnInfo, inPanel = false) {
    const typed = this.filterMode !== "header";
    const select = typed && column.filterData?.type === "select";
    const control = select ? element("select", "header-filter") : element("input", "header-filter");
    if (control instanceof HTMLSelectElement) {
      control.append(new Option(this.label("all", "همه"), ""));
      this.filterValues(column).forEach(value => control.append(new Option(String(value.value), String(value.id))));
    } else {
      control.type = typed && column.filterData?.inputType === "date" ? "date" : typed ? "search" : "text";
      if (typed && column.filterData?.inputType === "number") control.inputMode = "decimal";
      control.placeholder = typed ? this.label("columnSearch", "جستجو...") : this.columnTitle(column);
    }
    control.setAttribute("aria-label", this.columnTitle(column));
    if (inPanel) control.dataset.panelFilter = column.name;
    else control.dataset.columnFilter = column.name;
    this.restoreFilterValue(control, column.name);
    const apply = () => {
      if (typeof this.process.filter !== "object") this.process.filter = {};
      if (control.value) this.process.filter[column.name] = control.value.toLowerCase();
      else delete this.process.filter[column.name];
      this.process.pageNumber = 0;
      this.updateFilterButton();
      this.process.applyUserAction("text");
    };
    if (select) control.addEventListener("change", apply);
    else {
      control.addEventListener("input", event => {if (!(event as InputEvent).isComposing) apply();});
      control.addEventListener("compositionend", apply);
    }
    return control;
  }

  private cell(row: GridRow, column: IGridColumnInfo, tag: "div" | "td" = "div") {
    const cell = element(tag);
    if (tag === "td" && column.name === "operation") cell.classList.add("action-cell");
    if (column.name) cell.dataset.guideColumnValue = column.name;
    const value = row._dataProxy[column.name];
    cell.setAttribute("data-bc-data", "");
    if (column.cellMaker) cell.innerHTML = column.cellMaker(row.data, value, cell) ?? String(value ?? "");
    else cell.textContent = String(value ?? "—");
    if (column.cssClass) cell.classList.add(...(Array.isArray(column.cssClass) ? column.cssClass : [column.cssClass]));
    return cell;
  }

  private checkbox(row: GridRow) {
    const checked = row.selected;
    row._checkBox = element("input");
    row._checkBox.type = this.owner.options.selectable === "single" ? "radio" : "checkbox";
    row._checkBox.name = this.owner.id;
    row._checkBox.checked = checked;
    row._checkBox.setAttribute("aria-label", `${this.label("select", "انتخاب")} ${row.data.id ?? row.order}`);
    row._checkBox.addEventListener("change", () => {
      if (this.owner.options.selectable === "single") this.owner.setSelectedRows([row.data]);
      else this.owner.onSelectionChange();
    });
    return row._checkBox;
  }

  createRow(row: GridRow) {
    const view = this.presentation.view || "table";
    const action = () => this.iconButton("moreIcon", this.label(view === "table" ? "editRow" : view === "grid" ? "cardOptions" : "rowOptions", view === "table" ? "ویرایش ردیف" : view === "grid" ? "گزینه‌های کارت" : "گزینه‌های ردیف"), () => this.presentation.onRowAction?.(row.data));
    if (view === "table") {
      const tr = element("tr", row.selected ? "selected-row" : "");
      tr.setAttribute("data-sys-tr", "");
      this.columns.forEach(column => {
        if (column.type === ColumnType.select) {
          const td = element("td", "check-cell");
          td.setAttribute("data-bc-select", "");
          td.append(this.checkbox(row));
          tr.append(td);
        } else if (column.type === ColumnType.sort) {
          const order = element("td", "", String(row.order));
          order.setAttribute("data-bc-order", "");
          tr.append(order);
        }
        else tr.append(this.cell(row, column, "td"));
      });
      if (this.presentation.rowActions) {
        const cell = element("td", "action-cell");
        cell.append(action());
        tr.append(cell);
      }
      return tr;
    }
    const columns = this.dataColumns;
    const titleKey = this.presentation.titleKey || columns[0]?.name;
    const subtitleKey = this.presentation.subtitleKey || columns[1]?.name;
    const image = columns.find(column => column.name === this.presentation.imageKey);
    const badge = columns.find(column => column.name === this.presentation.badgeKey);
    const title = String(row._dataProxy[titleKey] ?? row.data[titleKey] ?? this.label("untitled", "بدون عنوان"));
    const subtitle = String(row._dataProxy[subtitleKey] ?? row.data[subtitleKey] ?? "");
    if (view === "mobile") {
      const item = element("article", "mobile-row");
      const heading = element("div", "mobile-row-heading");
      if (this.owner.options.selectable && this.owner.options.selectable !== "none") {
        const select = element("label", "mobile-row-select");
        select.append(this.checkbox(row));
        heading.append(select);
      }
      const copy = element("div", "mobile-row-copy");
      const operation = columns.find(column => column.name === "operation");
      const fields = columns.filter(column => column !== operation);
      const firstColumn = fields.find(column => column.name === this.presentation.titleKey) || fields[0];
      const badgeColumn = fields.find(column => column.name === this.presentation.badgeKey && column !== firstColumn);
      if (firstColumn) {
        const title = element("h3");
        title.dataset.guideColumnValue = firstColumn.name;
        title.append(...Array.from(this.cell(row, firstColumn).childNodes));
        copy.dataset.mobilePrimary = firstColumn.name;
        const label = element("span", "mobile-field-label", this.columnTitle(firstColumn));
        label.dataset.guideColumn = firstColumn.name;
        copy.append(label, title);
      }
      heading.append(copy);
      const trailing = element("div", "mobile-row-trailing");
      if (badgeColumn) {
        const status = this.cell(row, badgeColumn);
        status.classList.add("mobile-row-badge");
        status.dataset.mobileBadge = badgeColumn.name;
        status.dataset.guideColumn = badgeColumn.name;
        status.setAttribute("role", "group");
        status.setAttribute("aria-label", this.columnTitle(badgeColumn));
        trailing.append(status);
      }
      if (operation || this.presentation.rowActions) {
        const actions = element("div", "mobile-row-actions");
        if (operation) {
          actions.dataset.mobileOperation = operation.name;
          actions.append(this.cell(row, operation));
        } else actions.append(action());
        trailing.append(actions);
      }
      if (trailing.hasChildNodes()) heading.append(trailing);
      item.append(heading);
      const data = element("dl", "mobile-row-fields");
      fields.filter(column => ![firstColumn, badgeColumn].includes(column)).forEach(column => {
          const field = element("div");
          field.dataset.mobileField = column.name;
          const value = element("dd");
          value.append(this.cell(row, column));
          const label = element("dt", "", this.columnTitle(column));
          label.dataset.guideColumn = column.name;
          field.append(label, value);
          data.append(field);
      });
      item.append(data);
      return item;
    }
    if (view === "list") {
      const item = element("div", "list-item");
      if (this.owner.options.selectable && this.owner.options.selectable !== "none") item.append(this.checkbox(row));
      if (image) item.append(...Array.from(this.cell(row, image).childNodes));
      else item.append(element("span", "list-index", String(row.order).padStart(2, "۰")));
      const copy = element("div", "list-copy");
      copy.append(element("strong", "", title), element("span", "", subtitle));
      const trailing = element("div", "list-trailing");
      if (badge) trailing.append(...Array.from(this.cell(row, badge).childNodes));
      if (this.presentation.rowActions) trailing.append(action());
      item.append(copy, trailing);
      return item;
    }
    const card = element("article", "data-card");
    if (image) {
      const picture = element("div", "card-image");
      picture.append(...Array.from(this.cell(row, image).childNodes));
      card.append(picture);
    }
    const body = element("div", "card-body");
    const heading = element("div", "card-heading");
    const copy = element("div");
    copy.append(element("h3", "", title), element("p", "", subtitle));
    heading.append(copy);
    if (this.presentation.rowActions) heading.append(action());
    body.append(heading);
    if (badge) body.append(...Array.from(this.cell(row, badge).childNodes));
    const meta = element("div", "card-meta");
    columns.filter(column => ![titleKey, subtitleKey, image?.name].includes(column.name)).slice(0, 3).forEach(column => {
      const field = element("div");
      const value = element("strong");
      value.dataset.guideColumnValue = column.name;
      value.append(...Array.from(this.cell(row, column).childNodes));
      const label = element("span", "", this.columnTitle(column));
      label.dataset.guideColumn = column.name;
      field.append(label, value);
      meta.append(field);
    });
    body.append(meta);
    card.append(body);
    return card;
  }

  syncSelection(count?: number) {
    count = count ?? this.owner.getSelectedRows().length;
    const mobile = this.presentation.view === "mobile";
    const number = mobile ? count.toLocaleString(this.owner.options.direction === "rtl" ? "fa-IR" : "en-US") : String(count);
    this.selectedCount.textContent = `${number} ${this.label("selectedItems", "مورد انتخاب شده")}`;
    this.selectedCount.style.display = count && this.owner.options.selectable && this.owner.options.selectable !== "none" ? "" : "none";
    this.clearSelection.style.display = this.selectedCount.style.display;
    this.selectionSummary.style.display = this.selectedCount.style.display;
    this.mobileBulkActions.hidden = !mobile || !count || !this.mobileBulkActions.hasChildNodes();
    this.mobileTools.hidden = !mobile || this.selectionSummary.style.display !== "none";
    this.rows.forEach(row => row._uiElement?.classList.toggle("selected-row", row.selected));
    this.mobileSelectAll.checked = this.rows.length > 0 && this.rows.every(row => row.selected);
    this.mobileSelectAll.indeterminate = this.rows.some(row => row.selected) && !this.mobileSelectAll.checked;
    this.mobileSelectAll.disabled = !this.rows.length;
    const checkbox = this.body.querySelector('thead input[type="checkbox"]') as HTMLInputElement;
    if (checkbox) checkbox.checked = this.rows.length > 0 && this.rows.every(row => row.selected);
    if (checkbox) checkbox.indeterminate = this.rows.some(row => row.selected) && !checkbox.checked;
    this.updateToolbarVisibility();
  }
}
