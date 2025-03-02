import { GangRoleListData, GangRoleListAllComposer, GangRoleListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangRoleList(): GangRoleListData[] {
  const [data, setData] = useState<GangRoleListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new GangRoleListAllComposer());
  }, []);

  useMessageEvent(GangRoleListAllEvent, (event: GangRoleListAllEvent) => {
    setData(event.getParser().gangRoles);
  });

  return data;
}
