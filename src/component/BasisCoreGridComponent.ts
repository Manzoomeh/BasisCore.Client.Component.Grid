import { Priority } from "../basiscore/enum";
import IComponentManager from "../basiscore/IComponentManager";
import ISource from "../basiscore/ISource";
import IUserDefineComponent from "../basiscore/IUserDefineComponent";
import { SourceId } from "../basiscore/type-alias";
import Grid from "./grid/Grid";
import { IGridOptions } from "./grid/IOptions";

export default class BasisCoreGridComponent implements IComponentManager {
  readonly owner: IUserDefineComponent;
  private grid: Grid;
  private container: HTMLDivElement;
  private sourceId: SourceId = null;

  constructor(owner: IUserDefineComponent) {
    this.owner = owner;
    this.owner.priority = Priority.none;
  }

  public async initializeAsync(): Promise<void> {
    const sourceId = await this.owner.getAttributeValueAsync("DataMemberName");
    this.container = document.createElement("div");
    this.owner.setContent(this.container);

    const optionName = await this.owner.getAttributeValueAsync("options");
    const option: IGridOptions = optionName ? eval(optionName) : null;

    const refreshCallback = (data) => {
      if (option.refreshSourceId) {
        this.owner.setSource(option.refreshSourceId, data);
      } else {
        throw new Error(
          "For refresh grid,'refreshSourceId' property must be set in grid 'options' object!"
        );
      }
    };

    const selectionChangeCallback = (data) => {
      if (option.selectedSourceId) {
        this.owner.setSource(option.selectedSourceId, data);
      } else {
        throw new Error(
          "For receive selected row from grid,'selectedSourceId' property must be set in grid 'options' object!"
        );
      }
    };
    this.grid = new Grid(this.container, option, refreshCallback, selectionChangeCallback);
    if (sourceId) {
      this.sourceId = sourceId.toLowerCase();
      this.owner.addTrigger([this.sourceId]);
      const source = this.owner.tryToGetSource(this.sourceId);
      if (source) {
        this.grid.setSource(source.rows, source.extra);
      }
    }
  }

  public runAsync(source?: ISource): boolean {
    if (source?.id === this.sourceId) {
      this.grid.setSource(source.rows, source.extra);
    }
    return true;
  }
}
