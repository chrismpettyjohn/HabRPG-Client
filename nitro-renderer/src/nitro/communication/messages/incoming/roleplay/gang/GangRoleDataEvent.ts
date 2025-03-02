import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangRoleDataEventParser } from "../../../parser";

export class GangRoleDataEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, GangRoleDataEventParser);
  }

  public getParser(): GangRoleDataEventParser {
    return this.parser as GangRoleDataEventParser;
  }
}
