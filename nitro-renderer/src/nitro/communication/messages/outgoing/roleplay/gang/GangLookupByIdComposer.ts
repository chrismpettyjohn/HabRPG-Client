import { IMessageComposer } from "../../../../../../api";

export class GangLookupByIdComposer implements IMessageComposer<ConstructorParameters<typeof GangLookupByIdComposer>> {
  private _data: ConstructorParameters<typeof GangLookupByIdComposer>;

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
