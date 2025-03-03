import { CorpMemberListData, CorpMemberListByCorpComposer, CorpMemberListByCorpEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpMemberListByCorp(corpId: number): CorpMemberListData[] {
  const [data, setData] = useState<CorpMemberListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new CorpMemberListByCorpComposer(corpId));
  }, [corpId]);

  useMessageEvent(CorpMemberListByCorpEvent, (event: CorpMemberListByCorpEvent) => {
    if (event.getParser().corpId !== corpId) {
      return;
    }
    setData(event.getParser().corpMembers);
  });

  return data;
}
