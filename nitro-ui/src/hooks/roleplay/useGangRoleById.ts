import { GangDataEvent, GangData, GangRoleLookupByIdComposer } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangById(gangId: number): GangData | null {
  const [data, setData] = useState<GangData>();

  useEffect(() => {
    if (!gangId) return;
    setData(undefined);
    SendMessageComposer(new GangRoleLookupByIdComposer(gangId));
  }, [gangId]);

  useMessageEvent(GangDataEvent, (event: GangDataEvent) => {
    const eventData: GangData = event.getParser().data;
    if (eventData.id !== gangId) {
      return;
    }
    setData(eventData);
  });

  return data;
}
