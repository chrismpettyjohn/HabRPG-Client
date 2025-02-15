import { IMessageComposer } from "../../../../../../api";

export class CorpFireUserComposer implements IMessageComposer<ConstructorParameters<typeof CorpFireUserComposer>> {
  private _data: ConstructorParameters<typeof CorpFireUserComposer>;

  constructor(userId: number) {
    this._data = [userId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
