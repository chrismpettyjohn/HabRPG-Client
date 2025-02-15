import { IMessageComposer } from "../../../../../../api";

export class CorpStartWorkComposer implements IMessageComposer<ConstructorParameters<typeof CorpStartWorkComposer>> {
  private _data: ConstructorParameters<typeof CorpStartWorkComposer>;

  constructor() {
    this._data = [];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
