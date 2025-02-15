import { IMessageComposer } from "../../../../../../api";

export class CharacterUpdateByIdComposer implements IMessageComposer<ConstructorParameters<typeof CharacterUpdateByIdComposer>> {
  private _data: ConstructorParameters<typeof CharacterUpdateByIdComposer>;

  constructor(userId: number, corpId: number, corpRoleId: number, healthNow: number, healthMax: number, energyNow: number, energyMax: number) {
    this._data = [userId, corpId, corpRoleId, healthNow, healthMax, energyNow, energyMax];
  }

  public getMessageArray() {
    return this._data;
  }

  public dispose(): void {
    return;
  }
}
