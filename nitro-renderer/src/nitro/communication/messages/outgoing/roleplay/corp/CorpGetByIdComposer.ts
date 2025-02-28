import { IMessageComposer } from "../../../../../../api";

export class CorpGetByIdComposer implements IMessageComposer<ConstructorParameters<typeof CorpGetByIdComposer>> {
  private _data: ConstructorParameters<typeof CorpGetByIdComposer>;

  constructor(corpId: number) {
    this._data = [corpId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
