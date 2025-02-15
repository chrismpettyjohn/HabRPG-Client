import { IMessageComposer } from "../../../../../../api";

export class CorpDemoteUserComposer implements IMessageComposer<ConstructorParameters<typeof CorpDemoteUserComposer>> {
  private _data: ConstructorParameters<typeof CorpDemoteUserComposer>;

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
