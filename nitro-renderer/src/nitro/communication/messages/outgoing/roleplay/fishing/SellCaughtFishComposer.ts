import { IMessageComposer } from "../../../../../../api";

export class SellCaughtFishComposer implements IMessageComposer<ConstructorParameters<typeof SellCaughtFishComposer>> {
  private _data: ConstructorParameters<typeof SellCaughtFishComposer>;

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
