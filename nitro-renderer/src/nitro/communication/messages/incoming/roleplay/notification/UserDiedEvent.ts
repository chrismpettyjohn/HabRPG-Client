import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { UserDiedEventParser } from "../../../parser";

export class UserDiedEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, UserDiedEventParser);
  }

  public getParser(): UserDiedEventParser {
    return this.parser as UserDiedEventParser;
  }
}
