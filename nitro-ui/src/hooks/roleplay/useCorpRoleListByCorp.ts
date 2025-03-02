import { CorpRoleListData, CorpRoleListByCorpComposer, CorpRoleListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpRoleListByCorp(corpId: number): CorpRoleListData[] {
  const [data, setData] = useState<CorpRoleListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new CorpRoleListByCorpComposer(corpId));
  }, [corpId]);

  useMessageEvent(CorpRoleListAllEvent, (event: CorpRoleListAllEvent) => {
    setData(event.getParser().corpRoles);
  });

  return data;
}
