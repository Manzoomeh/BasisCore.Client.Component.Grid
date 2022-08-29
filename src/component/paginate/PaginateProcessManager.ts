import { SignalSourceCallback } from "../../type-alias";
import GridRow from "../grid/GridRow";
import IGrid from "../grid/IGrid";
import ProcessManager from "./ProcessManager";

export default abstract class PaginateProcessManager extends ProcessManager {
  readonly pagingContainer: HTMLDivElement;
  readonly pageSizeContainer: HTMLDivElement;

  private pageNo: HTMLInputElement;
  private previousButton: HTMLAnchorElement;
  private firstButton: HTMLAnchorElement;
  private nextButton: HTMLAnchorElement;
  private lastButton: HTMLAnchorElement;
  private pageButtonsContainer: HTMLSpanElement;
  private remainFromStart: boolean;
  private remainFromEnd: boolean;

  public totalPage: number;
  public totalRows: number;
  protected filteredData: Array<GridRow>;

  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement
  ) {
    super(owner);
    this.pageSizeContainer = pageSizeContainer;
    this.pagingContainer = pagingContainer;
    this.initializeUI();
  }

  protected displayRows(rows: Array<GridRow>): void {
    this.filteredData = rows;
    this.totalRows = rows.length;
    this.pageNumber =
      this.pageNumber == -1 ? this.owner.options.pageNumber - 1 : 0;
    this.updatePaging();
    this.displayCurrentPage();
  }

  protected displayCurrentPage(): void {
    const fromId = this.pageNumber * this.pageSize;
    const toId = fromId + this.pageSize;
    this.updateState();
    const rows = this.filteredData.filter(
      (row) => row.order > fromId && row.order <= toId
    );

    const from = fromId + 1;
    const to = fromId + rows.length;
    const total = this.filteredData.length;
    super.displayRows(rows, from, to, total);
  }

  public updatePaging(): void {
    this.totalPage =
      Math.floor(this.totalRows / this.pageSize) +
      (Math.ceil(this.totalRows % this.pageSize) > 0 ? 1 : 0);
    this.pageNumber = Math.min(this.pageNumber, this.totalPage - 1);
    this.pageButtonsContainer.innerHTML = "";
    const pageSideCount = Math.floor(this.owner.options.pageCount / 2);
    const startPage = Math.max(0, this.pageNumber - pageSideCount);
    const endPage = Math.min(
      this.totalPage,
      startPage + this.owner.options.pageCount
    );
    this.remainFromStart = startPage != 0;
    this.remainFromEnd = endPage != this.totalPage;
    for (let i = startPage; i < endPage; i++) {
      const page = document.createElement("a");
      if (i === startPage) {
        page.setAttribute("data-bc-first", "");
      }
      if (i === endPage - 1) {
        page.setAttribute("data-bc-last", "");
      }
      page.appendChild(document.createTextNode((i + 1).toString()));
      page.setAttribute("data-bc-page", i.toString());
      page.addEventListener("click", (e) => {
        this.pageNo.value = "";
        this.pageNumber = i;
        this.displayCurrentPage();
      });
      this.pageButtonsContainer.append(page);
    }
  }

  private initializeUI(): void {
    if (Array.isArray(this.owner.options.paging)) {
      const label = document.createElement("label");
      label.setAttribute("data-sys-text-colorful", "");
      label.appendChild(
        document.createTextNode(this.owner.options.culture.labels.pageSize)
      );
      const select = document.createElement("select");
      select.setAttribute("data-sys-text-colorful", "");
      this.owner.options.paging?.forEach((pageSize, index) => {
        const option = document.createElement("option");
        const value = pageSize.toString();
        option.selected = index == this.owner.options.defaultPagingIndex;
        option.appendChild(document.createTextNode(value));
        option.setAttribute("value", value);
        select.appendChild(option);
      });
      select.addEventListener("change", (x) => {
        this.pageNo.value = "";
        const newSize = parseInt((x.target as HTMLSelectElement).value);
        if (this.pageSize != newSize) {
          this.pageSize = newSize;
          this.pageSizeChange();
        }
      });
      label.appendChild(select);
      this.pageSizeContainer.appendChild(label);
      this.pageSize =
        this.owner.options.paging[this.owner.options.defaultPagingIndex];
    } else {
      this.pageSize = this.owner.options.paging;
    }

    this.pageNo = document.createElement("input");
    this.pageNo.setAttribute("type", "text");
    this.pageNo.setAttribute("data-sys-input-text", "");
    this.pageNo.setAttribute("data-bc-page-number", "");
    this.pageNo.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (this.pageNo.value.length > 0) {
        this.pageNumber = parseInt(this.pageNo.value) - 1;
        this.displayCurrentPage();
      }
    });

    this.previousButton = document.createElement("a");
    this.previousButton.innerHTML = this.owner.options.culture.labels.previous;
    this.previousButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.pageNo.value = "";
      if (this.pageNumber > 0) {
        this.pageNumber -= 1;
        this.displayCurrentPage();
      }
    });

    if (this.owner.options.firstAndLastBtn) {
      this.firstButton = document.createElement("a");
      this.firstButton.innerHTML = this.owner.options.culture.labels.first;
      this.firstButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.pageNo.value = "";
        this.pageNumber = 0;
        this.displayCurrentPage();
      });

      this.lastButton = document.createElement("a");
      this.lastButton.innerHTML = this.owner.options.culture.labels.last;
      this.lastButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.pageNo.value = "";
        this.pageNumber = this.totalPage - 1;
        this.displayCurrentPage();
      });
    }

    this.pageButtonsContainer = document.createElement("span");

    this.nextButton = document.createElement("a");
    this.nextButton.innerHTML = this.owner.options.culture.labels.next;
    this.nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.pageNo.value = "";
      if (this.pageNumber + 1 < this.totalPage) {
        this.pageNumber += 1;
        this.displayCurrentPage();
      }
    });

    if (this.firstButton) {
      this.pagingContainer.appendChild(this.firstButton);
    }
    this.pagingContainer.appendChild(this.previousButton);
    this.pagingContainer.appendChild(this.pageButtonsContainer);
    this.pagingContainer.appendChild(this.nextButton);
    if (this.lastButton) {
      this.pagingContainer.appendChild(this.lastButton);
    }
    this.pagingContainer.appendChild(this.pageNo);

    this.updateState();
    this.pageNumber = -1;
  }

  protected updateState(): void {
    this.nextButton.setAttribute("data-bc-next", "");
    this.nextButton.setAttribute("data-sys-previous-next", "");
    this.nextButton.setAttribute(
      "data-bc-status",
      this.pageNumber + 1 >= this.totalPage ? "disabled" : ""
    );
    this.lastButton?.setAttribute("data-bc-end", "");
    this.lastButton?.setAttribute("data-sys-start-end", "");
    this.lastButton?.setAttribute(
      "data-bc-status",
      this.pageNumber + 1 >= this.totalPage ? "disabled" : ""
    );
    this.previousButton.setAttribute("data-bc-previous", "");
    this.previousButton.setAttribute("data-sys-previous-next", "");
    this.previousButton.setAttribute(
      "data-bc-status",
      this.pageNumber <= 0 ? "disabled" : ""
    );
    this.firstButton?.setAttribute("data-bc-start", "");
    this.firstButton?.setAttribute("data-sys-start-end", "");
    this.firstButton?.setAttribute(
      "data-bc-status",
      this.pageNumber <= 0 ? "disabled" : ""
    );
    const pageBtn = this.pageButtonsContainer.querySelector(
      `[data-bc-page='${this.pageNumber}']`
    );
    if (
      !pageBtn ||
      (pageBtn.hasAttribute("data-bc-last") && this.remainFromEnd) ||
      (pageBtn.hasAttribute("data-bc-first") && this.remainFromStart)
    ) {
      this.updatePaging();
    }
    this.pageButtonsContainer
      .querySelectorAll("[data-bc-page]")
      .forEach((x) => {
        const pageId = parseInt(x.getAttribute("data-bc-page"));
        if (this.pageNumber === pageId) {
          x.setAttribute("data-bc-current", "true");
          x.setAttribute("data-sys-paging-pageNo", "true");
          x.setAttribute("data-sys-paging-active", "");
        } else {
          x.setAttribute("data-bc-current", "false");
          x.setAttribute("data-sys-paging-pageNo", "false");
          x.removeAttribute("data-sys-paging-active");
        }
      });
  }

  protected pageSizeChange(): void {
    this.updatePaging();
    this.displayCurrentPage();
  }
}
