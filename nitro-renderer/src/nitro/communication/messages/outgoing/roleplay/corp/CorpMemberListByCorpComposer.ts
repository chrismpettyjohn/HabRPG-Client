import { IMessageComposer } from "../../../../../../api";

export class CorpMemberListByCorpComposer implements IMessageComposer<ConstructorParameters<typeof CorpMemberListByCorpComposer>> {
  private _data: ConstructorParameters<typeof CorpMemberListByCorpComposer>;

  constructor(corpId: number) {
    this._data = [corpId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
