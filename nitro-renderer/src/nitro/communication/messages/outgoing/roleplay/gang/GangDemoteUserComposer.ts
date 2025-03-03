import { IMessageComposer } from "../../../../../../api";

export class GangDemoteUserComposer implements IMessageComposer<ConstructorParameters<typeof GangDemoteUserComposer>> {
  private _data: ConstructorParameters<typeof GangDemoteUserComposer>;

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
