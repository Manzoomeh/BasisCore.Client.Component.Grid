import { SignalSourceCallback } from "../../type-alias";
import IGrid from "../grid/IGrid";
import PaginateBaseProcess from "./PaginateBaseProcess";

export default class ClientProcess extends PaginateBaseProcess {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement,
    onSignalSourceCallback: SignalSourceCallback
  ) {
    super(owner, pageSizeContainer, pagingContainer, onSignalSourceCallback);
  }
}
