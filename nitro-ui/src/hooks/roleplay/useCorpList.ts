import { CorpData, CorpListAllComposer, CorpListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpList(): CorpData[] {
  const [data, setData] = useState<CorpData[]>([]);

  useEffect(() => {
    SendMessageComposer(new CorpListAllComposer());
  }, []);

  useMessageEvent(CorpListAllEvent, (event: CorpListAllEvent) => {
    setData(event.getParser().corps);
  });

  return data;
}
