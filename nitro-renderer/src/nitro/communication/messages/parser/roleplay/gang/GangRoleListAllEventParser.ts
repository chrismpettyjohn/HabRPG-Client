import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangRoleListData {
  id: number;
  gangId: number;
  name: string;
}

export class GangRoleListAllEventParser implements IMessageParser {
  private _gangRoleData: GangRoleListData[] = [];

  public flush(): boolean {
    this._gangRoleData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const gangRoleCount = wrapper.readInt();

    for (let i = 0; i < gangRoleCount; i += 1) {
      const [id, gangId, name] = wrapper.readString().split(";");
      this._gangRoleData.push({
        id: Number(id),
        gangId: Number(gangId),
        name,
      });
    }

    return true;
  }

  public get gangRoles(): GangRoleListData[] {
    return this._gangRoleData;
  }
}
