import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpRoleListData {
  id: number;
  corpId: number;
  name: string;
}

export class CorpRoleListByCorpEventParser implements IMessageParser {
  private _corpRoleData: CorpRoleListData[] = [];

  public flush(): boolean {
    this._corpRoleData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const corpRoleCount = wrapper.readInt();

    for (let i = 0; i < corpRoleCount; i += 1) {
      const [id, corpId, name] = wrapper.readString().split(";");
      this._corpRoleData.push({
        id: Number(id),
        corpId: Number(corpId),
        name,
      });
    }

    return true;
  }

  public get corpRoles(): CorpRoleListData[] {
    return this._corpRoleData;
  }
}
