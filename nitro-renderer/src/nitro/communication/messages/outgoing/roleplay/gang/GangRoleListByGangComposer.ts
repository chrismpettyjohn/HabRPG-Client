import { IMessageComposer } from "../../../../../../api";

export class GangRoleListByGangComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleListByGangComposer>> {
  private _data: ConstructorParameters<typeof GangRoleListByGangComposer>;

  constructor(gangId: number) {
    this._data = [gangId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
