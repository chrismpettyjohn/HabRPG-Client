import { IMessageComposer } from "../../../../../../api";

export class GangChangeOwnerComposer implements IMessageComposer<ConstructorParameters<typeof GangChangeOwnerComposer>> {
  private _data: ConstructorParameters<typeof GangChangeOwnerComposer>;

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
