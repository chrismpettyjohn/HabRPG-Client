import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpListData {
  id: number;
  name: string;
  badgeCode: string;
}

export class CorpListAllEventParser implements IMessageParser {
  private _corpData: CorpListData[] = [];

  public flush(): boolean {
    this._corpData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const corpCount = wrapper.readInt();

    for (let i = 0; i < corpCount; i += 1) {
      const [id, name, badgeCode] = wrapper.readString().split(";");
      this._corpData.push({
        id: Number(id),
        name,
        badgeCode,
      });
    }

    return true;
  }

  public get corps(): CorpListData[] {
    return this._corpData;
  }
}
