import { IMessageComposer } from "../../../../../../api";

export class GangPromoteUserComposer implements IMessageComposer<ConstructorParameters<typeof GangPromoteUserComposer>> {
  private _data: ConstructorParameters<typeof GangPromoteUserComposer>;

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
