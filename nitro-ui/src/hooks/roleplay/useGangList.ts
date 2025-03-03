import { GangListData, GangListAllComposer, GangListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangList(): GangListData[] {
  const [data, setData] = useState<GangListData[]>([]);

  useEffect(() => {
    setData([]);
    SendMessageComposer(new GangListAllComposer());
  }, []);

  useMessageEvent(GangListAllEvent, (event: GangListAllEvent) => {
    setData(event.getParser().gangs);
  });

  return data;
}
