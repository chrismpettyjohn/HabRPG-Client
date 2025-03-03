import { CorpRoleListData, CorpRoleListByCorpComposer, CorpRoleListByCorpEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpRoleListByCorp(corpId: number): CorpRoleListData[] {
  const [data, setData] = useState<CorpRoleListData[]>([]);

  useEffect(() => {
    if (!corpId) return;
    setData([]);
    SendMessageComposer(new CorpRoleListByCorpComposer(corpId));
  }, [corpId]);

  useMessageEvent(CorpRoleListByCorpEvent, (event: CorpRoleListByCorpEvent) => {
    setData(event.getParser().corpRoles);
  });

  return data;
}
