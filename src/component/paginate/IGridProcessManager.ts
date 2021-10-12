import GridRow from "../grid/GridRow";
import { IOffsetOptions } from "../grid/IOptions";
import { ISortInfo } from "../../type-alias";

export default interface IGridProcessManager {
  sortInfo: ISortInfo;
  filter: any;
  setSource(data: Array<GridRow>, options: IOffsetOptions);
  applyUserAction();
}
