import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangMemberListByGangEventParser } from "../../../parser";

export class GangMemberListByGangEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangMemberListByGangEventParser);
  }

  public getParser(): GangMemberListByGangEventParser {
    return this.parser as GangMemberListByGangEventParser;
  }
}
