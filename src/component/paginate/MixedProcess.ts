import GridRow from "../grid/GridRow";
import IGrid from "../grid/IGrid";
import { IOffsetOptions } from "../grid/IOptions";
import PaginateProcessManager from "./PaginateProcessManager";

export default class MixedProcess extends PaginateProcessManager {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement
  ) {
    super(owner, pageSizeContainer, pagingContainer);
  }

  public setSource(rows: GridRow[], options: IOffsetOptions) {
    rows.forEach((row, i) => row.setOrder(i));
    this.originalData = rows;
    this.options = options;
    this.displayRows(this.originalData);
  }

  public applyUserAction(): void {
    this.owner.tryLoadData();
  }
}
