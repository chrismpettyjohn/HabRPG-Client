import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface CharacterData {
    id: number;
    botId: number | null;
    userId: number | null;
    petId: number | null;
    healthNow: number;
    healthMax: number;
    energyNow: number;
    energyMax: number;
}

export class CharacterDataEventParser implements IMessageParser {
    private _characterData: CharacterData;

    public flush(): boolean {
        this._characterData = undefined;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._characterData = {
            id: wrapper.readInt(),
            botId: wrapper.readInt(),
            userId: wrapper.readInt(),
            petId: wrapper.readInt(),
            healthNow: wrapper.readInt(),
            healthMax: wrapper.readInt(),
            energyNow: wrapper.readInt(),
            energyMax: wrapper.readInt(),
        }

        return true;
    }

    public get characterData(): CharacterData {
        return this._characterData;
    }
}
