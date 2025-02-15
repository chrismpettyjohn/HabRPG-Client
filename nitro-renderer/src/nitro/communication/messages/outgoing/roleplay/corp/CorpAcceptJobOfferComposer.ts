import { IMessageComposer } from "../../../../../../api";

export class CorpAcceptJobOfferComposer implements IMessageComposer<ConstructorParameters<typeof CorpAcceptJobOfferComposer>> {
  private _data: ConstructorParameters<typeof CorpAcceptJobOfferComposer>;

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
