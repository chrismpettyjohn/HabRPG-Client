import { IMessageComposer } from "../../../../../../api";

export class CorpListAllComposer implements IMessageComposer<ConstructorParameters<typeof CorpListAllComposer>> {
  private _data: ConstructorParameters<typeof CorpListAllComposer>;

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
