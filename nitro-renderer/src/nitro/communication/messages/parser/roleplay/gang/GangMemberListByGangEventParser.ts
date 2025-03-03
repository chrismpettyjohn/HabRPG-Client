import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangMemberListData {
  userId: number;
  gangRoleId: number;
  username: string;
  look: string;
}

export class GangMemberListByGangEventParser implements IMessageParser {
  private _gangId: number;
  private _gangMembers: GangMemberListData[] = [];

  public flush(): boolean {
    this._gangId = -1;
    this._gangMembers = [];
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._gangId = wrapper.readInt();

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

  public get gangId(): number {
    return this._gangId;
  }

  public get gangMembers(): GangMemberListData[] {
    return this._gangMembers;
  }
}
