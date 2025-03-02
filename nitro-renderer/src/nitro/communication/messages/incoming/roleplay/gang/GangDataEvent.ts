import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangDataEventParser } from "../../../parser/roleplay/gang/GangDataEventParser";

export class GangDataEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangDataEventParser);
  }

  public getParser(): GangDataEventParser {
    return this.parser as GangDataEventParser;
  }
}
