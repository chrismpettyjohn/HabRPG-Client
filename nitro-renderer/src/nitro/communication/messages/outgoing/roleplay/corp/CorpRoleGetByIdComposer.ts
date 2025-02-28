import { IMessageComposer } from "../../../../../../api";

export class CorpRoleGetByIdComposer implements IMessageComposer<ConstructorParameters<typeof CorpRoleGetByIdComposer>> {
  private _data: ConstructorParameters<typeof CorpRoleGetByIdComposer>;

  constructor(corpRoleId: number) {
    this._data = [corpRoleId];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
