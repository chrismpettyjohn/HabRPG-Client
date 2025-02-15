import { IMessageComposer } from "../../../../../../api";

export class CorpOfferUserJobComposer implements IMessageComposer<ConstructorParameters<typeof CorpOfferUserJobComposer>> {
  private _data: ConstructorParameters<typeof CorpOfferUserJobComposer>;

  constructor(userId: number, corpId: number, corpRoleId: number) {
    this._data = [userId, corpId, corpRoleId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
