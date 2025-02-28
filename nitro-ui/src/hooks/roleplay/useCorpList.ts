import { CorpListData, CorpListAllComposer, CorpListAllEvent } from "@nitrots/nitro-renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function useCorpList(): CorpListData[] {
  const [data, setData] = useState<CorpListData[]>([]);

  useEffect(() => {
    SendMessageComposer(new CorpListAllComposer());
  }, []);

  useMessageEvent(CorpListAllEvent, (event: CorpListAllEvent) => {
    setData(event.getParser().corps);
  });

  return data;
}
