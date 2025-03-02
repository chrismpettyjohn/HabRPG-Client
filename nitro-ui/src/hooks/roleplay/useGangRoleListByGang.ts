import { GangRoleListData, GangRoleListByGangComposer, GangRoleListByGangEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangRoleListByGang(gangId: number): GangRoleListData[] {
  const [data, setData] = useState<GangRoleListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new GangRoleListByGangComposer(gangId));
  }, []);

  useMessageEvent(GangRoleListByGangEvent, (event: GangRoleListByGangEvent) => {
    if (event.getParser().gangId !== gangId) {
      return;
    }
    setData(event.getParser().gangRoles);
  });

  return data;
}
