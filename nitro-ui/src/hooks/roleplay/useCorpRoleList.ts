import { CorpRoleListData, CorpRoleListAllComposer, CorpRoleListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpRoleList(): CorpRoleListData[] {
  const [data, setData] = useState<CorpRoleListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new CorpRoleListAllComposer());
  }, []);

  useMessageEvent(CorpRoleListAllEvent, (event: CorpRoleListAllEvent) => {
    setData(event.getParser().corpRoles);
  });

  return data;
}
