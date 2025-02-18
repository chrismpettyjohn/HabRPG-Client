import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CharacterDataEventParser } from "../../../parser";

export class CharacterStateEvent extends MessageEvent implements IMessageEvent {
  public static readonly FINISHED_OK: number = 1;
  public static readonly FINISHED_FAIL: number = 2;

  constructor(callBack: Function) {
    super(callBack, CharacterDataEventParser);
  }

  public getParser(): CharacterDataEventParser {
    return this.parser as CharacterDataEventParser;
  }
}
