import { IMessageComposer } from "../../../../../../api";

export class CorpPromoteUserComposer implements IMessageComposer<ConstructorParameters<typeof CorpPromoteUserComposer>> {
  private _data: ConstructorParameters<typeof CorpPromoteUserComposer>;

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
