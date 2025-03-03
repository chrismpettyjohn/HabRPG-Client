import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangData {
  id: number;
  roomId: number;
  userId: number;
  name: string;
  description: string;
  badgeCode: string;
}

export class GangDataEventParser implements IMessageParser {
  private _id: number;
  private _roomId: number;
  private _userId: number;
  private _name: string;
  private _description: string;
  private _badgeCode: string;

  public flush(): boolean {
    this._id = -1;
    this._roomId = -1;
    this._userId = -1;
    this._name = "";
    this._description = "";
    this._badgeCode = "";
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._id = wrapper.readInt();
    this._roomId = wrapper.readInt();
    this._userId = wrapper.readInt();
    this._name = wrapper.readString();
    this._description = wrapper.readString();
    this._badgeCode = wrapper.readString();

    return true;
  }

  public get data(): GangData {
    return {
      id: this._id,
      roomId: this._roomId,
      userId: this._userId,
      name: this._name,
      description: this._description,
      badgeCode: this._badgeCode,
    };
  }
}
