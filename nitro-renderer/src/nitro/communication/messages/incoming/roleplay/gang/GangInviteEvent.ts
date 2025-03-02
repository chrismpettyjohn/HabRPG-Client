import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangInviteEventParser } from "../../../parser/roleplay/gang/GangInviteEventParser";

export class GangInviteEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangInviteEventParser);
  }

  public getParser(): GangInviteEventParser {
    return this.parser as GangInviteEventParser;
  }
}
