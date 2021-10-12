import { SignalSourceCallback } from "../../type-alias";
import GridRow from "../grid/GridRow";
import IGrid from "../grid/IGrid";
import { IOffsetOptions } from "../grid/IOptions";
import ServerBaseProcess from "./ServerBaseProcess";

export default class MixedProcess extends ServerBaseProcess {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement,
    onSignalSourceCallback: SignalSourceCallback
  ) {
    super(owner, pageSizeContainer, pagingContainer, onSignalSourceCallback);
  }

  public setSource(rows: GridRow[], options: IOffsetOptions) {
    rows.forEach((row, i) => row.setOrder(i));
    this.originalData = rows;
    this.options = options;
    this.displayRows(this.originalData);
  }

  public applyUserAction(): void {
    this.tryLoadData();
  }
}
