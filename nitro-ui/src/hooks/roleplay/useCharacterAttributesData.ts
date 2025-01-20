import { CharacterAttributesData, CharacterAttributesDataEvent, CharacterAttributesLookupComposer } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

const BASE_CHARACTER_ATTRIBUTES: CharacterAttributesData = {
    userId: -1,
    strength: -1,
    intelligence: -1,
    dexterity: -1,
    charisma: -1,
    perception: -1,
    endurance: -1,
    luck: -1,
}

export function useCharacterAttributesData(userId: number): CharacterAttributesData {
    const [data, setData] = useState<CharacterAttributesData>(BASE_CHARACTER_ATTRIBUTES);

    useEffect(() => {
        if (!userId) return;
        setData(BASE_CHARACTER_ATTRIBUTES);
        SendMessageComposer(new CharacterAttributesLookupComposer(userId));
    }, [userId]);

    useMessageEvent(CharacterAttributesDataEvent, (event: CharacterAttributesDataEvent) => {
        const eventData: CharacterAttributesData = event.getParser().characterAttributesData;
        if (eventData.userId != userId) {
            return;
        }
        setData(eventData);
    });

    return data;
}