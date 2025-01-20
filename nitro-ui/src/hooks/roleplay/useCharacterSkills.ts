import { CharacterSkillsDataEvent, CharacterAttributesLookupComposer, CharacterSkillsData } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

const BASE_CHARACTER_ATTRIBUTES: CharacterSkillsData = {
    characterId: -1,
    strengthLevel: -1,
    strengthExperience: -1,
    staminaLevel: -1,
    staminaExperience: -1,
    agilityLevel: -1,
    agilityExperience: -1,
    resilienceLevel: -1,
    resilienceExperience: -1,
    meleeLevel: -1,
    meleeExperience: -1,
    rangedLevel: -1,
    rangedExperience: -1,
    defenseLevel: -1,
    defenseExperience: -1,
}

export function useCharacterSkills(characterId: number): CharacterSkillsData {
    const [data, setData] = useState<CharacterSkillsData>(BASE_CHARACTER_ATTRIBUTES);

    useEffect(() => {
        if (!characterId) return;
        setData(BASE_CHARACTER_ATTRIBUTES);
        SendMessageComposer(new CharacterAttributesLookupComposer(characterId));
    }, [characterId]);

    useMessageEvent(CharacterSkillsDataEvent, (event: CharacterSkillsDataEvent) => {
        const eventData: CharacterSkillsData = event.getParser().characterAttributesData;
        if (eventData.characterId != characterId) {
            return;
        }
        setData(eventData);
    });

    return data;
}