import { IMessageComposer } from "../../../../../../api";

export class GangMemberListByGangComposer implements IMessageComposer<ConstructorParameters<typeof GangMemberListByGangComposer>> {
  private _data: ConstructorParameters<typeof GangMemberListByGangComposer>;

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
