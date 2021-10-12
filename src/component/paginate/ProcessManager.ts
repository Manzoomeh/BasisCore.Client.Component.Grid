import GridRow from "../grid/GridRow";
import IGrid from "../grid/IGrid";
import { IOffsetOptions } from "../grid/IOptions";
import { ISortInfo, SignalSourceCallback } from "../../type-alias";
import IGridProcessManager from "./IGridProcessManager";

export default abstract class ProcessManager implements IGridProcessManager {
  readonly owner: IGrid;
  protected options: IOffsetOptions;
  public pageSize: number;
  public pageNumber: number;
  public sortInfo: ISortInfo;
  public filter: any = "";
  protected originalData: Array<GridRow>;

  constructor(owner: IGrid) {
    this.owner = owner;
  }

  public setSource(data: GridRow[], options: IOffsetOptions) {
    this.originalData = data;
    this.options = options;
    this.applyUserAction();
  }

  protected applyFilterAndSort(): Array<GridRow> {
    var rows = this.originalData;
    if (this.owner.options.filter === "simple" && this.filter?.length > 0) {
      rows = rows.filter((x) => x.acceptableBySimpleFilter(this.filter));
    } else if (
      this.owner.options.filter === "row" &&
      this.filter &&
      Reflect.ownKeys(this.filter).length > 0
    ) {
      rows = rows.filter((x) => x.acceptableByRowFilter(this.filter));
    }
    if (this.sortInfo) {
      rows = rows.sort((a, b) => GridRow.compare(a, b, this.sortInfo));
    }
    rows.forEach((row, i) => row.setOrder(i));
    return rows;
  }

  public applyUserAction(): void {
    const rows = this.applyFilterAndSort();
    const total = rows?.length ?? 0;
    const from = rows?.length > 0 ? rows[0].order : 0;
    const to = from + total;
    this.displayRows(rows, from, to, total);
  }

  protected displayRows(
    rows: Array<GridRow>,
    from: number,
    to: number,
    total: number
  ): void {
    this.owner.displayRows(rows, from, to, total);
  }
}
