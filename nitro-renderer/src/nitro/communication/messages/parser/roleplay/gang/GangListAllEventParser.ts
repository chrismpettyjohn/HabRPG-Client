import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangData {
  id: number;
  name: string;
}

export class GangListAllEventParser implements IMessageParser {
  private _gangData: GangData[] = [];

  public flush(): boolean {
    this._gangData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const gangCount = wrapper.readInt();

    for (let i = 0; i < gangCount; i += 1) {
      const [id, name] = wrapper.readString().split(";");
      this._gangData.push({
        id: Number(id),
        name,
      });
    }

    return true;
  }

  public get gangs(): GangData[] {
    return this._gangData;
  }
}
