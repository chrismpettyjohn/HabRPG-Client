import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangData {
  id: number;
  userId: number;
  name: string;
}

export class GangDataEventParser implements IMessageParser {
  private _id: number;
  private _userId: number;
  private _name: string;

  public flush(): boolean {
    this._id = -1;
    this._userId = -1;
    this._name = "";
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;
    
    this._id = wrapper.readInt();
    this._userId = wrapper.readInt();
    this._name = wrapper.readString();
 
    return true;
  }

  public get data(): GangData {
    return {
      id: this._id,
      userId: this._userId,
      name: this._name,
    };
  }
}
