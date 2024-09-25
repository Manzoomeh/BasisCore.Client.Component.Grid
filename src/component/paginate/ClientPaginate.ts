import IGrid from "../grid/IGrid";
import PaginateBaseProcess from "./PaginateProcessManager";

export default class ClientProcess extends PaginateBaseProcess {
  constructor(
    owner: IGrid,
    pageSizeContainer: HTMLDivElement,
    pagingContainer: HTMLDivElement,
    pagingInpit : HTMLDivElement
  ) {
    super(owner, pageSizeContainer, pagingContainer,pagingInpit);
  }
}
