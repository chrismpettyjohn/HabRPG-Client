import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangRoleData {
  id: number;
  gangId: number;
  orderId: number;
  name: string;
  canInvite: boolean;
  canKick: boolean;
  canPromote: boolean;
  canDemote: boolean;
}

export class GangRoleDataEventParser implements IMessageParser {
  private _id: number;
  private _gangId: number;
  private _orderId: number;
  private _name: string;
  private _canInvite: boolean;
  private _canKick: boolean;
  private _canPromote: boolean;
  private _canDemote: boolean;

  public flush(): boolean {
    this._id = -1;
    this._gangId = -1;
    this._orderId = 1;
    this._name = "";
    this._canInvite = false;
    this._canKick = false;
    this._canPromote = false;
    this._canDemote = false;
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._id = wrapper.readInt();
    this._gangId = wrapper.readInt();
    this._orderId = wrapper.readInt();
    this._name = wrapper.readString();
    this._canInvite = wrapper.readBoolean();
    this._canKick = wrapper.readBoolean();
    this._canPromote = wrapper.readBoolean();
    this._canDemote = wrapper.readBoolean();

    return true;
  }

  public get data(): GangRoleData {
    return {
      id: this._id,
      gangId: this._gangId,
      orderId: this._orderId,
      name: this._name,
      canInvite: this._canInvite,
      canKick: this._canKick,
      canPromote: this._canPromote,
      canDemote: this._canDemote,
    };
  }
}
