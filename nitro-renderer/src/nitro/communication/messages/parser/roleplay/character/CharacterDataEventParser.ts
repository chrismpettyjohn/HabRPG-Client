import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface CharacterData {
    userId: number;
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
            userId: wrapper.readInt(),
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
