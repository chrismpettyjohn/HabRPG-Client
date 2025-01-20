import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface CharacterSkillsData {
    characterId: number;
    strengthLevel: number;
    strengthExperience: number;
    staminaLevel: number;
    staminaExperience: number;
    agilityLevel: number;
    agilityExperience: number;
    resilienceLevel: number;
    resilienceExperience: number;
    meleeLevel: number;
    meleeExperience: number;
    rangedLevel: number;
    rangedExperience: number;
    defenseLevel: number;
    defenseExperience: number;
}

export class CharacterSkillsDataEventParser implements IMessageParser {
    private _characterAttributesData: CharacterSkillsData;

    public flush(): boolean {
        this._characterAttributesData = undefined;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._characterAttributesData = {
            characterId: wrapper.readInt(),
            strengthLevel: wrapper.readInt(),
            strengthExperience: wrapper.readInt(),
            staminaLevel: wrapper.readInt(),
            staminaExperience: wrapper.readInt(),
            agilityLevel: wrapper.readInt(),
            agilityExperience: wrapper.readInt(),
            resilienceLevel: wrapper.readInt(),
            resilienceExperience: wrapper.readInt(),
            meleeLevel: wrapper.readInt(),
            meleeExperience: wrapper.readInt(),
            rangedLevel: wrapper.readInt(),
            rangedExperience: wrapper.readInt(),
            defenseLevel: wrapper.readInt(),
            defenseExperience: wrapper.readInt(),
        }

        return true;
    }

    public get characterAttributesData(): CharacterSkillsData {
        return this._characterAttributesData;
    }
}
