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
  private resetSourceId: SourceId = null;

  constructor(owner: IUserDefineComponent) {
    this.owner = owner;
  }


  public async initializeAsync(): Promise<void> {
    this.container = document.createElement("div");
    this.owner.setContent(this.container);
    const sourceId = await this.owner.getAttributeValueAsync("DataMemberName");
    if (sourceId) {
      this.sourceId = sourceId.toLowerCase();
      this.owner.addTrigger([this.sourceId]);
    }
    const resetSourceId = await this.owner.getAttributeValueAsync(
      "ResetSourceId"
    );
    if (resetSourceId) {
      this.resetSourceId = resetSourceId.toLowerCase();
      this.owner.addTrigger([this.resetSourceId]);
    }
  }

  private async initGridAsync(): Promise<void> {
    const optionName = await this.owner.getAttributeValueAsync("options");
    const optionUrl = await this.owner.getAttributeValueAsync("optionsUrl");
    let option: IGridOptions = null;
    if (optionUrl) {
      option = await this.owner.getLibAsync(optionName, optionUrl);
    } else {
      option = optionName ? eval(optionName) : null;
    }

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
    this.container.innerHTML = "";
    this.grid = new Grid(
      this.container,
      option,
      refreshCallback,
      selectionChangeCallback
    );
  }

  private async displayDataIfExistsAsync(): Promise<void> {
    if (this.sourceId) {
      const source = this.owner.tryToGetSource(this.sourceId);
      if (source) {
        await this.runAsync(source);
      }
    }
  }

  public async runAsync(source?: ISource): Promise<boolean> {
    if (source?.id == this.resetSourceId) {
      this.grid = null;
      await this.displayDataIfExistsAsync();
    } else {
      if (this.grid == null) {
        await this.initGridAsync();
      }
      if (source?.id === this.sourceId) {
        this.grid.setSource(source.rows, source.extra);
      } else if (
        source == null ||
        (this.owner.triggers && this.owner.triggers.indexOf(source.id) >= 0)
      ) {
        await this.displayDataIfExistsAsync();
      }
    }
    return true;
  }
}
