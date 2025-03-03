import { GangRoleLookupByIdComposer, GangRoleData, GangRoleDataEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangRoleById(gangRoleId: number): GangRoleData | null {
  const [data, setData] = useState<GangRoleData>();

  useEffect(() => {
    if (!gangRoleId) return;
    setData(undefined);
    SendMessageComposer(new GangRoleLookupByIdComposer(gangRoleId));
  }, [gangRoleId]);

  useMessageEvent(GangRoleDataEvent, (event: GangRoleDataEvent) => {
    const eventData: GangRoleData = event.getParser().data;
    if (eventData.id !== gangRoleId) {
      return;
    }
    setData(eventData);
  });

  return data;
}
