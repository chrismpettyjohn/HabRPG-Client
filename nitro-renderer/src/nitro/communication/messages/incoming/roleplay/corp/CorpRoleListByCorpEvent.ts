import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpRoleListByCorpEventParser } from "../../../parser";

export class CorpRoleListByCorpEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CorpRoleListByCorpEventParser);
  }

  public getParser(): CorpRoleListByCorpEventParser {
    return this.parser as CorpRoleListByCorpEventParser;
  }
}
