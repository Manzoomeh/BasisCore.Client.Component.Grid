import { SignalSourceCallback } from "../../type-alias";
import IGrid from "../grid/IGrid";
import PaginateBaseProcess from "./PaginateBaseProcess";

export default class ServerBaseProcess extends PaginateBaseProcess {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement,
    onSignalSourceCallback: SignalSourceCallback
  ) {
    super(owner, pageSizeContainer, pagingContainer, onSignalSourceCallback);
  }

  protected tryLoadData() {
    if (this.onSignalSourceCallback) {
      const data = {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize,
        filter: this.filter,
        sortInfo: {
          col: this.sortInfo?.column.name,
          type: this.sortInfo?.sort,
        },
      };
      this.owner.showUIProgress();
      this.onSignalSourceCallback({
        ...data,
        ...{ urlencoded: encodeURIComponent(JSON.stringify(data)) },
      });
    } else {
      throw new Error("signalSourceId nor set form grid!");
    }
  }
}
