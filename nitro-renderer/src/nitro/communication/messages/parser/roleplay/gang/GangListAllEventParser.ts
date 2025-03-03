import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangListData {
  id: number;
  name: string;
  badgeCode: string;
}

export class GangListAllEventParser implements IMessageParser {
  private _gangData: GangListData[] = [];

  public flush(): boolean {
    this._gangData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const gangCount = wrapper.readInt();

    for (let i = 0; i < gangCount; i += 1) {
      const [id, name, badgeCode] = wrapper.readString().split(";");
      this._gangData.push({
        id: Number(id),
        name,
        badgeCode,
      });
    }

    return true;
  }

  public get gangs(): GangListData[] {
    return this._gangData;
  }
}
