import { CorpRoleData, CorpRoleDataEvent, CorpRoleGetByIdComposer } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpRoleById(corpId: number): CorpRoleData | null {
  const [data, setData] = useState<CorpRoleData>();

  useEffect(() => {
    SendMessageComposer(new CorpRoleGetByIdComposer(corpId));
  }, [corpId]);

  useMessageEvent(CorpRoleDataEvent, (event: CorpRoleDataEvent) => {
    const eventData: CorpRoleData = event.getParser().data;
    if (eventData.id !== corpId) {
      return;
    }
    setData(eventData);
  });

  return data;
}
