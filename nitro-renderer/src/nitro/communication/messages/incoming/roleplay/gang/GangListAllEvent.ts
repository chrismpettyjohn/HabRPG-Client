import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangListAllEventParser } from "../../../parser";

export class GangListAllEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangListAllEventParser);
  }

  public getParser(): GangListAllEventParser {
    return this.parser as GangListAllEventParser;
  }
}
