import { Priority } from "../basiscore/enum";
import IComponentManager from "../basiscore/IComponentManager";
import ISource from "../basiscore/ISource";
import IUserDefineComponent from "../basiscore/IUserDefineComponent";
import { SourceId } from "../basiscore/type-alias";
import Grid from "./grid/Grid";

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
    const signalSourceId = await this.owner.getAttributeValueAsync(
      "SignalSourceId"
    );

    const style = await this.owner.getAttributeValueAsync("style");
    this.container = document.createElement("div");
    if (style) {
      this.container.setAttribute("style", style);
    }
    this.owner.setContent(this.container);

    const optionName = await this.owner.getAttributeValueAsync("options");
    const option = optionName ? eval(optionName) : null;
    this.grid = new Grid(this.container, option, (data) => {
      this.owner.setSource(signalSourceId, data);
    });

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
