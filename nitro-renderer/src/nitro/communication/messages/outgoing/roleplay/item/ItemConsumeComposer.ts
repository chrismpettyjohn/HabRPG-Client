import { IMessageComposer } from "../../../../../../api";

export class ItemConsumeComposer implements IMessageComposer<ConstructorParameters<typeof ItemConsumeComposer>> {
  private _data: ConstructorParameters<typeof ItemConsumeComposer>;

  constructor(itemId: number) {
    this._data = [itemId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
