import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangMemberListData {
    userId: number;
    gangRoleId: number;
    username: string;
    look: string;
}

export class GangMemberListByGangEventParser implements IMessageParser {
  private _gangMembers: GangMemberListData[] = [];

  public flush(): boolean {
    this._gangMembers = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    const gangMemberCount = wrapper.readInt();

    for (let i = 0; i < gangMemberCount; i += 1) {
      const [userId, gangRoleId, username, look] = wrapper.readString().split(";");
      this._gangMembers.push({
        userId: Number(userId),
          gangRoleId: Number(gangRoleId),
          username,
        look,
      });
    }

    return true;
  }

  public get gangMembers(): GangMemberListData[] {
    return this._gangMembers;
  }
}
