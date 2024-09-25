import GridRow from "../grid/GridRow";
import IGrid from "../grid/IGrid";
import { FilterDataType, IOffsetOptions } from "../grid/IOptions";
import PaginateProcessManager from "./PaginateProcessManager";

export default class MixedProcess extends PaginateProcessManager {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement,
    pageingInput : HTMLDivElement
  ) {
    super(owner, pageSizeContainer, pagingContainer,pageingInput);
  }

  public setSource(rows: GridRow[], options: IOffsetOptions) {   
    this.originalData = rows;
    this.options = options;
    if (this.owner.options.ProcessActionType.paging == "client") {
      rows.forEach((row, i) => row.setOrder(i));
      super.displayRows(this.originalData);
    } else {
      rows.forEach((row, i) => row.setOrder(i + (this.options?.from ?? 0)));
      this.displayRows(rows);
    }
  }

  protected displayRows(rows: Array<GridRow>): void {
    this.filteredData = rows;
    this.totalRows = this.options.total;
    this.pageNumber = Math.floor(this.options.from / this.pageSize);
    this.updatePaging();
    this.updateState();
    const from = this.options.from + 1;
    const to = this.options.from + rows.length;
    this.owner.displayRows(rows, from, to, this.totalRows);
  }

  protected displayCurrentPage(): void {
    if (this.owner.options.ProcessActionType.paging == "server") {
      this.owner.tryLoadData();
    } else {
      super.displayCurrentPage();
    }
  }

  public applyUserAction(type?: FilterDataType): void {
    if (this.owner.options.ProcessActionType.sort == "client" && this.owner.options.ProcessActionType.search == "client") {
      super.applyUserAction(type);
    } else {
      this.owner.tryLoadData();
    }
  }
}
