import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpRoleListAllEventParser } from "../../../parser";

export class CorpRoleListAllEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CorpRoleListAllEventParser);
  }

  public getParser(): CorpRoleListAllEventParser {
    return this.parser as CorpRoleListAllEventParser;
  }
}
