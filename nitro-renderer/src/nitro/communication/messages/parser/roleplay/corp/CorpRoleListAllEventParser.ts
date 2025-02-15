import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpRoleData {
  id: number;
  corpId: number;
  name: string;
}

export class CorpRoleListAllEventParser implements IMessageParser {
  private _corpRoleData: CorpRoleData[] = [];

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

  public get corpRoles(): CorpRoleData[] {
    return this._corpRoleData;
  }
}
