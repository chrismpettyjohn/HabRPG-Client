import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpRoleData {
  id: number;
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

    this._corpRoleData = []; // Ensure it's initialized

    try {
      const corpRoleCount = wrapper.readInt();

      for (let i = 0; i < corpRoleCount; i += 1) {
        const [id, name] = wrapper.readString().split(";");
        this._corpRoleData.push({
          id: Number(id),
          name,
        });
      }
    } catch (e) {
      console.error("Error parsing corp role data:", e);
      return false;
    }

    return true;
  }

  public get corpRoles(): CorpRoleData[] {
    return this._corpRoleData;
  }
}
