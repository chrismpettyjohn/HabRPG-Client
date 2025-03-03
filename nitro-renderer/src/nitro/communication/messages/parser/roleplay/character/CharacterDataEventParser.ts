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
  hasGangOffer: boolean;
  corpId: number;
  corpName: string;
  corpRoleId: number;
  corpRoleName: string;
  gangId?: number;
  gangName?: string;
  gangRoleId?: number;
  gangRoleName?: string;
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

    const id = wrapper.readInt();
    const botId = wrapper.readInt();
    const userId = wrapper.readInt();
    const petId = wrapper.readInt();
    const username = wrapper.readString();
    const figure = wrapper.readString();
    const isDead = wrapper.readBoolean();
    const isExhausted = wrapper.readBoolean();
    const isWorking = wrapper.readBoolean();
    const hasJobOffer = wrapper.readBoolean();
    const hasGangOffer = wrapper.readBoolean();
    const corpId = wrapper.readInt();
    const corpName = wrapper.readString();
    const corpRoleId = wrapper.readInt();
    const corpRoleName = wrapper.readString();
    const gangId = wrapper.readInt();
    const gangName = wrapper.readString();
    const gangRoleId = wrapper.readInt();
    const gangRoleName = wrapper.readString();
    const healthNow = wrapper.readInt();
    const healthMax = wrapper.readInt();
    const energyNow = wrapper.readInt();
    const energyMax = wrapper.readInt();

    this._characterData = {
      id,
      botId,
      userId,
      petId,
      username,
      figure,
      isDead,
      isExhausted,
      isWorking,
      hasJobOffer,
      hasGangOffer,
      corpId,
      corpName,
      corpRoleId,
      corpRoleName,
      gangId: !!gangId ? gangId : null,
      gangName: !!gangName ? gangName : null,
      gangRoleId: !!gangRoleId ? gangRoleId : null,
      gangRoleName: !!gangRoleName ? gangRoleName : null,
      healthNow,
      healthMax,
      energyNow,
      energyMax,
    };

    return true;
  }

  public get characterData(): CharacterData {
    return this._characterData;
  }
}
