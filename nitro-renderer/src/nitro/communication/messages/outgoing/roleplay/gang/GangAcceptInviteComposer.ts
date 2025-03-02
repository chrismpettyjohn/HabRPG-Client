import { IMessageComposer } from "../../../../../../api";

export class GangAcceptInviteComposer implements IMessageComposer<ConstructorParameters<typeof GangAcceptInviteComposer>> {
  private _data: ConstructorParameters<typeof GangAcceptInviteComposer>;

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
