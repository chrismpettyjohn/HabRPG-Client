import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangRoleListByGangEventParser } from "../../../parser";

export class GangRoleListByGangEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangRoleListByGangEventParser);
  }

  public getParser(): GangRoleListByGangEventParser {
    return this.parser as GangRoleListByGangEventParser;
  }
}
