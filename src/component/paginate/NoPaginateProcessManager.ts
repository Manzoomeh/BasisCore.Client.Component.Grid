import IGrid from "../grid/IGrid";
import ProcessManager from "./ProcessManager";

export default class NoPaginateProcessManager extends ProcessManager {
  constructor(owner: IGrid) {
    super(owner);
  }
}
