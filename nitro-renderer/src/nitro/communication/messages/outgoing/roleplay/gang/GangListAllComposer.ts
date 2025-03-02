import { IMessageComposer } from "../../../../../../api";

export class GangListAllComposer implements IMessageComposer<ConstructorParameters<typeof GangListAllComposer>> {
  private _data: ConstructorParameters<typeof GangListAllComposer>;

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
