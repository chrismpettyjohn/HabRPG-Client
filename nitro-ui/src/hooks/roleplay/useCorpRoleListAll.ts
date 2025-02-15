import { CorpRoleData, CorpRoleListAllComposer, CorpRoleListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpRoleList(): CorpRoleData[] {
  const [data, setData] = useState<CorpRoleData[]>([]);

  useEffect(() => {
    SendMessageComposer(new CorpRoleListAllComposer());
  }, []);

  useMessageEvent(CorpRoleListAllEvent, (event: CorpRoleListAllEvent) => {
    setData(event.getParser().corpRoles);
  });

  return data;
}
