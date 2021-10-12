import GridRow from "./GridRow";
import { IGridOptions } from "./IOptions";

export default interface IGrid {
  options: IGridOptions;
  displayRows(rows: GridRow[],from:number,to:number,total:number): void;
  showUIProgress(): void;
}
