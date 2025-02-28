import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CorpDataEventParser } from "../../../parser";

export class CorpDataEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CorpDataEventParser);
  }

  public getParser(): CorpDataEventParser {
    return this.parser as CorpDataEventParser;
  }
}
