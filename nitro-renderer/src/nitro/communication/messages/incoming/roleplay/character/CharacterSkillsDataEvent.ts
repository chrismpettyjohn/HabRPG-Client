import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { CharacterSkillsDataEventParser } from '../../../parser';

export class CharacterSkillsDataEvent extends MessageEvent implements IMessageEvent {
    public static readonly FINISHED_OK: number = 1;
    public static readonly FINISHED_FAIL: number = 2;

    constructor(callBack: Function) {
        super(callBack, CharacterSkillsDataEventParser);
    }

    public getParser(): CharacterSkillsDataEventParser {
        return this.parser as CharacterSkillsDataEventParser;
    }
}
