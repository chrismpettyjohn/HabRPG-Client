import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpRoleDataEventParser } from "../../../parser";

export class CorpRoleDataEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CorpRoleDataEventParser);
  }

  public getParser(): CorpRoleDataEventParser {
    return this.parser as CorpRoleDataEventParser;
  }
}
