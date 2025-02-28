import { IMessageComposer } from "../../../../../../api";

export class GangRoleListAllComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleListAllComposer>> {
  private _data: ConstructorParameters<typeof GangRoleListAllComposer>;

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
