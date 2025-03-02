import { IMessageComposer } from "../../../../../../api";

export class CorpRoleListByCorpComposer implements IMessageComposer<ConstructorParameters<typeof CorpRoleListByCorpComposer>> {
  private _data: ConstructorParameters<typeof CorpRoleListByCorpComposer>;

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
