import { CorpDataEvent, CorpData, CorpGetByIdComposer } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpById(corpId: number): CorpData | null {
  const [data, setData] = useState<CorpData>();

  useEffect(() => {
    SendMessageComposer(new CorpGetByIdComposer(corpId));
  }, [corpId]);

  useMessageEvent(CorpDataEvent, (event: CorpDataEvent) => {
    const eventData: CorpData = event.getParser().data;
    console.log(eventData.id, corpId);
    if (eventData.id !== corpId) {
      return;
    }
    setData(eventData);
  });

  return data;
}
