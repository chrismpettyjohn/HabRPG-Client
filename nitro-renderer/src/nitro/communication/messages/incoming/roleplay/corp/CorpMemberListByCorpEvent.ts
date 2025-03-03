import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpMemberListByCorpEventParser } from "../../../parser";

export class CorpMemberListByCorpEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CorpMemberListByCorpEventParser);
  }

  public getParser(): CorpMemberListByCorpEventParser {
    return this.parser as CorpMemberListByCorpEventParser;
  }
}
