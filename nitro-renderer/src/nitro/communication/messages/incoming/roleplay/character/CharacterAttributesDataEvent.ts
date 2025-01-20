import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { CharacterAttributesDataEventParser } from '../../../parser';

export class CharacterAttributesDataEvent extends MessageEvent implements IMessageEvent {
    public static readonly FINISHED_OK: number = 1;
    public static readonly FINISHED_FAIL: number = 2;

    constructor(callBack: Function) {
        super(callBack, CharacterAttributesDataEventParser);
    }

    public getParser(): CharacterAttributesDataEventParser {
        return this.parser as CharacterAttributesDataEventParser;
    }
}
