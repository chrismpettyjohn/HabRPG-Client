import { GangMemberListData, GangMemberListByGangComposer, GangMemberListByGangEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangMemberListByGang(gangId: number): GangMemberListData[] {
  const [data, setData] = useState<GangMemberListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new GangMemberListByGangComposer(gangId));
  }, [gangId]);

  useMessageEvent(GangMemberListByGangEvent, (event: GangMemberListByGangEvent) => {
    if (event.getParser().gangId !== gangId) {
      return;
    }
    setData(event.getParser().gangMembers);
  });

  return data;
}
