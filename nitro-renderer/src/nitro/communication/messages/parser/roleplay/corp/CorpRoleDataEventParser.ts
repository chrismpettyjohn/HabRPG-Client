import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpRoleData {
  id: number;
  corpId: number;
  orderId: number;
  name: string;
  canHire: boolean;
  canFire: boolean;
  canPromote: boolean;
  canDemote: boolean;
}

export class CorpRoleDataEventParser implements IMessageParser {
  private _id: number;
  private _corpId: number;
  private _orderId: number;
  private _name: string;
  private _canHire: boolean;
  private _canFire: boolean;
  private _canPromote: boolean;
  private _canDemote: boolean;

  public flush(): boolean {
    this._id = -1;
    this._corpId = -1;
    this._orderId = -1;
    this._name = "";
    this._canHire = false;
    this._canFire = false;
    this._canPromote = false;
    this._canDemote = false;
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._id = wrapper.readInt();
    this._corpId = wrapper.readInt();
    this._orderId = wrapper.readInt();
    this._name = wrapper.readString();
    this._canHire = wrapper.readBoolean();
    this._canFire = wrapper.readBoolean();
    this._canPromote = wrapper.readBoolean();
    this._canDemote = wrapper.readBoolean();

    return true;
  }

  public get data(): CorpRoleData {
    return {
      id: this._id,
      corpId: this._corpId,
      orderId: this._orderId,
      name: this._name,
      canHire: this._canHire,
      canFire: this._canFire,
      canPromote: this._canPromote,
      canDemote: this._canDemote,
    };
  }
}
