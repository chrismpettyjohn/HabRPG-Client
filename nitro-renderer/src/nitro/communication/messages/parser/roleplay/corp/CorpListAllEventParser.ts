import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpData {
  id: number;
  name: string;
}

export class CorpListAllEventParser implements IMessageParser {
  private _corpData: CorpData[] = [];

  public flush(): boolean {
    this._corpData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._corpData = []; // Ensure it's initialized

    try {
      const corpCount = wrapper.readInt();

      for (let i = 0; i < corpCount; i += 1) {
        const [id, name] = wrapper.readString().split(";");
        this._corpData.push({
          id: Number(id),
          name,
        });
      }
    } catch (e) {
      console.error("Error parsing corp data:", e);
      return false;
    }
    return true;
  }

  public get corps(): CorpData[] {
    return this._corpData;
  }
}
