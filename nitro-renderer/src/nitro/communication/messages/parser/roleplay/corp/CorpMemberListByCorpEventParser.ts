import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpMemberListData {
    userId: number;
    corpRoleId: number;
    username: string;
    look: string;
}

export class CorpMemberListByCorpEventParser implements IMessageParser {
  private _corpMemberData: CorpMemberListData[] = [];

  public flush(): boolean {
    this._corpMemberData = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const corpMemberCount = wrapper.readInt();

    for (let i = 0; i < corpMemberCount; i += 1) {
      const [userId, corpRoleId, username, look] = wrapper.readString().split(";");
      this._corpMemberData.push({
        userId: Number(userId),
          corpRoleId: Number(corpRoleId),
          username,
        look,
      });
    }

    return true;
  }

  public get corpMembers(): CorpMemberListData[] {
    return this._corpMemberData;
  }
}
