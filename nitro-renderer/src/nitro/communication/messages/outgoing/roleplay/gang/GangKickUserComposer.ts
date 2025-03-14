import { IMessageComposer } from "../../../../../../api";

export class GangKickUserComposer implements IMessageComposer<ConstructorParameters<typeof GangKickUserComposer>> {
  private _data: ConstructorParameters<typeof GangKickUserComposer>;

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
