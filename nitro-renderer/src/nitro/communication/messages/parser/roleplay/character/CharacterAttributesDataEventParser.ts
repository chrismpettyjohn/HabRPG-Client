import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface CharacterAttributesData {
    userId: number;
    strength: number;
    intelligence: number;
    dexterity: number;
    charisma: number;
    perception: number;
    endurance: number;
    luck: number;
}

export class CharacterAttributesDataEventParser implements IMessageParser {
    private _characterAttributesData: CharacterAttributesData;

    public flush(): boolean {
        this._characterAttributesData = undefined;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._characterAttributesData = {
            userId: wrapper.readInt(),
            strength: wrapper.readInt(),
            intelligence: wrapper.readInt(),
            dexterity: wrapper.readInt(),
            charisma: wrapper.readInt(),
            perception: wrapper.readInt(),
            endurance: wrapper.readInt(),
            luck: wrapper.readInt(),
        }

        return true;
    }

    public get characterAttributesData(): CharacterAttributesData {
        return this._characterAttributesData;
    }
}
