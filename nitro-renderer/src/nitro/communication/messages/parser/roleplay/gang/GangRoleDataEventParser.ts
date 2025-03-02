import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangRoleData {
  id: number;
  name: string;
}

export class GangRoleDataEventParser implements IMessageParser {
  private _id: number;
  private _name: string;

  public flush(): boolean {
    this._id = -1;
    this._name = "";
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._id = wrapper.readInt();
    this._name = wrapper.readString();

    return true;
  }

  public get data(): GangRoleData {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
