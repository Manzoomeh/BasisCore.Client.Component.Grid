import IGrid from "../grid/IGrid";
import ProcessManager from "./ProcessManager";
import { SignalSourceCallback } from "../../type-alias";

export default class NoPaginate extends ProcessManager {
  constructor(owner: IGrid, onSignalSourceCallback: SignalSourceCallback) {
    super(owner, onSignalSourceCallback);
  }
}
