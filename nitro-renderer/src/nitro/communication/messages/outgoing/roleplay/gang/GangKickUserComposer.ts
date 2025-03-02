import { IMessageComposer } from "../../../../../../api";

export class GangKickUserComposer implements IMessageComposer<ConstructorParameters<typeof GangKickUserComposer>> {
  private _data: ConstructorParameters<typeof GangKickUserComposer>;

  constructor(username: string) {
    this._data = [username];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
