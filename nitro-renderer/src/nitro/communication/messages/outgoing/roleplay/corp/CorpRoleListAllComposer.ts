import { IMessageComposer } from "../../../../../../api";

export class CorpRoleListAllComposer implements IMessageComposer<ConstructorParameters<typeof CorpRoleListAllComposer>> {
  private _data: ConstructorParameters<typeof CorpRoleListAllComposer>;

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
