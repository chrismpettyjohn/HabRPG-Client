import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpListAllEventParser } from "../../../parser";

export class CorpListAllEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CorpListAllEventParser);
  }

  public getParser(): CorpListAllEventParser {
    return this.parser as CorpListAllEventParser;
  }
}
