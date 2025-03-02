import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangInviteData {
  gangId: number;
  gangName: string;
  gangRoleId: number;
  gangRoleName: string;
}

export class GangInviteEventParser implements IMessageParser {
  private _gangId: number;
  private _gangName: string;
  private _gangRoleId: number;
  private _gangRoleName: string;

  public flush(): boolean {
    this._gangId = -1;
    this._gangName = "";
    this._gangRoleId = -1;
    this._gangRoleName = "";
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._gangId = wrapper.readInt();
    this._gangName = wrapper.readString();
    this._gangRoleId = wrapper.readInt();
    this._gangRoleName = wrapper.readString();

    return true;
  }

  public get data(): GangInviteData {
    return {
      gangId: this._gangId,
      gangName: this._gangName,
      gangRoleId: this._gangRoleId,
      gangRoleName: this._gangRoleName,
    };
  }
}
