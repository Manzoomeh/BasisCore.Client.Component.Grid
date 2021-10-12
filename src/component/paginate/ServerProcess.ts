import { SignalSourceCallback } from "../../type-alias";
import GridRow from "../grid/GridRow";
import IGrid from "../grid/IGrid";
import { IOffsetOptions } from "../grid/IOptions";
import ServerBaseProcess from "./ServerBaseProcess";
export default class ServerProcess extends ServerBaseProcess {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement,
    onSignalSourceCallback: SignalSourceCallback
  ) {
    super(owner, pageSizeContainer, pagingContainer, onSignalSourceCallback);
  }

  setSource(rows: GridRow[], options: IOffsetOptions) {
    this.originalData = rows;
    this.options = options;
    rows.forEach((row, i) => row.setOrder(i + (this.options?.from ?? 0)));
    this.displayRows(rows);
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
    this.tryLoadData();
  }

  public applyUserAction(): void {
    this.tryLoadData();
  }
}
