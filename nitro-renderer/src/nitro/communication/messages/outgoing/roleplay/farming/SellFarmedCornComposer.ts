import { IMessageComposer } from "../../../../../../api";

export class SellFarmedCornComposer implements IMessageComposer<ConstructorParameters<typeof SellFarmedCornComposer>> {
  private _data: ConstructorParameters<typeof SellFarmedCornComposer>;

  constructor(botId: number) {
    this._data = [botId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
