import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangRoleListData {
  id: number;
  gangId: number;
  orderId: number;
  name: string;
}

export class GangRoleListByGangEventParser implements IMessageParser {
  private _gangId: number;
  private _gangRoleData: GangRoleListData[] = [];

  public flush(): boolean {
    this._gangId = -1;
    this._gangRoleData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._gangId = wrapper.readInt();

    const gangRoleCount = wrapper.readInt();

    for (let i = 0; i < gangRoleCount; i += 1) {
      const [id, gangId, orderId, name] = wrapper.readString().split(";");
      this._gangRoleData.push({
        id: Number(id),
        gangId: Number(gangId),
        orderId: Number(orderId),
        name,
      });
    }

    return true;
  }

  public get gangId(): number {
    return this._gangId;
  }

  public get gangRoles(): GangRoleListData[] {
    return this._gangRoleData;
  }
}
