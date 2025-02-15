import { IMessageComposer } from "../../../../../../api";

export class CorpQuitJobComposer implements IMessageComposer<ConstructorParameters<typeof CorpQuitJobComposer>> {
  private _data: ConstructorParameters<typeof CorpQuitJobComposer>;

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
