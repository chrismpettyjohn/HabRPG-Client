import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CharacterData {
  id: number;
  botId: number | null;
  userId: number | null;
  petId: number | null;
  username: string;
  figure: string;
  isDead: boolean;
  isExhausted: boolean;
  isWorking: boolean;
  hasJobOffer: boolean;
  corpId: number;
  corpName: string;
  corpRoleId: number;
  corpRoleName: string;
  healthNow: number;
  healthMax: number;
  energyNow: number;
  energyMax: number;
}

export class CharacterDataEventParser implements IMessageParser {
  private _characterData: CharacterData;

  public flush(): boolean {
    this._characterData = undefined;
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._characterData = {
      id: wrapper.readInt(),
      botId: wrapper.readInt(),
      userId: wrapper.readInt(),
      petId: wrapper.readInt(),
      username: wrapper.readString(),
      figure: wrapper.readString(),
      isDead: wrapper.readBoolean(),
      isExhausted: wrapper.readBoolean(),
      isWorking: wrapper.readBoolean(),
      hasJobOffer: wrapper.readBoolean(),
      corpId: wrapper.readInt(),
      corpName: wrapper.readString(),
      corpRoleId: wrapper.readInt(),
      corpRoleName: wrapper.readString(),
      healthNow: wrapper.readInt(),
      healthMax: wrapper.readInt(),
      energyNow: wrapper.readInt(),
      energyMax: wrapper.readInt(),
    };

    return true;
  }

  public get characterData(): CharacterData {
    return this._characterData;
  }
}
