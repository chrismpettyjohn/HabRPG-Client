import { GangData, GangListAllComposer, GangListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useGangList(): GangData[] {
  const [data, setData] = useState<GangData[]>([]);

  useEffect(() => {
    SendMessageComposer(new GangListAllComposer());
  }, []);

  useMessageEvent(GangListAllEvent, (event: GangListAllEvent) => {
    setData(event.getParser().gangs);
  });

  return data;
}
