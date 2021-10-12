import { IOffsetOptions } from "./IOptions";

export default class Offset {
  public hasRemain: boolean;
  public total: number;
  public loaded: number;

  setSource(loadedData: number, options: IOffsetOptions) {
    this.loaded = loadedData;
    this.hasRemain = options.total - (options.from + loadedData) > 0;
  }
}
