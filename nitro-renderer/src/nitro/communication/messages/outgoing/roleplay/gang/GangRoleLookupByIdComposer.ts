import { IMessageComposer } from "../../../../../../api";

export class GangRoleLookupByIdComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleLookupByIdComposer>> {
  private _data: ConstructorParameters<typeof GangRoleLookupByIdComposer>;

  constructor(gangRoleId: number) {
    this._data = [gangRoleId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
