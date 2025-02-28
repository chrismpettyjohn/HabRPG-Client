import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangRoleListAllEventParser } from "../../../parser";

export class GangRoleListAllEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangRoleListAllEventParser);
  }

  public getParser(): GangRoleListAllEventParser {
    return this.parser as GangRoleListAllEventParser;
  }
}
