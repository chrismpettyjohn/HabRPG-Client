import { CharacterData, CharacterDataEvent, CharacterLookupComposer } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

const BASE_CHARACTER: CharacterData = {
    id: -1,
    botId: -1,
    userId: -1,
    petId: -1,
    healthNow: -1,
    healthMax: -1,
    energyNow: -1,
    energyMax: -1,
}

export function useCharacter(userId: number): CharacterData {
    const [data, setData] = useState<CharacterData>(BASE_CHARACTER);

    useEffect(() => {
        if (!userId) return;
        setData(BASE_CHARACTER);
        SendMessageComposer(new CharacterLookupComposer(userId));
    }, [userId]);

    useMessageEvent(CharacterDataEvent, (event: CharacterDataEvent) => {
        const eventData: CharacterData = event.getParser().characterData;
        if (eventData.userId != userId) {
            return;
        }
        setData(eventData);
    });

    return data;
}